import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const createCompanyUser = (
  client: DbClient,
  values: {
    company_id: number;
    user_id: number;
    role: 'owner' | 'manager' | 'employee';
  },
) => {
  return getRow(
    client.query<{
      id: number;
      company_id: number;
      user_id: number;
      role: 'owner' | 'manager' | 'employee';
    }>(
      sql`insert into companies_users (company_id, user_id, role) values (${values.company_id}, ${values.user_id}, ${values.role}::company_user_role) returning *`,
    ),
  );
};
