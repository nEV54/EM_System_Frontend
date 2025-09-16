import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const RoleBasedRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()

    if(loading){
       return <div>Loading ...</div>
    }

    if(!requiredRole.includes(user.role)) {
        <Navigate to ="/unauthorized" />
    }
    console.log(user)
    return user ? children : <Navigate to="/login" />
  
}

export default RoleBasedRoutes