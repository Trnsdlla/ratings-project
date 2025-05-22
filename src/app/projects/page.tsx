'use client'

import { useEffect, useState } from 'react';

type Project = {
        id: number;
        title: string;
        description: string;
    };

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    function handleShowAllProjects() {
        setShowAllProjects(!showAllProjects);
    };

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                setProjects(data);
            } catch(error) {
                console.error('Failed to fetch projects', error)
            }
        };

        fetchProjects();
    }, []);

    async function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const id = e.target.value;
        
        if (!id) {
            setSelectedProject(null);
            return;
        }

        try {
            const response = await fetch(`/api/projects/${id}`);
            const data = await response.json(); 
            setSelectedProject(data);
        } catch (error) {
            console.error("Failed to fetch single project:", error)
        }
    }

    return (
        <div>
            <h1>Projects</h1>
            <button onClick={handleShowAllProjects}>All Projects</button>
            <div className='all-projects-container'>
                {showAllProjects && (
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id}>
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <select onChange={handleSelect}>
                <option value="">Select a Project</option>
                {projects.map(project => (
                    <option value={project.id} key={project.id}>{project.title}</option>
                ))}
            </select>

            {selectedProject && (
                <div>
                    <h2>{selectedProject.title}</h2>
                    <p>{selectedProject.description}</p>
                </div>
            )}
        </div>
    )
}