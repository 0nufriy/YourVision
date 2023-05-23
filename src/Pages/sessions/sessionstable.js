import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { useNavigate } from 'react-router-dom';
import { getAllSessions } from '../http';
let stringsText = new LocalizedStrings({
    en:{
        SessionsId:"Session ID",
        Login:"Login",
        Duration: "Duration",
        Location: "Location",
        Status: "Status",
        Date: "Date Time",
        Detail: "Detail",
        Loading: "Loading...",
        minuten: "min.",
        error: "Error, try late"
    },
    uk: {
        SessionsId:"ID Сеансу",
        Login:"Логін",
        Duration: "Тривалість",
        Location: "Адреса",
        Status: "Статус",
        Date: "Час",
        Detail: "Детально",
        Loading: "Завантаження...",
        minuten: "хв.",
        error: "Помилка, спробуйте пізніше"
    }
   });
const SessionsTable = ({language, filter,filterDate}) => {
    stringsText.setLanguage(language)
    const [sessions,setSesions] = useState(null)
    const navigate = useNavigate();
    React.useEffect(() =>{
        async function getSessions(){
            getAllSessions().then( (response) => {
                setSesions(response.filter(function(val){
                    return val.login.includes(filter) && (val.datetime.includes(filterDate))
                }))
            }).catch( () => {
                setSesions([{
                    sessionId: 0
                }])
            })
        }
        getSessions()
    },[filter, filterDate])



    function detail(id){
        navigate('/sessions/detail', { state: { id: id}});
    }
  return (
    <div >
        <table>
          <tr>
            <th style={{width: "8%"}}>{stringsText.SessionsId}</th>
            <th style={{width: "15%"}}>{stringsText.Login}</th>
            <th style={{width: "8%"}}>{stringsText.Duration}</th>
            <th style={{width: "37%"}}>{stringsText.Location}</th>
            <th style={{width: "8%"}}>{stringsText.Status}</th>
            <th style={{width: "8%"}}>{stringsText.Date}</th>
            <th style={{width: "5%"}}></th>
          </tr>

            {sessions === null ? <td style={{textAlign: "center"}} colspan="6" >{stringsText.Loading}</td> : 
            sessions.length !== 0 && sessions[0].sessionId === 0? <td style={{textAlign: "center"}}  colspan="6">{stringsText.error}</td> :
            sessions.map((item,index) =>
                <tr>
                <td style={{textAlign: "center"}}>{item.sessionId}</td>
                <td>{item.login}</td>
                <td style={{textAlign: "center"}}>{item.durationMinute.toString() + " " + stringsText.minuten}</td>
                <td>{item.location}</td>
                <td style={{textAlign: "center"}}>{item.status}</td>
                <td style={{textAlign: "center"}}>{item.datetime.replace("T"," ")}</td>
                <td> <button className="detail" name = {item.sessionId} onClick={() => {detail(item.sessionId)}}>{stringsText.Detail}</button> </td>
              </tr> 
            )

            } 
          

        </table>
    </div>
  )
}

export default SessionsTable
