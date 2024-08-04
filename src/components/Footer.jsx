import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='mt-5 w-100 p-4' style={{backgroundColor:'pink'}}>
      <div className="row mx-md-5 mx-3">

        <div className="col-md-4">  
        <div className='d-flex align-items-center'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirFawuxvhAP0B3NP6PBl1hxuUwQjAVQOpWA&s" alt="" 
          width={'80px'} height={'80px'}/>
        <h3 className='ms-3'>TechCollab</h3>
        </div>        
        <div className='flex-column'>
        <p  className='mt-3' style={{textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In voluptate suscipit non maxime ducimus. Blanditiis eos iusto, eligendi exercitationem ducimus in perspiciatis minima provident, veniam quis laudantium reprehenderit ipsa debitis!</p>
        </div>
          
        </div>

        <div className="col-md-1"></div>

        <div className="col-md-1">
        <div className="text-danger">Links</div>
        <Link className='mt-3' to={'/'} style={{textDecoration:'none', color:'black'}}>  <p>Home</p></Link>
       <Link to={'/project'} style={{textDecoration:'none', color:'black'}}>   <p>Project</p></Link>
        <Link to={'/dashboard'} style={{textDecoration:'none', color:'black'}}>  <p>DashBoard</p></Link>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2">
        <div className="text-danger">Guides</div>
        <Link className='mt-3' to={'https://react.dev/'} style={{textDecoration:'none', color:'black'}}>  <p>React</p></Link>
       <Link to={'https://react-bootstrap.netlify.app/'} style={{textDecoration:'none', color:'black'}}>   <p>React Bootstrap</p></Link>
        <Link to={'https://bootswatch.com/'} style={{textDecoration:'none', color:'black'}}>  <p>React Bootswatch</p></Link>
        </div>
        <div className="col-md-3">
          <h3 className='text-danger'>Contact Us</h3>
          <div className='d-flex mt-3'>
            <input type="text" placeholder='Enter mail-id' className='form-control w-100'/>
            <button className=' btn btn-warning ms-3'>Subscribe</button>
          </div>
          <div className='d-flex justify-content-between mt-2'>
          <FontAwesomeIcon icon={faInstagram}  className='fa-2x text-primary'/>
          <FontAwesomeIcon icon={faTwitter}  className='fa-2x text-primary' />
          <FontAwesomeIcon icon={faLinkedin}  className='fa-2x text-primary' />
          <FontAwesomeIcon icon={faFacebook}  className='fa-2x text-primary' />
          </div>
        </div>

      </div>
    <p className='text-center text-secondary'>Copyright @ 2024 TechCollab. Built with React</p>
    </div>
   
        
    </>
  )
}

export default Footer