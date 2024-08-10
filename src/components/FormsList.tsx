"use client"
import { useStore } from '@/zustand/store'
import React from 'react'
import Text from './Text'
import Link from 'next/link'
import Button from './Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronRight, ChevronsLeftRight, Edit, Edit2, Edit2Icon, Edit3 } from 'lucide-react'
import { database } from '@/utils/appwrite/Appwrite'

type Props = {}

export default function FormsList({}: Props) {

    const router = useRouter()
    const { scriptLoaded, usersForms, setUsersForms, themeStore } = useStore(state => state)
    // console.log(scriptLoaded)

    async function closeSurvey(id: string) {
        setUsersForms(usersForms.map((form: any) => {
            if (form.$id === id) {
                form.isClosed = true
            }
            return form
        }))
        const resp = await database.updateDocument('66a0bb690022ca66f9c3', '66a0bb9e0034dbfdde6d', id, { isClosed: true })
        // if it fails roll back the update 
        // console.log(resp)
        if (!resp) setUsersForms(usersForms.map((form: any) => {
            if (form.$id === id) {
                form.isClosed = false
            }
            return form
        }))

        // update the usersForms

    }

    async function archiveSurvey(id: string) {
        setUsersForms(usersForms.map((form: any) => {
            if (form.$id === id) {
                form.isArchived = true
            }
            return form
        }))
        const resp = await database.updateDocument('66a0bb690022ca66f9c3', '66a0bb9e0034dbfdde6d', id, { isArchived: true })
        // if it fails roll back the update 
        if (!resp) setUsersForms(usersForms.map((form: any) => {
            if (form.$id === id) {
                form.isArchived = true
            }
            return form
        }))
    }


    async function openSurvey(id: string) {
        setUsersForms(usersForms.map((form: any) => {
            if (form.$id === id) {
                form.isClosed = false
            }
            return form
        }))
        const resp = await database.updateDocument('66a0bb690022ca66f9c3', '66a0bb9e0034dbfdde6d', id, { isClosed: false })
        // if it fails roll back the update 
        if (!resp) setUsersForms(usersForms.map((form: any) => {
            if (form.$id === id) {
                form.isClosed = true
            }
            return form
        }))
    }

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
    // console.log(usersForms)
    if (typeof usersForms == 'undefined') {
        return (
            <div className='h-screen flex items-center justify-center'>
                <Text content='loading' tw='text-xl text-center mt-4' />
            </div>
        )
    }
    if (usersForms.filter((form: any) => form.isArchived == false).length == 0) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <Text content='No forms created' tw='text-xl text-center mt-4' />
            </div>
        )
    }
  return (
      <div className='px-3'>
          {usersForms.filter((form: any) => form.isArchived == false).map((survey: any) => {
                return (
                    <div key={survey.$id} style={{ background: window.Telegram.WebApp.themeParams.secondary_bg_color }} className='flex flex-col rounded-lg px-3 py-2 mt-3 shadow-md'>
                        <div className='flex justify-between '>
                            <div>
                                <Text content={survey.title} tw='text-xl ' />
                            </div>
                            <Link href={`/forms/edit/${survey.$id}`}>
                                <Edit className='mt-1' size={19} color={themeStore.hint_color} />
                            </Link>
                        </div>
                        <div className='flex justify-between py-3'>
                            <div className='flex'>
                                <Image src='/profile.webp' alt="Vercel Logo" className='rounded-full' width={33} height={33} />
                                <Image src='/profile.webp' alt="Vercel Logo" className='rounded-full -ml-4' width={33} height={33} />
                                <Image src='/profile.webp' alt="Vercel Logo" className='rounded-full -ml-4' width={33} height={33} />
                            </div>
                            <Text tw=' flex gap-1 items-center text-opacity-30' content={"23 responses"} />
                        </div>
                        {survey.isClosed ?
                            <div>
                                <Button center={false} primary tw='w-full rounded-lg mb-1' title='Open Survey' action={() => openSurvey(survey.$id)} />
                                <Button center={false} primary={false} tw='w-full  rounded-lg ' title='Archive Survey' action={() => archiveSurvey(survey.$id)} />
                            </div>
                            : <Button center={false} primary tw='w-full rounded-lg mt-auto' title='Close Survey' action={() => closeSurvey(survey.$id)} />

                        }
                    </div>
                )
            }
            )}
    </div>
  )

}