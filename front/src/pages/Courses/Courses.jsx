import { useEffect, useState } from 'react'
import styles from './Courses.module.css'
import { $axios } from '../../api'

const Courses = () => {
    const [filterData, setFilterData] = useState('')
    const [data, setData] = useState([])
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = 'Upcoming Courses'
        getData()
    }, [])

    const getData = async () => {
        await $axios.get(`/courses?token=${localStorage.getItem('token') || ''}`).then(res => {
            setData(res.data)
            console.log(res.data)
        })
    }

    const registrer = (id) => {
      console.log(id)
      $axios.post(`/registrations?token=${localStorage.getItem('token') || ''}`, {
        course_id: id
      }).then(res => {
        console.log(res.data)
        setSuccessMessage(res.data.message)
      }).catch(err => {
        setError(err.response.data.message)
      })
    } 

  return (
    <div className='page'>
      <h1>Upcoming courses</h1>
      {successMessage? <p className='success'>{successMessage}</p> : ''}
      {error? <p className='error'>{error}</p> : ''}
      <div className={styles.filters}>
        Filter by start date: 
        <input 
            type="datetime-local" 
            value={filterData}
            onChange={() => setFilterData(filterData)}
        />
      </div>
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
                <div className={styles.course__end}>
                <button 
                  className='btn'
                  onClick={() => registrer(course.id)}
                >Register</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Courses
