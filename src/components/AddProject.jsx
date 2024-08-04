import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allAPI';
import { AddProjectResponseStatusContext } from '../context/Context';
  

function AddProject() {

    const{setAddResponse} = useContext(AddProjectResponseStatusContext)

    //  state to hold video details
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        language:'',
        github: '',
        website: '',
        overview:'',
        projectImage: ''
    })
    // state to hold the url of the file uploaded
    const [preview,setPreview] = useState('')

    const [show, setShow] = useState(false);

    const [key,setKey] = useState(false);

    const [token,setToken] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function to clear all data entered in the modal (cancel button)
    const handleClose1 = () => {
        setVideoDetails({
            title: '',
            language:'',
            github: '',
            website: '',
            overview:'',
            projectImage: ''
        })
        setPreview('')
        setKey(!key)
    }

    // function to add project details
    const handleAdd = async(e) => {
        // avoid data lost
        e.preventDefault()
        const {title,language,github,website,overview,projectImage} = videoDetails
        if(!title || !language || !github || !website || !overview || !projectImage){
            toast.info('Please fill the form completely')
        }
        else{
            // handle uploaded content
            // 1) create an object for FormData() class
            const reqBody = new FormData()
            // 2) use append() method to add data in to the body
            reqBody.append('title',title)
            reqBody.append('language',language)
            reqBody.append('github',github)
            reqBody.append('website',website)
            reqBody.append('overview',overview)
            reqBody.append('projectImage',projectImage)
        

        // token is added to header to ensure that only logged in user is uploading the image
        if(token){
            let reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }

            const result = await addProjectApi(reqBody,reqHeader)
            // console.log(result);
            if(result.status == 200){
                handleClose1()
                handleClose()
                setAddResponse(result.data)
            }
            else{
                toast.error('Something Went Wrong')
                handleClose1()
                handleClose()
            }

        }
    }
    }

    useEffect(()=>{

        // file converted to url
        if(videoDetails.projectImage){
            setPreview(URL.createObjectURL(videoDetails.projectImage))
        }
            
    },[videoDetails.projectImage])

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setToken(sessionStorage.getItem('token'))
        }
        else{
            setToken('')
        }
        
    },[])

  return (
    <>
        <Button variant="success" onClick={handleShow}>Add Project</Button>

        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
        <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6}>
                   <label htmlFor='image'>
                    {/* key attribute can invoke onChange event so that we can  
                    upload same image if we click the cancel button of popup */}
                       <input id='image' key={key} type="file" style={{display:'none'}}
                       onChange={(e)=>setVideoDetails({...videoDetails,projectImage:e.target.files[0]})}/>
                       <img src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifY7jdCPfkn6Kc7a5vcMSPG0V7zlQWRy7-A&s"} 
                       alt=""  className='w-100' style={{height:'300px'}}/>
                   </label>
                </Col>
                <Col sm={12} md={6}>
                <form>
                        <div className="mb-3">
                            <input type="text" value={videoDetails.title} placeholder='Title' className='form-control w-100' 
                            onChange={(e) => setVideoDetails({...videoDetails,title:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <input type="text" value={videoDetails.language} placeholder='Language' className='form-control w-100' 
                             onChange={(e) => setVideoDetails({...videoDetails,language:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <input type="text" value={videoDetails.github} placeholder='Github' className='form-control w-100' 
                             onChange={(e) => setVideoDetails({...videoDetails,github:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <input type="text" value={videoDetails.website} placeholder='Website' className='form-control w-100' 
                             onChange={(e) => setVideoDetails({...videoDetails,website:e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <textarea value={videoDetails.overview} placeholder='Overview' className='form-control w-100'
                            onChange={(e) => setVideoDetails({...videoDetails,overview:e.target.value})}>
                            </textarea>
                        </div>
                    </form>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning" onClick={handleClose1} style={{color:'rebeccapurple'}}>
            Cancel
        </Button>
        <Button variant="success" onClick={handleAdd}>
            Add
        </Button>
        </Modal.Footer>
        </Modal>

        <ToastContainer theme='colored' position='top-right' autoClose={2000} />
        </>
  )
}

export default AddProject