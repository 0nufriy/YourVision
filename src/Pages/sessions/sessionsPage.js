import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import SessionsTable from './sessionstable';



let stringsText = new LocalizedStrings({
    en:{
      Search:"Seacrh by username",
      SearchDate:"Seacrh by date",
      Applay:"Applay",
      Reset: "Reset"
    },
    uk: {
        Search:"Пошук по ніку",
        SearchDate:"Пошук по даті",
        Applay:"Пошук",
        Reset: "Зкинути"
    }
   });
  

const SessionsPage = ({language}) => {
    
  stringsText.setLanguage(language)
    const filterUser = React.createRef()
    const filterDate = React.createRef()
    const [fil,setFilter] = useState("")
    
    const [filData,setFilterData] = useState("")
    function doFilter(){
        setFilter(filterUser.current.value)
        setFilterData(filterDate.current.value)
    }
    function resetFilter(){
      setFilter("")
      setFilterData("")
      filterUser.current.value = ""
      filterDate.current.value = ""
    }
  return (
    <div>
      <div className="UpFilterMenu">
        <div className="Fileter">
            <div className="FilterText">
                {stringsText.Search}
            </div>
            <input name="FilterInput" ref={filterUser}>
            </input>
        </div>
        <div className="Fileter">
            <div className="FilterText">
                {stringsText.SearchDate}
            </div>
            <input type="date" name="FilterInput" ref={filterDate}>
            </input>
        </div>
        <button name="ApplayFilter" onClick={doFilter}>{stringsText.Applay}</button>
        <button name="ApplayFilter" onClick={resetFilter}>{stringsText.Reset}</button>
      </div>
    <SessionsTable language={language} filter = {fil} filterDate = {filData}></SessionsTable>
    </div>
  )
}

export default SessionsPage