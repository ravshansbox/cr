import { sql } from '@ts-safeql/sql-tag';
import { DbClient, ensureNonZeroRowCount } from '../../pool.js';

export const deleteToken = (client: DbClient, values: { id: string }) => {
  return ensureNonZeroRowCount(
    client.query(sql`delete from tokens where token = ${values.id}::uuid`),
  );
};
