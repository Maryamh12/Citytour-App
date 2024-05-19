import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../style/Footer.css'
import '../index.css'
import { API_URL } from "../consts";

const Footer = () => {
  const [count, setCount] = useState(0)

  return (
    <footer className="gridd">
      <nav>
        <a href="#"><ion-icon name="logo-github" class="imo"></ion-icon></a>
        <a href="#"><ion-icon name="logo-linkedin" class="imo"></ion-icon></a>
        <a href="#"><ion-icon name="logo-mastodon" class="imo"></ion-icon></a>
      </nav>
    </footer>
  )
}

export default Footer;