import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { useNavigate } from 'react-router-dom';
import { getAllAudiencePacks } from '../http';

let stringsText = new LocalizedStrings({
    en:{
        Id:"Audience Pack ID",
        Name:"Name",
        Price: "Price",
        Detail: "Detail",
        Loading: "Loading...",
        error: "Error, try late"
    },
    uk: {
        Id:"ID Паку",
        Name:"Назва",
        Price: "Ціна",
        Detail: "Детально",
        Loading: "Завантаження...",
        error: "Помилка, спробуйте пізніше"
    }
   });
const AudienceTable = ({language,filter}) => {
    stringsText.setLanguage(language)

    const [audiencePack,setAudiencePack] = useState(null)

    React.useEffect(() =>{
        async function getAudiencesPacks(){
            getAllAudiencePacks().then( (response) => {
                setAudiencePack(response.filter(function(val){
                    return val.audiencePackName.toLowerCase().includes(filter.toLowerCase())
                }))
            }).catch( () => {
                setAudiencePack([{
                    audiencePack: 0
                }])
            })
        }
        getAudiencesPacks()
    },[filter])
    const navigate = useNavigate();
    function detail(id){
        navigate('/audiences/detail', { state: { id: id}});
    }
  return (
    <div >
        <table style={{width: "50%"}}>
          <tr>
            <th style={{width: "18%"}}>{stringsText.Id}</th>
            <th style={{width: "48%"}}>{stringsText.Name}</th>
            <th style={{width: "18%"}}>{stringsText.Price}</th>
            <th style={{width: "5%"}}></th>
          </tr>

            {audiencePack === null ? <td style={{textAlign: "center"}} colSpan="3" >{stringsText.Loading}</td> : 
            audiencePack.length !== 0 && audiencePack[0].audiencePack === 0? <td style={{textAlign: "center"}}  colSpan="3">{stringsText.error}</td> :
            audiencePack.map((item,index) => 
                <tr>
                <td style={{textAlign: "center"}}>{item.audiencePackId}</td>
                <td>{item.audiencePackName}</td>
                <td>{item.price}</td>
                <td> <button className="detail" onClick={() => {detail(item.audiencePackId)}}>{stringsText.Detail}</button> </td>
              </tr> 
            )

            } 
          

        </table>
    </div>
  )
}

export default AudienceTable
