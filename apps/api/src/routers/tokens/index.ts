import express from 'express';
import { createToken } from './createToken';

export const tokenRouter = express.Router();

tokenRouter.post('/', createToken);
