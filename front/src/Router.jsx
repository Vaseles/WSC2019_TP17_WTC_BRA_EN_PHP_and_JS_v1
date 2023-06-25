import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Header from './components/header/Header'
import Courses from './pages/Courses/Courses'
import MyCourses from './pages/MyCourses/MyCourses'
import useAuth from './hooks/useAuth'

const Router = () => {
  const {isAuth} = useAuth()

  return (
    <div>
        <Header/>
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />

            {isAuth && <Route path='/courses' element={<Courses />} />}
            {isAuth && <Route path='/my-courses' element={<MyCourses />} />}
      </Routes>
    </div>
  )
}

export default Router
