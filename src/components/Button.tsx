import { useStore } from '@/zustand/store'
import React from 'react'

type Props = {
    title: string,
    action: () => void,
    tw?: any
}

export default function Button({ title, action, tw }: Props) {
    const {themeStore} = useStore(state=>state)
    return (
        <button onClick={() => action()} style={{ background: themeStore.button_color, }} className={`px-3 ${tw} py-2  self-center mt-3  border-opacity-40 `}>
            <p style={{ color: themeStore.button_text_color }} className="text-center font-semibold text-lg ">{title}</p>
        </button>
    )
}