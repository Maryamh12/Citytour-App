
import { Link } from 'react-router-dom'
// import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../style/Navbar.css'
import { API_URL } from "../consts";

const Navbar = ({count,setCount}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeManu, setActiveMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false)
}, [location]);


  // const onClick = () => {
  //   setLoggedIn(true);
  // };

  const logoutDrink = () => {
  
    
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    navigate("/");
    console.log(loggedIn)

    
    try{
        axios.defaults.headers.common["Authorization"]="";
        
    }catch(err){
        console.log(err);
    }
  };
  
  const clickMenu = () => {
    setActiveMenu(!activeManu);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <header className={count ? "noGrid" : "gridD"} id={activeManu? 'activeHeader':'noHeader'}>
       
    <div className='imageHeader'>
    {/* <img src="data:image/jpeg;base64,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" 
    alt="placeholder"/> */}
    <img src="https://cdn-icons-png.flaticon.com/128/2451/2451474.png" alt="" />
    <h1>City Tour</h1>
    </div>
    {windowWidth>1000 &&(<nav className= 'nav-menu' >
      <Link id='aTag' to="/" > <li  >Home</li></Link>
      <Link id='aTag'  to="/TourBrows" > <li >TourBrows</li></Link>
      {(loggedIn)?(
      <Link id='aTag' to="/" onClick={() => logoutDrink()}> <li >Logout</li></Link>
      ):(
        <>
      <Link id='aTag' to="/login" > <li >Login</li></Link>
      <Link id='aTag' to="/register" > <li >Register</li></Link>
      </>
      )}
    </nav>)}
    
    {windowWidth<=1000 && (
      <div className= {activeManu? 'active-right':'noActive-right'}>
      <div className={activeManu? 'activeHamburger':'hamburger'} onClick={clickMenu}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
      <nav className= {activeManu? 'activeNav':(count ? 'noNav-menuWin':'nav-menuWin')} >
      <Link id='aTag' to="/" > <li  >Home</li></Link>
      <Link id='aTag'  to="/TourBrows" > <li >TourBrows</li></Link>
      {loggedIn && (
      <Link id='aTag' to="/" onClick={() => logoutDrink()}> <li >Logout</li></Link>
      )}
      {!loggedIn && (
      <Link id='aTag' to="/login" onClick={() => onClick()}> <li >Login</li></Link>
      )}
      {!loggedIn && (
      <Link id='aTag' to="/register" > <li >Register</li></Link>
      )}
      </nav>
      </div>
      )}
    </header>
  )
}

export default Navbar;