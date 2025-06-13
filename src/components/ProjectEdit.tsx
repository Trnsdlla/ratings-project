import { useState } from 'react';
import { Project } from '@/lib/types/project';

export default function ProjectEdit({ project }: { project: Project }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);

    function handleEdit() {
        setIsEditing(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetch('/api/projects/${project.id}', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title , description }),
        });
        setIsEditing(false);
    }

    return (
        <div>
            <button onClick={handleEdit}>Edit</button>
            {isEditing && (
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    )
}