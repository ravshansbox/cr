import http from 'node:http';
import zod, { ZodError } from 'zod';
import findMyWay from 'find-my-way';
import { parseAuth } from './parseAuth.js';
import { Endpoint } from './shared.js';
import { HttpError } from './exceptions/index.js';

export class HttpResponse<Body> {
  constructor(
    public readonly status: number,
    public readonly body: Body,
    public readonly type: 'json' | 'text' = 'json',
  ) {}
}

type ObjectWithKnownKey<K extends string, T> = T extends {}
  ? Record<K, T>
  : Record<never, never>;

type Context<
  RequestParams,
  RequestBody,
  Auth extends boolean,
> = (Auth extends true
  ? Record<'auth', Awaited<ReturnType<typeof parseAuth>>>
  : Record<never, never>) &
  ObjectWithKnownKey<'params', RequestParams> &
  ObjectWithKnownKey<'body', RequestBody>;

type Process<RequestParams, RequestBody, ResponseBody, Auth extends boolean> = (
  context: Context<RequestParams, RequestBody, Auth>,
) => HttpResponse<ResponseBody> | Promise<HttpResponse<ResponseBody>>;

type CreateHandlerOptions<
  RequestParams,
  RequestBody,
  ResponseBody,
  Auth extends boolean,
> = {
  auth?: Auth;
  bodySchema?: zod.ZodSchema<RequestBody>;
  process: Process<RequestParams, RequestBody, ResponseBody, Auth>;
};

const parseBody = (request: http.IncomingMessage) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    request.on('error', reject);
  });
};

const sendJson = (
  response: http.ServerResponse,
  statusCode: number,
  body: unknown,
) => {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
};

const handleError = (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  error: unknown,
) => {
  console.error(request.method, request.url, error);

  if (error instanceof HttpError) {
    sendJson(response, error.status, { error: error.message });
    return;
  }

  if (error instanceof ZodError) {
    sendJson(response, 422, { error: error.errors });
    return;
  }

  sendJson(response, 500, { error: 'Something went wrong' });
};

const createHandler = <
  RequestParams,
  RequestBody,
  ResponseBody,
  Auth extends boolean,
>({
  auth,
  bodySchema,
  process,
}: CreateHandlerOptions<
  RequestParams,
  RequestBody,
  ResponseBody,
  Auth
>): findMyWay.Handler<findMyWay.HTTPVersion.V1> => {
  return async (request, response, params) => {
    try {
      const result = await process({
        auth: auth ? await parseAuth(request.headers.authorization) : undefined,
        params,
        body: bodySchema
          ? bodySchema.parse(JSON.parse((await parseBody(request)).toString()))
          : undefined,
      } as unknown as Context<RequestParams, RequestBody, Auth>);
      switch (result.type) {
        case 'json': {
          sendJson(response, result.status, result.body);
          break;
        }
        case 'text': {
          response.statusCode = result.status;
          response.end(result.body);
          break;
        }
      }
    } catch (error) {
      handleError(request, response, error);
    }
  };
};

type Route<RequestParams, RequestBody, ResponseBody, Auth extends boolean> = {
  endpoint: Endpoint<RequestParams>;
  auth?: Auth;
  bodySchema?: zod.ZodSchema<RequestBody>;
  process: Process<RequestParams, RequestBody, ResponseBody, Auth>;
};

export const createRoute = <
  RequestParams,
  RequestBody,
  ResponseBody,
  Auth extends boolean,
>(
  route: Route<RequestParams, RequestBody, ResponseBody, Auth>,
) => route;

export const registerRoute = <
  RequestParams,
  RequestBody,
  ResponseBody,
  Auth extends boolean,
>(
  router: findMyWay.Instance<findMyWay.HTTPVersion.V1>,
  route: Route<RequestParams, RequestBody, ResponseBody, Auth>,
) => {
  router[route.endpoint.method](
    route.endpoint.path,
    createHandler({
      auth: route.auth,
      bodySchema: route.bodySchema,
      process: route.process,
    }),
  );
};

export type Fetcher<R> =
  R extends Route<
    infer RequestParams,
    infer RequestBody,
    infer ResponseBody,
    infer Auth
  >
    ? (
        context: Omit<Context<RequestParams, RequestBody, Auth>, 'auth'>,
      ) => Promise<ResponseBody>
    : never;
