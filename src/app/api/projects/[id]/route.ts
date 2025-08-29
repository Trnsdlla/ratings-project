// import { NextResponse } from 'next/server';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import { eq } from 'drizzle-orm';
// import { projectsTable } from '@/db/schema';

// const pool = new Pool({
//   host: process.env.POSTGRES_HOST!,
//   port: Number(process.env.POSTGRES_PORT || 5432),
//   user: process.env.POSTGRES_USER!,
//   password: process.env.POSTGRES_PASSWORD!,
//   database: process.env.POSTGRES_DATABASE!,
//   ssl: { rejectUnauthorized: false },
// });
// const db = drizzle(pool);

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const rows = await db
//     .select()
//     .from(projectsTable)
//     .where(eq(projectsTable.id, Number(id)));
//   const project = rows[0];
//   if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//   return NextResponse.json(project, { status: 200 });
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const { title, description } = await request.json();
//   const updated = await db
//     .update(projectsTable)
//     .set({ title, description })
//     .where(eq(projectsTable.id, Number(id)))
//     .returning();
//   const project = updated[0];
//   if (!project) return new NextResponse('Not found', { status: 404 });
//   return new NextResponse(JSON.stringify(project));
// }


import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supaBaseServer';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return NextResponse.json({ error: 'invalid id' }, { status: 400 });

  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error?.code === 'PGRST116') return NextResponse.json({ error: 'Not found' }, { status: 404 }); // no rows
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return NextResponse.json({ error: 'invalid id' }, { status: 400 });

  const body = await req.json();
  const patch: Record<string, unknown> = {};
  if (typeof body.title === 'string') patch.title = body.title;
  if (typeof body.description === 'string') patch.description = body.description;
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'no fields to update' }, { status: 400 });
  }

  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('projects')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error?.code === 'PGRST116') return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
