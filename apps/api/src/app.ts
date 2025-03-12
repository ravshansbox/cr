import findMyWay from 'find-my-way';
import { registerRoute } from './http.js';
import { checkHealth } from './routers/checkHealth.js';
import { createToken } from './routers/tokens/createToken.js';
import { getToken } from './routers/tokens/getToken.js';
import { getAllTokens } from './routers/tokens/getAllTokens.js';
import { deleteToken } from './routers/tokens/deleteToken.js';
import { registerUser } from './routers/users/registerUser.js';
import { activateUser } from './routers/users/activateUser.js';
import { createCompany } from './routers/companies/createCompany.js';
import { getCompanies } from './routers/companies/getCompanies.js';

export const app = findMyWay();

registerRoute(app, checkHealth);
registerRoute(app, createToken);
registerRoute(app, getToken);
registerRoute(app, getAllTokens);
registerRoute(app, deleteToken);
registerRoute(app, registerUser);
registerRoute(app, activateUser);
registerRoute(app, createCompany);
registerRoute(app, getCompanies);
