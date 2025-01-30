import { compile } from 'path-to-regexp';
import { Endpoint, type Method } from '@cloudretail/api';

const fetchJson = async <RequestBody, ResponseBody>(
  method: Method,
  url: string,
  body?: RequestBody,
) => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method !== 'get' && body ? JSON.stringify(body) : undefined,
  });

  return response.json() as Promise<ResponseBody>;
};

export const createFetcher = <Fetcher>(endpoint: Endpoint<unknown>) => {
  const getUrl = compile(endpoint.path);

  const fetcher = ({
    params,
    body,
  }: {
    params: Record<string, string>;
    body: Record<string, unknown>;
  }) => fetchJson(endpoint.method, `/api${getUrl(params)}`, body);

  return fetcher as Fetcher;
};
