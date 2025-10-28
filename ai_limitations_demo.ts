// --- DEMO SCRIPT 2: SHOWCASING AI LIMITATIONS ---
// This file contains code that is correct but may be flagged by AI tools,
// or code designed to elicit misleading "hallucinations" from AI assistants.

// ---------------------------------------------------------------------------
// SCENARIO 1: The "False Positive" - Code That Looks Wrong But Is Correct
// ---------------------------------------------------------------------------

/**
 * Processes an ID that can be a string, null, or undefined.
 * This function demonstrates a common JavaScript/TypeScript idiom that
 * simple linters and AI tools often flag as an error.
 *
 * @param id The identifier to process.
 */
export function processOptionalValue(id: string | null | undefined) {
  // THE DEMO POINT:
  // An AI tool will likely flag `== null` and suggest using `=== null || === undefined`.
  // However, `== null` is a deliberate and well-known idiom to check for both
  // null and undefined at the same time, which is exactly what we want here.
  // This is a "false positive" because the AI misses the developer's intent.
  if (id == null) {
    console.log('Value is either null or undefined. Skipping.');
    return;
  }

  // The rest of the function assumes `id` is a string.
  console.log(`Processing ID: ${id.toUpperCase()}`);
}


// ---------------------------------------------------------------------------
// SCENARIO 2: The "Lacking Context" Hallucination - A Correct Suggestion That Breaks Everything
// ---------------------------------------------------------------------------

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const userList: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
];

/**
 * A higher-order function that logs the index and result of a transformation.
 * This function provides the "hidden context" that the AI will not have.
 */
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
  // THE DEMO POINT:
  // An AI tool looking at the line below will see that the `index` and `arr`
  // parameters are "unused" inside the arrow function's body.
  // It will confidently suggest you remove them to clean up the code, like this:
  //   logTransformation(userList, (user) => ({ userName: user.name }));
  //
  // This is a HALLUCINATION based on incomplete context. The AI doesn't realize
  // that the `logTransformation` function *itself* relies on the full signature
  // of the map callback. Accepting the AI's suggestion would cause the higher-order
  // function to fail or behave unexpectedly if it needed the index.
  const transformedUsers = logTransformation(
    userList,
    (user, index, arr) => {
      return { userName: user.name };
    }
  );

  return transformedUsers;
}


// ---------------------------------------------------------------------------
// SCENARIO 3: The "Pure Hallucination" - Inventing Non-Existent Code
// ---------------------------------------------------------------------------

import { Pool } from 'pg'; // Assuming 'pg' library from the previous demo

/**
 * A class designed to elicit a "pure hallucination" from an AI assistant.
 */
export class DataBackupService {
  private dbPool: Pool;

  constructor(pool: Pool) {
    this.dbPool = pool;
  }

  /**
   * Creates a backup of the users table.
   */
  async backupUsers() {
    // THE DEMO POINT:
    // This is where you interact with the AI assistant (Copilot/Gemini) live.
    // Highlight the entire function body or just the comment below and ask:
    // "How can I make this backup process more efficient using streams?"
    //
    // An AI assistant might "hallucinate" a solution by inventing methods or libraries
    // that sound plausible but DO NOT EXIST. For example, it might suggest:
    //
    // - `this.dbPool.streamQuery('SELECT * FROM users', ...)` (the `pg` library has no `streamQuery` method)
    // - Using a non-existent `pg-stream-json` library.
    // - `const stream = client.query(new StreamableQuery('...'))` (inventing a `StreamableQuery` class)
    //
    // This demonstrates that while the AI understands the *concept* (streaming),
    // it can fail on the specific implementation details, misleading the developer.

    const client = await this.dbPool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      console.log('Backup complete.', result.rows);
      // TODO: Refactor this to use database streams for better memory management on large tables.
    } finally {
      client.release();
    }
  }
}