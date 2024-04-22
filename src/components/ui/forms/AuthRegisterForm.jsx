import { useState, useEffect } from 'react'
import { X } from 'lucide-react';



function AuthRegisterForm({ closeForm, savedUser, formShowing, changeFormShowing }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('creator')
    const [password, setPassword] = useState('')


    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const handleUserTypeChange = (e) => {
        setUserType(e.target.value)
    }

    const handeUsernameChange = (e) => {
        setUsername(e.target.value);
    }


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = () => {
        if (formShowing === 'register') {
            submitSignUp()
        } else {
            submitLogin()
        }
    }

    const submitSignUp = async () => {
        const newUUser = {
            username: username,
            email: email,
            password: password,
            role: userType
        }

        try {
            const response = await fetch('http://localhost:3000/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd'
                },
                body: JSON.stringify(newUUser)
            });

            if (response.ok) {
                const jsonData = await response.json();
                localStorage.setItem('token', jsonData.token);
                savedUser(jsonData.token)

            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }

        } catch (error) {
            console.log(error)
        }
    }


    const submitLogin = async () => {
        const newUUser = {
            username: username,
            password: password,
        }

        try {
            const response = await fetch('http://localhost:3000/api/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd'
                },
                body: JSON.stringify(newUUser)
            });

            if (response.ok) {
                const jsonData = await response.json();
                localStorage.setItem('token', jsonData.token);
                savedUser(jsonData.token)

            } else {
                console.error('Error al obtener los datos:', response.statusText);
            }

        } catch (error) {
            console.log(error)
        }
    }


    const changeParentFormSelected = () => {
        let updatedFormTShowing = formShowing === 'register' ? 'login' : 'register'
        changeFormShowing(updatedFormTShowing)
    }

    return (
        <div className='h-full w-full md:h-[80%] md:w-[50%] bg-white z-50 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-none md:rounded-lg px-6 py-4'>
            <div className='w-full flex justify-end items-center mb-12'>
                <X className='cursor-pointer' onClick={closeForm} />
            </div>
            <div className='w-full flex items-center justify-center flex-col'>
                <h1 className='text-gray-950 font-bold text-2xl text-center'>
                    Bienvenido a Media Library
                </h1>
                <h2 className='text-gray-950 font-thin text-xl text-center'>
                    Descubre y crea contenido increíble.
                </h2>
            </div>

            <div className='flex flex-col items-center'>
                <div className=' w-full grid grid-cols-1 gap-y-6 gap-x-4 mt-6'>
                    <div>
                        <span htmlFor="username" className='mb-6 text-sm font-bold'>
                            Alias
                        </span>
                        <input
                            type="text"
                            value={username}
                            onChange={handeUsernameChange}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Elige tu nombre de usuario..."
                        />
                    </div>

                    {formShowing === 'register' && <div>
                        <span htmlFor="email" className='mb-6 text-sm font-bold'>
                            Correo electrónico
                        </span>
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Agrega tu correo electrónico..."
                        />
                    </div>}

                    <div>
                        <span htmlFor="email" className='mb-6 text-sm font-bold'>
                            Contraseña
                        </span>
                        <input
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            className=" mt-1 border-2 border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Escribe tu contraseña..."
                        />
                    </div>

                    {
                        formShowing === 'register' &&
                        <div className='mt-2'>
                            <span htmlFor="email" className='mb-6 text-sm font-bold'>
                                Tipo de usuario
                            </span>
                            <div className='flex items-center'>
                                <div className='flex items-center'>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="creator"
                                        checked={userType === 'creator'}
                                        onChange={handleUserTypeChange}
                                    />
                                    <span className='ml-2'>
                                        Creador
                                    </span>
                                </div>
                                <div className='flex items-center ml-6'>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="viewer"
                                        checked={userType === 'viewer'}
                                        onChange={handleUserTypeChange}
                                    />
                                    <span className='ml-2'>
                                        Lector
                                    </span>
                                </div>
                            </div>
                        </div>
                    }

                    <button onClick={handleSubmit} className='w-full bg-black text-white py-4 rounded-lg mb-auto'>
                        {formShowing === 'register' ? 'Registrarte' : 'Iniciar sesion'}
                    </button>

                    <div className='w-full flex items-center justify-center mt-auto'>
                        <span className='text-blue-600 cursor-pointer hover:text-blue-700' onClick={changeParentFormSelected}>
                            {formShowing === 'register' ? '¿Ya eres usuario de Media Library?' : 'Aún no eres Media Library?'}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthRegisterForm
