import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const createUser = (
  client: DbClient,
  values: { username: string; password: string; email: string },
) => {
  return getRow(
    client.query<{
      id: number;
      username: string;
      password: string;
      is_verified: boolean;
      email: string;
    }>(
      sql`
        insert into users (username, password, email, is_verified)
        values (${values.username}, ${values.password}, ${values.email}, false)
        returning *
      `,
    ),
  );
};
