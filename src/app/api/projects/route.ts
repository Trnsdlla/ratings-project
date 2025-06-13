import { NextResponse } from 'next/server';
import { dummyProjects } from '@/lib/data/projects';


export async function GET() {
  return NextResponse.json(dummyProjects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    const newProject = {
      id: dummyProjects.length + 1,
      title: title,
      description: description,
    };

    dummyProjects.push(newProject);
    
    return NextResponse.json({message: 'Project created', project: newProject });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unkown error';
    return NextResponse.json({ error: message });
  }
}