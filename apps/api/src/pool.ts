import pg, { PoolClient, QueryResult, QueryResultRow } from 'pg';
import { DATABASE_URL } from './constants.js';
import { MultipleRecordsFound, NoRecordFound } from './exceptions/index.js';

export type DbClient = pg.Pool | pg.PoolClient | pg.Client;

export const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

export const ensureNonZeroRowCount = async (promise: Promise<QueryResult>) => {
  const rowCount = await getRowCount(promise);
  if (rowCount === 0) {
    throw new NoRecordFound();
  }
};

export const getRowCount = async (promise: Promise<QueryResult>) => {
  const { rowCount } = await promise;
  return rowCount;
};

export const getRows = async <T extends QueryResultRow>(
  promise: Promise<QueryResult<T>>,
) => {
  const { rows } = await promise;
  return rows;
};

export function getRow<T extends QueryResultRow>(
  promise: Promise<QueryResult<T>>,
): Promise<T>;
export function getRow<T extends QueryResultRow>(
  promise: Promise<QueryResult<T>>,
  strict: true,
): Promise<T>;
export function getRow<T extends QueryResultRow>(
  promise: Promise<QueryResult<T>>,
  strict: false,
): Promise<T | undefined>;
export async function getRow<T extends QueryResultRow>(
  promise: Promise<QueryResult<T>>,
  strict = true,
) {
  const rows = await getRows(promise);
  if (strict) {
    if (rows.length === 0) {
      throw new NoRecordFound();
    }
    if (rows.length > 1) {
      throw new MultipleRecordsFound();
    }
  }
  return rows[0];
}

export const wrapIntoTransaction = async <T>(
  fn: (client: PoolClient) => Promise<T>,
) => {
  const client = await pool.connect();
  try {
    await client.query('begin');
    const result = await fn(client);
    await client.query('commit');
    return result;
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
};
