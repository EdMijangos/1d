'use client'

interface ButtonProps {
    text: string,
    onClick: () => {}
}

export default function Button({text, onClick} : ButtonProps) {
    const textFormat = "text-center text-white font-bold";
    const padding = "px-5 py-2";
    const effects = "hover:brightness-110 active:brightness-120";
    const baseButton = "bg-[#347d39] rounded-md cursor-pointer"

    const style = `${baseButton} ${padding} ${textFormat} ${effects}`

    return (
        <button className={style} onClick={onClick}>
            {text}
        </button>
    )
}