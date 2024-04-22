import { useState, useEffect, useMemo, useRef } from 'react'
import AuthRegisterForm from '../components/ui/forms/AuthRegisterForm'
import ContentForm from '../components/ui/forms/ContentForm';
import { DoorOpen, CircleUser, Plus, Youtube, Video, Image } from 'lucide-react';
import ContentCard from '../components/ui/cards/ContentCard';
import ContentPreviewCard from '../components/ui/cards/ContentPreviewCard';
import ThemeForm from '../components/ui/forms/ThemeForm'
import ContentsLayout from '../components/ui/layouts/ContentsLayout'
import ThemesLayout from '../components/ui/layouts/ThemesLayout';

function Home() {
    const [contents, setContents] = useState([])
    const [themes, setThemes] = useState([])
    const [contentTypesList, setContentTypesList] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(null)
    const [setshowUserMenu, setSetshowUserMenu] = useState(false)

    const [toggleAuthModal, setToggleAuthModal] = useState(false)
    const [formShowing, setFormShowing] = useState('register')

    const [toggleContentForm, setToggleContentForm] = useState(false)

    const [contentSelected, setContentSelected] = useState(null)

    const [toggleContentCard, setToggleContentCard] = useState(false)

    const [toggleThemeForm, setToggleThemeForm] = useState(false)

    const [layoutShowing, setLayoutShowing] = useState('contents')

    const gettingAccountInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:3000/api/accounts/auth/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd',
                    'authorization': token
                },
            });


            if (response.ok) {
                const jsonData = await response.json();
                setUserData(jsonData)
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            gettingAccountInfo(token)
        }
    }, []);

    useEffect(() => {
        // Esta función se ejecutará cada vez que el valor de token cambie
        const handleTokenChange = () => {
            setToken(localStorage.getItem('token') || '');
        };

        // Agrega un listener para el evento storage en el localStorage
        window.addEventListener('storage', handleTokenChange);

        // Retira el listener cuando el componente se desmonte para evitar memory leaks
        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, [token]);

    const fetchContents = async () => {
        let url = `http://localhost:3000/api/contents`
        if (contentSearch) url += `?title=${contentSearch}`
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd'
                },
            });


            if (response.ok) {
                const jsonData = await response.json();
                setContents(jsonData);
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    useEffect(() => {
        fetchContents();
    }, [])

    const fetchThemes = async () => {
        let url = `http://localhost:3000/api/themes`
        if (themeSearch) url += `?name=${themeSearch}`
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd'
                },
            });


            if (response.ok) {
                const jsonData = await response.json();
                setThemes(jsonData);
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const fetchContentTypes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/contentTypes', {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd'
                },
            });


            if (response.ok) {
                const jsonData = await response.json();
                setContentTypesList(jsonData);
            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    useEffect(() => {
        fetchThemes();
    }, [])

    useEffect(() => {
        fetchContentTypes();
    }, [])



    const closeForm = () => {
        setToggleAuthModal(false)
    }

    const successfullSaveUser = (token) => {
        gettingAccountInfo(token)
        closeForm()
    }

    const openRegisterForm = () => {
        setFormShowing('register')
        setToggleAuthModal(true)
    }

    const openLoginForm = () => {
        setFormShowing('login')
        setToggleAuthModal(true)
    }

    const handleToggleUserMenu = () => {
        setSetshowUserMenu(true)
    }

    const handleShowProfile = () => {
        setSetshowUserMenu(false)
    }

    const handleLogout = () => {
        setUserData(null)
        localStorage.removeItem('token');
        setSetshowUserMenu(false)

    }

    const changeFormShowing = (form) => {
        setFormShowing(form)
    }


    const handleOpenCreateContent = () => {
        setToggleContentForm(true)
    }

    const sucesssContentSave = () => {
        closeContentForm()
    }

    const closeContentForm = () => {
        setToggleContentForm(false)
    }

    const closeContentCard = () => {
        setToggleContentCard(false)
    }

    const closeThemeForm = () => {
        setToggleThemeForm(false)
    }

    const validateToken = useMemo(() => {
        return (content) => {
            const token = localStorage.getItem('token');
            if (!token) {
                setToggleAuthModal(true);
            } else {
                setContentSelected(content);
                setToggleContentCard(true);
            }
        };
    }, [setToggleAuthModal, setContentSelected, setToggleContentCard]);

    const [contentSearch, setContentSearch] = useState('')
    const [themeSearch, setThemeSearch] = useState('')

    const handleThemeSearchChange = (e) => {
        setThemeSearch(e.target.value)
    }

    const handleContentSearchChange = (e) => {
        setContentSearch(e.target.value)
    }

    const handleContentSearch = () => {
        fetchContents()
    }

    const handleThemeSearch = () => {
        fetchThemes()
    }

    const handleEnterPressTheme = (e) => {
        if (e.key === 'Enter') {
            handleThemeSearch()
        }
    }

    const handleEnterPressContent = (e) => {
        if (e.key === 'Enter') {
            fetchContents()
        }
    }

    const useClickOutside = (handler) => {
        const ref = useRef();

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    handler();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [handler]);

        return ref;
    };

    const handleClickOutside = () => {
        setSetshowUserMenu(false)
    };

    const wrapperRef = useClickOutside(handleClickOutside);

    return (
        <>
            {toggleAuthModal &&
                <div className='absolute h-full w-full z-30 flex items-center justify-center bg-slate-950 bg-opacity-50  top-0 left-0'>
                    <AuthRegisterForm savedUser={successfullSaveUser} closeForm={closeForm} formShowing={formShowing} changeFormShowing={changeFormShowing} />
                </div>
            }

            {toggleContentForm &&
                <div className='absolute h-full w-full z-30 flex items-center justify-center bg-slate-950 bg-opacity-50  top-0 left-0'>
                    <ContentForm currentUser={userData} closeForm={closeContentForm} themes={themes} updateContents={fetchContents} />
                </div>
            }

            {toggleContentCard &&
                <div className='absolute h-full w-full z-30 flex items-center justify-center bg-slate-950 bg-opacity-50  top-0 left-0'>
                    <ContentCard closeForm={closeContentCard} content={contentSelected} currentUser={userData} themes={themes} />
                </div>
            }


            {toggleThemeForm &&
                <div className='absolute h-full w-full z-30 flex items-center justify-center bg-slate-950 bg-opacity-50  top-0 left-0'>
                    <ThemeForm closeForm={closeThemeForm} currentUser={userData} contentTypes={contentTypesList} updateThemes={fetchThemes} />
                </div>
            }



            <div className='flex flex-col w-full h-full'>
                <div className='w-full h-[8%] border-b-2 border-gray-300 flex items-center px-6'>

                    <span className='font-bold text-lg mr-auto'>
                        Media <span className='text-[#720AF9]'>Library</span>
                    </span>

                    {layoutShowing === 'contents' && <div className='flex w-[30%]'>
                        <input
                            type="text"
                            value={contentSearch}
                            onChange={handleContentSearchChange}
                            className="border-2 border-gray-600 rounded-md rounded-r-none py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Buscar contenido..."
                            onKeyDown={handleEnterPressContent}
                        />
                        <button onClick={handleContentSearch} className='bg-black text-white py-4 rounded-lg rounded-l-none px-6'>
                            {'Buscar'}
                        </button>
                    </div>}

                    {layoutShowing === 'themes' && <div className='flex w-[30%]'>
                        <input
                            type="text"
                            value={themeSearch}
                            onChange={handleThemeSearchChange}
                            className="border-2 border-gray-600 rounded-md rounded-r-none py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Buscar temática..."
                            onKeyDown={handleEnterPressTheme}
                        />
                        <button onClick={handleThemeSearch} className='bg-black text-white py-4 rounded-lg rounded-l-none px-6'>
                            {'Buscar'}
                        </button>
                    </div>}



                    <div className='flex items-center ml-auto relative'>


                        <div className='flex items-center relative mr-6 border-r-2 border-gray-300 pr-6'>
                            <div className='rounded-lg  p-2 pr-4 flex items-center' onClick={() => setLayoutShowing('contents')}>
                                <span className={`font-bold cursor-pointer ml-3 underline ${layoutShowing === 'contents' ? 'text-[#720AF9]' : 'text-gray-800'}`}>
                                    Contenidos
                                </span>
                            </div>

                            <div className={`rounded-lg p-2 pr-4 flex items-center`} onClick={() => setLayoutShowing('themes')}>
                                <span className={`font-bold cursor-pointer ml-3 underline ${layoutShowing === 'themes' ? 'text-[#720AF9]' : 'text-gray-800'}`}>
                                    Temáticas
                                </span>
                            </div>
                        </div>

                        {userData && userData?.role === 'admin' && layoutShowing === 'themes' &&
                            <div className='flex items-center relative mr-6 border-r-2 border-gray-300 pr-6' onClick={() => setToggleThemeForm(true)}>
                                <div className='rounded-lg border-2 border-gray-300 p-2 pr-4 hover:bg-slate-100 flex items-center'>
                                    <Plus />
                                    <span className='text-gray-800 font-bold cursor-pointer ml-3'>
                                        Crear temática
                                    </span>
                                </div>

                            </div>
                        }

                        {userData && userData?.role === 'creator' || userData?.role === 'admin' && layoutShowing === 'contents' &&
                            <div className='flex items-center relative mr-6 border-r-2 border-gray-300 pr-6' onClick={handleOpenCreateContent}>
                                <div className='rounded-lg border-2 border-gray-300 p-2 pr-4 hover:bg-slate-100 flex items-center'>
                                    <Plus />
                                    <span className='text-gray-800 font-bold cursor-pointer ml-3'>
                                        Crear contenido
                                    </span>
                                </div>

                            </div>

                        }


                        {userData && <span className='text-[#720AF9] font-bold cursor-pointer' onClick={handleToggleUserMenu}>
                            {userData?.username}
                        </span>}

                        {setshowUserMenu && <div ref={wrapperRef} className='flex flex-col absolute top-8 right-[-4px] bg-white w-[180px] border-2 border-gray-300 shadow-lg z-50'>

                            <div className='w-full px-3 py-3 flex items-center  hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>
                                <DoorOpen color="#dc2626" />
                                <span className='text-red-600 ml-2'>
                                    Cerrar sesión
                                </span>
                            </div>
                        </div>}
                    </div>

                    {!userData && <div className='flex items-center'>
                        <div className='p-4 flex items-center justify-center cursor-pointer'>
                            <span className='text-[#720AF9] font-bold select-none' onClick={openRegisterForm}>
                                Registrarse
                            </span>
                        </div>
                        <div className='p-4 flex items-center justify-center cursor-pointer'>
                            <span className='font-bold select-none' onClick={openLoginForm}>
                                Iniciar sesión
                            </span>
                        </div>
                    </div>}
                </div>
                {layoutShowing === 'themes' &&
                    <ThemesLayout themes={themes} />

                }

                {layoutShowing === 'contents' &&
                    <ContentsLayout contents={contents} validateToken={validateToken} />
                }



            </div>
        </>
    )
}

export default Home
