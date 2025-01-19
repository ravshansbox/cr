import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const createUser = (
  client: DbClient,
  values: { username: string; password: string },
) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`
        insert into users (username, password)
        values (${values.username}, ${values.password})
        returning *
      `,
    ),
  );
};
