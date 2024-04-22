import { useState, useEffect } from 'react'
import { X, Youtube, Video, Image } from 'lucide-react';



function ContentForm({ closeForm, currentUser, themes, updateContents }) {
    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [themeSelected, setThemeSelected] = useState('')
    const [contentUrl, setContentUrl] = useState('')
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [themeSelectedObject, setThemeSelectedObject] = useState(null)
    const [contentTypesSelected, setContentTypesSelected] = useState(null)

    const handleSubmit = () => {
        submitCreateContent()
    }

    const submitCreateContent = async () => {
        const newContent = {
            title: title,
            author: currentUser._id,
            url: contentUrl,
            coverImage: coverImageUrl,
            contentType: contentTypesSelected,
            theme: themeSelected
        }

        try {
            const response = await fetch('http://localhost:3000/api/contents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd'
                },
                body: JSON.stringify(newContent)
            });

            if (response.ok) {
                updateContents()
                closeForm()
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleThemeSelection = (e) => {
        const themeIndex = themes.findIndex(theme => theme._id === e.target.value)

        if (themeIndex !== -1) {
            setThemeSelectedObject(themes[themeIndex])
        }
        setThemeSelected(e.target.value)
    }

    const handleContentUrlChange = (e) => {
        setContentUrl(e.target.value)
    }


    const handleContentTypeSelectedChange = (contentTypeId) => {
        setContentTypesSelected(contentTypeId)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    return (
        <div className='h-full w-full md:h-[80%] md:w-[50%] bg-white z-50 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-none md:rounded-lg px-6 py-4'>
            <div className='w-full flex justify-end items-center mb-12'>
                <X className='cursor-pointer' onClick={closeForm} />
            </div>
            <div className='w-full flex items-center justify-center flex-col'>
                <h1 className='text-gray-950 font-bold text-2xl text-center'>
                    Nuevo contenido
                </h1>
            </div>

            <div className='flex flex-col items-center'>
                <div className=' w-full grid grid-cols-1 gap-y-4 gap-x-4 mt-6'>
                    <div>
                        <span htmlFor="username" className='mb-6 text-sm font-bold'>
                            Título
                        </span>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Elige el título de tu contenido"
                        />
                    </div>



                    <div>
                        <span htmlFor="username" className='mb-6 text-sm font-bold'>
                            Url de contenido
                        </span>
                        <input
                            type="text"
                            value={contentUrl}
                            onChange={handleContentUrlChange}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Agrega el url de tu contenido"
                        />
                    </div>

                    <div>
                        <span htmlFor="username" className='mb-6 text-sm font-bold'>
                            Url de portada de contenido (opcional)
                        </span>
                        <input
                            type="text"
                            value={coverImageUrl}
                            onChange={setCoverImageUrl}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Agrega una portada a tu contenido"
                        />
                    </div>

                    <div>
                        <label htmlFor="selector" className="block text-sm font-medium text-gray-700">
                            Tematica
                        </label>
                        <select
                            id="theme"
                            name="theme"
                            className="mt-1 block w-full pl-4 pr-10 py-2 text-base border-2 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={themeSelected}
                            onChange={handleThemeSelection}
                        >
                            <option value="">Selecciona la categoría</option>
                            {themes.map((theme, index) => (
                                <option key={index} value={theme._id}>{theme.name}</option>
                            ))}

                        </select>
                    </div>

                    {themeSelectedObject && <span className='font-bold'>
                        Tipo de contenido
                    </span>}
                    {themeSelectedObject && <div className='grid grid-cols-3 gap-4'>
                        {themeSelectedObject.contentTypes.map((contentType, index) => (
                            <div key={index} className={`flex flex-col items-center justify-center border-2  rounded-lg py-4 ${contentTypesSelected === contentType._id ? 'border-blue-600' : 'border-gray-300'}`} onClick={() => handleContentTypeSelectedChange(contentType._id)}>
                                {contentType.type === 'video-youtube' && <Youtube />}
                                {contentType.type === 'video' && <Video />}
                                {contentType.type === 'image' && <Image />}
                                <span className='mt-4'>{contentType.name}</span>
                            </div>
                        ))}
                    </div>}

                    <button onClick={handleSubmit} className='w-full bg-black text-white py-4 rounded-lg mb-auto'>
                        {'Crear contenido'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ContentForm
