"use client"

import { useStore } from '@/zustand/store'
import React from 'react'


type Props = {
    children: React.ReactNode
}

export default function MainContainer({children}: Props) {
    const {themeStore} = useStore(state=>state)
  return (
    <main style={{background: themeStore.bg_color}} className="flex flex-col items-center justify-center min-h-screen py-2">
        {children}
    </main>
  )
}