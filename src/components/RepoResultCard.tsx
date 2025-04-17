import Image from "next/image";

interface RepoResultCardProps {
    avatar: string,
    repoName: string,
    onClick: () => void
}

export default function RepoResultCard({avatar, repoName, onClick} : RepoResultCardProps) {
    const imgUrl = avatar?.trim() ? avatar : '/next.svg';

    return (
        <div 
            onClick={onClick}
            className="rounded-md cursor-pointer border border-[#3d444db3] p-6 flex items-center">
            <Image
                src={imgUrl}
                width={100}
                height={100}
                alt="ユーザーのアイコン"
                className="rounded-full"
            />
            <p className="ml-10 font-bold">{repoName}</p>
        </div>
    )
}