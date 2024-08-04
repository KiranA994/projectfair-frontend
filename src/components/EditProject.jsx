import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { serverUrl } from '../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectApi } from '../services/allAPI';
import { EditProjectResponseContext } from '../context/Context';

function EditProject({project}) {
  const [show, setShow] = useState(false);

  const {setEditResponse} = useContext(EditProjectResponseContext)

  const handleClose = () => {
    setShow(false);
    handleClose1()
  }
  const handleShow = () => setShow(true);

  const [update, setUpdate] = useState({
    title:project.title,
    language:project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage:''
  })

  const [preview, setPreview] = useState('')

  const handleClose1 = () => {
    setUpdate({
        title:project.title,
    language:project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage:''
    })
    setPreview('')
  } 

  const handleUpdate = async(e) => {
    e.preventDefault()
    const {title,language,github,website,overview,projectImage} = update
    if(!title || !language || !github || !website || !overview){
        toast.info('Please fill the form completely')
    }
    else{
        const reqBody = new FormData()
        reqBody.append('title',title)
            reqBody.append('language',language)
            reqBody.append('github',github)
            reqBody.append('website',website)
            reqBody.append('overview',overview)
            preview ? reqBody.append('projectImage',projectImage) : reqBody.append('projectImage',project.projectImage)
        
            const token = sessionStorage.getItem('token')

            if(preview){
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProjectApi(project._id,reqBody,reqHeader)
                if(result.status == 200){
                    setShow(false)
                    setEditResponse(result.data)
                    
                 }
                 else{
                    console.log(result);   
                    toast.error('Something went wrong')
                 }               
            }
            else{
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProjectApi(project._id,reqBody,reqHeader)
               
                 if(result.status == 200){
                    setShow(false)
                    setEditResponse(result.data)
                    
                 }
                 else{
                    console.log(result);  
                    toast.error('Something went wrong') 
                 }
            }
    }

  }

  useEffect(()=>{
    if(update.projectImage){
        setPreview(URL.createObjectURL(update.projectImage))
    }
  },[update.projectImage])

  return (
    <>
    <FontAwesomeIcon icon={faPenToSquare} style={{color: "#74C0FC",}} onClick={handleShow}/>
            

        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
        <Modal.Title className='text-success'>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6}>
                   <label htmlFor='image'>
                       <input id='image' type="file" style={{display:'none'}}
                       onChange={(e)=>setUpdate({...update,projectImage:e.target.files[0]})}/>
                       <img src={preview ? preview : `${serverUrl}/uploads/${project.projectImage}`}
                       alt=""  className='w-100' style={{height:'300px'}}/>
                   </label>
                </Col>
                <Col sm={12} md={6}>
                <form>
                        <div className="mb-3">
                            <input type="text" value={update.title} 
                            placeholder='Title' onChange={(e)=>setUpdate({...update,title:e.target.value})} className='form-control w-100' />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={update.language} placeholder='Language' 
                            onChange={(e)=>setUpdate({...update,language:e.target.value})} className='form-control w-100' />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={update.github} placeholder='Github' 
                            onChange={(e)=>setUpdate({...update,github:e.target.value})} className='form-control w-100' />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={update.website} placeholder='Website'
                            onChange={(e)=>setUpdate({...update,website:e.target.value})} className='form-control w-100' />
                        </div>
                        <div className="mb-3">
                            <textarea value={update.overview} placeholder='Overview' 
                            className='form-control w-100'
                            onChange={(e)=>setUpdate({...update,overview:e.target.value})}></textarea>
                        </div>
                    </form>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning" onClick={handleClose1} style={{color:'rebeccapurple'}}>
            Cancel
        </Button>
        <Button variant="success" onClick={handleUpdate}>
            Update
        </Button>
        </Modal.Footer>
        </Modal>

        <ToastContainer theme='colored' position='top-right' autoClose={2000} />
    </>
  )
}

export default EditProject