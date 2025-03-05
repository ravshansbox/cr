import { createFetcher, createHttpClient } from './createFetcher';
import {
  type CreateTokenFetcher,
  createTokenEndpoint,
  type GetTokenFetcher,
  getTokenEndpoint,
  type GetAllTokensFetcher,
  getAllTokensEndpoint,
  type DeleteTokenFetcher,
  deleteTokenEndpoint,
  type RegisterUserFetcher,
  registerUserEndpoint,
  type GetCompaniesFetcher,
  getCompaniesEndpoint,
  CreateCompanyFetcher,
  createCompanyEndpoint,
} from '@cloudretail/api';

export const httpClient = createHttpClient();

export const api = {
  createToken: createFetcher<CreateTokenFetcher>(
    httpClient,
    createTokenEndpoint,
  ),
  getToken: createFetcher<GetTokenFetcher>(httpClient, getTokenEndpoint),
  getAllTokens: createFetcher<GetAllTokensFetcher>(
    httpClient,
    getAllTokensEndpoint,
  ),
  deleteToken: createFetcher<DeleteTokenFetcher>(
    httpClient,
    deleteTokenEndpoint,
  ),
  registerUser: createFetcher<RegisterUserFetcher>(
    httpClient,
    registerUserEndpoint,
  ),
  getCompanies: createFetcher<GetCompaniesFetcher>(
    httpClient,
    getCompaniesEndpoint,
  ),
  createCompany: createFetcher<CreateCompanyFetcher>(
    httpClient,
    createCompanyEndpoint,
  ),
};
