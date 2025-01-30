export type Method = 'get' | 'post' | 'put' | 'delete';

export class Endpoint<_RequestParams> {
  constructor(
    public readonly method: Method,
    public readonly path: string,
  ) {}
}
