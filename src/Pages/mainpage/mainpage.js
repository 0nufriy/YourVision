import React, { useState } from 'react'
import { BrowserRouter, Route, Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import LocalizedStrings from 'react-localization';
import "./mainpage.css"
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
let stringsText = new LocalizedStrings({
  en:{
    Sessions:"Sessions",
    Users:"Users",
    Audiences:"Audiences",
    Exit:"Exit"
  },
  uk: {
    Sessions:"Сеанси",
    Users:"Корист.",
    Audiences:"Паки",
    Exit:"Вихід"
  }
 });

const MainPage = ({language}) => {
  const [indexActive,setIndex] = useState(1) 
  const [exit, setExit] = useState(false)
  
  const location = useLocation();
  var path = location.pathname

  React.useEffect(()=>{
    switch(path){
      case "/sessions":
        setIndex(1)
        break
      case "/audiences":
        setIndex(2)
        break
      case "/users":
        setIndex(3)
        break
      default:
        setIndex(0)
        break
    }
  },[])
  
  async function unLogin(){
    await localStorage.removeItem("TOKEN")
    setExit(true)
  }
  stringsText.setLanguage(language)
  if(exit || !localStorage.getItem("TOKEN")){
    return(
        <Navigate to = "/login"></Navigate>
    )
  }
  function toggleMenu() {
  var menuItems = document.querySelector('.menu-items');
  menuItems.classList.toggle('open');
}
  return (
    <div>
  <div class='UpMenu'>
    <div class='Logo'>
      YourVision
    </div>
    <div class='buttons'>
      <button class='menu-toggle' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class='menu-items'>
    <Link to={'/sessions'}>
      <button onClick={() => setIndex(1)} name={indexActive === 1 ? 'Selected' : 'Unselected'}>
        {stringsText.Sessions}
      </button>
    </Link>
    <Link to={'/audiences'}>
      <button onClick={() => setIndex(2)} name={indexActive === 2 ? 'Selected' : 'Unselected'}>
        {stringsText.Audiences}
      </button>
    </Link>
    <Link to={'/users'}>
      <button onClick={() => setIndex(3)} name={indexActive === 3 ? 'Selected' : 'Unselected'}>
        {stringsText.Users}
      </button>
    </Link>
  </div>
    </div>
    <div class='exit'>
      <button name='exit' onClick={unLogin}>{stringsText.Exit}</button>
    </div>
  </div>
  <Outlet></Outlet>
</div>
  )
}

export default MainPage
