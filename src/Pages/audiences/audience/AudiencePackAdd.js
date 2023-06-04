import React, { useState } from 'react'
import LocalizedStrings from 'react-localization';
import { useNavigate } from 'react-router-dom';

import Modal from "react-modal";
import AudiencePackAddTable from './AudiencePackAddTable';
import { addAduiencePack, getAllAudiences } from '../../http';

let stringsText = new LocalizedStrings({
    en:{
        Back:"Back",
        Name: "Name",
        Price: "Price($)",
        Search: "Add audience",
        ApplayAdd: "Add",
        Cancel: "Cancel",
        Add: "Add",
        YersOld: "y.o.",
        Man:"Man",
        Woman: "Woman",
        Close: "Close",
        AddText: "How many to add?",
    },
    uk: {
        Back:"Назад",
        Name: "Назва",
        Price: "Ціна($)",
        Search: "Додати людей",
        ApplayAdd: "Додати",
        Cancel: "Відмінити",
        Add: "Додати ",
        YersOld: "років",
        Man:"Чоловік",
        Woman: "Жінка",
        AddText: "Скільки додати?",
        Close: "Закрити"
    }
   });
const AudiencePackAdd = ({language}) => {
    stringsText.setLanguage(language)
    const Name = React.createRef();
    const Price = React.createRef();
    var navigate = useNavigate();
    const [audiences,setAudiences] = useState([])
    const [audienceAdd, setAudienceAdd] = useState(0)
    const [audiencesToAdd,setAudiencesToAdd] = useState([])
    const [AddMessage,setAddMessage] = useState(false)
    function toggleAddMessage(){
        setAddMessage(!AddMessage)
    }
    React.useEffect(()=>{
        getAllAudiences().then((response)=>{
            setAudiences(response)
        }).catch(()=>{
            
        })
    },[])

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
        var newAudience = audiencesToAdd
        audiencesToAdd.forEach((element,index) => {
            if(element.audienceId == audienceAdd){
                newAudience[index].count = parseInt(count) + newAudience[index].count;
                setAudiencesToAdd(newAudience)
                add = false
            }
        });
        if(add){
            newAudience.push({
                audienceId: audienceAdd,
                age: audience[0].age,
                sex: audience[0].sex,
                count: parseInt(count)
            })
            setAudiencesToAdd(newAudience)
        }
       
    }

    function addPack(){
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
        var audiencesAdd = []
        audiencesToAdd.forEach(val =>{
            audiencesAdd.push({
                audienceId: val.audienceId,
                audienceCount: val.count
            })
        })
        var toAdd = {
            audiencePackName: Name.current.value,
            price: Price.current.value,
            audiences: audiencesAdd
          }
          addAduiencePack(toAdd).then(()=>{
            navigate("/audiences")
          }).catch(()=>{
            
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
                    {stringsText.Name}
                </div>
                <input className='InputInDeatil' ref={Name} >
                </input>
                <div className='UpFiledInDetail'>
                    {stringsText.Price}
                </div>
                <input className='InputInDeatil' type="number" min={1} defaultValue={1} ref={Price} style={{width:"10%", minWidth:"100px"}}>
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
           <AudiencePackAddTable language={language} audiences={audiencesToAdd} setAudiences={setAudiencesToAdd} ></AudiencePackAddTable>
            <div style={{marginTop: "10px", marginLeft: "1%",marginBottom: "20px"}}>
                <button className='Applay' onClick={addPack}>{stringsText.Add}</button>
                <button className='Cancel' onClick={()=>{navigate('/audiences')}}>{stringsText.Cancel}</button>
            </div>
            </div>
            
        </div>
    )
}

export default AudiencePackAdd
