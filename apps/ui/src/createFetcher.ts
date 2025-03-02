/* eslint-disable @typescript-eslint/no-explicit-any */
import { Endpoint, type Method } from '@cloudretail/api';

type FetchJsonOptions<RequestBody> = {
  method: Method;
  url: string;
  headers?: Record<string, string>;
  body?: RequestBody;
};
const fetchJson = async <RequestBody, ResponseBody>({
  method,
  url,
  headers,
  body,
}: FetchJsonOptions<RequestBody>) => {
  const response = await fetch(url, {
    method,
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: method !== 'get' && body ? JSON.stringify(body) : undefined,
  });

  if (response.ok) {
    return response.json() as Promise<ResponseBody>;
  }

  throw new Error(response.statusText);
};

export const createHttpClient = () => {
  const clientHeaders = {} as Record<string, string>;
  return {
    setHeader: (name: string, value: string) => {
      clientHeaders[name] = value;
    },
    fetchJson: <RequestBody>({
      headers: requestHeaders,
      ...options
    }: FetchJsonOptions<RequestBody>) =>
      fetchJson({
        ...options,
        headers: { ...clientHeaders, ...requestHeaders },
      }),
  };
};
type HttpClient = ReturnType<typeof createHttpClient>;

export const createFetcher = <Fetcher>(
  httpClient: HttpClient,
  endpoint: Endpoint<any>,
) => {
  const fetcher = ({
    params,
    body,
  }: {
    params: Record<string, string>;
    body: Record<string, unknown>;
  }) =>
    httpClient.fetchJson({
      method: endpoint.method,
      url: `/api${endpoint.toPath(params)}`,
      body,
    });

  return fetcher as Fetcher;
};
