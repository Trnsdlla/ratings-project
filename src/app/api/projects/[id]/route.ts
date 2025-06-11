import { NextResponse } from 'next/server';
import { dummyProjects } from '@/lib/data/projects';

  export async function GET(
    request: Request, 
    { params }: { params: { id: string } }) {
        const project = dummyProjects.find(p => p.id === Number(params.id));

        if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json(project, { status: 200 });
    }