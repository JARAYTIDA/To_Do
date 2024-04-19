import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const email = window.localStorage.getItem('email_id');
    const [showCount, setshowCount] = useState(false);
    const [count, setcount] = useState(0)
    useEffect(() => {
        if(email === null || email === undefined){
            setshowCount(false);
        }
    }, [])

    return (


<nav className="bg-white border-gray-200">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-600">TODOs</span>
    </Link>
    <div className="w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
        <li>
          <Link to='/' className="block py-2 px-3 text-white bg-yellow-600 rounded md:bg-transparent md:text-yellow-600 md:p-0 " aria-current="page">Home</Link>
        </li>
        <li>
          <Link to='/finished' className="block py-2 px-3 text-white bg-yellow-600 rounded md:bg-transparent md:text-yellow-600 md:p-0 " aria-current="page">Finished Tasks</Link>
        </li>
        <li>
          <Link to='/profile' className="block py-2 px-3 text-white bg-yellow-600 rounded md:bg-transparent md:text-yellow-600 md:p-0 " aria-current="page">Profile</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    )
}

export default Navbar