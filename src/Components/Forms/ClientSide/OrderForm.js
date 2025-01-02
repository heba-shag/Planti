import '../../../Lands/landForm.css';
import {useEffect, useState } from 'react';
import {InputMask} from "primereact/inputmask";
import { useNavigate } from 'react-router-dom';
import Success from "../../../Assets/check.jpg";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css' ;
import axios from 'axios';
import { Link } from 'react-router-dom';

let isBought=[
    {value:true,label:"evet"},
    {value:false,label:"hayır"}
]
let isLocal=[
    {value:true,label:"evet"},
    {value:false,label:"hayır"}
]
export default function OrderForm(props){

    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [accept,setAccept]=useState(false);
    let [addMessage,setAddMessage]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        fetch(props.getProductlsUrl)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            props.setProductData(data.data.map((code)=>({value:code.code,label:code.code})));
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message)
        });

        fetch(props.getClientsUrl)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            console.log(data.data);
            props.setClientData(data.data.map((client)=>({value:client.id,label:client.name})));
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
        });

        // fetch(props.getDatesUrl)
        // .then((res)=>{
        //     if(!res.ok){
        //         throw Error("couldn't fetch data for that resource" )
        //     }
        //     return  res.json();
        // })
        // .then((data)=>{
        //     console.log(data.data);
        //     props.seturlDate(data.data.map((client)=>({value:client.id,label:client.name})));
        //     setIsPending(false);
        //     setError("");
        // })
        // .catch(err=>{
        //     setIsPending(false);
        //     setError(err.message)
        // });
    },[])

    // const handleAddFlowerArray = () => {
    //     const count = parseInt(props.count);
    //     const long = parseInt(props.long);
    //     const note =props.note;
    //     if (props.count && props.long && props.note) {
    //         props.setMix([...props.mix, { count,long, note }]);
    //         props.setCount("");
    //         props.setLong("");
    //         props.setNote("");
    //     }
    // };
 
    async function Submit(e){
        let flag=true;
        e.preventDefault();
        setAccept(true);

        //condition to check the data and send it to the dataBase
        if(props.orderDate==="" ||props.isBought===""|| props.mix==="" || props.clientId===""||props.addValuePhoneField<2||props.addClientName===""||props.addSelectedIsLocal===""){
            flag=false;
        }else flag=true;
        try{
            if(flag){
            
        let res=await axios.post(props.AddOrderUrl,props.orderDetails);

        if (res.status===200){
            setAddMessage(true);
            setTimeout(() => setAddMessage(false), 1500);
            navigate(`${props.direction}`);
        }
        }}catch(err){
            console.log(err.response.data.errorMessage);
            props.setErrorMessage(err.response.data.errorMessage);
            if(props.flowersOrder===false){
                props.setMix("");
            }
            
        }
    }

    return(
        <div className="formContainer ">
            {(props.errorHatalı===false&&error)&& (<div>Hatalı</div>)}
            {(props.isPendingindir===false&&isPending)&&(<div>indir...</div>)}
            
            
            <div className="formTitle">Add {props.title}</div>

            <form onSubmit={Submit} >
                <div className="LandDetails" >

                    {props.newClientForm===false&&(
                         <>
                            <div className='input-box' >
                                <label className="details">Client Name:</label>
                                <input type='text' placeholder='Enter here..' value={props.addClientName} onChange={(e)=>props.setClientName(e.target.value)} />
                                {props.addClientName ==="" && accept &&(<p className="error">*Gerekli</p>)}
                            </div>

                            <div className='input-box' >
                                <label className="details">is Local?</label>
                                <select value={props.addSelectedIsLocal} onChange={props.handleIsLocalChange} >
                                    <option value="">Seçimler</option>
                                    {isLocal.map((option) => <option key={option.value} value={option.value} >{option.label}</option>)}
                                </select> 
                                {props.addSelectedIsLocal ==="" && accept &&(<p className="error">*Gerekli</p>)}
                            </div>

                            <div className='input-box input-mix' style={{border:"none"}}>
                                <label className="details">Phone Number:</label>
                                <PhoneInput placeholder="Enter phone Number.." defaultCountry="TR" value={props.addValuePhoneField} onChange={props.handlePhoneNumber} format="international" maxLength="15"  />
                                {props.addValuePhoneField.length<2 &&accept &&(<p className="error">*Gerekli</p>)}
                            </div>
                            
                            </>
                    )}
                    {props.OrderDefault===false&&(
                        <>
                        <div className="input-box " style={{width:"100%"}}>
                            <label className="details">order Tarih:</label>
                            <input type='datetime-local' name="date" value={props.orderDate} onChange={(e)=>props.setOrderDate(e.target.value)}/>
                            {props.orderDate==='' &&accept && (<p className="error">*Gerekli</p>)} 
                        </div>
                        </>
                    )}
                
                    {props.flowersOrder===false &&(
                        <>
                        <label className="details">Order Details:</label> 
                        <div className="input-box input-mix">
                            <label className="details">Count:</label>
                            <input type='number' name="count" value={props.count} onChange={(e)=>props.setCount(e.target.value)}/>
                            {props.errorMessage && accept &&(<p className="error">{props.errorMessage}</p>)}
                            <label className="details">Long:</label>
                            <input type='number' value={props.long} onChange={(e)=>props.setLong(e.target.value)}/>
                            <label className="details">Çiçek:</label>
                            <select value={props.flowerCode}  onChange={props.handleFlowerCodeChange}>
                                <option value="">Seçimler</option>
                                {props.flowerDetails.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select>

                            <button style={{margin:".7rem"}} type="button" className='btn' onClick={props.handleFlowerOrders} >order Ekleme</button>
                            {props.mix.length===0 && accept &&(<p className="error">*Gerekli</p>)}

                            {props.mix.length > 0  && (
                                <>
                               <table className='samadMix'>
                                    <thead>
                                        <tr>
                                            <th>Long</th>
                                            <th>Count</th>
                                            <th>Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {props.mix.map((mixItem, index) => (
                                        <>
                                    <tr key={index}>
                                        <td>{mixItem.long }</td>
                                        <td>{mixItem.count }</td>
                                        <td>{mixItem.code}</td>
                                    </tr>
                                    </>
                                    ))} 
                                    </tbody>
                                </table>
                                </>
                            )} 
                        </div>
                        </>
                    )}

                    {props.OrderDefault===false&&(
                        <>
                        {props.newClient===false?(
                            <div className="input-box " style={{width:"100%"}}>
                                <label className="details">Client name:</label>
                                <select  value={props.clientId} onChange={props.handleClientIdChange} > 
                                    <option value="">Seçimler</option>
                                    {props.clientData.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                                </select>
                                <button style={{margin:".7rem"}} type="button" className='btn' onClick={props.handleAdd} >Add new client</button>
                            </div>
                            ):(
                            <>
                            <label className="details">New Client Info:</label>
                            <div className='input-box input-mix'>
                                <label className="details">Client Name:</label>
                                <input disabled={props.isSubmitted} type='text' placeholder='Enter here..' value={props.clientName} onChange={(e)=>props.setClientName(e.target.value)} />
                                {props.clientName ==="" && props.accept &&(<p className="error">*Gerekli</p>)}
                                
                                <label className="details">is Local?</label>
                                <select disabled={props.isSubmitted} value={props.selectedIsLocal} onChange={props.handleIsLocalChange} >
                                    <option value="">Seçimler</option>
                                    {isLocal.map((option) => <option key={option.value} value={option.value} >{option.label}</option>)}
                                </select> 
                                {props.selectedIsLocal ==="" && props.accept &&(<p className="error">*Gerekli</p>)}
                                <label className="details">Phone Number:</label>
                                <PhoneInput placeholder="Enter phone Number.." defaultCountry="TR" value={props.valuePhoneField} onChange={props.handlePhoneNumber} format="international" maxLength="15"  />
                                {props.valuePhoneField.length<2 && props.accept &&(<p className="error">*Gerekli</p>)}
                                <div className='input-mix-btns flex'>
                                    <button disabled={props.isSubmitted} style={{margin:".7rem"}} type="button" className='btn' onClick={props.submit} >Done!</button>
                                    <button style={{margin:".7rem"}} type="button" className='btn' onClick={props.handleCancel} >Back?</button>
                                </div>
                            </div>
                            </>
                        )}
                        </>
                    )}

                    {props.OrderDefault===false&&(
                        <>
                         
                        <label className="details">Recive Details:</label> 
                        <div className="input-box input-mix">
                            <label className="details">is Bought:</label>
                            <select  value={props.isBought} onChange={props.handleIsBoughtChange} > 
                                <option value="">Seçimler</option>
                                {isBought.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                            </select>
                            {props.isBought==="" && accept &&(<p className="error">*Gerekli</p>)}
                            <label className="details">Recive Tarih:</label>
                            <input type='datetime-local' disabled={props.isBought==="false"} name="date" value={props.reciveDate} onChange={(e)=>props.setReciveDate(e.target.value)}/>
                        </div>
                        </>
                    )}
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