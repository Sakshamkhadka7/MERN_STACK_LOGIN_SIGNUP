import React from 'react'
// import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const Home = () => {

 const [loggedInUser,setLoggedInUser]=useState(()=>{
  return localStorage.getItem('loggedInUser') || "";
 });

 const [products,setProducts]=useState([]);
 
 const navigate=useNavigate();
 

 const handleLogout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('loggedInUser');
  handleSuccess("User Logout");
  setTimeout(()=>{
        navigate('/login');

  },1000)
 }


const fetchProduct= async()=>{
  try{
     
    const url="http://localhost:8080/product";
    const headers={
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    }
     

    const response=await fetch(url,headers);
    const result =await response.json();
    console.log(result);
    setProducts(result)
    console.log(products);

  }catch(error){
    console.log(error);
  }
}

 useEffect(()=>{
  fetchProduct();
 },[]);


  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products.map((item,index)=>{
            return (
                 <ul key={index}>
              <span>{item.name}:{item.price}</span>
            </ul>
            );
          })
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home