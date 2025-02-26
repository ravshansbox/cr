import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const selectById = (client: DbClient, values: { id: number }) => {
  return getRow(
    client.query<{
      id: number;
      username: string;
      password: string;
      is_verified: boolean;
      email: string;
    }>(sql`select * from users where id = ${values.id}`),
  );
};
