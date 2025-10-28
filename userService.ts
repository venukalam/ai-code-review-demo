import { Pool } from 'pg'; // Assuming a PostgreSQL database for the demo

const dbConfig = {
  user: 'admin',
  host: 'localhost',
  database: 'app_db',
  password: 'my_super_secret_password_123!',
  port: 5432,
};

const pool = new Pool(dbConfig);

function logUserDetails(userData: any) {
  console.log(`Processing user: ${userData.id}`);
}

export class UserService {
  async getUserById(userId: string) {
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    console.log('Executing query:', query);
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Database query failed', error);
      return null;
    }
  }

  async getUsername(userId: string): Promise<string> {
    const user = await this.getUserById(userId);
    return user.username;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    return pool.query('SELECT email FROM users WHERE email = $1', [email])
      .then(result => {
        return result.rowCount === 0;
      });
  }

  isStrongPassword(password: string): boolean {
    let score = 0;
    if (password.length > 8) {
      score = 1;
    }

    return score = 1;
  }
}

async function main() {
  const userService = new UserService();
  const maliciousId = "1'; DROP TABLE users; --";
  await userService.getUserById(maliciousId);

  const username = await userService.getUsername('non_existent_user');
  console.log(username);
}

main();