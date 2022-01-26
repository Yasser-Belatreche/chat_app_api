import { Pool } from "pg";

const pool = new Pool();

const DB = {
  query: (query: string, values?: any[]) => pool.query(query, values),
  getCient: () => pool.connect(),
};

export { DB };
