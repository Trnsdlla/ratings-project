import { NextResponse } from 'next/server';
import { dummyProjects } from '@/lib/data/projects';


export async function GET() {
    return NextResponse.json(dummyProjects);
}

