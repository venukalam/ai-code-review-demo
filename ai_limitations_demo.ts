
export function processOptionalValue(id: string | null | undefined) {
  if (id == null) {
    console.log('Value is either null or undefined. Skipping.');
    return;
  }

  console.log(`Processing ID: ${id.toUpperCase()}`);
}

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const userList: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
];

function logTransformation<T, U>(
  items: T[],
  transformer: (item: T, index: number, array: T[]) => U
) {
  console.log('Starting transformation log:');
  const results = items.map(transformer);
  results.forEach((result, index) => {
    console.log(`- Item at index ${index} transformed to:`, result);
  });
  return results;
}

export function demoLackingContext() {
  const transformedUsers = logTransformation(
    userList,
    (user, index, arr) => {
      return { userName: user.name };
    }
  );

  return transformedUsers;
}



import { Pool } from 'pg';

export class DataBackupService {
  private dbPool: Pool;

  constructor(pool: Pool) {
    this.dbPool = pool;
  }

  async backupUsers() {

    const client = await this.dbPool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      console.log('Backup complete.', result.rows);
    } finally {
      client.release();
    }
  }
}