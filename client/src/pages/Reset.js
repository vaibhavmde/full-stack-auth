import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Reset = () => {
  const [otp, setOtp] = useState('');
  const [newPassword,setPassword] = useState('') 
  
  const navigate = useNavigate();

  
  const handleClick = async(e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post('/reset',
     JSON.stringify({otp,newPassword}),
     {
       headers: { "Content-Type": "application/json" }
     });    
     if(res.data==='Password Reset successfully'){
       alert('Password reset successfully');
       navigate('/login');
      }else{
        alert(res.data); 
      }
    } catch (error) {
        alert(error.message);
    }
  }
  
  return (
    <Container>
    <Form onSubmit={handleClick}>
      <Input type='number' required autoComplete="off" value={otp}
      onChange={(e)=>{setOtp(e.target.value)}} placeholder="enter the recieved otp..." />
      <Input type='password' required autoComplete="off" value={newPassword}
      onChange={(e)=>{setPassword(e.target.value)}} placeholder="New password..." />
      <Button type='submit'>Reset</Button>
    </Form>
  </Container>
);
};

export default Reset;


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
  justify-content: center;`;

  const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  margin: 20px;
  padding: 15px 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;