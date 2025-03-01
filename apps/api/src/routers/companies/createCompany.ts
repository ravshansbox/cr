import zod from 'zod';
import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { createCompanyEndpoint } from '../../endpoints.js';
import { wrapIntoTransaction } from '../../pool.js';
import { companyDao } from '../../daos/companies/index.js';
import { companyUserDao } from '../../daos/companiesUsers/index.js';

export const createCompany = createRoute({
  endpoint: createCompanyEndpoint,
  auth: true,
  bodySchema: zod.object({
    name: zod.string(),
  }),
  process: async ({ auth, body }) => {
    const company = await wrapIntoTransaction(async (client) => {
      const company = await companyDao.createCompany(client, {
        name: body.name,
      });
      await companyUserDao.createCompanyUser(client, {
        company_id: company.id,
        user_id: auth.user.id,
        role: 'owner',
      });
      return company;
    });
    return new HttpResponse(201, company);
  },
});

export type CreateCompanyFetcher = Fetcher<typeof createCompany>;
