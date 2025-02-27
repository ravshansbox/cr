import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const confirm = (
  client: DbClient,
  values: { confirmation_code: string },
) => {
  return getRow(
    client.query<{
      id: number;
      user_id: number;
      confirmation_code: string;
      valid_until: Date;
      is_confirmed: boolean;
    }>(
      sql`update user_registrations set is_confirmed = true where confirmation_code = ${values.confirmation_code}::uuid and valid_until > ${new Date()} and is_confirmed = false returning *`,
    ),
  );
};
