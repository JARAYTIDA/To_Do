import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
    
const Profile = () => {
    const email = window.localStorage.getItem('email_id');
    const navigate = useNavigate()
    const [cnt, setcnt] = useState('')
    const [name, setname] = useState('')
    const [contact, setcontact] = useState('')
    const [pass, setpass] = useState('')
    const [resetPass, setresetPass] = useState(false)

    const handleResetPass = async () => {
        const response = await fetch(`http://localhost:5000/auth/reset_pass?email_id=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password : pass}),
        });
        if (response.ok) {
            const data = await response.json();
            // window.location.reload()
        } else {
            console.error('Failed to fetch user');
        }
        
    }

    const handleUpdate = async () => {
        if(pass !== ''){
            await handleResetPass();
        }
        const response = await fetch(`http://localhost:5000/auth/update?email=${email}&name=${name}&contact=${contact}`);
        if (response.ok) {
            const data = await response.json();
            window.location.reload()
        } else {

            navigate('/login');
            console.error('Failed to fetch user');
        }
    }



    const getProfile = async (email) => {
        const response = await fetch(`http://localhost:5000/auth/get_user?email=${email}`);
        if (response.ok) {
            const data = await response.json();
            setname(data.name)
            setcontact(data.contact)
        } else {
            navigate('/login');
            console.error('Failed to fetch user');
        }
    }

    const reset = () => {
        console.log('clicked')
        setresetPass(!resetPass)
    }

    useEffect(() => {
        if(email === null || email === undefined){
            navigate('/login');
        }
        else{
            getProfile(email)
        }
    }, [cnt])

    const handleLogout = async () => {
        window.localStorage.removeItem('email_id');
        window.location.reload()
    }
    return (
    <div className='flex items-center justify-center h-screen'>
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        {email}
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Name
                    </label>
                    <input onChange={(e) => setname(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={name}/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Contact
                    </label>
                    <input onChange={(e) => setcontact(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={contact}/>
                </div>

                <div>
                <button onClick={reset} className="my-3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Reset Password
                    </button>
                </div>

                {resetPass && <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onChange={(e) => setpass(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder={name}/>
                </div>}

                <div className="flex items-center justify-between">
                    <button onClick={handleUpdate} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Update Profile
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={handleLogout} className="my-3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Logout
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Profile