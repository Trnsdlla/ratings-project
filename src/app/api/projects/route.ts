// console.log('start')
// import { NextResponse } from 'next/server';
// import { projectsTable } from '@/db/schema';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// console.log('packages', projectsTable, drizzle, Pool);





// // const pool = new Pool({
// //   host: process.env.POSTGRES_HOST!,
// //   port: Number(process.env.POSTGRES_PORT || 5432),
// //   user: process.env.POSTGRES_USER!,
// //   password: process.env.POSTGRES_PASSWORD!,
// //   database: process.env.POSTGRES_DATABASE!,
// //   ssl: { rejectUnauthorized: false },
// // });





// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient('https://gjnufxsbbffycbpymbkn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbnVmeHNiYmZmeWNicHltYmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMzg2MzEsImV4cCI6MjA3MDYxNDYzMX0.m8vCPD73Gt4E5K5fTy1oDJLUJSjROiy-hpHvlX9TLCA')




// // console.log('pool', pool)
// // const db = drizzle(pool);
// // console.log('db', db);







// export async function GET() {
//   try {
//     const { data, error } = await supabase
//       .from('projects')
//       .select()
//     console.log('error', error);
//     console.log('data', data);





//     // console.log('project loaded')
//     // const rows = await db.select().from(projectsTable);
//     // console.log('rows', rows)





//     return NextResponse.json(data, { status: 200 });
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { title, description } = await request.json();

//     if (!title || !description) {
//       return NextResponse.json({ error: 'title and description are required' }, { status: 400 });
//     }







//     // const inserted = await db
//     //   .insert(projectsTable)
//     //   .values({ title, description })
//     //   .returning();

//     // return NextResponse.json(inserted[0], { status: 201 });






//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }


// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      `Missing env: ${!url ? 'SUPABASE_URL ' : ''}${!key ? 'SUPABASE_ANON_KEY' : ''}`.trim()
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

// GET /api/projects
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      // Typical causes: RLS blocking, table doesn’t exist
      return NextResponse.json(
        { error: error.message, hint: 'Check RLS policies and table name.' },
        { status: 500 }
      );
    }
    return NextResponse.json(data ?? [], { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    if (!title || !description) {
      return NextResponse.json(
        { error: 'title and description are required' },
        { status: 400 }
      );
    }
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('projects')
      .insert([{ title, description }])
      .select()
      .single();

    if (error) {
      // Also commonly RLS
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}


console.log('SUPABASE_URL', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY', process.env.SUPABASE_ANON_KEY?.slice(0, 10)); // just first 10 chars