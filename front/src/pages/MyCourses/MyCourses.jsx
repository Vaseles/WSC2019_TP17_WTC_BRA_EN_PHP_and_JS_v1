import React, { useEffect, useState } from 'react'
import { $axios } from '../../api'
import styles from './MyCourses.module.css'

const MyCourses = () => {
    const [data, setData] = useState([])
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        document.title =  'my courses'
        getData()
    }, [])

    const getData = async () => {
      await $axios.get(`/registrations?token=${localStorage.getItem('token') || ''}`).then(res => {
        setData(res.data)
        setSuccessMessage(res.data.message)
        console.log(res.data)
    }).catch(err => {
      setError(err.response.data.message)
    })
    }

  return (
    <div className='page'>
      <h1>My Courses</h1>
      {data? (
        <table className={styles.table} >
        <tbody>
            <tr>
                <th>Courses name</th>
                <th>Date</th>
                <th>iCal</th>
                <th>Rating</th>
            </tr>
              {data.map(item => 
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td></td>
                  <td>
                    <select name="" id="">
                      <option value="" selected disabled>- rate overall experience</option>
                      <option value="bad">bad</option>
                      <option value="good">good</option>
                      <option value="excellent">excellent</option>
                    </select>
                    </td>
                </tr>
              )}
        </tbody>
      </table>
      ): (<p>Loading...</p>)}
    </div>
  )
}

export default MyCourses
