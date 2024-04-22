import { useState, useEffect } from 'react'
import { X, Youtube, Video, Image } from 'lucide-react';
import { DateTime } from 'luxon'

const getYoutubeId = (url) => {
    const regExp =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    const match = url.match(regExp);


    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const formatDate = (date) => {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT, { locale: 'es' });
}



function ContentPreviewCard({ content, handleValidateToken, theme }) {
    return (
        <div onClick={() => handleValidateToken(content, theme)} className='h-[350px] w-full rounded-lg border-2 border-neutral-300 hover:shadow-lg cursor-pointer'>
            <div className='h-[70%] border-b-2 border-gray-300 w-full relative'>
                <figure className='absolute bottom-2 right-0 px-3 py-2 rounded-l-md font-bold text-white z-20 bg-black text-xs'>
                    Autor: <span className='font-thin'>@{content.author.username}</span>
                </figure>
                <figure className='w-full z-10 h-full opacity-30 absolute top-0 bg-slate-700'>

                </figure>
                {content.contentType.type === 'image' &&
                    <img className='h-full w-full object-cover' src={content.url} alt="" />

                }

                {
                    content.contentType.type === 'video-youtube' && getYoutubeId(content.url) ?
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={getYoutubeId(content.url)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        :
                        <img className='h-full w-full object-cover' src={content.coverImage} alt="" />
                }

            </div>
            <div className='h-[30%] w-full flex flex-col px-4 py-4 bg-gray-100'>
                <div className='flex w-full items-center'>
                    <span className='font-bold text-sm text-[#720AF9] mr-auto'>
                        {theme.name}
                    </span>

                    <span className='text-xs'>
                        Publicado: {formatDate(content.createdAt)}
                    </span>
                </div>
                <div className='flex w-full items-center mt-4'>
                    {content.contentType.type === 'video-youtube' && <Youtube />}
                    {content.contentType.type === 'video' && <Video />}
                    {content.contentType.type === 'image' && <Image />}
                    <span className='font-bold text-lg ml-1'>
                        {content.title}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ContentPreviewCard
