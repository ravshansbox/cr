import { createFetcher } from './createFetcher';
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
} from '@cloudretail/api';

export const api = {
  createToken: createFetcher<CreateTokenFetcher>(createTokenEndpoint),
  getToken: createFetcher<GetTokenFetcher>(getTokenEndpoint),
  getAllTokens: createFetcher<GetAllTokensFetcher>(getAllTokensEndpoint),
  deleteToken: createFetcher<DeleteTokenFetcher>(deleteTokenEndpoint),
  registerUser: createFetcher<RegisterUserFetcher>(registerUserEndpoint),
  getCompanies: createFetcher<GetCompaniesFetcher>(getCompaniesEndpoint),
};
