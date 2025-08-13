import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  host: process.env.POSTGRES_HOST!,
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DATABASE!,
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(pool);

const journalPath = path.join(process.cwd(), 'drizzle', 'meta', '_journal.json');
if (fs.existsSync(journalPath)) {
  (async () => {
    try {
      await migrate(db, { migrationsFolder: './drizzle' });
      console.log('Migrations applied');
    } catch (e) {
      console.error('Migration step failed:', e);
    }
  })();
} else {
  console.log('No migrations found (skipping migrate). Run `npx drizzle-kit generate` to create them.');
}

async function main() {
  await db.execute(sql`
    create table if not exists "users" (
      id integer generated always as identity primary key,
      name varchar(255) not null,
      age integer not null,
      email varchar(255) not null unique
    );
  `);

  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };
  await db.insert(usersTable).values(user);
  console.log('New user created!')
  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}
main();