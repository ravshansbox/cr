type Options = { method: string; body?: unknown };
const fetchJson = async (url: string, { method, body }: Options) => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body:
      method === 'GET' || body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: response.status, body: await response.json() };
};

export const createHttpClient = (baseUrl: string) => {
  return {
    request: async (path: string, options: Options) => {
      return fetchJson(`${baseUrl}${path}`, options);
    },
  };
};
