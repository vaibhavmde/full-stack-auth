import { loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  
  try {
    const res = await publicRequest.post("/login", user);
    console.log(res.data);
    if(res.data==='Incorrect Password')
    {
      alert(res.data);
    }if(res.data.username){
      await dispatch(loginSuccess(res.data));
    }
      
  } catch (err) {
    if(err.message==='Request failed with status code 401'){
      console.log(err.message)
      alert('Invalid user');
    }
    
  }
};