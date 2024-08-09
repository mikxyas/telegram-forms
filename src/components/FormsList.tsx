"use client"
import { useStore } from '@/zustand/store'
import React from 'react'
import Text from './Text'
import Link from 'next/link'
import Button from './Button'
import { useRouter } from 'next/navigation'

type Props = {}

export default function FormsList({}: Props) {

    const router = useRouter()
    const {scriptLoaded, usersForms} = useStore(state=>state)
    // console.log(scriptLoaded)
    if(!scriptLoaded){
        return (
            <div className=''>
                Loading...
            </div>
        )
    }

    if(typeof window.Telegram === 'undefined') return (
        <div className=''>
            Not using telegram
        </div>
    )
console.log(usersForms)
  return (
    <div>
       {usersForms.length > 0 && usersForms.map((survey: any) => {
                return (
                    <div key={survey.$id} style={{ background: window.Telegram.WebApp.themeParams.secondary_bg_color }} className='h-56 flex flex-col rounded-lg px-3 py-2 mt-3 shadow-md'>
                        <Link href={`/forms/edit/${survey.$id}`}>
                            <Text  content={survey.title} tw='text-2xl font-bold'/>
                            {/* <p>{survey.description}</p> */}
                            <Text tw=' flex gap-1 items-center text-opacity-30' content={"33 responses"} />
                          
                        </Link>
                        <Button tw='w-full rounded-lg mt-auto' title='Close Survey' action={() => router.push(`/forms/view/${survey.$id}`)} />
                    </div>
                )
            }
            )}
    </div>
  )

}