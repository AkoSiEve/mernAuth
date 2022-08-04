import React, { useState } from "react";
import { Container,Form,Button } from "react-bootstrap";
import axios from 'axios'

const Register = () => {

  //declaring user state
  const [user,setUser] = useState({
    firstname:'',
    lastname:'',
    email:'',
    password:'',
  })

  const onChangeHandling = (event) => {
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
      const userRegister = await axios.post('http://localhost:8000/register',user)
      
      if(userRegister.status===201){
        alert('nice create')
      }

    }catch(err){
      console.log(err.message)
    }

  }

  return (
    <>
      <Container style={{width:"50%",padding:"5%"}}>
        <Form onSubmit={onSubmitHandling}>
          <h3>Register</h3>
          <Form.Group className="mb-3" >
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder="firstname" name="firstname" value={user.firstname} onChange={onChangeHandling}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lastname</Form.Label>
            <Form.Control type="text" placeholder="lastname" name="lastname" value={user.lastname} onChange={onChangeHandling}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onChangeHandling}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={onChangeHandling}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
