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

export async function GET() {
  return NextResponse.json(dummyProjects);
}