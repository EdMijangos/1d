// src: https://zenn.dev/catnose99/articles/19a05103ab9ec7#spinner-%E3%81%9D%E3%81%AE2
export default function Loader() {
    return (
        <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
    )
}