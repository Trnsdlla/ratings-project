'use client'

import { useState } from "react";
import { Project } from '@/lib/types/project';

type Props = {
    projects: Project[];
    fetchProjects: () => Promise<void>;
}

export default function ProjectList({ projects, fetchProjects }: Props) {
    const [showAllProjects, setShowAllProjects] = useState(false);

    async function handleClick() {
        if(!showAllProjects) await fetchProjects();
        setShowAllProjects(isVisible => !isVisible)
    }

    return (
        <div>
            <div className="all-projects-button">
                <button onClick={handleClick}>All Projects</button>
            </div>
            <div className='all-projects-container'>
                {showAllProjects && (
                    <div>
                        {projects.map((project) => (
                            <div key={project.id}>
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// UNSURE => div being returned with no class name + subsequent divs 