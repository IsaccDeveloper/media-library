import { useState, useEffect } from 'react'
import { X, Youtube, Video, Image, Pencil } from 'lucide-react';



function ContentCard({ content, closeForm, themes }) {
    const getYoutubeId = (url) => {
        const regExp =
            /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

        const match = url.match(regExp);

        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    }

    const getTheme = (theme) => {
        const themeIndex = themes.findIndex(theme_item => theme_item._id === theme)

        if (themeIndex !== -1) {
            return themes[themeIndex].name
        } else return ''
    }
    return (
        <div className='h-full w-full md:h-[80%] md:w-[50%] bg-white z-50 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-none md:rounded-lg px-6 py-4'>
            <div className='w-full flex justify-end items-center mb-6'>
                <X className='cursor-pointer' onClick={closeForm} />
            </div>
            <div className='w-full flex items-center'>
                <div className='flex flex-col'>
                    <div className='flex items-center'>
                        <h1 className='text-gray-950 font-bold text-2xl text-center mr-4'>
                            {`${getTheme(content.theme) ? getTheme(content.theme) + ' -' : ''}  ${content.title}`}
                        </h1>
                        {content.contentType.type === 'video-youtube' && <Youtube />}
                        {content.contentType.type === 'video' && <Video />}
                        {content.contentType.type === 'image' && <Image />}
                    </div>
                    <span className='text-sm'>
                        Autor: @{content.author.username}
                    </span>


                </div>


            </div>
            <div className='w-full h-auto mt-6 relative' style={{ paddingBottom: "56.25%", maxWidth: "100%" }}>
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
        </div>
    )
}

export default ContentCard 
