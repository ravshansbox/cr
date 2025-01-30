import { Endpoint } from './shared.js';

export const createTokenEndpoint = new Endpoint('post', '/tokens');

export const getTokenEndpoint = new Endpoint<{ id: string }>(
  'get',
  '/tokens/:id',
);

export const getAllTokensEndpoint = new Endpoint('get', '/tokens');
