import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const projectsTable = pgTable('projects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }).notNull(),
});

export const submissionsTable = pgTable('submissions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  project_id: integer().notNull(),
  content: varchar({ length: 2000 }).notNull(),
  author: varchar({ length: 255 })
})

// ^^ default, change submissions?