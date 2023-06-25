import React from 'react'
import styles from './Header.module.css'
import useAuth from '../../hooks/useAuth'
import { $axios } from '../../api'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {isAuth, setIsAuth, name, setName} = useAuth()
  const navigate = useNavigate('')

  const logout = () => {
    $axios.post(`/logout?token=${localStorage.getItem('token') || ''}`)
    setIsAuth(false)
    setName('')

    localStorage.clear()
    
    navigate('/login')
  }

  return (
    <div className={styles.header}>
      <a href='/'>CS Teachers Club</a>
      <div className={styles.header__left}>
        {isAuth? (
          <>
          <a className='link' href='/courses'>Courses</a>
          <a className='link' href='/my-courses' >My Courses</a>
          <a className='link' >{name}</a>
          <a onClick={logout} className='link'>Logout</a>
          </>
        ): (
          <>
          <a href="/login" className="link">Login</a>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
