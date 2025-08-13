import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { projectsTable } from '@/db/schema';

const pool = new Pool({
  host: process.env.POSTGRES_HOST!,
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DATABASE!,
  ssl: { rejectUnauthorized: false },
});
const db = drizzle(pool);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, Number(id)));
  const project = rows[0];
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { title, description } = await request.json();
  const updated = await db
    .update(projectsTable)
    .set({ title, description })
    .where(eq(projectsTable.id, Number(id)))
    .returning();
  const project = updated[0];
  if (!project) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(JSON.stringify(project));
}