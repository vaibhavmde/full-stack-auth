import { useState } from "react";
import styled from "styled-components";
import { useNavigate ,Link} from "react-router-dom";
import { publicRequest } from "../requestMethods";


const Forgot = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post('/forgot',
     JSON.stringify({ email }),
     {
       headers: { "Content-Type": "application/json" }
     });
     setEmail('');
     await console.log(res);
     if(res.data==='Mail sent successfully'){
       alert('Mail sent successfully');
       navigate('/reset');
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
        <Input type='email'  autoComplete="off" value={email}
        onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email..." required/>
        <Button type='submit'>Send Otp</Button>
        <Link to='/login'>Login</Link>
      </Form>
    </Container>
  );
};

export default Forgot;

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
  width: 35%;
  border: none;
  margin: 15px;
  padding: 20px 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;