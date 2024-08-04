import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import MyProject from '../components/MyProject'
import { Col, Row } from 'react-bootstrap'

function Dashboard({dashboard}) {
  const dash = dashboard
  const [userName,setUserName] = useState("")
  useEffect(()=> {
    if(sessionStorage.getItem('existingUser')){
    setUserName(JSON.parse(sessionStorage.getItem('existingUser')).username)
    }
  },[])
console.log(userName);
  return (
    <div>
      <Header dash={dash}/>
      <div className='mt-5'>
        <h3 className='ms-4'>Welcome <span className='text-danger fs-2'>{userName}</span></h3>
        <Row className='mt-4'>
          <Col am={12} md={8}>
            <MyProject />
          </Col>
          <Col am={12} md={4}>
            <Profile />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dashboard