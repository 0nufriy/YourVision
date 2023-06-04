import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { createReport, deleteSession, downloadReport, getAllAudiencePacks, getAllUsers, getAudiencePack, getSession, getUnabledata, getUserbyLogin, setConfig, updateSession } from '../../http';
import SessionDeatilTable from './selectiondetailtable';
import Modal from "react-modal";

let stringsText = new LocalizedStrings({
    en:{
        Back:"Back",
        Delete:"Delete Session",
        Start:"Start Session",
        Generate:"Generate Report",
        Download:"Download Report",
        Login:"Login:",
        Duration: "Duration(min.):",
        Location: "Location:",
        Status: "Status:",
        Date: "Date Time:",
        Price: "Price:",
        Loading: "Loading...",
        error: "Error, try late",
        Search:"Add",
        ApplayAdd:"Add",
        Applay: "Applay Changes",
        Cancel: "Cancel Changes",
        GenerateLoading: "Generating...",
        GenerateSuccess: "Generate complite!",
        DeleteText: "Are you sure you want to delete the session?",
        Close: "Close Modal",
        StartText: "Choose devices depending on this person:",
        YearsOld: " y.o.",
        Man: "Man",
        Woman: "Woman",
        StartError: "All fields must be filled in",
        AddText: "How many of these packs to add?",
        LoadUpdating: "Updating...",
        UdateSucses: "Session has been updated"
    },
    uk: {
        Back:"Назад",
        Delete:"Видалити Сеанс",
        Start:"Запустити Сеанс",
        Generate:"Згенерувати Звіт",
        Download:"Завантажити Звіт",
        Login:"Логін:",
        Duration: "Тривалість(хв.):",
        Location: "Адреса:",
        Status: "Статус:",
        Date: "Час:",
        Price: "Ціна:",
        Loading: "Завантаження...",
        error: "Помилка, спробуйте пізніше",
        Search:"Додати",
        ApplayAdd:"Додати",
        Applay: "Застосувати Зміни",
        Cancel: "Відмінити Зміни",
        GenerateLoading: "Звіт генерується...",
        GenerateSuccess: "Звіт згенерувався!",
        Close: "Закрити Вікно",
        DeleteText: "Ви впевнені що хочете видалити сеанс?",
        StartText: "Оберіть пристрої, в залежності від людини:",
        YearsOld: " років",
        Man: "Чоловік",
        Woman: "Жінка",
        StartError: "Всі поля повинні бути заповнені",
        AddText: "Скільки таких паків додати?",
        LoadUpdating: "Оновлення...",
        UdateSucses: "Сеанс був оновлений"
    }
   });
const SessionDetail = ({language}) => {
    stringsText.setLanguage(language)
    const login = React.createRef();
    const Duration = React.createRef();
    const Location = React.createRef();
    const Status = React.createRef();
    const DateTime = React.createRef();
    const Price = React.createRef();
    const add = React.createRef()

    const {state} = useLocation();
    var navigate = useNavigate();
    const [session,setSession] = useState({})
    const [loading, setLoading] = useState(true)
    const [unableData,setUnableData] = useState([])
    const [generateMessage,setGenerateMessage] = useState(false)
    const [generateLoading,setGenerateLoading] = useState(false)
    const [DeleteMessage,setDeleteMessage] = useState(false)
    const [AddMessage,setAddMessage] = useState(false)
    const [startMessage,setStartMessage] = useState(false)
    const [users, setUsers] = useState([])
    const [update,setUpdate] = useState(false)
    const [audienceToStart,setAudienceToStart] = useState([])
    const [audiencePacks, setAudiencePacks] = useState([])
    const [audiencePackAdd, setAudiencePackAdd] = useState(0)
    async function getAudienceToStart(){
        var result = []
        await session.audiencePacks.forEach(async val =>{
            var audiencePack = await getAudiencePack(val.audiencePackId).catch(()=>{
                return
            })
            audiencePack.audiences.forEach(audience => {
                for(var i = 0; i < audience.audienceCount * val.audiencePackCount; i++)
                result.push({
                    audienceId: audience.audienceId,
                    audienceAge: audience.audienceAge,
                    audienceSex: audience.audienceSex
                })
            })
            setAudienceToStart(result.sort((a,b) => {
                return a.audienceId <= b.audienceId
            }))
        })
    }

    React.useEffect(() =>{
        async function Session(sessionId){
            getSession(sessionId).then( (response) => {
                setSession(response)
                }).catch( () => {
                    setSession({})
                })
            setLoading(false)
        }
        async function AudiencePacks(){
            getAllAudiencePacks().then((response) =>{
                setAudiencePacks(response)
            }).catch(()=>{
                
            })
        }
        async function Users(){
            getAllUsers().then(response =>{
                setUsers(response.filter(val => val.role === "user"));
            }).catch(()=>{

            })
        }
        Session(sessionId)
        AudiencePacks()
        Users()
    },[])
    React.useEffect(()=>{
        if(session.audiencePacks){
            var ids = [0]
            session.audiencePacks.forEach((element)=>{
                ids.push(element.audiencePackId)
            })
            getUnabledata(ids).then(response => {
                setUnableData(response.filter(function(val){
                    return val != session.datetime
                }))
            }).catch(()=>{
                setUnableData([])
            })
            getAudienceToStart()
            Price.current.value = session.price + "$"
        }
    },[session])


    var sessionId = 0;
    try{
        const { id } = state; 
        sessionId = id;
    }catch{
        return <Navigate to ="/sessions"></Navigate>
    }
    function dateRound(){
        var inputElement = document.getElementById("dateInput");
        var selectedTime = new Date(inputElement.value);
            var minutes = selectedTime.getMinutes();
            if (minutes % 15 !== 0) {
                var roundedMinutes = Math.round(minutes / 15) * 15;
                var hours = selectedTime.getHours();
                selectedTime.setMinutes(roundedMinutes);
                selectedTime.setHours(hours - (selectedTime.getTimezoneOffset() / 60) );
                var result = selectedTime.toISOString().slice(0, 16);
                unableData.forEach((element)=>{
                    var startTime = new Date(element);
                    var endTime = new Date(element);
                    endTime.setMinutes(endTime.getMinutes + session.durationMinute + 60)
                    if(selectedTime >= startTime && selectedTime< endTime){
                        inputElement.value = endTime.toISOString().slice(0, 16);
                        return;
                    }
                })
                inputElement.value = result
            }
    }
    function dateToLocal(date){    
        var newDate = new Date(date);
        var localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var timeZoneOffset = new Date().getTimezoneOffset();
        newDate.setMinutes(newDate.getMinutes() - timeZoneOffset);
        var year = newDate.getFullYear();
        var month = (newDate.getMonth() + 1).toString().padStart(2, "0"); 
        var day = newDate.getDate().toString().padStart(2, "0");
        var hours = newDate.getHours().toString().padStart(2, "0");
        var minutes = newDate.getMinutes().toString().padStart(2, "0");
        var formattedDate = year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
        return formattedDate
    }
    function GenerateReport(){
        setGenerateLoading(true)
        setGenerateMessage(true)
        createReport(sessionId).then(res=>{
            setGenerateLoading(false)
        }).catch(()=>{
            setGenerateLoading(false)
        });
    }
    function toggleGenerateModal() {
        setGenerateMessage(!generateMessage);
      }
      function toggleDeleteMessage() {
        setDeleteMessage(!DeleteMessage);
      }
      function toggleStartMessage() {
        setStartMessage(!startMessage);
      }
      function toggleUpdate() {
        setUpdate(!update);
      }
      function toggleAddMessage() {
        setAddMessage(!AddMessage);
      }
      async function downlReport(){
        var res = await downloadReport(sessionId)
        const blob = await res.blob();
        const newBlob = new Blob([blob]);
        const blobUrl = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', session.sessionId + ".xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }
      function deleteSes(){
        deleteSession(session.sessionId).then(()=>{
            navigate('/sessions')
        }).catch(()=>{

        })
      }


      function Start(){
        var result = [];
            for(var i =0;i<audienceToStart.length;i++){
                var element = document.getElementById(i);
                if(element.value === ""){
                    element.style.border = "4px solid #FF5A5A"
                }else{
                    element.style.border = ""
                    result.push({
                        personId: parseInt(element.value),
                        audienceId: audienceToStart[i].audienceId
                    })
                }    
            }
            if(result.length === audienceToStart.length){
                setConfig(sessionId,result).then(()=>{
                    toggleStartMessage()
                }).catch(()=>{

                })
            }

      }

      function doAdd(){
        var selectindex = document.getElementById("audiencePackSelected").selectedIndex;
        var options=document.getElementById('audiencePackSelected').options;
        var id = options[selectindex].value
        if(id != 0){
            setAudiencePackAdd(id)
            toggleAddMessage()
        }
      }
      function confirmAdd(){
        var count = parseInt(document.getElementById("SetCountAudiencePack").value);
        if(count < 1 ){
            return
        }
        var newAP =  session.audiencePacks
        var pack = audiencePacks.filter(val => {
            return val.audiencePackId == audiencePackAdd
        })
        var add = true;
        
        var newPrice = 0;
        session.audiencePacks.forEach((element,index) => {
            if(element.audiencePackId == audiencePackAdd){
                newAP[index].audiencePackCount +=count
                add = false;
                newAP.forEach(element => {
                    newPrice += element.price * element.audiencePackCount 
                    
                    console.log(element.price * element.audiencePackCount)
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
        });
        if(add){
            newAP.push({
                audiencePackCount: count,
                audiencePackId: audiencePackAdd,
                name: pack[0].audiencePackName,
                price: pack[0].price,
            })
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
        
      }

      function applayChange(){
        var date = new Date(DateTime.current.value);
        var formattedDate = date.toISOString();
            var request = {
                sessionId: session.sessionId,
                datetime: formattedDate.slice(0,16),
                profileId: parseInt(login.current.value),
                status: Status.current.value,
                durationMinute: Duration.current.value,
                location: Location.current.value,
                audiences: session.audiencePacks 
            }
            updateSession(request).then(()=>{
                toggleUpdate()
            }).catch(()=>{
                
            })
      }

    return (
        <div id = "fullApp">
            <Modal
            isOpen={generateMessage}
            onRequestClose={toggleGenerateModal}
            closeTimeoutMS={500}
            appElement={document.getElementById('fullApp')}
            className="Modal">
                {generateLoading? <div className='ModalUpText'>{stringsText.GenerateLoading}</div> : 
                <div>
                    <div className='ModalUpText'>
                        {stringsText.GenerateSuccess}
                    </div>
                    <div className='button_in_modal'>
                    <button className='Applay' onClick={()=>{downlReport(); toggleGenerateModal();}}>
                        {stringsText.Download}
                    </button>
                    <button className='Cancel' onClick={toggleGenerateModal}>
                        {stringsText.Close}
                    </button>
                    </div>
                </div>}
            </Modal>
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
                    <button className='Applay' onClick={()=>{deleteSes();toggleDeleteMessage();}}>
                        {stringsText.Delete}
                    </button>
                    <button className='Cancel' onClick={toggleDeleteMessage}>
                        {stringsText.Close}
                    </button>
                    </div>
                    
                </div>
            </Modal>
            <Modal
            isOpen={startMessage}
            onRequestClose={toggleStartMessage}
            closeTimeoutMS={500}
            appElement={document.getElementById('fullApp')}
            className="Modal">
                    <frame style={{width: "100%", maxHeight: "600px"}}>
                    <div className='ModalUpText'>
                        {stringsText.StartText}
                    </div>
                        {audienceToStart.map((item,index) => 
                            <div>
                                <div className='UpFiledInDetail'>
                                    {(item.audienceSex ? stringsText.Man : stringsText.Woman) + " " + item.audienceAge + stringsText.YearsOld}
                                </div>
                                <input type="number" min={0} className='InputInDeatil' id={index} style={{width:"auto", minWidth:"50px"}}>
                                </input>
                            </div>
                        )}
                    <div className='button_in_modal'>
                    <button className='Applay' onClick={()=>{ Start()}}>
                        {stringsText.Start}
                    </button>
                    <button className='Cancel' onClick={toggleStartMessage}>
                        {stringsText.Close}
                    </button>
                    </div>
                    </frame>
            </Modal>
            <Modal
            isOpen={AddMessage}
            onRequestClose={toggleAddMessage}
            closeTimeoutMS={500}
            appElement={document.getElementById('fullApp')}
            className="Modal">
                
                <div>
                    <div className='ModalUpText'>
                        {stringsText.AddText}
                    </div>
                    <div style={{display: "flex", justifyContent: "center", width:"100%", marginTop: "10px"}}>
                    <input id="SetCountAudiencePack" type="number" min={1} defaultValue={1} className='InputInDeatil' style={{width:"100px", minWidth:"50px"}}>
                                </input>
                    </div>
                    
                    <div className='button_in_modal'>
                    <button className='Applay' onClick={()=>{confirmAdd(); toggleAddMessage();}}>
                        {stringsText.ApplayAdd}
                    </button>
                    <button className='Cancel' onClick={() => {toggleAddMessage(); setAudiencePackAdd(0); }}>
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
                    <button className='ButtonsInDetail' onClick={toggleStartMessage}>{stringsText.Start}</button>
                    <button className='ButtonsInDetail' onClick={GenerateReport}>{stringsText.Generate}</button>
                    <button className='ButtonsInDetail' onClick={downlReport}>{stringsText.Download}</button>
                </div>
            </div>
            {loading ? <div className="Loading">{stringsText.Loading}</div>: 
            !session.login ? <div className="Loading">{stringsText.error}</div> : 
            <div>
            <div className="InputDivInDetail">

                <div className='UpFiledInDetail'>
                    {stringsText.Login}
                </div>
                <select className='Selector' ref={login} style={{width: "30%"}}>
                        {users.map((item, index) =>
                            <option selected = {item.login == session.login} value={item.profileId}>{item.login}</option>
                        )}
                </select>
                <div className='UpFiledInDetail'>
                    {stringsText.Duration}
                </div>
                <input className='InputInDeatil' ref={Duration} defaultValue={session.durationMinute}>
                </input>
                <div className='UpFiledInDetail'>
                    {stringsText.Location}
                </div>
                <input className='InputInDeatil' ref={Location} defaultValue={session.location}>
                </input>
                <div className='UpFiledInDetail'>
                    {stringsText.Status}
                </div>
                <input className='InputInDeatil' ref={Status} defaultValue={session.status}>
                </input>
                <div className='UpFiledInDetail'>
                    {stringsText.Date}
                </div>
                <input id='dateInput' type="datetime-local" step="900" className='InputInDeatil' ref={DateTime} defaultValue={dateToLocal(session.datetime)} onChange={dateRound} style={{width:"auto", minWidth:"auto"}}>
                </input>
                <div className='UpFiledInDetail'>
                    {stringsText.Price}
                </div>
                <input className='InputInDeatil' disabled={true} ref={Price} defaultValue={session.price + "$"} style={{width:"10%", minWidth:"100px"}}>
                </input>
            </div> 
            <div className="UpAddMenu">
                <div className="Add">
                    <div className="AddText">
                        {stringsText.Search}
                    </div>
                    <select className='Selector' id="audiencePackSelected" ref={add}>
                    <option value={0}></option>
                        {audiencePacks.map((item, index) =>
                            <option value={item.audiencePackId}>{item.audiencePackName}</option>
                        )}
                </select>
                </div>
                <button name="ApplayAdd" onClick={doAdd}>{stringsText.ApplayAdd}</button>
            </div>
            <SessionDeatilTable language ={language} session ={session} setSession={setSession}></SessionDeatilTable> 
            <div style={{marginTop: "10px", marginLeft: "1%", marginBottom: "20px"}}>
                <button className='Applay' onClick={applayChange}>{stringsText.Applay}</button>
                <button className='Cancel' onClick={()=>{navigate('/sessions')}}>{stringsText.Cancel}</button>
            </div>
            </div>
            }
        </div>
    )
}

export default SessionDetail
