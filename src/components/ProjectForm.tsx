'use client'

import { useState } from 'react';

export default function ProjectForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create project');

            setTitle('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder='Project Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
                <textarea 
                placeholder='Project Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}