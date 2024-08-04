import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../assets/collab.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectApi } from '../services/allAPI'


function Home() {
  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])
  useEffect(()=> {
    const token = sessionStorage.getItem("token")
    if(token){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
    getHomeProject()
  },[])

  const getHomeProject = async() => {
    const result = await getHomeProjectApi()
    console.log(homeProject);
    setHomeProject(result.data)
  }

  return (
    <>
    <div className="container-fluid w-100" style={{backgroundColor:'pink',height: '100vh'}}>
      <Row className='align-items-center p-5'>
        <Col sm={12} md={6}>
          <h1 className='text-danger' style={{fontSize:'76px'}}>TechCollab</h1>
          <p className='mt-3'>One destination for all Software Collabration</p>
          {!isLogin ?
            <button className='btn btn-warning mt-3' style={{color:'rebeccapurple'}}>
              <Link to={'/login'} style={{textDecoration:'none',color:'rebeccapurple'}}>Get Started<FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </button>
            :
            <button className='mt-3 btn btn-warning' style={{color:'rebeccapurple'}}>
              <Link to={'/dashboard'} style={{textDecoration:'none',color:'rebeccapurple'}}>Mange Project</Link><FontAwesomeIcon icon={faArrowRight} />
            </button>
          }
        </Col>
        <Col sm={12} md={6}>
          <img src={titleImage} alt="image" className='w-75' />
        </Col>
      </Row>
    </div>
    <div>
      <h1 className='text-center mt-5'>Explore our projects</h1>
      <marquee scrollAmount={25}>
      <div className='d-flex'>
        { homeProject?.map((item)=>(
   <ProjectCard project={item}/>
        ))
       
        }
      </div>
      </marquee>
      <Link to={'/project'} style={{color:'red'}}
      ><p className='text-center mt-4 text-danger'>See more Projects</p></Link>
    </div>
    </>
  )
}

export default Home