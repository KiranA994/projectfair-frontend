import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthorizedContext } from '../context/Context'

function Auth({register}) {

  const {setIsAuthorized} = useContext(isAuthorizedContext)

  // state to hold the user details
  const [user,setUser] = useState({
    username: '',
    email: '',
    password: ''
  }) 

  const navigate = useNavigate()
  //  function to call register api
  const getRegister = async(e) => {
    e.preventDefault()
    const {username,email,password} = user
    if(!username || !email || !password){
      toast.info('Please fill the form completely')
    }
    else{
      const result = await registerApi(user)
      console.log(result);
      if(result.status == 200){
        toast.success('Registration successfull')
        setUser({
          username:'',
          email:'',
          password:''
        })
        navigate('/login')
      }
      else{
        toast.error(result.response.data);
        setUser({
          username:'',
          email:'',
          password:''
        })
      }
    }
  }

  //  function to login
  const userLogin = async(e) => {
    e.preventDefault()
    const {email,password} = user
    if(!email || !password){
      toast.info('Please fill the form completely')
    }
    else{
      const result = await loginApi(user)
      console.log(result);
      if(result.status == 200){
        toast.success('login successful')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setTimeout(()=>{
          navigate('/')
        },3000)
        setIsAuthorized(true)
        setUser({
          email:'',
          password:''
        })
      }
      else{
        toast.error('Something Went Wrong')
        console.log(result);
      }
    }
  }
  
  const registerForm = register ? true : false

  return (
    <div className='w-100 d-flex justify-content-center align-items-center flex-column' 
    style={{height: '100vh'}}>
     
      <div className='w-75 container'>
        <Link style={{textDecoration:'none',color:'blue'}} to={'/'}><h5><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back to home</h5></Link>
        <div style={{backgroundColor:'pink'}} 
        className='rounded mt-3' >
          <Row>
            <Col sm={12} md={6} className='p-5 my-5'>
              <img src="https://static-00.iconduck.com/assets.00/user-login-icon-1948x2048-nocsasoq.png" 
              alt="" width={'300px'} height={'300px'}  />
            </Col>
            <Col sm={12} md={6} className='d-flex justify-content-center align-items-center flex-column'>
           <div className='d-flex align-items-center mt-3'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirFawuxvhAP0B3NP6PBl1hxuUwQjAVQOpWA&s" alt="" 
            width={'80px'} height={'80px'}/>
                <h2 className='ms-2'>TechCollab</h2>
           </div>
           {registerForm ? <h6 className='mt-2'>Sign Up to your Account</h6> :
           <h6 className='mt-2'>Sign In to your Account</h6>}

        <Form className='mt-3 w-75'>
        { registerForm && <Form.Group className='mb-3' controlId="validationCustom01">
          <Form.Control
            required
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
          />
          </Form.Group>}
        <Form.Group className='mb-3' controlId="validationCustom01">
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
          />
          </Form.Group>
        <Form.Group className='mb-3' controlId="validationCustom01">
          <Form.Control
            required
            type="password"
            value={user.password}
            placeholder="Password"
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
          </Form.Group>
        {
        registerForm ?
        
        <div>
            <Button className='w-100' variant='warning'
            onClick={getRegister} >
              Register
            </Button>
            <p className='mt-2'>Already a User? click here to <Link className='text-danger' to={'/login'}>Login</Link></p>
        </div>
:
       <div>
          <Button className='w-100' variant='warning' onClick={userLogin}>
                Login
              </Button>
            <p className='mt-2'>New User? Click Here to <Link className='text-danger' to={'/register'}>Register</Link></p>
       </div>
}
        </Form>  


            </Col>
          </Row>
        </div>
        </div>
        <ToastContainer theme='colored' autoClose={2000} position='top-right' />
      </div>
  )
}

export default Auth