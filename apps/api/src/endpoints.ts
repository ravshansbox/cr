import { Endpoint } from './shared.js';

export const createTokenEndpoint = new Endpoint('post', '/tokens');

export const getTokenEndpoint = new Endpoint<{ id: string }>(
  'get',
  '/tokens/:id',
);

export const getAllTokensEndpoint = new Endpoint('get', '/tokens');

export const deleteTokenEndpoint = new Endpoint<{ id: string }>(
  'delete',
  '/tokens/:id',
);

export const registerUserEndpoint = new Endpoint('post', '/users');
