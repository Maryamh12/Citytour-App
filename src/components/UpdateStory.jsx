import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../consts";
import { useNavigate, useParams } from "react-router-dom";
import '../style/UpdateStory.css';

const UpdateStory = ({count,setCount ,fetchingComment, setFetchingComment}) => {
    const navigate = useNavigate();
    const { cityId, storyId } = useParams();
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
   
    const storedStory = localStorage.getItem('story');
    const itemStory = storedStory ? JSON.parse(storedStory) : null;

    const initialFormData =(itemStory)? 
    {
        name: itemStory.name,
        image: itemStory.image,
        description: itemStory.description,
      }:
      {
        name: "",
        image: null,
        description: "",
      };

    const [formData , setFormData]= useState(initialFormData); 

    // This ref will be used to initialize the widget only once
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

    const handleImageUpload = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        }
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrorMessage("");
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch(`${API_URL}/story/${cityId}/${storyId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            });
            console.log(data);
            setFetchingComment(!fetchingComment);
            setErrorMessage("");
            navigate("/tourbrows");
        } catch (err) {
            console.error(err.response.data);
            setErrorMessage(err.response.data.message);
        }
    };

    return (
        <div className="updatePage">
            <form className="Update-form" onSubmit={onSubmit}>
                <div className="inputUpdateImage" 
                 style={{ backgroundImage: image ? `url(${image})`:`url(${formData.image})` }}
                 onClick={handleImageUpload}>
                   
                <img id="inputImageUpdateSource" src="https://cdn-icons-png.flaticon.com/128/8191/8191607.png" alt="Placeholder"/>
                </div>
                <input
                    className="inputUpdate"
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={onChange}
                />
                <textarea
                    id="descriptionText"
                    name="description"
                    value={formData.description}
                    placeholder="Description"
                    onChange={onChange}
                ></textarea>
                <button className="buttonUpdate" type="submit">Update your story</button>
                {(errorMessage)&&(<h5 className='errorMessageUpdate'>{errorMessage}</h5>)}
            </form>
            <video src="https://videos.pexels.com/video-files/854141/854141-sd_640_360_25fps.mp4" className="updateVideo" autoPlay muted loop></video>
        </div>
    );
};

export default UpdateStory;
