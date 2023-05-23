import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { useNavigate } from 'react-router-dom';
import { addAduiencePack, addUser, getAllAudiences } from '../../http';

let stringsText = new LocalizedStrings({
    en:{
        Back:"Back",
        Cancel: "Cancel",
        Add: "Add",
        Login: "Login:",
        Name: "Name:",
        Email: "Email:",
        Phone: "Phone:",
        Role: "Role:",
        Password: "Password:",
        RePassword: "Repeat password:"
    },
    uk: {
        Back:"Назад",
        Cancel: "Відмінити",
        Add: "Додати",
        Login: "Логін:",
        Name: "Ім'я:",
        Email: "Пошта:",
        Phone: "Телефон:",
        Role: "Роль:",
        Password: "Пароль:",
        RePassword: "Повторіть пароль:"
    }
   });
const UserAdd = ({language}) => {
    stringsText.setLanguage(language)
    const Login = React.createRef();
    const Name = React.createRef();
    const Email = React.createRef();
    const Phone = React.createRef();
    const Role = React.createRef();
    const Password = React.createRef();
    const RePassword = React.createRef();
    var navigate = useNavigate();

    function addNewUser(){
        var login = Login.current.value;
        var name = Name.current.value;
        var email = Email.current.value;
        var phone = Phone.current.value;
        var role = Role.current.value;
        var password = Password.current.value;
        var rePassword = RePassword.current.value;

        if(login.length <= 3){
            Login.current.style.border = "4px solid #FF5A5A"
            return;
        }else{
            Login.current.style.border = ""
        }
        if(name.length <= 3){
            Name.current.style.border = "4px solid #FF5A5A"
            return;
        }else{
            Name.current.style.border = ""
        }
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!email.match(emailRegex)){
            Email.current.style.border = "4px solid #FF5A5A"
            return;
        }else{
            Email.current.style.border = ""
        }
        var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        if(!phone.match(phoneRegex)){
            Phone.current.style.border = "4px solid #FF5A5A"
            return;
        }else{
            Phone.current.style.border = ""
        }

        if(password !== rePassword || password.length <8){
            Password.current.style.border = "4px solid #FF5A5A"
            RePassword.current.style.border = "4px solid #FF5A5A"
            return;
        }else{
            Password.current.style.border = ""
            RePassword.current.style.border = ""
        }
        addUser({
            name: name,
            login: login,
            password: password,
            email: email,
            phoneNumber: phone,
            role: role
        }).then(response => {
            navigate("/users")
        }).catch(()=>{
            Email.current.style.border = "4px solid #FF5A5A"
            Login.current.style.border = "4px solid #FF5A5A"
            Phone.current.style.border = "4px solid #FF5A5A"
        })
    }
  return (
    <div>
    <div className='UpFieldDetail'>
        <div className='BackArrow' onClick={()=> {navigate(-1)}}>
        <svg width="40px" height="40px" viewBox="-4.5 0 20 20" version="1.1" style={{margin_top: "0.8%", margin_left: "0.8%"}}>
            <g id="Page-1" stroke="none"  fill="none" >
                <g id="Dribbble-Light-Preview" transform="translate(-345.000000, -6679.000000)" fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M299.633777,6519.29231 L299.633777,6519.29231 C299.228878,6518.90256 298.573377,6518.90256 298.169513,6519.29231 L289.606572,6527.55587 C288.797809,6528.33636 288.797809,6529.60253 289.606572,6530.38301 L298.231646,6538.70754 C298.632403,6539.09329 299.27962,6539.09828 299.685554,6538.71753 L299.685554,6538.71753 C300.100809,6538.32879 300.104951,6537.68821 299.696945,6537.29347 L291.802968,6529.67648 C291.398069,6529.28574 291.398069,6528.65315 291.802968,6528.26241 L299.633777,6520.70538 C300.038676,6520.31563 300.038676,6519.68305 299.633777,6519.29231" id="arrow_left-[#335]">
                        </path>
                    </g>
                </g>
            </g>
        </svg>
            {stringsText.Back}
        </div>
    </div>
    
    <div>
    <div className="InputDivInDetail">
        
        <div className='UpFiledInDetail'>
            {stringsText.Login}
        </div>
        <input className='InputInDeatil' ref={Login} >
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Name}
        </div>
        <input className='InputInDeatil' ref={Name} >
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Email}
        </div>
        <input className='InputInDeatil' ref={Email} >
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Phone}
        </div>
        <input className='InputInDeatil' ref={Phone} >
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Role}
        </div>
        <select className='Selector' ref={Role} style={{width: "30%"}}>
            <option value="user">user</option>
            <option value="admin">admin</option>
        </select>
        <div className='UpFiledInDetail'>
            {stringsText.Password}
        </div>
        <input className='InputInDeatil' ref={Password} >
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.RePassword}
        </div>
        <input className='InputInDeatil' ref={RePassword} >
        </input>
    </div> 
    
    <div style={{marginTop: "10px", marginLeft: "1%", width: "30%", justifyContent: "center", display: "flex"}}>
        <button className='Applay' onClick={addNewUser}>{stringsText.Add}</button>
        <button className='Cancel' onClick={()=>{navigate('/users')}}>{stringsText.Cancel}</button>
    </div>
    </div>
    
</div>
  )
}

export default UserAdd
