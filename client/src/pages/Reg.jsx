import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Reg = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [password, setpassword] = useState('')
    const [conPass, setconPass] = useState('')
    const [msg, setmsg] = useState('')
    
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if(name !== '' && email !== '' && contact !== '' && password !== '' && conPass !== ''){
            if(password === conPass){
                try {
                        const response = await fetch('http://localhost:5000/auth/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({name: name, email_id : email, contact:contact, password:password}),
                        });
            
                        if (response.ok) {
                            const data = await response.json();
                            console.log(data); 
                            navigate('/login')
                        } else {
                            console.error('Failed to submit form');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
            }
            else{
                setmsg('both passwords did not match')
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
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input onChange={(e) => setemail(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="name@gmail.com"/>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            Name
                        </label>
                        <input onChange={(e) => setname(e.target.value)} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Name"/>
                        
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            Contact
                        </label>
                        <input onChange={(e) => setcontact(e.target.value)} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Contact"/>
                        
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input onChange={(e) => setpassword(e.target.value)} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"/>
                        
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            Confirm Password
                        </label>
                        <input onChange={(e) => setconPass(e.target.value)} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="******************"/>
                        
                    </div>
                    <div class="flex items-center justify-between">
                        <button onClick={handleSubmit} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign Up
                        </button>
                        <Link to = '/login' class="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-yellow-800">
                            Login here
                        </Link>
                    </div>
                    <div className='py-2 text-red-600'>
                        {msg}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Reg