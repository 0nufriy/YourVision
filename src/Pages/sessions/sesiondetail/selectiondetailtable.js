import React from 'react'
import LocalizedStrings from 'react-localization'
import { useNavigate } from 'react-router-dom';
import { deleteSession } from '../../http';
import "./sessiondetail.css"

let stringsText = new LocalizedStrings({
    en:{
        ID: "Pack Id",
        Name: "Name",
        Count: "Count",
        Detail: "Detail",
        Delete: "Delete",
        Price: "Price by 1"
    },
    uk: {
        ID: "Id Паку",
        Name: "Назва",
        Count: "Кількість",
        Detail: "Детально",
        Delete: "Видалити",
        Price: "Ціна за 1"
    }
   });

   
const SessionDeatilTable = ({language, session,setSession}) => {
    stringsText.setLanguage(language)
    function deleteAudience(id){
        var newAP =  session.audiencePacks.filter(val =>{
            return val.audiencePackId != id;
        })
        var newPrice = 0;
        newAP.forEach(element => {
            newPrice += element.price * element.audiencePackCount 
        });
        setSession({
            datetime: session.datetime,
            audiencePacks: newAP,
            durationMinute: session.durationMinute,
            location: session.location,
            login: session.login,
            price: newPrice,
            profileId: session.profileId,
            sessionId: session.sessionId,
            status: session.status,
        })
    }
    var navigate = useNavigate()
  return (
    <div>
      <table>
          <tr>
            <th style={{width: "12%"}}>{stringsText.ID}</th>
            <th style={{width: "19%"}}>{stringsText.Name}</th>
            <th style={{width: "15%"}}>{stringsText.Price}</th>
            <th style={{width: "15%"}}>{stringsText.Count}</th>
            <th style={{width: "5%"}}></th>
          </tr>

           
           {session.audiencePacks.map((item,index) =>
                <tr>
                <td style={{textAlign: "center"}}>{item.audiencePackId}</td>
                <td>{item.name}</td>
                <td style={{textAlign: "center"}}>{item.price}</td>
                <td style={{textAlign: "center"}}>{item.audiencePackCount}</td>
                <td> <button className="detail" onClick={() => { navigate('/audiences/detail', { state: { id: item.audiencePackId}});}}>{stringsText.Detail}</button>
                <button className="delete" onClick={() => {deleteAudience(item.audiencePackId)}}>{stringsText.Delete}</button>  </td>
              </tr> 
            )}
        </table>
    </div>
  )
}
export default SessionDeatilTable
