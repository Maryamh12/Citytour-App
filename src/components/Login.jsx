import { useState } from 'react'
import { API_URL } from "../consts";
import '../style/Login.css'
import { faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({count,setCount}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const onChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(`${API_URL}/login`, formData);
      console.log(data.token);
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.payload.id);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setErrorMessage("");
      navigate("/tourbrows");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      console.log(err);
    }
  };
   setCount(false);
  return (
    
<main className="grid">
<img src="https://images.pexels.com/photos/17411075/pexels-photo-17411075/free-photo-of-street-in-old-town.jpeg?auto=compress&cs=tinysrgb&w=600" 
alt="placeholder" />

<form className="welcomLogin" onSubmit={onSubmit}>
    <div id="container-password">
    <input type="text" id="usernameLogin" name="email" placeholder="email" required value={formData.email} onChange={onChange}/>
    </div>
    <div id="container-password">
      <input type={passwordVisible ? 'text' : 'password'} id="passwordLogin" name="password" placeholder="password" required value={formData.password} onChange={onChange}/>
      {/* <i class="fa-regular fa-eye" id='show-password' onClick={show}></i> */}
      <FontAwesomeIcon icon={passwordVisible ? faEye:faEyeSlash} id='show-password' onClick={togglePasswordVisibility} />
      </div>
      <div id="container-password">
    <input type="submit" id="submitLogin" value="Login"/>
    {(errorMessage)&&(<h3 className='errorMessageLogin'>{errorMessage}</h3>)}
    </div>
    
</form>



</main>
    
   
    
  )
}

export default Login;