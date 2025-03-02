import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRows } from '../../pool.js';

export const selectByUserId = (
  client: DbClient,
  values: { user_id: number },
) => {
  return getRows(
    client.query<{
      id: number;
      name: string;
      role: 'owner' | 'manager' | 'employee';
    }>(
      sql`select c.*, cu.role from companies c join companies_users cu on c.id = cu.company_id where cu.user_id = ${values.user_id}`,
    ),
  );
};
