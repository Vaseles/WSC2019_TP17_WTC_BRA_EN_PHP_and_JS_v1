import React, { useEffect, useState } from 'react'
import { $axios } from '../../api'
import styles from './MyCourses.module.css'

const MyCourses = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [select, setSelect] = useState('')

    useEffect(() => {
        document.title =  'my courses'
        getData()
    }, [])

    const getData = async () => {
      await $axios.get(`/registrations?token=${localStorage.getItem('token') || ''}`).then(res => {
        setData(res.data)
        console.log(res.data)
    }).catch(err => {
      setError(err.response.data.message)
    })
    }

    const raiting = (e, id) => {
      setSelect(e.target.value)
      console.log(e.target.value)
      $axios.put(`/registrations/${id}?token=${localStorage.getItem('token') || ''}`, {
        course_rating: e.target.value
      }).then(res => {
        console.log(res.data)
        setData(data.map(item => item.id === id? {...item,course_rating: e.target.value } : item))
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
                  <td>{item.id}</td>
                  <td>{item.registration_date}</td>
                  <td>{}</td>
                  <td>
                    <select 
                      name="" 
                      id=""
                      value={select}
                      onChange={(e) => raiting(e, item.id)}
                    >
                      <option value="" selected disabled>- rate overall experience</option>
                      <option value="1">bad</option>
                      <option value="2">good</option>
                      <option value="3">excellent</option>
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
