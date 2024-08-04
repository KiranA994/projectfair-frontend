import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import EditProject from './EditProject'
import { deleteAProjectAPi, getUserProjectApi } from '../services/allAPI'
import { Link } from 'react-router-dom'
import { AddProjectResponseStatusContext, EditProjectResponseContext } from '../context/Context'


function MyProject() {

  const {AddResponse} = useContext(AddProjectResponseStatusContext)
 
  const {editResponse} = useContext(EditProjectResponseContext)

  const [userProject, setUserProject] = useState([])

  const getAllUserProject = async() => {
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token')

      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
   
    const result = await getUserProjectApi(reqHeader)
    setUserProject(result.data)
  }
  }

  const deleteProject = async(id) => {
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token')

      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
   
    const result = await deleteAProjectAPi(id,reqHeader)
    console.log(result)
    if(result.status == 200){
      getAllUserProject()
    }
    else{
      alert('Soething Went Wrong')
    }
  }
  }

  useEffect(()=> {
    getAllUserProject()
  },[AddResponse, editResponse])

  return (
    <div className='m-5 shadow p-3 rounded'>

      <div className="d-flex align-items-center">
        <h3 className='text-success mt-4'>My Project</h3>
        <div className='ms-auto mt-4'>
          <AddProject />
        </div>
      </div>

      { userProject?.length > 0 ?
      userProject?.map((item)=>(
<div className='mt-4 p-3 rounded d-flex bg-light' >
        
        <h6>{item?.title}</h6>
        <div className='ms-auto d-flex align-items-center'>
        <EditProject className='mx-3' project={item} />
        <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} style={{color: '#B197FC'}}  className='mx-3' /></Link>
        <FontAwesomeIcon icon={faTrash} style={{color: "#ff0000",}} className='mx-3' onClick={()=> deleteProject(item._id)}/>
        </div>
    
    </div>
      ))
      
    :
    <p className='text-danger mt-3'>No Project Yet added</p>  
    }
    </div>
  )
}

export default MyProject