import http from 'node:http';
import net from 'node:net';
import { TestProject } from 'vitest/node';
import { app } from './app.js';
import { pool } from './pool.js';

declare module 'vitest' {
  export interface ProvidedContext {
    baseUrl: string;
  }
}

export default async (project: TestProject) => {
  let server: http.Server;
  await new Promise<void>((resolve, reject) => {
    server = http.createServer();
    server.on('error', reject);
    server.on('listening', () => {
      const { port } = server.address() as net.AddressInfo;
      project.provide('baseUrl', `http://localhost:${port}`);
      resolve();
    });
    server.on('request', app);
    server.listen();
  });

  return async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
};
