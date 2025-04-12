'use client'
import { useRouter } from 'next/navigation'

interface TitleBarProps {
    title: string, 
    redirUrl: string
}

export default function TitleBar({title, redirUrl} : TitleBarProps) {
    const router = useRouter();

    return (
        <div className="sticky top-0 items-center min-w-full bg-white" onClick={() => router.push(redirUrl)}>
            <p className="font-bold p-8 cursor-pointer">{title}</p>
        </div>
    );
}