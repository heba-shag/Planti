import '../../../Lands/landForm.css';
import Select from 'react-dropdown-select'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack,  IoIosArrowForward } from "react-icons/io";
import Success from "../../../Assets/check.jpg";


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

export default function AddtoLandForm(props){

    const navigate=useNavigate();
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [lands,setLands]=useState([]);
    let [quantity,setQuantity]=useState(0);
    let [accept,setAccept]=useState(false);
    let [addMessage,setAddMessage]=useState(false);

    let [uniqueLandOptions, setUniqueLandOptions] = useState([]);

    useEffect(()=>{
        fetch(props.getlandUrl)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            if(props.inputinsecticide===false || props.inputMix===false){
                console.log(data.data);
                setLands(data.data.map((land)=>({value:land.id
                    ,label:land.land.title
                })));
                // console.log(data.data.map((land)=>));
                // const uniqueLand= new Set(data.data.map((land)=>land.land));
                // setUniqueLandOptions(
                //     Array.from(uniqueLand).map((land) => ({
                //         value:land.id,
                //         label: land.title,
                //     }))
                // );
                
            }
            if(props.landInput===false){
                setLands(data);
                const uniqueLand= new Set(data.map((item) => item));
                console.log(uniqueLand);
                setUniqueLandOptions(
                    Array.from(uniqueLand).map((land) => ({
                        value:land.id,
                        label: land.title,
                    }))
                );
            }
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message)
        });

        if(props.cuttingPick===false){
            fetch(props.getAllColorurl)
            .then((res)=>{
                if(!res.ok){
                    throw Error("couldn't fetch data for that resource" )
                }
                return  res.json();
            })
            .then((data)=>{
                props.setColorData(data.data);
                setIsPending(false);
                setError("");
            })
            .catch(err=>{
                setIsPending(false);
                setError(err.message)
            });

            fetch(props.getAllCuttingurl)
            .then((res)=>{
                if(!res.ok){
                    throw Error("couldn't fetch data for that resource" )
                }
                return  res.json();
            })
            .then((data)=>{
                props.setCuttingData(data.data);
                setIsPending(false);
                setError("");
            })
            .catch(err=>{
                setIsPending(false);
                setError(err.message)
            });
        }
        fetch(props.getAllurl)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            console.log(data.data);
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
            setError(err.message)
        })
        
    },[]);

    const handleAddMix = () => {
        const quantity = parseFloat(document.getElementById('quantity').value);
        if (quantity && props.SelectedSamad) {
          props.setMix([...props.mix, { quantity, fertilizerId: parseInt(props.SelectedSamad),fertName:props.samadName }]);
          props.setSelectedSamad("");
          setQuantity("");
        }
    };

    

    const handleAddIsecticideMix = () => {
    const liter = parseInt(props.liter);
    const quantity = parseInt(props.powderquantity);
    if (props.liter && props.selectedInsecticide) {
        props.setMix([...props.mix, { quantity,liter, insecticideId: props.selectedInsecticide,InsecticideName:props.InsecName }]);
        props.setSelectedInsecticide("");
        props.setPQuantity("");
        props.setLiter("");
    }
    };

    const handleAddFlowerArray = () => {
        const count = parseInt(props.count);
        const long = parseInt(props.long);
        const note =props.note;
        if (props.count && props.long && props.note) {
            props.setMix([...props.mix, { count,long, note }]);
            props.setCount("");
            props.setLong("");
            props.setNote("");
        }
    };
    
      
    async function Submit(e){
        let flag=true;
        e.preventDefault();
        setAccept(true);
        //condition to check the data and send it to the dataBase
        if(props.selected1Land===""||props.mixName==="" || props.quantity===0 || props.selectedLand===""|| props.type==="" || props.mix===""||props.date==="" ||(props.powderquantity===0&&props.typeOption==0 )|| props.selectedCuttingCode===""||props.selectedCuttingLand===""||props.cutting===""||props.long===0||props.count===0 ){
            flag=false;
        }else flag=true;
        
        try{
            if(flag){
                let res=await axios.post(props.Addurl,props.AddedData);
                if (res.status===200){
                    setAddMessage(true);
                    setTimeout(() => setAddMessage(false), 2000);
                    navigate(`${props.direction}`);
                }
        }}catch(error){
            console.log("err.response.errorMessageDetails");
        }
    }

    
    return(
        <div className="formContainer "  >
            {error&&<div>Hatalı</div>}
            {isPending&&<div>indir...</div>}

            <div className="formTitle">Enter Information</div>

            <form  onSubmit={Submit} >

                <div className="LandDetails">

                    {/* new Mix */}

                    {props.newInsecMix===false&&(
                    <>
                        <div className="input-box">
                            <label htmlFor="title" className="details">Title:</label>
                            <input id="title" type='text' placeholder='Enter here...'  value={props.mixName} onChange={(e)=>props.setMixName(e.target.value)}/>
                            {props.mixName==='' &&accept && (<p className="error">*Gerekli</p>)} 
                        </div>

                        <div className="input-box">
                            <label className="details">Note:</label>
                            <input id="title" type='text' placeholder='Enter here...'  value={props.note} onChange={(e)=>props.setNote(e.target.value)}/>  
                        </div>

                        <div className="input-box">
                            <label className="details">Renk:</label>
                            <select value={props.color}  onChange={props.handleColorChange}>
                                <option value="">Seçimler</option>
                                {colors.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select> 
                            {props.color==="" &&accept && (<p className="error">*Gerekli</p>)}  
                        </div>

                        <div className="input-box input-mix">
                            <label className="details">ilaç:</label>
                            <select style={{marginBottom:".7rem"}} placeholder="ilaç:" id="selectedSamad" value={props.selectedInsecticide} onChange={props.handleInsecticideChange} >
                                <option value="">Seçimler</option>
                                {props.insecticide.map((option) => (<option key={option.id} value={option.id} data-name={option.publicTitle} data-type={option.type}>{option.publicTitle}</option>))}
                            </select>
                            
                            <label className="details">litre:</label>
                            <input type='number' placeholder='(litre)' value={props.liter} onChange={(e)=>props.setLiter(e.target.value)} />
                            <label className="details">Sayı:</label>
                            <input type='number' disabled={props.typeOption===false} placeholder="Toz Sayı  (g)" value={props.powderquantity} onChange={(e)=>props.setPQuantity(e.target.value)} />
                            <button style={{margin:".7rem"}} type="button" className='btn' onClick={handleAddIsecticideMix} >Add new mix</button>
                            {props.mix.length===0 && accept &&(<p className="error">*Gerekli</p>)}
                            {props.mix.length > 0 && (
                                <>
                                <table className='samadMix'>
                                    <thead>
                                        <tr>
                                            <th>ilaç</th>
                                            <th>Sayı</th>
                                            <th>Litre</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {props.mix.map((mixItem, index) => (
                                        <>
                                    <tr key={index}>
                                        <td>{mixItem.InsecticideName}</td>
                                        <td>{mixItem.quantity?mixItem.quantity:0} g</td>
                                        <td>{mixItem.liter} l</td>
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

                    {props.newMix===false&&(
                    <>
                        <div className="input-box">
                            <label htmlFor="title" className="details">Title:</label>
                            <input id="title" type='text' placeholder='Enter here...'  value={props.mixName} onChange={(e)=>props.setMixName(e.target.value)}/>
                            {props.mixName==='' &&accept && (<p className="error">*Gerekli</p>)} 
                        </div>

                        <div className="input-box">
                            <label className="details">Tür:</label>
                            <select value={props.type}  onChange={props.handleTypeChange}>
                                <option value="">Seçimler</option>
                                {samadType.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select> 
                            {props.type==="" &&accept && (<p className="error">*Gerekli</p>)}  
                        </div>

                        <div className="input-box">
                            <label className="details">Renk:</label>
                            <select value={props.color}  onChange={props.handleColorChange}>
                                <option value="">Seçimler</option>
                                {colors.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select> 
                            {props.color==="" &&accept && (<p className="error">*Gerekli</p>)}  
                        </div>

                        <div className="input-box input-mix">
                            <label className="details">Gübre:</label>
                            <select style={{marginBottom:".7rem"}} id="selectedSamad" value={props.SelectedSamad} onChange={props.handleSamadChange} >
                                <option value="">Seçimler</option>
                                {props.Samad.map((option) => (<option key={option.id} value={option.id} data-type={option.publicTitle}>{option.publicTitle}</option>))}
                            </select>

                            <label className="details">Sayı:</label>
                            <input id="quantity" type="number" placeholder="Sayı (g)" value={quantity} onChange={(e) => setQuantity(e.target.value)} /> 

                            <button style={{margin:".7rem"}} type="button" className='btn' onClick={handleAddMix} >mix Ekleme</button>
                            {props.mix.length===0 && accept &&(<p className="error">*Gerekli</p>)}
                            {props.mix.length > 0 && (
                                <>
                            <table className='samadMix'>
                                    <thead>
                                        <tr>
                                            <th>Gübre</th>
                                            <th>Sayı</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {props.mix.map((mixItem, index) => (
                                        <>
                                    <tr key={index}>
                                        <td>{mixItem.fertName}</td>
                                        <td>{mixItem.quantity}</td>
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

                    
                    {/* cutting color */}
                    {props.cuttingColorForm===false&&(
                        <>
                    <div className="input-box">
                        <label htmlFor="title" className="details">Dikilme:</label>
                        <input id="title" disabled={true} type='text' placeholder='Enter here...'  value={props.cutting} />
                        {props.cutting==='' &&accept && (<p className="error">*Gerekli</p>)} 

                    </div>

                    <div className="input-box">
                        <label htmlFor="title" className="details">Code:</label>
                        <input id="title" type='text' placeholder='Enter here...'  value={props.code} onChange={(e)=> props.setCode(e.target.value)} />
                        {props.code==='' &&accept && (<p className="error">*Gerekli</p>)} 
                    </div>

                    <div className="input-box">
                        <label htmlFor="title" className="details">Renk:</label>
                        <select value={props.selectedColor} onChange={props.handleColor} > 
                            <option value="">Seçimler</option>
                            {props.colors.map((option) => (<option key={option.id} value={option.id}>{option.title}</option>))}
                        </select>
                        {props.selectedColor==='' &&accept && (<p className="error">*Gerekli</p>)} 

                    </div>
                        
                        </>
                    )}

                    {props.Date===false&&(<div className="input-box">
                        <label className="details">Tarih:</label>
                        <input type='datetime-local' name="date" value={props.date} onChange={(e)=>props.setDate(e.target.value)}/>
                        {props.date==='' &&accept && (<p className="error">*Gerekli</p>)} 
                    </div>)}


                    {props.inputMix===false && (
                        <div className="input-box">
                            <label className="details">Tür:</label>
                            <select value={props.type}  onChange={props.handleTypeChange}>
                                <option value="">Seçimler</option>
                                {samadType.map((option) => (<option key={option.value} value={option.value}>{option.label} </option>))}
                            </select> 
                            {props.type==="" &&accept && (<p className="error">*Gerekli</p>)}  
                        </div>
                    )}

                    {props.landInput===false &&(
                        <div className="input-box">
                            <label className="details">Tarla:</label>
                            <select  value={props.selected1Land} onChange={props.handle1LandChange} > 
                                <option value="">Seçimler</option>
                                {uniqueLandOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </select>
                            {props.selected1Land==="" && accept &&(<p className="error">*Gerekli</p>)}
                        </div>
                    )}

                    {props.inputcutting===false&&(
                        <>
                        <div className="input-box">
                            <label className="details">Sayı:</label>
                            <input id="title" type='number' placeholder='Enter here...'  value={props.quantity} onChange={(e)=> props.setQuantity(e.target.value)}/>
                            {props.quantity===0 && accept &&(<p className="error">*Gerekli</p>)}

                        </div>
                        {props.newForm===false?(
                            <div className="input-box">
                                <label className="details">Dikilme Renk Code:</label>
                                <select  value={props.selectedCuttingCode} onChange={props.handleCuttingCodeChange} > 
                                    <option value="">Seçimler</option>
                                    {props.cuttingCode.map((option) => (<option key={option.id} value={option.id}>{option.code}</option>))}
                                </select>
                                {props.selectedCuttingCode==="" && accept &&(<p className="error">*Gerekli</p>)}
                                {(<button style={{margin:".7rem"}} type="button" className='btn' onClick={props.handleAdd} >Dikilme Renk Ekleme</button>)}
                            </div>
                        ):(
                            <div className='input-box input-mix'>
                                <label className="details">Dikilme:</label>
                                <select disabled={props.isSubmitted} value={props.selectedCutting} onChange={props.handleCuttingChange} >
                                    <option value="">Seçimler </option>
                                    {props.cuttingName.map((option) => 
                                        <option key={option.id} value={option.id} data-type={option.type} >{option.title}</option>
                                    )}
                                </select> 
                                {props.selectedCutting ==="" && props.accept &&(<p className="error">*Gerekli</p>)}
                                <label className="details">Renk:</label>
                                <select disabled={props.isSubmitted} value={props.selectedColor} onChange={props.handleColorChange} >
                                    <option value="">Seçimler </option>
                                    {props.colorName.map((option) => 
                                        <option key={option.id} value={option.id} data-type={option.type} >{option.title}</option>
                                    )}
                                </select> 
                                {props.selectedColor ==="" && props.accept &&(<p className="error">*Gerekli</p>)} 
                                <label className="details">Code:</label>
                                <input disabled={props.isSubmitted} type='text' placeholder='Enter here..' value={props.code} onChange={(e)=>props.setCode(e.target.value)} />
                                <div className='input-mix-btns flex'>
                                    <button disabled={props.isSubmitted} style={{margin:".7rem"}} type="button" className='btn' onClick={props.submit} >Done!</button>
                                    <button style={{margin:".7rem"}} type="button" className='btn' onClick={props.handleCancel} >Back?</button>
                                </div>
                            </div>
                        )}
                        </>
                    )}

                    {props.flowers===false &&(
                        <>

                        <div className="input-box">
                            <label className="details">Dikildi Tarlalar:</label>
                            <select  value={props.selectedCuttingLand} onChange={props.handleCuttingLandChange} > 
                                <option value="">Seçimler</option>
                                {props.cuttingLand.map((option) => (<option key={option.id} value={option.id}>{option.land.title}</option>))}
                            </select>
                            {props.selectedCuttingLand==="" && accept &&(<p className="error">*Gerekli</p>)}
                        </div>

                        <div className="input-box">
                            <label className="details">Worker:</label>
                            <input type='text' value={props.workerName} placeholder='Enter here...' onChange={(e)=>props.setWorkerName(e.target.value)}/>
                            
                        </div>

                        <div className="input-box input-mix">
                            <label className="details">Count:</label>
                            <input style={{marginBottom:".7rem"}} type='number' placeholder='Count' value={props.count} onChange={(e)=>props.setCount(e.target.value)} />
                            {props.count===0 && accept &&(<p className="error">*Gerekli</p>)}
                       
                            <label className="details">Long:</label>
                            <input type='number' placeholder='Long(cm)' value={props.long} onChange={(e)=>props.setLong(e.target.value)} />
                            {props.long===0 && accept &&(<p className="error">*Gerekli</p>)}
                        
                            <label className="details">Note:</label>
                            <input type='text' placeholder='Enter here..' value={props.note} onChange={(e)=>props.setNote(e.target.value)} />
                            {(<button style={{margin:".7rem"}} type="button" className='btn' onClick={handleAddFlowerArray} >Add new one</button>)}

                            {props.mix.length > 0 && (
                                <>
                                <table className='flowerMix'>
                                    <thead>
                                        <tr>
                                            <th>Count</th>
                                            <th>Long</th>
                                            <th>Note</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {props.mix.map((mixItem, index) => (
                                        <>
                                    <tr key={index}>
                                        <td>{mixItem.count}</td>
                                        <td>{mixItem.long} cm</td>
                                        <td>{mixItem.note} </td>
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


                    {props.inputinsecticide===false && (
                        <>

                        <div className="input-box">
                            <label className="details">Tarla:</label>
                            <Select id="selectLand"  name='select' multi options={lands}  color="#528e25" value={props.selectedLand} onChange={(e) => {props.setSelectedLand(e.map(option=>option.value))}} ></Select>
                            {props.selectedLand==="" && accept &&(<p className="error">*Gerekli</p>)}
                        </div>
                        
                        <div className="input-box">
                            <label className="details">Note:</label>
                            <input type='text' placeholder='Enter here..' value={props.note} onChange={(e)=>props.setNote(e.target.value)} />

                        </div>
                        <div className="input-box input-mix">
                            <label className="details">ilaç:</label>
                            <select style={{marginBottom:".7rem"}} placeholder="ilaç:" id="selectedSamad" value={props.selectedInsecticide} onChange={props.handleInsecticideChange} >
                                <option value="">Seçimler</option>
                                {props.insecticide.map((option) => (<option key={option.id} value={option.id} data-name={option.publicTitle} data-type={option.type}>{option.publicTitle}</option>))}
                            </select>
                            
                            <label className="details">litre:</label>
                            <input type='number' placeholder='(litre)' value={props.liter} onChange={(e)=>props.setLiter(e.target.value)} />
                            <label className="details">Sayı:</label>
                            <input type='number' disabled={props.typeOption===false} placeholder="Toz Sayı  (g)" value={props.powderquantity} onChange={(e)=>props.setPQuantity(e.target.value)} />
                            <button style={{margin:".7rem"}} type="button" className='btn' onClick={handleAddIsecticideMix} >Add new mix</button>
                            {props.mix.length===0 && accept &&(<p className="error">*Gerekli</p>)}
                            {props.mix.length > 0 && (
                                <>
                                <table className='samadMix'>
                                    <thead>
                                        <tr>
                                            <th>ilaç</th>
                                            <th>Sayı</th>
                                            <th>Litre</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {props.mix.map((mixItem, index) => (
                                        <>
                                    <tr key={index}>
                                        <td>{mixItem.InsecticideName}</td>
                                        <td>{mixItem.quantity?mixItem.quantity:0} g</td>
                                        <td>{mixItem.liter} l</td>
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

                    {props.inputMix===false && (
                        <>

                        <div className="input-box">
                            <label className="details">Tarla:</label>
                            <Select id="selectLand"  name='select' multi options={lands} color="#528e25" value={props.selectedLand} onChange={(e) => {props.setSelectedLand(e.map(option=>option.value))}} ></Select>
                            {props.selectedLand==="" && accept &&(<p className="error">*Gerekli</p>)}
                        </div>
                        
                        <div className="input-box input-mix">
                            <label className="details">Gübre:</label>
                            <select style={{marginBottom:".7rem"}} id="selectedSamad" value={props.SelectedSamad} onChange={props.handleSamadChange} >
                                <option value="">Seçimler</option>
                                {props.Samad.map((option) => (<option key={option.id} value={option.id} data-type={option.publicTitle}>{option.publicTitle}</option>))}
                            </select>
                            
                            <label className="details">Sayı:</label>
                            <input id="quantity" type="number" placeholder="Sayı (g)" value={quantity} onChange={(e) => setQuantity(e.target.value)} /> 

                            <button style={{margin:".7rem"}} type="button" className='btn' onClick={handleAddMix} >mix Ekleme</button>
                            {props.mix.length===0 && accept &&(<p className="error">*Gerekli</p>)}
                            {props.mix.length > 0 && (
                                <>
                               <table className='samadMix'>
                                    <thead>
                                        <tr>
                                            <th>Gübre</th>
                                            <th>Sayı</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {props.mix.map((mixItem, index) => (
                                        <>
                                    <tr key={index}>
                                        <td>{mixItem.fertName}</td>
                                        <td>{mixItem.quantity}</td>
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

                    {/* {props.insecticideInput===false&&(
                        <div className="input-box">
                            <label className="details">Note:</label>
                            <input type='text' placeholder='Enter here..' value={props.note} onChange={(e)=>props.setNote(e.target.value)} />

                        </div>
                    )} */}


                    {props.quantityInput===false&&(
                        <div className="input-box">
                            <label className="details">Sayı:</label>
                            <input id="title" type='number' placeholder='Enter here...'  value={props.quantity} onChange={(e)=> props.setQuantity(e.target.value)}/>
                            {props.quantity===0 && accept &&(<p className="error">*Gerekli</p>)}

                        </div>)}
                </div>

                <div className='submitButton flex' >
                    <button className='btn' type="submit">Tamamlandı!</button>
                </div>
                
            </form>
            {addMessage &&(<div className="add-message flex" >
                <div className='img'>
                    <img src={Success} alt='Task Image'/>
                </div>
                <p className="done-message flex">Başarıyla eklendi</p>
            </div>)}
        </div>
    );
}