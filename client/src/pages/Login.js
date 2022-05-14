import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import { publicRequest } from "../requestMethods";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleClick = async(e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/login", {username,password});
      console.log(res.data);
      if(res.data==='Incorrect Password')
      {
        alert(res.data)
      }if(res.data.username){
        dispatch(loginSuccess(res.data));
        alert('Login successfully')
      }
        
    } catch (err) {
      if(err.message==='Request failed with status code 401'){
         alert('Invalid user')
      } 
    }  
  };

 
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type='submit'>
            LOGIN
          </Button>
          <REF><Link to='/forgot'>FORGOT PASSWORD?</Link></REF>
          <REF><Link to='/register'>CREATE A NEW ACCOUNT</Link></REF>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color:white;
    cursor: not-allowed;
  }
`;

const REF = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
