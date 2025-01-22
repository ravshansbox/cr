import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRows } from '../../pool.js';

export const selectByUserId = (
  client: DbClient,
  values: { user_id: number },
) => {
  return getRows(
    client.query<{ id: number; token: string; user_id: number }>(
      sql`select * from tokens where user_id = ${values.user_id}`,
    ),
  );
};
