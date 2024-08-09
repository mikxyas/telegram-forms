"use client"

import { useStore } from '@/zustand/store'
import { Archive } from 'lucide-react'
import React from 'react'


type Props = {}

export default function ArchivedComp({}: Props) {

    const {themeStore} = useStore(state=>state)

  return (
    <div>
    <div className='py-3  absolute bottom-0 right-3 px-3 rounded-full' style={{background: themeStore.section_separator_color}}>
        <Archive color={themeStore.hint_color}/>
      </div>
    </div>

  )
}