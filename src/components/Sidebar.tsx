import Link from "next/link"

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button onClick={onClose} className="close-btn">x</button>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/projects">Projects</Link></li>
            </ul>
        </div>
    )
}