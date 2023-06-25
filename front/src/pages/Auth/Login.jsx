import {useEffect, useState} from 'react'
import styles from './Auth.module.css'
import { $axios } from '../../api'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {isAuth, setIsAuth, name, setName} = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('some')

  useEffect(() => {
    document.title = 'Login'
  }, [])

  const auth = (e) => {
    e.preventDefault()
    
    $axios.post('login', {
      username: username,
      password: password,
    }).then(res => {
      console.log(res)

      setIsAuth(true)
      setName(username)

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name',username)
      navigate('/')

    }).catch(err => {
      console.error(err.response.data.message)
      setError(err.response.data.message)
    })
  }

  return (
    <div className='page'>
      <form className={styles.form}>
      <h1>Login</h1>
       <div className={styles.form__component}>
        <label htmlFor='username'>Username*</label>
          <input
            type='text'
            value={username}
            placeholder='Enter Username...'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
       </div>
        <div className={styles.form__component}>
          <label htmlFor='password'>Password*</label>
          <input
            type='password'
            value={password}
            placeholder='Enter Password...'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error? <div className='error'>{error}</div>: null}
        <div className="home__buttons">
          <button onClick={auth} className='btn'>Login</button>
          <a href="/sign-up" className='link'>Sign Up</a>
        </div>        
      </form>
    </div>
  )
}

export default Login
