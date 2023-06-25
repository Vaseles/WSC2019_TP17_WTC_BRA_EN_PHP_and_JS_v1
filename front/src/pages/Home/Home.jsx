import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import useAuth from '../../hooks/useAuth'
import { $axios } from '../../api'

const Home = () => {
  const {isAuth, setIsAuth, name, setName} = useAuth()
  const [data, setData] = useState([])


  useEffect(() => {
    document.title = 'Home'
    getData()
  }, [])

  const getData = async () => {
    await $axios.get(`/courses?token=${localStorage.getItem('token') || ''}`).then(res => {
        setData(res.data)
        console.log(res.data)
    })
}

  return (
    <div className={styles.home}>
      {isAuth? (
        <>
        <div className={styles.courses}>
        {data? (
          <>
            {data.map((course, index) => 
              <div key={index} className={styles.course}>
                <div className={styles.course__title}>
                  <h2>{course.title}</h2>
                  <span>{course.seats} seats aviliable</span>
                </div>
                <div className={styles.course__title2}>
                  <span>{course.date_time}</span>
                  <span>{course.location}</span>
                </div>
                <p>{course.instructor_name}</p>
                <p>{course.description}</p>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
          <a href="/courses" className="btn">Show More Courses -></a>
      </>
      ): (
        <div className={styles.home__auth}>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas ullam molestiae nemo repellendus excepturi dolorum, minima incidunt debitis quisquam magnam. Quas distinctio nisi unde consequatur? Odit voluptate eos officia reprehenderit.</p>
          <div className={styles.home__buttons}>
            <a href="/login" className="btn">Login</a>
            <a href="/sign-up" className="btn">Sign up</a>
          </div>
      </div>
      )}
    </div>
  )
}

export default Home
