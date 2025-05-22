import { NextResponse } from 'next/server';

const dummyProjects = 
[
    {   id: 1, 
        title: "Build a Rocket", 
        description: "Design a simple space rocket." 
    },
    {   id: 2, 
        title: "Make a Logo", 
        description: "Create a logo for a tech company." 
    },
  ];

  export async function GET(
    request: Request, 
    { params }: { params: { id: string } }) {
        const project = dummyProjects.find(p => p.id === Number(params.id));

        if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json(project, { status: 200 });
    }