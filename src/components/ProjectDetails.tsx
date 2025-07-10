"use client";

// import { useState } from "react";
import { Project } from "@/lib/types/project";
import { useState } from 'react';
import Image from 'next/image';

type Props = {
    selectedProject: Project;
    onClose: () => void;
    onUpdate: (project: Project) => void;
    // projects: Project[];
    // fetchProjects: () => Promise<void>;
};

export default function ProjectDetails({ selectedProject, onClose, onUpdate }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(selectedProject.title);
    const [description, setDescription] = useState(selectedProject.description);

    function handleEdit() {
        setIsEditing(true);
    }

    async function handleSubmit() {
        await fetch(`/api/projects/${selectedProject.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description }),
        });

        const updatedResponse = await fetch(`/api/projects/${selectedProject.id}`);
        const updated = await updatedResponse.json();

        onUpdate(updated);
        setIsEditing(false);
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>

                <input
                    className="editable-title"
                    value={title}
                    disabled={!isEditing}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSubmit}
                />

                <textarea
                    className="editable-description"
                    value={description}
                    disabled={!isEditing}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleSubmit}
                />

                <button onClick={handleEdit} className="edit-icon-button">
                    <Image
                        src="/icons/edit.png"
                        alt="Edit"
                        width={20}
                        height={20}
                        className="edit-button-img"
                    />
                </button>
            </div>
        </div>
    );
}