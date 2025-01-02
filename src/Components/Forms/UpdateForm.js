import '../../Lands/landForm.css';
import { useEffect, useState } from 'react';
import {InputMask} from "primereact/inputmask";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Success from "../../Assets/check.jpg";

let insType=[
    {value:0,label:"Sıvı ilaç"},
    {value:1,label:"Toz ilaç"}
]

export default function UpdateForm(props){

    const navigate=useNavigate();
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");
    let [updateMessage,setUpdateMessage]=useState(false);
    let [accept,setAccept]=useState(false);

        useEffect(()=>{
        fetch(props.gurl)
            .then((res)=>{
                if(!res.ok){
                    throw Error("couldn't fetch data for that resource" )
                }
                return  res.json();
            })
            .then((data)=>{
                if(data.title){
               props.fsetTitle(data.title);}
                if(data.size){
               props.fsetSize(data.size);}
                if(data.location){
               props.fsetLocation(data.location);}
                if(data.publicTitle){
               props.fsetpublicTitle(data.publicTitle);}
                if(data.description){
               props.fsetDescription(data.description);}
                if(data.npk){
               props.fsetNpk(data.npk);}
                if(data.code){
               props.fsetCode(data.code);}
                if(data.type){
               props.fsetType(data.type);}
                if(data.age){
               props.fsetAge(data.age);}


               setIsPending(false);
                setError("");
            })
            .catch(err=>{
                setIsPending(false);
                setError(err.message)
            })
        },[]);

        async function Submit(e){
            let flag=true;
            e.preventDefault();
            setAccept(true);

            if( props.quantity>props.parentSize){
                flag=false;
            }else flag=true;
            try{
             if(flag){
            let res=await axios.post(props.surl,props.setData);
            if (res.status===200){
                setUpdateMessage(true);
                setTimeout(() => setUpdateMessage(false), 2000);
                navigate(`/${props.direction}`);
        }
    }
            }catch(err){
                console.log("err.response.errorMessageDetails");
            }
        }


    return(

        <div className="formContainer ">
            
            {error&&<div>Hatalı</div>}
            {isPending&&<div>indir...</div>}

        <div className="formTitle">Enter Information</div>

        <form onSubmit={Submit} >
            <div className="LandDetails">
                <div className="input-box">
                    <label htmlFor="title" className="details">{props.TitleLabel}</label>
                    {props.bigLand===false&&(<input id="title" type='text' placeholder='Enter here...'  value={props.title} onChange={(e)=> props.setTitle(e.target.value)} />)}
                    {props.childLands===false&&(<input id="title" type='text' placeholder='Enter here...'  value={props.title ||" ("+props.parentTitle+")"} onChange={(e)=> props.setTitle(e.target.value)} />)}
                        
                </div>


                <div className="input-box">
                    <label htmlFor="title" className="details">{props.publicDetailsLabel}</label>
                    <input id="title" type='text' placeholder='Enter here...'  value={props.publicDetails} onChange={(e)=> props.setpublicDetails(e.target.value)}/>
                </div>
               
                {props.inputDescription===false &&(<div className="input-box">
                    <label htmlFor="location" className="details">{props.descriptionLabel}</label>
                    <input id="location" type='text' placeholder='Enter here...'  value={props.description} onChange={(e)=> props.setDescription(e.target.value)}/>
                </div>)}

                {props.inputSizeBox===false &&(<div className="input-box">
                    <label  className="details">{props.quantityLabel}</label>
                    <input  type='number' placeholder='Enter here...'  value={props.quantity} onChange={(e)=> props.setQuantity(e.target.value)}/>
                    {(props.quantity>props.parentSize && accept && (<p className="error">yeterli Boyut yok</p>))||((props.quantity===""||props.quantity===0)&& accept && (<p className="error">*Gerekli</p>))}

                </div>)}

                {props.inputNPKBox===false &&(<div className="input-box">
                    <label htmlFor="size" className="details">{props.NpkLabel}</label>
                    <InputMask id="size" type='text' placeholder='Enter here...'  value={props.Npk} onChange={(e)=> props.setNpk(e.target.value)} mask='99 99 99'/>
                </div>)}

                {props.inputTypeBox===false &&(<div className="input-box">
                     <label htmlFor="size" className="details">{props.typeLabel}</label>
                     <select value={props.type}  onChange={props.handleTypeChange}>
                       {insType.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                    </select>  

                </div>)}
            </div>

            <div className='submitButton flex' >
                <button className='btn' type="submit">{props.button}</button>
            </div>
        </form>
        {updateMessage &&(<div className="add-message flex">
                <div className='img'>
                    <img src={Success} alt='Task Image'/>
                </div>
                <p className="done-message flex">Başarıyla eklendi</p>
            </div>)}
    </div>
    );
}