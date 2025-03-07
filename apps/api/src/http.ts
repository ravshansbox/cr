import express from 'express';
import zod from 'zod';
import { parseAuth } from './parseAuth.js';
import { Endpoint } from './shared.js';

export class HttpResponse<Body> {
  constructor(
    public readonly status: number,
    public readonly body: Body,
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
) => Promise<HttpResponse<ResponseBody>>;

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
>): express.RequestHandler<RequestParams, ResponseBody, RequestBody> => {
  return async (request, response) => {
    const { status, body } = await process({
      auth: auth ? await parseAuth(request.headers.authorization) : undefined,
      params: request.params,
      body: bodySchema ? bodySchema.parse(request.body) : undefined,
    } as unknown as Context<RequestParams, RequestBody, Auth>);
    response.status(status).json(body);
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
  router: express.Router,
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
