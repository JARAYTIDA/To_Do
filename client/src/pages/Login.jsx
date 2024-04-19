import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [msg, setmsg] = useState('')
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(email !== '' && password !== ''){
            try {
                const response = await fetch('http://localhost:5000/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email_id : email, password: password}),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Response from the server
                    window.localStorage.setItem('email_id', data[0].email_id)
                    navigate('/')
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error:', error);
                navigate('/login')
            }
        }
        else{
            setmsg('all fields are required to fill')
        }
    }
  return (
    <div className='flex items-center justify-center h-screen'>
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input onChange={(e) => setemail(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Username"/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input onChange={(e) => setpassword(e.target.value)} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                    
                </div>
                <div class="flex items-center justify-between">
                    <button onClick={handleSubmit} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                    <Link to = '/signup' class="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-yellow-800">
                        Sign up here
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login