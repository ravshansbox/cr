import { sql } from '@ts-safeql/sql-tag';
import { DbClient } from '../../pool.js';

export const setUserVerified = (client: DbClient, values: { id: number }) => {
  return client.query(
    sql`update users set is_verified = true where id = ${values.id}`,
  );
};
