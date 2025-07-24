'use client'

import { useState } from 'react';

type Props = {
    onClose: () => void;
    onCreated: () => void;
};

export default function NewProjectModal({ onClose, onCreated }: Props) {
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
            
            onCreated();
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Project Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>

        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" 
        //         placeholder='Project Title'
        //         value={title}
        //         onChange={(e) => setTitle(e.target.value)}
        //         required
        //         />
        //         <textarea 
        //         placeholder='Project Description'
        //         value={description}
        //         onChange={(e) => setDescription(e.target.value)}
        //         required
        //         />
        //         <button type="submit">Submit</button>
        //     </form>
        // </div>
    );
}