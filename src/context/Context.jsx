import React, { createContext, useState } from 'react'

export const AddProjectResponseStatusContext = createContext()

export const EditProjectResponseContext = createContext()
 
export const isAuthorizedContext = createContext()

function Context({children}) {
    // create the state to share data between the components
    const [AddResponse, setAddResponse] = useState({})

    const [editResponse, setEditResponse] = useState({})

    const [isAuthorized, setIsAuthorized] = useState(true)
  
    return (
    // To provide the context to all component
    <AddProjectResponseStatusContext.Provider value={{AddResponse,setAddResponse}}>
       <EditProjectResponseContext.Provider value={{editResponse,setEditResponse}}>
         <isAuthorizedContext.Provider value={{isAuthorized,setIsAuthorized}}>
          {children}
          </isAuthorizedContext.Provider>
       </EditProjectResponseContext.Provider>
    </AddProjectResponseStatusContext.Provider>
  )
}

export default Context