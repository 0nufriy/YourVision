import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AudiencePackAdd from './Pages/audiences/audience/AudiencePackAdd';
import AudiencePackDetail from './Pages/audiences/audience/AudiencePackDetail';
import AudiencePage from './Pages/audiences/AudiencePage.js';
import Login from './Pages/login/login';
import MainPage from './Pages/mainpage/mainpage';
import SessionDetail from './Pages/sessions/sesiondetail/sesiondetail';
import SessionsPage from './Pages/sessions/sessionsPage';
import UserAdd from './Pages/users/user/UserAdd';
import UserDetail from './Pages/users/user/UserDetail';
import UserPage from './Pages/users/UserPage';

function App() {
  
  const [lang,setLang] = useState("")
  
  React.useEffect(()=>{
    if(lang != ""){
      localStorage.setItem("LANGUAGE",lang)
    }
  },[lang])
  React.useEffect(()=>{
    if(!localStorage.getItem("LANGUAGE")){
      setLang("en")
    }else{
      setLang(localStorage.getItem("LANGUAGE"))
    }
  },[])

  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route index path='/login' element={
          <Login langueState = {lang} langueStateSet = {setLang} ></Login>
        }>
        </Route>
        
        <Route path='/' element={
            <MainPage language={lang} >  </MainPage>
        }>
           <Route index element={
                <Navigate to="/sessions"></Navigate>
        }></Route>
        <Route path='/sessions' element={
                <SessionsPage  language={lang} ></SessionsPage>
        }></Route>
        <Route  path='/sessions/detail' element={
          <SessionDetail language={lang}></SessionDetail>
        }></Route>
        <Route  path='/audiences' element={
          <AudiencePage language={lang}></AudiencePage>
        }></Route>
        <Route  path='/audiences/add' element={
          <AudiencePackAdd language={lang}></AudiencePackAdd> 
        }></Route>
        <Route  path='/audiences/detail' element={
          <AudiencePackDetail language={lang}></AudiencePackDetail> 
        }></Route>
        <Route  path='/users' element={
          <UserPage language={lang}></UserPage>
        }></Route>
        <Route  path='/users/detail' element={
          <UserDetail language={lang}></UserDetail>
        }></Route>
        <Route  path='/users/add' element={
          <UserAdd language={lang}></UserAdd>
        }></Route>
        </Route>
        
        <Route index path='*' element={
            <Navigate to="/login"></Navigate>
        }></Route>
      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
