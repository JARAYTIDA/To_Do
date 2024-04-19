import React from 'react'
import { Routes, Route } from 'react-router-dom'


import { Home, Profile, Login, Reg, Finished} from './pages'
import { Navbar } from './components'
// import { Footer, Navbar } from './components'
// import { Cart, Details, Details2, EmailVerificationAsk, ForgotPass, Home, Login, Payment, Products_List, Profile, ResetPassConfirmation, ResetPassEmailPage, ResetPassword, SignUp, Success, VerifyEmail } from './pages'

const App = () => {
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Reg/>} />
        <Route path='/finished' element={<Finished/>} />
      </Routes>
    </div>
  )
}

export default App