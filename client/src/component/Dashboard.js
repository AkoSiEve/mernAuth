import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Button} from 'react-bootstrap'

const Dashboard = () => {
  const navigate = useNavigate()
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''

  const fetchUserInfo = async () =>{
    try{
      const config ={
       headers:{
        Authorization: `Bearer ${userInfo.token}`,
       }
      }

      const userAuth = await axios.get('http://localhost:8000/dashboard',config) 
      console.log(userAuth)
    }catch(err){
      console.log(err.message)
    }
  }

  //redirect of no localstore
  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  })
  
  fetchUserInfo()
  const onCLickHandling = () => {
    try{
      localStorage.removeItem("userInfo")
      alert('nice logout')
      navigate('/login')
    }catch(err){
      console.log(err.message)
    }
  }
  
  return (
    <div>Dashboard
      <br />

        <h1 style={{textAlign:"center"}}>welcome {userInfo.firstname}</h1>

      <Button onClick={onCLickHandling}>
        Logout
      </Button>
    </div>
  )
}

export default Dashboard