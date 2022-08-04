import React, { useEffect, useState } from 'react'
import { Container,Form,Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  const userInfo = localStorage.getItem('userInfo')
  const navigate = useNavigate()

  const [user,setUser] = useState({
    email:'',
    password:''

  })

  const onChangeHandling = (event) =>{
    event.preventDefault()

    const {name,value} = event.target
    
    setUser((prevInput)=>{
      return {
        ...prevInput,
        [name]:value
      }
    })
  }

  const onSubmitHandling = async (event) =>{
    event.preventDefault()
    try{
      const userLogin = await axios.post('http://localhost:8000/login',user)
      
      if(userLogin.data.success){
        alert('nice')
        localStorage.setItem('userInfo',JSON.stringify(userLogin.data))//store to application tab on developer tool
        navigate('/dashboard')

      }else{
        alert('invalid email && address')
      }

    }catch(err){
      console.log(err.message)
    }
  }

  //redirect to dashboard
  useEffect(()=>{
    if(userInfo){
      navigate('/dashboard')
    }
  })

  return (
    <>
      <Container style={{width:"50%",padding:"5%"}}>
        <Form onSubmit={onSubmitHandling}>
          <h3>Login</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onChangeHandling}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={onChangeHandling}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login