import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import Modal from "react-modal";
import { addAduiencePack, deletePack, getAllAudiences, getAudiencePack, updatePack } from '../../http';
import AudiencePackDetailTable from './AudiencePackDetailTable';

let stringsText = new LocalizedStrings({
    en:{
        Back:"Back",
        Name: "Name",
        Price: "Price($)",
        Search: "Add audience",
        ApplayAdd: "Add",
        Cancel: "Cancel Changes",
        Update: "Applay Changes",
        YersOld: "y.o.",
        Man:"Man",
        Woman: "Woman",
        Close: "Close",
        AddText: "How many to add?",
        UdateSucses: "Pack has been updated",
        Delete: "Delete Pack",
        DeleteText: "Are you sure you want to delete this pack?"
    },
    uk: {
        Back:"Назад",
        Name: "Назва",
        Price: "Ціна($)",
        Search: "Додати людей",
        ApplayAdd: "Add",
        Cancel: "Відмінити Зміни",
        Update:"Застосувати Зміни",
        YersOld: "років",
        Man:"Чоловік",
        Woman: "Жінка",
        AddText: "Скільки додати?",
        Close: "Закрити",
        UdateSucses: "Пак був оновлений",
        Delete: "Видалити Пак",
        DeleteText: "Ви впевнені що хочете видалити пак?"
    }
   });

const AudiencePackDetail = ({language}) => {
    stringsText.setLanguage(language)
    const Name = React.createRef();
    const Price = React.createRef();
    var navigate = useNavigate();
    const {state} = useLocation();
    const [pack, setPack] = useState({})
    const [audiences,setAudiences] = useState([])
    const [audienceAdd, setAudienceAdd] = useState(0)
    const [audiencesToUpdate,setAudiencesToUpdate] = useState([])
    const [AddMessage,setAddMessage] = useState(false)
    const [update, setUpdate] = useState(false)
    const [DeleteMessage,setDeleteMessage] = useState(false)
    function toggleDeleteMessage(){
        setDeleteMessage(!DeleteMessage)
    }
    function toggleUpdate(){
        setUpdate(!update)
    }
    function toggleAddMessage(){
        setAddMessage(!AddMessage)
    }
    React.useEffect(()=>{
        getAllAudiences().then((response)=>{
            setAudiences(response)
        }).catch(()=>{
            
        })
        getAudiencePack(AdudiencePackID).then(response =>{
            setPack(response)
            setAudiencesToUpdate(response.audiences)
        }).catch(()=>{
            navigate(-1)
        })
    },[])
    var AdudiencePackID = 0;
    try{
        const { id } = state; 
        AdudiencePackID = id;
    }catch{
        return <Navigate to ="/audiences"></Navigate>
    }
    function doAdd(){
        var selectindex = document.getElementById("AudiencesSelector").selectedIndex;
        var options=document.getElementById('AudiencesSelector').options;
        var id = options[selectindex].value
        if(id != 0){
            setAudienceAdd(id)
            toggleAddMessage()
        }
    }
    function confirmAdd(){
        var count = document.getElementById("SetCountAudience").value
        if(count <1){
            return
        }
        var audience = audiences.filter(val =>{
            return val.audienceId == audienceAdd
        })
        var add = true;
        var newAudience = audiencesToUpdate
        audiencesToUpdate.forEach((element,index) => {
            if(element.audienceId == audienceAdd){
                newAudience[index].audienceCount= parseInt(count) + newAudience[index].audienceCount;
                setAudiencesToUpdate(newAudience)
                add = false
            }
        });
        if(add){
            newAudience.push({
                audienceId: audienceAdd,
                audienceAge: audience[0].age,
                audienceSex: audience[0].sex,
                audienceCount: parseInt(count)
            })
            setAudiencesToUpdate(newAudience)
        }
       
    }

    function updateThisPack(){
        if(Name.current.value.length <= 3){
            Name.current.style.border = "4px solid #FF5A5A"
            return
        }else{
            Name.current.style.border = ""
        }
        if(Price.current.value < 1){
            Price.current.style.border = "4px solid #FF5A5A"
            return
        }else{
            Price.current.style.border = ""
        }
        var audiencesUpdate = []
        audiencesToUpdate.forEach(val =>{
            audiencesUpdate.push({
                audienceId: val.audienceId,
                audienceCount: val.audienceCount
            })
        })
        var toUpdate = {
            audiencePackId: AdudiencePackID,
            audiencePackName: Name.current.value,
            price: Price.current.value,
            audiences: audiencesUpdate
          }
          updatePack(toUpdate).then(()=>{
            toggleUpdate()
          }).catch(()=>{
            
          })
    }
    function deleteThisPack(){
        deletePack(AdudiencePackID).then(()=>{
            navigate("/audiences")
        })
    }
    return (
        <div id = "fullApp">
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
                    <input id="SetCountAudience" type="number" min={1} defaultValue={1} className='InputInDeatil' style={{width:"100px", minWidth:"50px"}}>
                                </input>
                    </div>
                    
                    <div className='button_in_modal'>
                    <button className='Applay' onClick={()=>{confirmAdd(); toggleAddMessage();}}>
                        {stringsText.ApplayAdd}
                    </button>
                    <button className='Cancel' onClick={() => {toggleAddMessage(); setAudienceAdd(0); }}>
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
                    <button className='Applay' onClick={()=>{deleteThisPack();toggleDeleteMessage();}}>
                        {stringsText.Delete}
                    </button>
                    <button className='Cancel' onClick={toggleDeleteMessage}>
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
                    {stringsText.Name}
                </div>
                <input className='InputInDeatil' ref={Name} defaultValue={pack.audiencePackName}>
                </input>
                <div className='UpFiledInDetail'>
                    {stringsText.Price}
                </div>
                <input className='InputInDeatil' type="number" min={1} defaultValue={pack.price} ref={Price} style={{width:"10%", minWidth:"100px"}}>
                </input>
            </div> 
            <div className="UpAddMenu">
                <div className="Add">
                    <div className="AddText">
                        {stringsText.Search}
                    </div>
                    <select className='Selector' id='AudiencesSelector'>
                    <option  value={0}></option>
                    {audiences.map((item, index) =>
                            <option  value={item.audienceId}>{item.age + " " + stringsText.YersOld + (item.sex? stringsText.Man: stringsText.Woman)}</option>
                        )}
                    </select>
                </div>
                <button name="ApplayAdd" onClick={()=>{doAdd()}}>{stringsText.ApplayAdd}</button>
            </div>
           <AudiencePackDetailTable language={language} audiences={audiencesToUpdate} setAudiences={setAudiencesToUpdate} ></AudiencePackDetailTable>
            <div style={{marginTop: "10px", marginLeft: "1%"}}>
                <button className='Applay' onClick={updateThisPack}>{stringsText.Update}</button>
                <button className='Cancel' onClick={()=>{navigate('/audiences')}}>{stringsText.Cancel}</button>
            </div>
            </div>
        </div>
    )
}

export default AudiencePackDetail
