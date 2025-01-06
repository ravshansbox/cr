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
