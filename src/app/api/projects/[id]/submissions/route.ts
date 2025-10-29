export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supaBaseServer';

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = Number(id);

    if (Number.isNaN(projectId)) {
        return NextResponse.json({ error: 'invalid project id' }, { status: 400 });
    }

    const supabase = supabaseServer();
    const { data, error } = await supabase
        .from('submissions')
        .select('id,project_id,content,author,created_at')
        .eq('project_id', projectId)
        .order('id', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? [], { status: 200 });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = Number(id);

    if (Number.isNaN(projectId)) {
        return NextResponse.json({ error: 'invalid project id' }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const content = typeof body.content === 'string' ? body.content.trim() : '';

    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from('submissions')
        .insert([{ project_id: projectId, content }])
        .select('id,project_id,content,created_at')
        .single();

    if (error) {
        return NextResponse.json(
            { error: error.message, code: (error as any).code, details: (error as any).details, hint: (error as any).hint },
            { status: 500 }
        );
    }
    return NextResponse.json(data, { status: 201 });
}