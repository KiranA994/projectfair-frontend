import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { updateProfileApi } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [open, setOpen] = useState(false);

  const [updateStatus, setUpdateStatus] = useState(false)

 const [preview, setPreview] = useState("")

  const [userDetails, setUserDetails] = useState({
    username:'',
    email:'',
    password:'',
    github: '',
    linkedin:'',
    profile: ''
  })

  const [existingImage, setExistingImage] = useState("")

  const handleUpdate = async(e) => {
    e.preventDefault()
    const {username, email, password, github, linkedin} = userDetails
    if(!github || !linkedin){
      toast.info('Please fill the form completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview ? reqBody.append("profile",profile) : reqBody.append("profile",existingImage)
    
      const token = sessionStorage.getItem("token")
      if(preview){
        const reqHeader ={
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileApi(reqBody,reqHeader)
        if(result.status == 200){
          toast.success('Profile updated successfully')
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setUpdateStatus(!updateStatus)
        }
        else{
          console.log(result);
          toast.error('something went wrong')
        }
      }
      else{
        const reqHeader ={
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileApi(reqBody,reqHeader)
         if(result.status == 200){
          toast.success('Profile updated successfully')
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setUpdateStatus(!updateStatus)
        }
        else{
          console.log(result);
          toast.error('something went wrong')
        }
      }
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem("existingUser")){
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setUserDetails({
        ...userDetails,username: user.username,email:user.mailId,password:user.password,
        github:user.github,linkedin:user.linkedIn
      })
      setExistingImage(user.profile)
    }
  },[updateStatus])

  useEffect(()=> {
    if(userDetails.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }
    else{
      setPreview('')
    }
  },[userDetails.profile])


  return (
    <>
    <div className='my-5 mx-4 shadow p-4 rounded' onMouseEnter={()=>setOpen(true)}
    onMouseLeave={()=>setOpen(false)}>
      <div className='d-flex justify-content-between'>
        <h3 className='mt-3'>Profile</h3>
        <div className='mt-3'>
          <button type='button' className='btn btn-outline-info'
          onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        </div>

     <Collapse in={open}>
          
        <div>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              
              <label htmlFor='image'>

                <input id='image' type="file" style={{display:'none'}} onChange={(e)=>setUserDetails({...userDetails, profile:e.target.files[0]})}/>

              { existingImage == "" ?  
              
              <img src={ preview ? preview : "data:image/png;base64,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"}
                alt="" width={'200px'} height={'200px'}  style={{borderRadius:'50%'}}/>
              :
               <img src={ preview ? preview : `${serverUrl}/uploads/${existingImage}`} 
                alt="" width={'200px'} height={'200px'}  style={{borderRadius:'50%'}}/>
              
              }
              </label>
            
            <div className='mb-3 w-100 mt-4'>
              <input type="text" value={userDetails.github} placeholder='Github' 
              onChange={(e)=> setUserDetails({...userDetails, github: e.target.value})} className='form-control w-100' />
            </div>
    
            <div className='mb-3 w-100'>
              <input type="text"  value={userDetails.linkedin}  placeholder='LinkedIn' 
              onChange={(e)=> setUserDetails({...userDetails, linkedin: e.target.value})} className='form-control w-100' />
            </div>
    
            <div className='mb-3 w-100'>
              <button className='btn btn-success w-100'
              onClick={handleUpdate}>Update</button>
            </div>
            
            </div>
        </div>

     </Collapse>

    </div>

    
    <ToastContainer theme='colored' position='top-right' autoClose={2000} />
    </>
  )
}

export default Profile