import '../../../Lands/landForm.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Success from "../../../Assets/check.jpg";
import Select from 'react-dropdown-select';

let samadType=[
    {value:0,label:"Yaprak gübreleme"},
    {value:1,label:"damlama gübreleme"}
]

let colors=[
    {value:0,label:"Red"},
    {value:1,label:"Blue"},
    {value:2,label:"Green"},
    {value:3,label:"Yellow"},
    {value:4,label:"Purple"},
    {value:5,label:"Orange"},
]

export default function UpdateToLand(props){

    const navigate=useNavigate();
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [lands,setLands]=useState([]);
    let [updateMessage,setUpdateMessage]=useState(false);
    let [uniqueLandOptions, setUniqueLandOptions] = useState([]);

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showCuttingLandApi = isDev? {
        baseUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${showCuttingLandApi.baseUrl}/GetAll?pageSize=100000000&pageNum=0`)},
    }:{
        baseUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${showCuttingLandApi.baseUrl}/GetAll?pageSize=100000000&pageNum=0`)},

    }

    useEffect(()=>{
        fetch(showCuttingLandApi.getAllCuttingLand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            console.log(data.data);
            setLands(data.data.map((land)=>({value:land.id
                ,label:land.land.title
            })));
            // setLands(data);
            // const uniqueLand= new Set(data.map((item) => item));
            // setUniqueLandOptions(
            //         Array.from(uniqueLand).map((land) => ({
            //             value:land.id,
            //             label: land.title,
            //         }))
            //     );
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err);
        });
    

        fetch(props.getAllurl)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            console.log(data.data)
            if(props.set1data===false){
                props.setData(data);}
            if(props.set2data===false){
                props.setDatas(data.data);
            }
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err);
        });

        fetch(props.getInfoUrl)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            console.log(data);
            // if(data.cuttingLand){
            // props.fsetSelectedLand(data.cuttingLand.land.title);}
            if(data.cuttingLand){
                props.fsetSelectedLand(data.cuttingLand.id);}
            if(data.land){
            props.fsetSelectedLand(data.land.id);}
            if(data.type){
                props.fsetType(data.type);}
            if(data.title){
                props.fsetTitle(data.title);}    
            if(data.color){
                props.fsetColor(data.color);}    
            if(data.age){
                props.fsetAge(data.age);}
            if(data.quantity){
                props.fsetQuantity(data.quantity);}
            if(data.date){
                props.fsetDate(data.date);}
            if(data.fertilizer){
                props.fsetSelectedSamad(data.fertilizer.id)};
            if(data.cuttingColor){
            props.fsetSelectedCutting(data.cuttingColor.code)};
            if(data.note){
                props.fsetNote(data.note)};
            if(data.liter){
                props.fsetLiter(data.liter)};
            if(data.insecticide){
                props.fsetSelectedInsecticide(data.insecticide.id)};
            if(data.worker){
                props.fsetWorker(data.worker);}
            if(data.count){
                props.fsetCount(data.count);}
            if(data.long){
                props.fsetLong(data.long);}

            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err);
        })
    },[]);


    async function Submit(e){
        e.preventDefault();
        try{
                let res=await axios.post(props.Updateurl,props.UpdatedData);
                if (res.status===200){
                    setUpdateMessage(true);
                    setTimeout(() => setUpdateMessage(false), 2000);
                    navigate(`${props.direction}`);
                }
        }catch(error){
            console.log("err.response.errorMessageDetails");
        }
    }

    return(
        <div className="formContainer" >
             {error&&<div>Hatalı</div>}
             {isPending&&<div>indir...</div>}
            <div className="formTitle">Enter Information</div>

            <form  onSubmit={Submit} >

                <div className="LandDetails">

                    {props.newMix===false&&(
                    <>
                        <div className="input-box">
                            <label htmlFor="title" className="details">Title:</label>
                            <input id="title" type='text' placeholder='Enter here...'  value={props.mixName} onChange={(e)=>props.setMixName(e.target.value)}/>
                        </div>

                        <div className="input-box">
                            <label className="details">Tür:</label>
                            <select value={props.type}  onChange={props.handleTypeChange}>
                                <option value="">Seçimler</option>
                                {samadType.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select> 
                        </div>

                        <div className="input-box">
                            <label className="details">Renk:</label>
                            <select value={props.color}  onChange={props.handleColorChange}>
                                <option value="">Seçimler</option>
                                {colors.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select> 
                        </div>

                    </>
                    )}

                {props.newInsecMix===false&&(
                    <>

                    <div className="input-box">
                        <label htmlFor="title" className="details">Title:</label>
                        <input id="title" type='text' placeholder='Enter here...'  value={props.mixName} onChange={(e)=>props.setMixName(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="title" className="details">Note:</label>
                        <input id="title" type='text' placeholder='Enter here...'  value={props.type} onChange={props.handleTypeChange}/>
                    </div>

                    <div className="input-box">
                        <label className="details">Renk:</label>
                        <select value={props.color}  onChange={props.handleColorChange}>
                            <option value="">Seçimler</option>
                            {colors.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                        </select> 
                    </div>

                    </>
                    )}
                     {/* cutting color */}
                     {props.cuttingColorForm===false&&(
                        <>
                    <div className="input-box">
                        <label htmlFor="title" className="details">Dikilme:</label>
                        <input id="title" disabled={true} type='text' placeholder='Enter here...'  value={props.cutting} />
                    </div>

                    <div className="input-box">
                        <label htmlFor="title" className="details">Code:</label>
                        <input id="title" type='text' placeholder='Enter here...'  value={props.code} onChange={(e)=> props.setCode(e.target.value)} />
                    </div>

                    <div className="input-box">
                        <label htmlFor="title" className="details">Renk:</label>
                        <select value={props.selectedColor} onChange={props.handleColor} > 
                            {props.colors.map((option) => (<option key={option.id} value={option.id}>{option.title}</option>))}
                        </select>
                    </div>
                        
                        </>
                    )}

                    {props.Date===false&&(<div className="input-box">
                        <label className="details">Tarih:</label>
                        <input type='datetime-local' name="date" value={props.date} onChange={(e)=>props.setDate(e.target.value)}/>
                        
                    </div>)}


                    {props.inputMix===false && (
                        <div className="input-box">
                            <label className="details">Tür:</label>
                            <select value={props.type}  onChange={props.handleTypeChange}>
                                {samadType.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select> 
                        </div>
                    )}


                    {props.inputinsecticide=== false &&(
                        <div className='input-box'>
                            <label className="details">ilaç:</label>
                            <select value={props.selectedInsecticide} onChange={props.handleInsecticideChange} >
                                {props.insecticide.map((option) => 
                                        <option key={option.id} value={option.id} data-type={option.type}>{option.publicTitle}</option>
                                )}
                            </select> 
                        </div>
                    )}
                    

                    {props.inputcutting===false&&(
                        <>
                        <div className="input-box">
                            <label htmlFor="landId" className="details">Tarla:</label>
                            <input disabled={true} value={props.selectedLand} onChange={props.handleLandChange} /> 
                        </div>
                        <div className='input-box'>
                            <label className="details">Dikilme Renk:</label>
                            <input disabled={true} value={props.selectedCutting} onChange={props.handleCuttingChange} />
                        </div>
                        </>
                    )}


                    {props.landInput===false &&(
                        <div className="input-box">
                        <label className="details">Tarla:</label>
                        <select  value={props.selectedLand} onChange={props.handleLandChange} > 
                            {lands.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </select>
                    </div>
                    )}

                    {props.flowers===false &&(
                         <>
                         <div className="input-box">
                             <label className="details">Dikildi Tarlalar:</label>
                             <select  value={props.selectedCuttingLand} onChange={props.handleCuttingLandChange} > 
                                 {props.cuttingLand.map((option) => (<option key={option.value} value={option.value}>{option.land.title}</option>))}
                             </select>
                         </div>
 
                         <div className="input-box">
                            <label className="details">Worker:</label>
                            <input type='text' value={props.workerName} placeholder='Enter here...' onChange={(e)=>props.setWorkerName(e.target.value)}/>
                            
                        </div>
                        <div className="input-box">
                            <label className="details">Long:</label>
                            <input type='number' placeholder='Long(cm)' value={props.long} onChange={(e)=>props.setLong(e.target.value)} />
                        </div>
                         <div className="input-box">
                             <label className="details">Note:</label>
                             <input type='text' placeholder='Enter here..' value={props.note} onChange={(e)=>props.setNote(e.target.value)} />
                         </div>
                         </>
                    )}

                    {props.inputMix===false && (
                        <>
                        <div className="input-box">
                            <label className="details">Gübre:</label>
                            <select id="selectedSamad" value={props.SelectedSamad} onChange={props.handleSamadChange} >
                                {/* <option value="">{props.SelectedSamad}</option>   */}
                                {props.Samad.map((option) => (<option key={option.id} value={option.id}>{option.publicTitle}</option>))}
                            </select>
                        </div>

                        <div className="input-box">
                            <label  className="details">Sayı:</label>
                            <input  type="number" placeholder="Sayı (g)" id='quantity' value={props.quantity} onChange={(e) => props.setQuantity(e.target.value)} />
                        </div>
                        </>
                    )}


                    {props.insecticideInput===false&&(
                        <>
                        <div className="input-box">
                            <label className="details">Litre:</label>
                            <input type='number' placeholder='(litre)' value={props.liter} onChange={(e)=>props.setLiter(e.target.value)} />
                        </div>
                        
                        <div className="input-box">
                            <label className="details">Note:</label>
                            <input type='text' placeholder='Enter here..' value={props.note} onChange={(e)=>props.setNote(e.target.value)} />
                        </div>

                        <div className='input-box'>
                            <label className="details">Sayı(Toz):</label>
                            <input type='number' placeholder="Toz Sayı (g)" disabled={props.typeOption==1} value={props.quantity} onChange={(e)=>props.setQuantity(e.target.value)}/>
                        </div>

                        </>
                    )}


                    {props.quantityInput===false&&(
                        <div className="input-box">
                            <label className="details">Sayı:</label>
                            <input id="title" type='number' placeholder='Enter here..'  value={props.quantity} onChange={(e)=> props.setQuantity(e.target.value)}/>
                        </div>)}
                </div>

                <div className='submitButton flex' >
                    <button className='btn' type="submit">Tamamlandı!</button>
                </div>
                
            </form>
            {updateMessage &&(<div className="add-message flex" >
                <div className='img'>
                    <img src={Success} alt='Task Image'/>
                </div>
                <p className="done-message flex">Başarıyla eklendi</p>
            </div>)}
        </div>                      
    );
}