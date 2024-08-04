import { serverUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"

// register

export const registerApi = async(reqBody) => {
    return await commonAPI('POST',`${serverUrl}/user/register`,reqBody,"")
}

// login

export const loginApi = async(reqBody) => {
    return await commonAPI('POST', `${serverUrl}/user/login`,reqBody,"")
}

// add project 

export const addProjectApi = async(reqBody,reqHeader) => {
    return await commonAPI('POST',`${serverUrl}/projects`,reqBody,reqHeader)
}

//  get home projects 

export const getHomeProjectApi = async() => {
    return await commonAPI('GET',`${serverUrl}/home-project`,'','')
}

// get all projects

// query parameter = path?key = value
export const allProjectApi = async(SearchKey) => {
    return await commonAPI('GET', `${serverUrl}/all-project?search=${SearchKey}`,"","")
}

// get user project

export const getUserProjectApi = async(reqHeader) => {
    return await commonAPI('GET',`${serverUrl}/user/all-project`,"",reqHeader)
}

// delete a user project

export const deleteAProjectAPi= async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${serverUrl}/delete-project/${id}`,{},reqHeader)
}

// updated project 

export const updateProjectApi = async(id, reqBody, reqHeader) => {
    return await commonAPI('PUT', `${serverUrl}/update-project/${id}`, reqBody, reqHeader)
}

// update user profile

export const updateProfileApi = async(reqBody,reqHeader) => {
    return await commonAPI('PUT',`${serverUrl}/update-profile`,reqBody,reqHeader)
}