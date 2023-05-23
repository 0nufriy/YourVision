import React, { useState } from 'react'

import LocalizedStrings from 'react-localization';
import { useNavigate } from 'react-router-dom';
import UserTable from './UserTable';

let stringsText = new LocalizedStrings({
    en:{
      Search:"Seacrh by login",
      Applay:"Applay",
      Add:"Register New Account",
      Reset: "Reset"
    },
    uk: {
        Search:"Пошук по логіну",
        Applay:"Пошук",
        Add:"Зарееструвати новий аккаунт",
        Reset: "Зкинути"
    }
   });
const UserPage = ({language}) => {
 
    stringsText.setLanguage(language)
    const filter = React.createRef()
    const [fil,setFilter] = useState("")
    const navigate = useNavigate()
    function doFilter(){
        setFilter(filter.current.value)
    }
    function resetFilter(){
      setFilter("")
      filter.current.value = ""
    }
    function register(){
        navigate("/users/add")
    }
  return (
    <div>
        
      <div className="UpFilterMenu">
        <div  className='AddButtonDivInPage'>
            <button name="ApplayFilter" style={{width: "150px"}} onClick={register}>{stringsText.Add}</button>
        </div>
        <div className="Fileter">
            <div className="FilterText">
                {stringsText.Search}
            </div>
            <input name="FilterInput" ref={filter}>
            </input>
        </div>
        <button name="ApplayFilter" onClick={doFilter}>{stringsText.Applay}</button>
        <button name="ApplayFilter" onClick={resetFilter}>{stringsText.Reset}</button>
      </div>
      <UserTable language={language} filter={fil}></UserTable>
    </div>
  )
}

export default UserPage
