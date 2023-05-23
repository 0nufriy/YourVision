import React, { useState } from 'react'

import LocalizedStrings from 'react-localization';
import { useNavigate } from 'react-router-dom';
import AudienceTable from './AudienceTable';



let stringsText = new LocalizedStrings({
    en:{
      Search:"Seacrh by name",
      Applay:"Applay",
      Add:"Add new Pack",
      Reset: "Reset"
    },
    uk: {
        Search:"Пошук по назві",
        Applay:"Пошук",
        Add:"Додати новий пак",
        Reset: "Зкинути"
    }
   });
const AudiencePage = ({language}) => {
  
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
    function addAudiencePack(){
        navigate("/audiences/add")
    }
  return (
    <div>
      <div className="UpFilterMenu">
        <div  className='AddButtonDivInPage'>
            <button name="ApplayFilter" onClick={addAudiencePack}>{stringsText.Add}</button>
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
    <AudienceTable language={language} filter={fil}></AudienceTable>
    </div>
  )
}

export default AudiencePage
