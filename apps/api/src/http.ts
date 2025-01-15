import express from 'express';
import zod from 'zod';

export class HttpResponse<Body> {
  constructor(
    public readonly status: number,
    public readonly body: Body,
  ) {}
}

type CreateHandlerOptions<RequestBody, ResponseBody> = {
  bodySchema: zod.ZodSchema<RequestBody>;
  process: (params: {
    body: RequestBody;
  }) => Promise<HttpResponse<ResponseBody>>;
};

export const createHandler = <RequestParams, RequestBody, ResponseBody>({
  bodySchema,
  process,
}: CreateHandlerOptions<RequestBody, ResponseBody>): express.RequestHandler<
  RequestParams,
  ResponseBody,
  RequestBody
> => {
  return async (request, response) => {
    const { status, body } = await process({
      body: bodySchema.parse(request.body),
    });
    response.status(status).json(body);
  };
};

type Route<RequestParams, RequestBody, ResponseBody> = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler: express.RequestHandler<RequestParams, ResponseBody, RequestBody>;
};

export const createRoute = <RequestParams, RequestBody, ResponseBody>(
  route: Route<RequestParams, RequestBody, ResponseBody>,
) => route;

export const registerRoute = <RequestParams, RequestBody, ResponseBody>(
  router: express.Router,
  route: Route<RequestParams, RequestBody, ResponseBody>,
) => {
  router[route.method](route.path, route.handler);
};

export type Fetcher<Handler> =
  Handler extends express.RequestHandler<
    infer RequestParams,
    infer ResponseBody,
    infer RequestBody
  >
    ? (options: {
        params: RequestParams;
        body: RequestBody;
      }) => Promise<ResponseBody>
    : never;
