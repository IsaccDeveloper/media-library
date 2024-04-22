import { useState, useEffect } from 'react'
import { X, Youtube, Video, Image } from 'lucide-react';



function ThemeForm({ closeForm, contentTypes, updateThemes, currentUser }) {
    const [name, setName] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [contentTypesSelected, setContentTypesSelected] = useState([])

    const handleSubmit = () => {
        submitCreateTheme()
    }

    const submitCreateTheme = async () => {
        const newTheme = {
            name: name,
            image: coverImage,
            contentType: contentTypesSelected,
            author: currentUser._id
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/api/themes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd',
                    'authorization': token
                },
                body: JSON.stringify(newTheme)
            });

            if (response.ok) {
                updateThemes()
                closeForm()
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }

        } catch (error) {
            console.log(error)
        }
    }


    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.value)
    }


    const handleContentTypeSelectedChange = (contentTypeId) => {
        const contentIndex = contentTypesSelected.findIndex(content_item => content_item === contentTypeId)

        let contentTypesSelectedCopy = [...contentTypesSelected]
        if (contentIndex !== -1) {
            contentTypesSelectedCopy.splice(contentIndex, 1)
        } else {
            contentTypesSelectedCopy.push(contentTypeId)
        }

        setContentTypesSelected(contentTypesSelectedCopy)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    return (
        <div className='h-full w-full md:h-[80%] md:w-[50%] bg-white z-50 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-none md:rounded-lg px-6 py-4'>
            <div className='w-full flex justify-end items-center mb-12'>
                <X className='cursor-pointer' onClick={closeForm} />
            </div>
            <div className='w-full flex items-center justify-center flex-col'>
                <h1 className='text-gray-950 font-bold text-2xl text-center'>
                    Nueva temática
                </h1>
            </div>

            <div className='flex flex-col items-center'>
                <div className=' w-full grid grid-cols-1 gap-y-4 gap-x-4 mt-6'>
                    <div>
                        <span htmlFor="username" className='mb-6 text-sm font-bold'>
                            Nombre
                        </span>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Elige el nombre de tu tematica"
                        />
                    </div>



                    <div>
                        <span htmlFor="username" className='mb-6 text-sm font-bold'>
                            Imagen de portada (url)
                        </span>
                        <input
                            type="text"
                            value={coverImage}
                            onChange={handleCoverImageChange}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Agrega el url de la portada de tu tema"
                        />
                    </div>

                    <span className='font-bold'>
                        Tipo de contenidos permitidos
                    </span>

                    <div className='grid grid-cols-3 gap-4'>
                        {contentTypes.map((contentType, index) => (
                            <div key={index} className={`flex flex-col items-center justify-center border-2  rounded-lg py-4 ${contentTypesSelected.includes(contentType._id) ? 'border-blue-600' : 'border-gray-300'}`} onClick={() => handleContentTypeSelectedChange(contentType._id)}>
                                {contentType.type === 'video-youtube' && <Youtube />}
                                {contentType.type === 'video' && <Video />}
                                {contentType.type === 'image' && <Image />}
                                <span className='mt-4'>{contentType.name}</span>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSubmit} className='w-full bg-black text-white py-4 rounded-lg mb-auto'>
                        {'Crear Tematica'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ThemeForm
