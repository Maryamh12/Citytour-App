import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/Tourbrows.css'
import axios from "axios";
import { API_URL } from "../consts";


const Tourbrows = ({count,setCount ,fetchingComment, setFetchingComment}) => {
  const [cityData , setCityData]= useState([]);
  const [story , setStory]= useState([]);
  const [comment , setComment] = useState([])
  const [commentStory , setCommentStory] = useState([])
  const [commentData , setCommentData] = useState(false)
  const [cityId , setCityId] = useState();
  const [storyId , setStoryId] = useState();
  const [commentShow , setCommentShow] = useState();
  const [storyIndex , setStoryIndex] = useState(0);
  const [cityIndex , setCityIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  
  setCount(false);
  const storedCity = localStorage.getItem('city');
  const item = storedCity ? JSON.parse(storedCity) : null;
  console.log(item);

  useEffect (()=> {
     
    const fetchData = async()=> {
      const {data} = await axios.get(`${API_URL}/cats/`);
      console.log(data);
      setCityData(data);
      
      if(item){
        setCityId(item._id);
        
        setCityIndex(data.findIndex(obj => obj._id === item._id));
        console.log(data.findIndex(obj => obj._id === item._id));
        console.log(item);
        setStory(data[data.findIndex(obj => obj._id === item._id)].storys);
        setStoryIndex(0);
        localStorage.removeItem("city");
        console.log(true);
      }else{
        setCityId(data[0]._id);
        setCityIndex(0);
        setStory(data[0].storys);
        setStoryIndex(0);
        console.log(false);
      }
      console.log(story);
      $('.carousel').carousel();
    };
   
    fetchData();

    }, [fetchingComment]);
  console.log(story);
  useEffect(() => {
   
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      window.$(carousel).carousel();
    }
  }, [story]); 



  
  const checkStory = (index)=> {
   
    localStorage.setItem("city", JSON.stringify(cityData[cityIndex]));
    localStorage.setItem("story", JSON.stringify(story[index]));
  }
  const createStory = (index)=> {
  
    localStorage.setItem("city", JSON.stringify(cityData[index]));
    // localStorage.setItem("story", JSON.stringify(story[index]));
  }

  const checkAlbum = (index)=> {
    setStory(cityData[index].storys);
    console.log(cityData[index]);
    setCityId(cityData[index]._id);
    setCityIndex(index);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
  }

  const showComment = (index) => {
    setCommentData(true);
    
    setCommentStory(story[index]);
    setStoryId(story[index]._id);
    setCommentShow(story[index].comments)
    setStoryIndex(index);
    console.log(story[index].comments);
    console.log(storyId);
    console.log(story[index]._id);
    console.log(cityId);
  }
  const closeComment = ()=> {
    setCommentData(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
  }

  

  const initialFormData = 
    {
      text: "",
      };

  const [formData , setFormData]= useState(initialFormData); 


  const updateN = axios.defaults.headers.common["Authorization"]=`Bearer ${localStorage.token}`;
  console.log(updateN);




  const onChange = (e)=> {
    
    console.log({...formData, [e.target.name]:e.target.value});
    setFormData({...formData, [e.target.name]:e.target.value});
    
    
    }


    const onSubmit = async(e) => {
      e.preventDefault();
      console.log(formData);
  
      

  
      try {
        const {data} =await axios.post(`${API_URL}/comment/${cityId}/${storyId}`, formData);
        console.log(formData);
        console.log(commentShow)
        console.log(commentShow.push(data.comment));
        
        setFormData(initialFormData);
       

        const fetchDataComment = async()=> {
          const {data} = await axios.get(`${API_URL}/cats/`);
          console.log(data);
          setCityData(data);
          console.log(cityIndex)
          setStory(data[cityIndex].storys);
          console.log(story);
         
          $('.carousel').carousel();
          };
        fetchDataComment();
  
      }catch(err){
         
        console.log(err);
      }};
  
  
  
  const inputFields = [
    
    {
      placeholder: "text",
      name: "text",
      type:"text", 
      value: "text"
    }
  ]
  
  
const handleLike = async (storyId) => {
  try {
    const response = await axios.post(`${API_URL}/story/${storyId}/like`);
    if (response.data.success) {
      console.log('Like updated:', response.data.likes);
      
    }
    const fetchDataLike = async()=> {
      const {data} = await axios.get(`${API_URL}/cats/`);
      console.log(data);
      setCityData(data);
      console.log(cityIndex)
      setStory(data[cityIndex].storys);
      console.log(story);
     
      $('.carousel').carousel();
      };
      fetchDataLike();
  } catch (error) {
    console.error('Error liking the story:', error);
    setErrorMessage(error.response.data.message);

  }
};



  return (
    <div className="gridTour" id='main'>
      {!commentData && (
      
      <div className="carousel slide" id="myCarousel" data-ride="carousel" data-interval="2000000">
        <div className="carousel-inner" id="carousel">
          {story.map((storys, index) => (
            <div
            key={index}
            className={`item ${index === 0 ? 'active' : ''}`}
            id="itemActive"
            >
              <img
                className="image imageId"
                id="imageId"
                src={storys.image}
                alt="placeholder"
              />
              <div className="welcom welcomId" id="welcomId">
                <h2>{storys.name}</h2>
                <p>{storys.description}</p>
                <div className='btnContain'>
                  <button
                    className="btnComment"
                    onClick={() =>showComment(index)}
                  >
                    <img
                      className="imageComment"
                      
                      src="https://cdn-icons-png.flaticon.com/128/3690/3690710.png"
                      alt="placeholder"
                    />
                     {/* <h5 className='errorMessageUpdate'>Please Put your comment</h5> */}
                  </button>
                  <Link  className='aTag' to ={`/story/${cityId}/${storys._id}`}>
                  <button
                    className="btnComment"
                    onClick={()=>checkStory(index)}
                  >
                    <img
                      className="imageComment"
                      
                      src="https://cdn-icons-png.flaticon.com/128/7073/7073677.png"
                      alt="placeholder"
                    />
                     {/* {(errorMessage)&&(<h5 className='errorMessageUpdate'>{errorMessage}</h5>)} */}
                  </button>
                  </Link>
                  <button
                    className="btnComment"
                    onClick={() => handleLike(storys._id)}> 
                   
                    <ion-icon name="heart" id="heartd"></ion-icon>
                    {/* {(errorMessage)&&(<h5 className='errorMessageUpdate'>{errorMessage}</h5>)} */}
                  </button>
                  <h3 id='tagStoryLike'>{storys.likes.length}</h3>
                </div>
              </div>
            </div>
              ))}
      </div>
      
        <a className="left carousel-control" id="arrowTagLeft" href="#myCarousel" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left"></span> 
          
        </a>
        <a className="right carousel-control" id="arrowTagRight" href="#myCarousel" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right"></span>
            
        </a>


      
  </div>

  )}

{commentData && (

        <div
        
        className="item"
        id="itemActive"
        >
        <img
            className="image imageId"
            
            src={commentStory.image}
            alt="placeholder"
        />
        <div className="welcom welcomId" id="welcomId">
            <h2>{commentStory.name}</h2>
            <p>{commentStory.description}</p>
            
        </div>
        </div>
     
       )}


        <div className="main"></div>
        {!commentData && (
        <div className='carddContainer'>
    {cityData.map((element,index)=> (
           
            <article className="cardd" key={element.name} >
            <img src={element.image} 
            alt="placeholder" />
            <h3>{element.name}</h3>

            <p> {element.text}
            </p>
                <div className="heart">
                   <button className='cardd-button' onClick={()=>checkAlbum(index)}>Show me</button>
                   <Link   to ={`/createstory/${element._id}`}>
                   <button className='cardd-button' onClick={()=>createStory(index)}>Create Strory</button>
                   </Link>
                   
                
                    
                </div>
                
            </article>
          
    ))  
     } 
  
  </div>
  )} 
{commentData && (

<div

  className="item"
  id="itemActive"
>

<div className="welcomComment">
    <div
    className="itemComment"
    >
       
        <h2 className="commentText">Comments:</h2>
    </div>
{commentShow.map((comments) => (
    <div
    className="itemComment"
    >
       
        <h4 className="commentText">{comments.text}</h4>
    </div>
))}
                            



    <form className="Create-form" id='createForm' onSubmit={onSubmit}>
               
     
      <label for="commentText">Enter your comment :</label>
      <textarea id="commentText" name="text" value={formData.text} placeholder='Please put your comment'  onChange={onChange}></textarea><br></br>
      

      <div className='buttonContainingforComment'>
        <button className="buttonCreateComment" type="submit"> Create your Comment</button>
        <button
        className="btnCommentClose"
        onClick={() =>closeComment()}
        >Close
  
        </button>
      </div>     
    </form>   
    
 
</div>
</div>

)}




</div>
  )
}

export default Tourbrows;