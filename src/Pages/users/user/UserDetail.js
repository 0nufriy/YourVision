import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import { deleteUser, getUser, updatePassword, updateUser } from '../../http';
let stringsText = new LocalizedStrings({
    en:{
        Back:"Back",
        Cancel: "Cancel changes",
        Update: "Applay changes",
        Login: "Login:",
        Name: "Name:",
        Email: "Email:",
        Phone: "Phone:",
        Role: "Role:",
        OldPassword: "Old password",
        Password: "New password:",
        RePassword: "Repeat password:",
        Delete: "Delete user",
        DeleteText: "You really want to delete this user?",
        Close: "Close Modal",
        UdateSucses: "User has been updated",
        ChangePassword: "Change Password"
    },
    uk: {
        Back:"Назад",
        Cancel: "Відмінити зміни",
        Update: "Застосувати зміни",
        Login: "Логін:",
        Name: "Ім'я:",
        Email: "Пошта:",
        Phone: "Телефон:",
        Role: "Роль:",
        OldPassword: "Старий пароль",
        Password: "Новий пароль:",
        RePassword: "Повторіть пароль:",
        Delete: "Видалити користувача",
        DeleteText: "Ви дійсно бажаєте видалити цого користувача?",
        Close: "Закрити Вікно",
        UdateSucses: "Користувач був оновлений",
        ChangePassword: "Змінити пароль"
    }
   });
const UserDetail = ({language}) => {
    stringsText.setLanguage(language)
    const Login = React.createRef();
    const Name = React.createRef();
    const Email = React.createRef();
    const Phone = React.createRef();
    const Role = React.createRef();
    const OldPassword = React.createRef();
    const Password = React.createRef();
    const RePassword = React.createRef();
    var navigate = useNavigate();

    const [update, setUpdate] = useState(false)
    const {state} = useLocation();
    const [DeleteMessage,setDeleteMessage] = useState(false)
    const [user,setUser] = useState({})
    React.useEffect(()=>{
        getUser(userId).then((response)=>{
            setUser(response)
        }).catch(()=>{
            navigate("/users")
        })
    },[])

    var userId = 0;
    try{
        const { id } = state; 
        userId = id;
    }catch{
        return <Navigate to ="/users"></Navigate>
    }
    function toggleDeleteMessage(){
        setDeleteMessage(!DeleteMessage)
    }
    function toggleUpdate(){
        setUpdate(!update)
    }
    function updateThisUser(){
        var login = Login.current.value;
        var name = Name.current.value;
        var email = Email.current.value;
        var phone = Phone.current.value;
        var role = Role.current.value;

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
        updateUser({
            name: name,
            login: login,
            email: email,
            phoneNumber: phone,
            role: role
        },userId).then(()=>{
            toggleUpdate()
        }).catch(()=>{

        })
    }
    
    function delUser(){
        deleteUser(userId).then(()=>{
            navigate("/users")
        }).catch(()=>{
           
        })
        toggleDeleteMessage();
    }
    function changePassword(){
        var oldPassword = OldPassword.current.value
        var password = Password.current.value
        var rePassword = RePassword.current.value
        if(password !== rePassword){
            Password.current.style.border = "4px solid #FF5A5A"
            RePassword.current.style.border = "4px solid #FF5A5A"
        }else{
            Password.current.style.border = ""
            RePassword.current.style.border = ""
        }
        updatePassword(oldPassword,password,userId).then(()=>{
            OldPassword.current.style.border = ""
            OldPassword.current.value = ""
            Password.current.value = ""
            RePassword.current.value = ""
            toggleUpdate()
        }).catch(()=>{
            OldPassword.current.style.border = "4px solid #FF5A5A"
        })
    }
  return (
    <div>
          <Modal
            isOpen={DeleteMessage}
            onRequestClose={toggleDeleteMessage}
            closeTimeoutMS={500}
            appElement={document.getElementById('fullApp')}
            className="Modal">
                <div>
                    <div className='ModalUpText'>
                        {stringsText.DeleteText}
                    </div>
                    <div className='button_in_modal'>
                    <button className='Applay' onClick={delUser}>
                        {stringsText.Delete}
                    </button>
                    <button className='Cancel' onClick={()=>{toggleDeleteMessage();}}>
                        {stringsText.Close}
                    </button>
                    </div>
                    
                </div>
            </Modal>
            <Modal
            isOpen={update}
            onRequestClose={toggleUpdate}
            closeTimeoutMS={500}
            appElement={document.getElementById('fullApp')}
            className="Modal">
                
                <div>
                <div className='ModalUpText'>
                    {stringsText.UdateSucses}
                </div>
                
                <div className='button_in_modal'>
                <button className='Applay' onClick={()=>{toggleUpdate();}}>
                    {stringsText.Close}
                </button>
                
                </div>
            </div>
                
            </Modal>
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
        <div className='buttonsInDetail'>
                    <button className='ButtonsInDetail' onClick={toggleDeleteMessage}>{stringsText.Delete}</button>
                </div>
    </div>
    
    <div>
    <div className="InputDivInDetail">
        
        <div className='UpFiledInDetail'>
            {stringsText.Login}
        </div>
        <input className='InputInDeatil' ref={Login} defaultValue={user.login}>
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Name}
        </div>
        <input className='InputInDeatil' ref={Name} defaultValue={user.name}>
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Email}
        </div>
        <input className='InputInDeatil' ref={Email} defaultValue={user.email}>
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Phone}
        </div>
        <input className='InputInDeatil' ref={Phone} defaultValue={user.phoneNumber}>
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Role}
        </div>
        <select className='Selector' ref={Role} style={{width: "30%"}}>
            <option selected={user.role == "user"} value="user">user</option>
            <option selected={user.role == "admin"} value="admin">admin</option>
        </select>
    </div> 
    
    
    
    <div style={{marginTop: "10px", marginLeft: "1%", width: "30%", justifyContent: "center", display: "flex"}}>
        <button className='Applay' onClick={updateThisUser}>{stringsText.Update}</button>
        <button className='Cancel' onClick={()=>{navigate('/users')}}>{stringsText.Cancel}</button>
    </div>
    <div className="InputDivInDetail">
        
        <div className='UpFiledInDetail'>
            {stringsText.OldPassword}
        </div>
        <input className='InputInDeatil' ref={OldPassword}>
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.Password}
        </div>
        <input className='InputInDeatil' ref={Password}>
        </input>
        <div className='UpFiledInDetail'>
            {stringsText.RePassword}
        </div>
        <input className='InputInDeatil' ref={RePassword}>
        </input>
    </div> 
    <div style={{marginTop: "10px", marginLeft: "1%", width: "30%", justifyContent: "center", display: "flex"}}>
        <button className='Applay' onClick={changePassword}>{stringsText.ChangePassword}</button>
    </div>
    </div>
    
</div>
  )
}

export default UserDetail
