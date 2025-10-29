"use client";

// import { useState } from "react";
import { Project } from "@/lib/types/project";
import { useState } from 'react';
import Image from 'next/image';
import { Submission } from "@/lib/types/submission";
import { useEffect } from 'react';

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

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [newContent, setNewContent] = useState('');

    // useEffect(() => {
    //     let alive = true;
    //     (async () => {
    //         const res = await fetch(`/api/projects/${selectedProject.id}/submissions`);
    //         if (!alive) return;
    //         if (res.ok) {
    //             const data = await res.json();
    //             setSubmissions(data); // [] is fine
    //         } else {
    //             console.error('Failed to load submissions:', res.status);
    //         }
    //     })();
    //     return () => { alive = false; };
    // }, [selectedProject.id]);


    useEffect(() => {
        async function fetchSubs() {
            const res = await fetch(`/api/projects/${selectedProject.id}/submissions`);
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            } else {
                const body = await res.json().catch(() => ({}));
                console.error('Failed to load submissions', res.status, body);
            }
        }
        fetchSubs();
    }, [selectedProject.id]);

    async function handleSubmissionSubmit(e?: React.FormEvent) {
        if (e) e.preventDefault();
        if (!newContent.trim()) return;

        const res = await fetch(`/api/projects/${selectedProject.id}/submissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newContent })
        });

        if (res.ok) {
            const now = new Date().toISOString();
            setSubmissions(prev => [
                { id: Date.now(), project_id: selectedProject.id, content: newContent, created_at: now } as any,
                ...prev,
            ]);
            setNewContent('');
        } else {
            const body = await res.json().catch(() => ({}));
            console.error('Failed to load submissions', res.status, body);


        }
    }


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
            <div className="modal-container">
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
                <div className='modal-submissions'>
                    <h3 className="submission-title">Submissions</h3>

                    {submissions.length === 0 ? (
                        <div className="submissions-empty">No submissions yet</div>
                    ) : (
                        <ul className="submissions-list">
                            {submissions.map((s) => (
                                <li key={s.id} className="submission-item">
                                    <div className="submission-content">{s.content}</div>
                                    <div className="submission-meta">
                                        {new Date(s.created_at).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <form onSubmit={handleSubmissionSubmit} className="submission-form">
                        <textarea
                            placeholder="Create a submission"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            rows={3}
                            required
                            className="submission-input"
                        />
                        <button type="submit" className="submission-button">
                            Submit
                        </button>
                    </form>

                </div>
            </div>
        </div >
    );
}