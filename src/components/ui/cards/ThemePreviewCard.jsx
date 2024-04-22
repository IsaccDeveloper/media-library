import { useState, useEffect } from 'react'
import { X, Youtube, Video, Image } from 'lucide-react';
import { DateTime } from 'luxon'

const formatDate = (date) => {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT, { locale: 'es' });
}



function ThemePreviewCard({ theme }) {
    return (
        <div className='h-[350px] w-full rounded-lg border-2 border-neutral-300'>
            <div className='h-[70%] border-b-2 border-gray-300 w-full relative'>
                <figure className='absolute bottom-2 right-0 px-3 py-2 rounded-l-md font-bold text-white z-20 bg-black text-xs'>
                    Autor: <span className='font-thin'>@{theme?.author?.username}</span>
                </figure>
                <figure className='w-full z-10 h-full opacity-30 absolute top-0 bg-slate-700'>

                </figure>
                <img className='h-full w-full object-cover' src={theme.image} alt="" />
            </div>
            <div className='h-[30%] w-full flex flex-col px-4 py-4 bg-gray-100'>
                <div className='flex w-full flex-col h-full'>
                    <span className='font-bold text-sm text-[#720AF9]'>
                        {theme.name}
                    </span>

                    <div className='flex w-full justify-end items- mt-auto'>
                        <span className='text-xs'>
                            Publicado: {formatDate(theme.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemePreviewCard
