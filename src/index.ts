import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { usersTable, projectsTable } from './db/schema';
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

//commenting out for now bc we already put stuff in database (SEED FILE)

// const journalPath = path.join(process.cwd(), 'drizzle', 'meta', '_journal.json');
// if (fs.existsSync(journalPath)) {
//   (async () => {
//     try {
//       await migrate(db, { migrationsFolder: './drizzle' });
//       console.log('Migrations applied');
//     } catch (e) {
//       console.error('Migration step failed:', e);
//     }
//   })();
// } else {
//   console.log('No migrations found (skipping migrate). Run `npx drizzle-kit generate` to create them.');
// }

async function main() {
  // await db.execute(sql`
  //   create table if not exists "users" (
  //     id integer generated always as identity primary key,
  //     name varchar(255) not null,
  //     age integer not null,
  //     email varchar(255) not null unique
  //   );
  // `);

  // await db.execute(sql`
  //   create table if not exists "projects" (
  //     id integer generated always as identity primary key,
  //     title varchar(255) not null,
  //     description varchar(1000) not null
  //   );
  // `);

  // const randomEmailChar = Math.round(Math.random() * 1000)
  // const user: typeof usersTable.$inferInsert = {
  //   name: 'John',
  //   age: 30,
  //   email: `john${randomEmailChar}@example.com`,
  // };
  // await db.insert(usersTable).values(user);
  // console.log('New user created!')

  // const projects: typeof projectsTable.$inferInsert[] = [
  //   { title: 'Build a Rocket', description: 'Design a simple space rocket.' },
  //   { title: 'Make a Logo', description: 'Create a logo for a tech company.' },
  //   { title: 'Plan a Workshop', description: 'Draft agenda for a career group session.' },
  // ];
  // // Check existing projects by title
  // const existingProjects = await db.select().from(projectsTable);
  // const existingTitles = new Set(existingProjects.map(p => p.title));
  // const newProjects = projects.filter(p => !existingTitles.has(p.title));
  // if (newProjects.length > 0) {
  //   await db.insert(projectsTable).values(newProjects);
  //   console.log(`New projects created! count=${newProjects.length}`);
  // } else {
  //   console.log('No new projects added (all titles already exist).');
  // }

  // const allProjects = await db.select().from(projectsTable);
  // console.log('Projects in DB:', allProjects);

  // const users = await db.select().from(usersTable);
  // console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
  // await db
  //   .update(usersTable)
  //   .set({
  //     age: 31,
  //   })
  //   .where(eq(usersTable.email, user.email));
  // console.log('User info updated!')
  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log('User deleted!')
}
main();