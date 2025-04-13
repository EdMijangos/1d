import Image from "next/image";

interface RepoResultCardProps {
    avatar: string,
    repoName: string
}

export default function RepoResultCard({avatar, repoName} : RepoResultCardProps) {
    return (
        <div className="rounded-md cursor-pointer border border-[#3d444db3] p-6 flex items-center">
            <Image
                src={avatar}
                width={100}
                height={100}
                alt="ユーザーのアイコン"
                className="rounded-full"
            />
            <p className="ml-10 text-[#9198a1] font-bold">{repoName}</p>
        </div>
    )
}