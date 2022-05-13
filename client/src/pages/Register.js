import styled from "styled-components";
import { useState } from "react";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import {Link,useNavigate} from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;



const Register = () => {

  const navigate = useNavigate();
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:""
  })

  const handleValue = (e) => {
    setUser({...user,[e.target.name]:e.target.value});
  }
  const handleClick = async(e) => {
    e.preventDefault();
    try{
    const res = await publicRequest.post('/register',user);
    console.log(res.data);
     if(res.data==='User created sucessfully'){
       await alert('User created sucessfully');
       navigate('/login')
     }
    } catch(error){
      if(error.message==='Request failed with status code 409'){
        alert('Username already Exist');
      }else{
       alert(error.message);
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleClick}>
          <Input type='text' required autoComplete="off" placeholder="username" name='username' value={user.username} onChange={handleValue}/>
          <Input type='email'  required placeholder="email" name='email' value={user.email} onChange={handleValue}/>
          <Input type='password' required placeholder="password" name='password' value={user.password} onChange={handleValue} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type='submit'>CREATE</Button>
          <Link to='/login' style={{
            'fontSize':'14px',
            'textDecoration': 'none',
            'color':'white',
            'backgroundColor':"blue",
            'padding':'15px',
            'marginLeft':"30px"
        }}>Login</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;