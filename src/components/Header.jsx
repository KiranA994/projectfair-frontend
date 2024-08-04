import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthorizedContext } from '../context/Context'

function Header({dash}) {

  const {setIsAuthorized} = useContext(isAuthorizedContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    toast.success('LogOut successfull')
    navigate('/')
  }
  
  return (
    <>
    <Navbar style={{backgroundColor:'pink'}}>
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand href="#home" className='d-flex'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirFawuxvhAP0B3NP6PBl1hxuUwQjAVQOpWA&s" alt="" 
            width={'40px'} height={'40px'}/>{' '}
              <h5 className='ms-2 fs-3'>TechCollab</h5>
            </Navbar.Brand>
          </Link>
          {dash && <button className='btn btn-warning' style={{color:'rebeccapurple'}}><FontAwesomeIcon icon={faPowerOff} className='me-2' 
          onClick={handleLogout}/>Logout</button>}
        </Container>
      </Navbar>

      
      <ToastContainer theme='colored' position='top-right' autoClose={2000} />
    </>
  )
}

export default Header