'use client'

import { useState, useEffect } from 'react';
import ProjectList from '@/components/ProjectList';
import ProjectDetails from '@/components/ProjectDetails';
import { Project } from '@/lib/types/project';
import Image from 'next/image'
import NewProjectModal from '@/components/NewProjectModal';


export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);


    async function fetchProjects() {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                const body = await response.text(); // <-- see real reason
                console.error('GET /api/projects failed:', response.status, body);
                throw new Error('Failed to fetch projects')
            }
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <div className='projects-header-temporary'>
                <h2 className='projects-title'>Projects</h2>
                <button onClick={() => setShowAddModal(true)} className="add-project-button">
                    <Image
                        src="/icons/add-project.svg"
                        alt="Add Project"
                        width={24}
                        height={24}
                        className="add-project-img"
                    />
                </button>
            </div>

            <ProjectList
                projects={projects}
                fetchProjects={fetchProjects}
                setSelectedProject={setSelectedProject}
            />

            {selectedProject && (
                <ProjectDetails
                    selectedProject={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    onUpdate={(updated) => {
                        setSelectedProject(updated)
                        setProjects((previous) =>
                            previous.map((p) => (p.id === updated.id ? updated : p))
                        )
                    }}
                />
            )}

            {showAddModal && (
                <NewProjectModal
                    onClose={() => setShowAddModal(false)}
                    onCreated={fetchProjects}
                />
            )}
        </div>
    )
}