import React, { useState } from 'react'
import "./login.css"
import LocalizedStrings from "react-localization"
import {Navigate} from "react-router-dom"
import {login} from "../http"


let stringsText = new LocalizedStrings({
    en:{
      login:"Login:",
      password:"Password:",
      loginbutton:"login",
      error:"Incorrect login or password",
      loading: "Loading..."
    },
    uk: {
     login:"Логін:",
     password:"Пароль:",
     loginbutton:"Увійти",
     error:"Неправильний логін або пароль",
     loading: "Завантаження..."
    }
   });

const Login = ({langueState, langueStateSet}) => {
   
  const [isLoading,setIsLoading] = useState(false)
  
    stringsText.setLanguage(langueState);
  const [state, setState] = React.useState({
    Textfieldclass: "login",
    errormessage: " " 
  })
  if(localStorage.getItem("TOKEN")){
    return <Navigate to= "/sessions"></Navigate>
  }
  let passwordInput = React.createRef();
  let loginInput = React.createRef();
  function tologin(){
    setIsLoading(true)
    let logintext = loginInput.current.value;
    let passwordtext = passwordInput.current.value;
    let resu;
    login({
      "login": logintext,
      "password": passwordtext
    }).then(response => {
        if(response.role === "user"){
            setState({Textfieldclass: "error",errormessage: stringsText.error});
        }else{
            localStorage.setItem("TOKEN", response.token)
        }
        setIsLoading(false)
    }).catch(error => {
      console.log(error)
      setState({Textfieldclass: "error",errormessage: stringsText.error})
      setIsLoading(false)
  })
  }

  async function chnageLangue(){
    if(langueState === "en"){
      await langueStateSet("uk")
    }else{
      await langueStateSet("en")
    }
    if(state.Textfieldclass === "error"){
        setState({Textfieldclass: state.Textfieldclass, errormessage: stringsText.error});
    }
  }
 
  return (
    <div  className="loginoverlay">
    <div className = "logo">
      YourVision
    </div>
    <div className='buttondiv'>
      <button  type='changelangue' name = "changelangue" onClick={chnageLangue}>{langueState.toUpperCase()}</button>
    </div>
    <div className = "TextUpField">
      {stringsText.login}
    </div>
    <div className = "TextField">
        <input name = {state.Textfieldclass}  ref={loginInput}></input>
    </div>
    <div className = "TextUpField">
    {stringsText.password}
    </div>
    <div className = "TextField">
        <input type= "password" name = {state.Textfieldclass} ref={passwordInput}></input>
    </div>
    <div className = "errormesage" style={{color: state.color}}>
      {state.errormessage}
    </div>
    <div className='buttondiv'>
      <button className="" type='submit' disabled={isLoading} name = "ApllayLogin1" onClick={tologin}>{isLoading ? stringsText.loading: stringsText.loginbutton}
      </button>
    </div>
   
</div>
  )
}

export default Login
