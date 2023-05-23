import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../http';

let stringsText = new LocalizedStrings({
    en:{
        Id:"User Id",
        Name:"Name",
        Login: "Login",
        Email: "Email",
        Phone: "Phone",
        Role: "Role",
        Detail: "Detail",
        Loading: "Loading...",
        error: "Error, try late"
    },
    uk: {
        Id:"User Id",
        Name:"Name",
        Login: "Login",
        Email: "Email",
        Phone: "Phone",
        Role: "Role",
        Detail: "Детально",
        Loading: "Завантаження...",
        error: "Помилка, спробуйте пізніше"
    }
   });

const UserTable = ({language, filter}) => {
   stringsText.setLanguage(language)

    const [users,setUsers] = useState(null)
    const navigate = useNavigate()
    React.useEffect(() =>{
        async function getUsers(){
           getAllUsers().then(response => {
                setUsers(response.filter(val =>{
                    return val.login.toLowerCase().includes(filter.toLowerCase())
                }))
           }).catch(()=>{
                setUsers([{
                    user: 0
                }])
           })
        }
        getUsers()
    },[filter])

  return (
    <div >
       
        <table>
          <tr>
            <th style={{width: "14%"}}>{stringsText.Id}</th>
            <th style={{width: "14%"}}>{stringsText.Login}</th>
            <th style={{width: "14%"}}>{stringsText.Name}</th>
            <th style={{width: "14%"}}>{stringsText.Email}</th>
            <th style={{width: "14%"}}>{stringsText.Phone}</th>
            <th style={{width: "14%"}}>{stringsText.Role}</th>
            <th style={{width: "5%"}}></th>
          </tr>

            {users === null ? <td style={{textAlign: "center"}} colSpan="6" >{stringsText.Loading}</td> : 
            users.length !== 0 && users[0].user === 0? <td style={{textAlign: "center"}}  colSpan="6">{stringsText.error}</td> :
            users.map((item,index) => 
                <tr>
                <td style={{textAlign: "center"}}>{item.profileId}</td>
                <td>{item.login}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td style={{textAlign: "center"}}>{item.role}</td>
                <td> <button className="detail" onClick={()=>{ navigate("/users/detail", { state: { id: item.profileId}})}}>{stringsText.Detail}</button> </td>
              </tr> 
            )} 
        </table>
    </div>
  )
}
 
export default UserTable
