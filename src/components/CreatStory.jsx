import {useState , useEffect, useRef} from "react";
import axios from "axios";
import { API_URL } from "../consts";
import { Link , useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../style/CreatStory.css'





const CreatStory = ({count,setCount ,fetchingComment, setFetchingComment}) => {
    const navigate = useNavigate();
    const [drink , setDrink]= useState([]);
    const [edit , setEdit] = useState("");
    const [nonEdit , setNonEdit]= useState(true);
    const [error , setError]= useState("");
    const [confirmationMessage , setConfirmationMessage]=useState("");
    const [foundId , setFoundId]= useState(localStorage.userId);
    const [image , setImage] = useState("");
    const inputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    

    const initialFormData = 
    {
        name: "This is my story",
        image: null,
        description: "My Story",
      };

    const [formData , setFormData]= useState(initialFormData); 

    const {id} = useParams();
    console.log(id);
    const updateN = axios.defaults.headers.common["Authorization"]=`Bearer ${localStorage.token}`;
    console.log(updateN);

    const widgetRef = useRef(null);

    useEffect(() => {
        // Dynamically load the Cloudinary script
        const script = document.createElement('script');
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
        script.async = true;
        script.onload = () => {
            // Initialize the widget once the script is loaded
            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: 'dwxrq5htq',
                uploadPreset: 'rtjhoiu5',
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('File uploaded:', result.info.url);
                    setImage(result.info.url); // Set image URL for display
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        image: result.info.url // Update form data with the image URL
                    }));
                }
            });
        };

        document.body.appendChild(script);

        return () => {
            // Clean up the script when the component unmounts
            document.body.removeChild(script);
        };
    }, []);

    const handleImageClick = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        }
    };

    const onChange = (e) => {
        setConfirmationMessage("");
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrorMessage("");
    };



const onSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    try {
        const {data} = await axios.post(`${API_URL}/story/${id}`, formData);
        console.log(formData);
        console.log(data);
        setFetchingComment(!fetchingComment);
        navigate("/tourbrows");

    }catch(err){
        
        console.log(err);
        setErrorMessage(err.response.data.message);
    }};




const inputFields = [
 
    {
        placeholder: "name",
        name: "name",
        type:"text", 
        value: "name"
    },
    {
        placeholder: "description",
        name: "description",
        type:"text",
        value: "description"
    }
]



return (
        
    <div className="createpage" >
            <img id="inputImageSourceLeft" src="https://images.pexels.com/photos/3331837/pexels-photo-3331837.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>

          
         <form className="Update-form" onSubmit={onSubmit}>
                <div className="inputUpdateImage" 
                 style={{ backgroundImage: image ? `url(${image})`:`url(https://images.pexels.com/photos/164357/pexels-photo-164357.jpeg?auto=compress&cs=tinysrgb&w=600)` }}
                 onClick={handleImageClick}>
                   
                <img id="inputImageUpdateSource" src="https://cdn-icons-png.flaticon.com/128/8191/8191581.png" alt="Placeholder"/>
                </div>
                <input
                    className="inputUpdate"
                    placeholder="Name"
                    name="name"
                    type="text"
                 
                    onChange={onChange}
                />
                <textarea
                    id="descriptionText"
                    name="description"
                    
                    placeholder="Description"
                    onChange={onChange}
                ></textarea>
                <button className="buttonUpdate" type="submit">Create your story</button>
                {(errorMessage)&&(<h5 className='errorMessageUpdate'>{errorMessage}</h5>)}
            </form>
                
        
    </div>

 )



}

export default CreatStory;




