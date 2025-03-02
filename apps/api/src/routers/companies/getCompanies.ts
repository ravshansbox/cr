import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { getCompaniesEndpoint } from '../../endpoints.js';
import { pool } from '../../pool.js';
import { companyDao } from '../../daos/companies/index.js';

export const getCompanies = createRoute({
  endpoint: getCompaniesEndpoint,
  auth: true,
  process: async ({ auth }) => {
    const companies = await companyDao.selectByUserId(pool, {
      user_id: auth.user.id,
    });
    return new HttpResponse(200, companies);
  },
});

export type GetCompaniesFetcher = Fetcher<typeof getCompanies>;
