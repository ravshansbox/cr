import express from 'express';
import { ZodError } from 'zod';
import { createToken } from './routers/tokens/createToken.js';
import { HttpError } from './exceptions/index.js';
import { registerRoute } from './http.js';
import { getToken } from './routers/tokens/getToken.js';

export const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

registerRoute(app, createToken);
registerRoute(app, getToken);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    if (error instanceof HttpError) {
      response.status(error.status).json({ error: error.message });
    }

    if (error instanceof ZodError) {
      response.status(422).json({ error: error.errors });
    }

    response.status(500).json({ error: 'Something went wrong' });
  },
);
