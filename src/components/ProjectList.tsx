'use client'

import { useState } from "react";
import { Project } from '@/lib/types/project';
import ProjectEdit from '@/components/ProjectEdit';

type Props = {
    projects: Project[];
    fetchProjects: () => Promise<void>;
}

export default function ProjectList({ projects, fetchProjects }: Props) {
    const [showAllProjects, setShowAllProjects] = useState(false);
    // const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    async function handleClick() {
        if (!showAllProjects) await fetchProjects();
        setShowAllProjects(isVisible => !isVisible)
    }

    return (
        <div className="project-grid">
            <div className="all-projects-button">
                <button onClick={handleClick}>All Projects</button>
            </div>
            <div className='all-projects-container'>
                {showAllProjects && (
                    <div className="project-container">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                <h2 className="project-card-title">{project.title}</h2>
                                <p className="project-card-description">{project.description}</p>
                                <ProjectEdit project={project} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// UNSURE => div being returned with no class name + subsequent divs 