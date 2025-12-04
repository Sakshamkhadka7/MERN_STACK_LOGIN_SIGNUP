import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setAuthenticate}) => {
 
    const location=useLocation();
    const navigate=useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
           setAuthenticate(true);
           if(location.pathname === '/' || location.pathname==='/login' || location.pathname === '/signup'){
            navigate('/home',{replace:false});
           }
        }
    },[location,navigate,setAuthenticate]);

  return (
   null
  )
}

export default RefreshHandler