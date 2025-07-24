import { NextResponse } from 'next/server';
import { dummyProjects } from '@/lib/data/projects';

  export async function GET(
    request: Request, 
    { params }: { params: { id: string } }) {
        const project = dummyProjects.find(p => p.id === Number(params.id));

        if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json(project, { status: 200 });
    }

    export async function PUT(
      request: Request,
      { params }: { params: { id: string }}) {
      const { title, description } = await request.json();

      const project = dummyProjects.find(p => p.id === Number(params.id));

      if (!project) return new NextResponse("Not found", { status: 404 });

      project.title = title;
      project.description = description;

      return new NextResponse(JSON.stringify(project));
    }