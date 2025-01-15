import express from 'express';
import zod from 'zod';

export class HttpResponse<Body> {
  constructor(
    public readonly status: number,
    public readonly body: Body,
  ) {}
}

type Method = 'get' | 'post' | 'put' | 'delete';

export class Endpoint<_RequestParams> {
  constructor(
    public readonly method: Method,
    public readonly path: string,
  ) {}
}

type Context<RequestParams, RequestBody> = {
  params: RequestParams;
  body: RequestBody;
};

type Process<RequestParams, RequestBody, ResponseBody> = (
  context: Context<RequestParams, RequestBody>,
) => Promise<HttpResponse<ResponseBody>>;

type CreateHandlerOptions<RequestParams, RequestBody, ResponseBody> = {
  bodySchema?: zod.ZodSchema<RequestBody>;
  process: Process<RequestParams, RequestBody, ResponseBody>;
};

export const createHandler = <RequestParams, RequestBody, ResponseBody>({
  bodySchema,
  process,
}: CreateHandlerOptions<
  RequestParams,
  RequestBody,
  ResponseBody
>): express.RequestHandler<RequestParams, ResponseBody, RequestBody> => {
  return async (request, response) => {
    const { status, body } = await process({
      params: request.params,
      body: bodySchema
        ? bodySchema.parse(request.body)
        : (undefined as RequestBody),
    });
    response.status(status).json(body);
  };
};

type Route<RequestParams, RequestBody, ResponseBody> = {
  endpoint: Endpoint<RequestParams>;
  handler: express.RequestHandler<RequestParams, ResponseBody, RequestBody>;
};

export const createRoute = <RequestParams, RequestBody, ResponseBody>(
  route: Route<RequestParams, RequestBody, ResponseBody>,
) => route;

export const registerRoute = <RequestParams, RequestBody, ResponseBody>(
  router: express.Router,
  route: Route<RequestParams, RequestBody, ResponseBody>,
) => {
  router[route.endpoint.method](route.endpoint.path, route.handler);
};

export type Fetcher<Handler> =
  Handler extends express.RequestHandler<
    infer RequestParams,
    infer ResponseBody,
    infer RequestBody
  >
    ? (context: Context<RequestParams, RequestBody>) => Promise<ResponseBody>
    : never;
