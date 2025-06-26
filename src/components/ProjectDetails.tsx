"use client";

import { useState } from "react";
import { Project } from "@/lib/types/project";
import ProjectEdit from "@/components/ProjectEdit";

type Props = {
    projects: Project[];
    fetchProjects: () => Promise<void>;
};

export default function ProjectDetails({ projects, fetchProjects }: Props) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    async function handleProjectSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const id = e.target.value;

        if (!id) {
            setSelectedProject(null);
            return;
        }

        try {
            const response = await fetch(`/api/projects/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch project");
            }
            const projectData = await response.json();
            setSelectedProject(projectData);
        } catch (error) {
            console.error("Failed to fetch single project:", error);
        }
    }

    return (
        <div>
            <label htmlFor="project-select">View Project:</label>
            <select
                id="project-select"
                onChange={handleProjectSelect}
                onClick={fetchProjects}
            >
                <option value="">Select a Project</option>
                {projects.map((project) => (
                    <option value={project.id} key={project.id}>
                        {project.title}
                    </option>
                ))}
            </select>
            <div className="project-container">
                {selectedProject && (
                    <div className="project-card">
                        <h2 className="project-card-title">{selectedProject.title}</h2>
                        <p className="project-card-description">
                            {selectedProject.description}
                        </p>
                        <ProjectEdit project={selectedProject} />
                    </div>
                )}
            </div>
        </div>
    );
}


// div project card placed into the map method, it removed the red underline for project