import { useState } from 'react';
import AddtoLandForm from '../../Components/Forms/ToLand/AddtoLandForm';
import axios from 'axios';

export default function AddCuttingLand(){

    let [accept,setAccept]=useState(false);
    let [newForm,setNewForm]=useState(false);
    let [isSubmitted,setIsSubmitted]=useState(false);

    let [selectedLand,setSelectedLand]=useState("");
    let [cuttingColorCode,setCuttingColorCode]=useState([]);
    let [selectedcuttingColorCode,setSelectedCuttingColorCode]=useState([]);

    let [cutting,setCutting]=useState([]);
    let [color,setColor]=useState([]);
    let [code,setCode]=useState("")
    let [selectedCutting,setSelectedCutting]=useState("");
    let [selectedColor,setSelectedColor]=useState('');
    let [date,setDate]=useState(new Date().toISOString());
    let [quantity,setQuantity]=useState(0);
    let [cuttingColorId,setCuttingColorId]=useState("");

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const cuttingLandApi = isDev? {

        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        addCuttingLand:()=>{return (`${cuttingLandApi.baseCuttingLandUrl}/Add`)},
        
        baseLandUrl:process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${cuttingLandApi.baseLandUrl}/GetAll?justChildren=true&isActive=true`)},

        baseColorUrl:process.env.REACT_APP_API_COLOR_URL,
        getAllColor:()=>{return (`${cuttingLandApi.baseColorUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseCuttingUrl:process.env.REACT_APP_API_CUTTING_URL,
        addCuttingColor:()=>{return(`${cuttingLandApi.baseCuttingUrl}/AddCuttingColor`)},
        getAllCutting:()=>{return (`${cuttingLandApi.baseCuttingUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
        getAllCuttingColor:()=>{return (`${cuttingLandApi.baseCuttingUrl}/GetAllCuttingColor`)},
    }:{
        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        addCuttingLand:()=>{return (`${cuttingLandApi.baseCuttingLandUrl}/Add`)},
        
        baseLandUrl:process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${cuttingLandApi.baseLandUrl}/GetAll?justChildren=true&isActive=true`)},

        baseColorUrl:process.env.REACT_APP_API_COLOR_URL,
        getAllColor:()=>{return (`${cuttingLandApi.baseColorUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseCuttingUrl:process.env.REACT_APP_API_CUTTING_URL,
        addCuttingColor:()=>{return(`${cuttingLandApi.baseCuttingUrl}/AddCuttingColor`)},
        getAllCutting:()=>{return (`${cuttingLandApi.baseCuttingUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
        getAllCuttingColor:()=>{return (`${cuttingLandApi.baseCuttingUrl}/GetAllCuttingColor`)},
    }

    let handleLandChange=(event)=>{
        setSelectedLand(event.target.value);
    } 

    let handleCuttingChange=(event)=>{
        setSelectedCutting(event.target.value);
    } 
    let handleColorChange=(event)=>{
        setSelectedColor(event.target.value);
    } 

    let handleCuttingCodeChange=(event)=>{
        setSelectedCuttingColorCode(event.target.value);
    } 

    let handleAdd = async () => {
        setNewForm(true);
        
    };

    let handleCancel=async()=>{
        setNewForm(false);
    }
    
    async function Submit(e){
        let flag=true;
        e.preventDefault();
        setAccept(true);

        if(selectedColor===""||selectedCutting===""){
            flag=false;
        }else flag=true;
        try{
            if(flag){
            
            let res=await axios.post(cuttingLandApi.addCuttingColor(),{
                code: code,
                colorId: parseInt(selectedColor),
                cuttingId: parseInt(selectedCutting)}
            );   
            if(res.status===200){
            setCuttingColorId(res.data);
            setIsSubmitted(true);
            }
                
        }}catch(error){
            console.log("err.response.errorMessageDetails");
        }
    }

    return(

        <AddtoLandForm
            accept={accept}
            submit={Submit}
            handleAdd={handleAdd}
            isSubmitted={isSubmitted}
            handleCancel={handleCancel}
            newForm={newForm}
            cuttingPick={false}
            getlandUrl={cuttingLandApi.getAllLand()}
            getAllCuttingurl={cuttingLandApi.getAllCutting()}
            setCuttingData={setCutting}
            getAllColorurl={cuttingLandApi.getAllColor()}
            setColorData={setColor}
            getAllurl={cuttingLandApi.getAllCuttingColor()}
            set1data={false}
            setData={setCuttingColorCode}
            cuttingCode={cuttingColorCode}

            Addurl={cuttingLandApi.addCuttingLand()}
            AddedData={{quantity: quantity,
                landId: selectedLand,
                cuttingColorId:parseInt(cuttingColorId)|| selectedcuttingColorCode,
                date:date}}

            direction="/cuttingLand"

            Date={false}
            inputcutting={false}
            landInput={false}
            // quantityInput={false}

            handleCuttingChange={handleCuttingChange}
            handleColorChange={handleColorChange}
            handle1LandChange={handleLandChange}
            handleCuttingCodeChange={handleCuttingCodeChange}
            setCode={setCode}
            setQuantity={setQuantity}
            setDate={setDate}

            cuttingName={cutting}
            colorName={color}
            code={code}
            selected1Land={selectedLand}
            selectedCutting={selectedCutting}
            selectedColor={selectedColor}
            selectedCuttingCode={selectedcuttingColorCode}
            date={date}
            quantity={quantity}
        />
    );
}