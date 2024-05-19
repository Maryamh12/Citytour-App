import { useState , u } from 'react'
import { Link } from "react-router-dom";
import '../style/Main.css'
import { API_URL } from "../consts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = ({count,setCount}) => {
  const [formData, setFormData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});
  const navigate = useNavigate();
  
  const onChange = (e) => {
    setQuery(e.target.value);
    setErrorMessage("");
  };

  const handleClick = async(e) => {
    if (!query) {
      e.preventDefault();
      setErrorMessage("Please enter the name of your city");
      console.log(errorMessage);
    }else{
      setErrorMessage("");
      try {
        const {data} = await axios.post(`${API_URL}/search/`, { query });
        console.log(data.data[0]);
        console.log(data);
        if (data.data[0]){
          localStorage.setItem("city", JSON.stringify(data.data[0]));
          console.log(results);
          navigate("/tourbrows");

        }else{
          setErrorMessage(data.message);
          console.log(data.message)
        }
    
      } catch (error) {
          console.error('Error searching:', error.response.data.message);
          setErrorMessage(error.response.data.message);
          console.log(error.response.data.message)
      }
      
    }
    
  };
  const handleKeyPress = (event) => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
      // Prevent default behavior of the Enter key (form submission, etc.)
      event.preventDefault();
      // Programmatically trigger a click event on the button
      document.getElementById("link").click();
    }
  };
  
  setCount(false);

  return (
    <div className="grid" id='mainPage'>
      <video src="https://videos.pexels.com/video-files/5941316/5941316-sd_640_360_30fps.mp4"  autoPlay muted loop >
       </video>
        <div class="welcomm">
        <h2>Welcome</h2>
        <p>Once upon a time, nestled between rolling
            hills and shimmering rivers, there existed
            a city like no other. Welcome to our enchanting
            realm, where history whispers through cobblestone
            streets, and each corner holds a tale waiting to be discovered!
            </p>
        </div>
       
        
       <div className="inputsign">
       <input
          className="inputinside"
          type="text"
          value={query}
          placeholder="The name of your city"
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      
          <button className="buttonsign" id='link' type="button" onClick={handleClick}>
          <img src="https://cdn-icons-png.flaticon.com/128/3031/3031293.png" alt="" className="buttonimage"/>
          </button>
        
        {(errorMessage)&&(<h3 className='errorMessage'>{errorMessage}</h3>)}
       </div>
        
    </div>
  )
}

export default Main;