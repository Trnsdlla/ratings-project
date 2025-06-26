'use client'

import { Project } from '@/lib/types/project';

type Props = {
    projects: Project[];
    fetchProjects: () => Promise<void>;
    setSelectedProject: (project: Project) => void;
}

export default function ProjectList({ projects, setSelectedProject }: Props) {

    return (
        <div className="project-grid">
            <div className='all-projects-container'>
                <div className="project-container">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
                            <h2 className="project-card-title">{project.title}</h2>
                            <p className="project-card-description">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// UNSURE => div being returned with no class name + subsequent divs 