'use client'

import { useState } from 'react';
import ProjectList from '@/components/ProjectList';
import ProjectDetails from '@/components/ProjectDetails';
import { Project } from '@/lib/types/project';
import ProjectForm from '@/components/ProjectForm';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    async function fetchProjects() {
        try {
            const response = await fetch('/api/projects');
            if(!response.ok) {
                throw new Error ('Failed to fetch projects')
            }
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    }

    return (
        <div>
            <h1>Projects</h1>
            <ProjectList projects={projects} fetchProjects={fetchProjects}/>
            <ProjectDetails projects={projects} fetchProjects={fetchProjects}/>
            <ProjectForm />
        </div>
    )
}