import '../../Lands/landForm.css';
import {useState } from 'react';
import {InputMask} from "primereact/inputmask";
import { useNavigate } from 'react-router-dom';
import Success from "../../Assets/check.jpg";

import axios from 'axios';
import { Link } from 'react-router-dom';
let insType=[
    {value:0,label:"Sıvı ilaç"},
    {value:1,label:"Toz ilaç"}
]

export default function AddForm(props){

    let [accept,setAccept]=useState(false);
    let [addMessage,setAddMessage]=useState(false);
    let [errorMessage,setErrorMessage]=useState("");
    const navigate=useNavigate();

    async function Submit(e){
        let flag=true;
        e.preventDefault();
        setAccept(true);

        //condition to check the data and send it to the dataBase
        if(props.title==="" || props.quantity===0 || props.publicDetails==="" || props.Npk===""||props.type==="" || props.quantity>props.parentSize||props.selectedLand===""||props.startDate===""||props.endDate===""){
            flag=false;
        }else flag=true;
        try{
            if(flag){
            
        let res=await axios.post(props.url,props.data);

        if (res.status===200){
            setAddMessage(true);
            setTimeout(() => setAddMessage(false), 2000);
            navigate(`/${props.direction}`);
        }
        }}catch(err){
            console.log(err.response.data.errorMessage);
            setErrorMessage(err.response.data.errorMessage);
        }
    }

    return(
        <div className="formContainer ">

            <div className="formTitle">Enter Information</div>

            <form onSubmit={Submit} >
                <div className="LandDetails" >

                    <div className="input-box">
                        <label htmlFor="title" className="details">{props.TitleLabel}</label>
                        {props.bigLand===false&&(<input id="title" type='text' placeholder='Enter here...'  value={props.title } onChange={(e)=> props.setTitle(e.target.value)} />)}
                        {props.childLands===false&&(<input id="title" type='text' placeholder='Enter here...'  value={props.title ||" ("+props.parentTitle+")"} onChange={(e)=> props.setTitle(e.target.value)} />)}
                        {/* <span>{}</span> */}
                        {props.title ==="" && accept &&(<p className="error">*Gerekli</p>)}
                    </div>


                    <div className="input-box">
                        <label htmlFor="title" className="details">{props.publicDetailsLabel}</label>
                        <input id="title" type='text' placeholder='Enter here...'  value={props.publicDetails} onChange={(e)=> props.setpublicDetails(e.target.value)}/>
                        {props.publicDetails ==="" && accept &&(<p className="error">*Gerekli</p>)}
                    </div>
                   
                    {props.inputDescription===false &&(<div className="input-box">
                        <label htmlFor="location" className="details">{props.descriptionLabel}</label>
                        <input id="location" type='text' placeholder='Enter here...'  value={props.description} onChange={(e)=> props.setDescription(e.target.value)}/>
                    </div>)}

                    {props.inputSizeBox===false &&(<div className="input-box">
                        <label  className="details">{props.quantityLabel}</label>
                        <input  type='number' placeholder='Enter here...'  value={props.quantity} onChange={(e)=> props.setQuantity(e.target.value)}/>
                        {(props.quantity>props.parentSize && accept && (<p className="error">yeterli Boyut yok</p>))||((props.quantity===""||props.quantity===0)&& accept && (<p className="error">*Gerekli</p>))}
                        {errorMessage&&(<p className="error">yeterli Boyut yok</p>)}
                    </div>)}

                    {props.inputNPKBox===false &&(<div className="input-box">
                        <label htmlFor="size" className="details">{props.NpkLabel}</label>
                        <InputMask id="size" type='text' placeholder='Enter here...'  value={props.Npk} onChange={(e)=> props.setNpk(e.target.value)} mask='99 99 99'/>
                        {props.Npk.length !==8  &&accept && (<p className="error">*Gerekli</p>)}
                    </div>)}

                    {props.inputTypeBox===false &&(<div className="input-box">
                         <label htmlFor="size" className="details">{props.typeLabel}</label>
                         <select value={props.type}  onChange={props.handleTypeChange}>
                            <option value="">Choose</option>
                           {insType.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                        </select>
                        {props.type==="" &&accept && (<p className="error">*Gerekli</p>)}  

                    </div>)}
                    
                </div>

                <div className='submitButton flex' >
                    <button className='btn' type="submit">{props.button}</button>
                </div>
            </form>
            {addMessage &&(<div className="add-message flex">
                <div className='img'>
                    <img src={Success} alt='Task Image'/>
                </div>
                <p className="done-message flex">Başarıyla eklendi</p>
            </div>)}
        </div>
    );
}