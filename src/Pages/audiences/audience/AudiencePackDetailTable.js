import React from 'react'
import LocalizedStrings from 'react-localization';
import { Navigate, useLocation } from 'react-router-dom';
let stringsText = new LocalizedStrings({
    en:{
        ID: "Audience Id",
        Age: "Age",
        Sex: "Sex",
        Count: "Count",
        Delete: "Delete",
        YersOld: "y.o.",
        Man:"Man",
        Woman: "Woman"
    },
    uk: {
        ID: "ID людини",
        Age: "Вік",
        Sex: "Стать",
        Count: "Кількість",
        Delete: "Видалити",
        YersOld: "років",
        Man:"Чоловік",
        Woman: "Жінка"
    }
   });

const AudiencePackDetailTable = ({language, audiences,setAudiences}) => {
   stringsText.setLanguage(language)
    function deleteAudience(id){
        var newAudience = audiences.filter(val =>{
            return val.audienceId != id;
        })
        setAudiences(newAudience)
    }   
  return (
    <div>
        
    <table>
        <tr>
          <th style={{width: "12%"}}>{stringsText.ID}</th>
          <th style={{width: "19%"}}>{stringsText.Age}</th>
          <th style={{width: "15%"}}>{stringsText.Sex}</th>
          <th style={{width: "15%"}}>{stringsText.Count}</th>
          <th style={{width: "5%"}}></th>
        </tr>

         
         {audiences.map((item,index) =>
              <tr>
              <td style={{textAlign: "center"}}>{item.audienceId}</td>
              <td>{item.audienceAge + " " + stringsText.YersOld}</td>
              <td style={{textAlign: "center"}}>{item.audienceSex? stringsText.Man: stringsText.Woman}</td>
              <td style={{textAlign: "center"}}>{item.audienceCount}</td>
              <td>
              <button className="delete" onClick={() => {deleteAudience(item.audienceId)}}>{stringsText.Delete}</button>  </td>
            </tr> 
          )}
      </table>
  </div>
  )
}

export default AudiencePackDetailTable
