import { compile } from 'path-to-regexp';
export type Method = 'get' | 'post' | 'put' | 'delete';

export class Endpoint<RequestParams> {
  toPath: (params: RequestParams) => string;

  constructor(
    public readonly method: Method,
    public readonly path: string,
  ) {
    this.toPath = compile(this.path) as (params: RequestParams) => string;
  }
}
