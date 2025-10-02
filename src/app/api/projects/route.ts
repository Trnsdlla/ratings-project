import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supaBaseServer';

export const runtime = 'nodejs';

export async function GET() {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false });


  if (error) {
    console.error('[supabase error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? [], { status: 200 });
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  if (!title || !description) {
    return NextResponse.json({ error: 'title and description are required' }, { status: 400 });
  }

  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('projects')
    .insert([{ title, description }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}








// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// const TAG = '[api/projects GET]';

// console.log('[api/projects] url raw:', JSON.stringify(process.env.SUPABASE_URL));
// console.log('[api/projects] url len:', process.env.SUPABASE_URL?.length);


// function getSupabase() {
//   const url = process.env.SUPABASE_URL;
//   const key = process.env.SUPABASE_ANON_KEY;
//   if (!url || !key) {
//     throw new Error(
//       `Missing env: ${!url ? 'SUPABASE_URL ' : ''}${!key ? 'SUPABASE_ANON_KEY' : ''}`.trim()
//     );
//   }
//   return createClient(url, key, { auth: { persistSession: false } });
// }


// export async function GET() {
//   console.log(TAG, 'client created');
//   try {
//     const supabase = getSupabase();
//     console.log(TAG, 'query start: projects/select')
//     const { data, error } = await supabase
//       .from('projects')
//       .select('*')
//       .order('id', { ascending: false });
//     if (error) {
//       // Typical causes: RLS blocking, table doesn’t exist
//       return NextResponse.json(
//         { error: error.message, hint: 'Check RLS policies and table name.' },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(data ?? [], { status: 200 });
//   } catch (e: unknown) {
//     const err = e as any;
//     console.error('[api/projects GET] thrown error ->', {
//       name: err?.name,
//       message: err?.message,
//       cause: err?.cause,
//       stack: err?.stack,
//     });
//     return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
//   }
// }


// export async function POST(request: Request) {
//   try {
//     const { title, description } = await request.json();
//     if (!title || !description) {
//       return NextResponse.json(
//         { error: 'title and description are required' },
//         { status: 400 }
//       );
//     }
//     const supabase = getSupabase();
//     const { data, error } = await supabase
//       .from('projects')
//       .insert([{ title, description }])
//       .select()
//       .single();

//     if (error) {
//       // Also commonly RLS
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json(data, { status: 201 });
//   } catch (e: any) {
//     return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
//   }
// }


// console.log('SUPABASE_URL', process.env.SUPABASE_URL);
// console.log('SUPABASE_ANON_KEY', process.env.SUPABASE_ANON_KEY?.slice(0, 10));