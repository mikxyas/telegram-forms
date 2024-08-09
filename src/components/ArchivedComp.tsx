"use client"

import { useStore } from '@/zustand/store'
import { Archive, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


type Props = {}

export default function ArchivedComp({}: Props) {

    const {themeStore} = useStore(state=>state)

  return (
      <div className='fixed mt-auto  flex flex-col justify-center items-center  bottom-0 right-3'>
          <div className='py-2  mb-2.5 cursor-pointer   shadow-sm  px-2 rounded-full' style={{ background: themeStore.secondary_bg_color }}>
              <Archive size={17} color={themeStore.hint_color} />
          </div>
          <Link href='forms/create'>
              <div className='py-4 cursor-pointer px-4 rounded-full' style={{ background: themeStore.button_color }}>
                  <Plus color={themeStore.button_text_color} />
              </div>
          </Link>
    </div>

  )
}