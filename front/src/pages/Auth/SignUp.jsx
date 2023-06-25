import { useState } from 'react'
import styles from './Auth.module.css'
import { $axios } from '../../api'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'



const SignUp = () => {
  const navigate = useNavigate()
  const {isAuth, setIsAuth, name, setName} = useAuth()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '', 
    teacherId: '',
    profilePhoto: '',
    username: '',
    password: ''
  })

  const auth = (e) => {
    e.preventDefault()

    console.log(data)
    $axios.post('/profile', {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      teacher_id: data.teacherId,
      photo: data.profilePhoto,
      password: data.password
    }).then(res => {
      console.log(res.data)

      setIsAuth(true)
      setName(data.username)

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name',data.username)

      navigate('/')
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div className='page'>
      <form className={styles.form}>
      <h1>Sign Up</h1>
      <div className={styles.form__part}>
        <p>Profile Info</p>
        <div className={styles.form__component}>
        <label htmlFor='username'>Firstname*</label>
          <input
            type='text'
            value={data.firstName}
            placeholder='Enter first name...'
            onChange={(e) => setData({...data, firstName: e.target.value})}
            required
          />
       </div>
       <div className={styles.form__component}>
        <label htmlFor='username'>Lastname*</label>
          <input
            type='text'
            value={data.lastName}
            placeholder='Enter last name...'
            onChange={(e) => setData({...data, lastName: e.target.value})}
            required
          />
       </div>
       <div className={styles.form__component}>
        <label htmlFor='username'>Email*</label>
          <input
            type='email'
            value={data.email}
            placeholder='Enter email...'
            onChange={(e) => setData({...data, email: e.target.value})}
            required
          />
       </div>
       <div className={styles.form__component}>
        <label htmlFor='username'>Teacher ID*</label>
          <input
            type='text'
            value={data.teacherId}
            placeholder='Enter teacher id...'
            onChange={(e) => setData({...data, teacherId: e.target.value})}
            required
          />
       </div>
       <div className={styles.form__component}>
        <label htmlFor='username'>Profile photo</label>
          <input
            type='text'
            value={data.profilePhoto}
            placeholder='Enter profile photo...'
            onChange={(e) => setData({...data, profilePhoto: e.target.value})}
            />
       </div>
      </div>
      <div className={styles.form__part}>
        <p>Login</p>
      <div className={styles.form__component}>
        <label htmlFor='username'>Username*</label>
          <input
            type='text'
            value={data.username}
            placeholder='Enter Username...'
            onChange={(e) => setData({...data, username: e.target.value})}
            required
          />
       </div>
        <div className={styles.form__component}>
          <label htmlFor='password'>Password*</label>
          <input
            type='password'
            value={data.password}
            placeholder='Enter Password...'
            onChange={(e) => setData({...data, password: e.target.value})}
          />
        </div>
      </div>
        <div className="home__buttons">
          <button onClick={auth} className='btn'>Create Profile</button>
        </div>        
      </form>
    </div>
  )
}

export default SignUp
