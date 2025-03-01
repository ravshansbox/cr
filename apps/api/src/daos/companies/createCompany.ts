import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const createCompany = (client: DbClient, values: { name: string }) => {
  return getRow(
    client.query<{ id: number; name: string }>(
      sql`insert into companies (name) values (${values.name}) returning *`,
    ),
  );
};
