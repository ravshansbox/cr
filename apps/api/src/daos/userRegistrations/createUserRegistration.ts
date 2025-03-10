import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const createUserRegistration = (
  client: DbClient,
  values: { user_id: number; confirmation_code: string; valid_until: Date },
) => {
  return getRow(
    client.query<{
      id: number;
      user_id: number;
      confirmation_code: string;
      valid_until: Date;
      is_confirmed: boolean;
    }>(
      sql`insert into user_registrations (user_id, confirmation_code, valid_until) values (${values.user_id}, ${values.confirmation_code}::uuid, ${values.valid_until}) returning *`,
    ),
  );
};
