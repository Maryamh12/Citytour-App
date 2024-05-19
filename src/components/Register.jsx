import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/Register.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../consts";
const Register = ({count,setCount}) => {
  const initialFormData = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onChange = (e) => {
    console.log({ ...formData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(`${API_URL}/register`, formData);
      console.log(formData);
      console.log(res);
      setFormData(initialFormData);
      setErrorMessage("");
      navigate("/login");
    } catch (err) {
      // setError(err.response.data.message);
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
  };
  const inputFields = [
    {
      placeholder: "username",
      name: "userName",
      type: "string",
    },
    {
      placeholder: "email",
      name: "email",
      type: "email",
    },
    {
      placeholder: "password",
      type: "password",
      name: "password",
    },
    {
      placeholder: "confirmpassword",
      name: "confirmPassword",
      type: "password",
    },
  ];
  
  setCount(true);

  return (
    <main class="grid" id="mainRegister">
        
        <form class="welcomRegister" onSubmit={onSubmit}>
            
          {inputFields.map((input) => {
            return (
              <input
                id={input.placeholder}
                placeholder={input.placeholder}
                name={input.name}
                type={input.type}
                value={formData.name}
                onChange={onChange}
              />
            );
          })}
            <div id="container-password">
            <input type="submit" id="submit" value="Register"/>
            {(errorMessage)&&(<h3 className='errorMessageRegister'>{errorMessage}</h3>)}
            </div>
        </form>
        
  

    </main>
  )
}

export default Register;