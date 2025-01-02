import {  useState } from 'react';
import UpdateToLand from '../../Components/Forms/ToLand/UpdateToLand';

export default function UpdateCuttingLand(){

    let [selectedLand,setSelectedLand]=useState("");
    let [cuttingColor,setCuttingColor]=useState([]);
    let [selectedCutting,setSelectedCutting]=useState("");
    let [date,setDate]=useState(new Date().toISOString());
    let [quantity,setQuantity]=useState(0);
    let id=window.location.pathname.split("/").slice(-1)[0];

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const cuttingLandApi = isDev? {
        baseCuttingUrl: process.env.REACT_APP_API_CUTTING_URL,
        getAllCuttingColor:()=>{return (`${cuttingLandApi.baseCuttingUrl}/GetAllCuttingColor`)},

        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getCuttingLandById:()=>{return (`${cuttingLandApi.baseCuttingLandUrl}/GetById?id=${id}`)},
        updateCuttingLand:()=>{return (`${cuttingLandApi.baseCuttingLandUrl}/Update?id=${id}&date=${date}&quantity=${quantity}`)},
    }:{
        baseCuttingUrl: process.env.REACT_APP_API_CUTTING_URL,
        getAllCuttingColor:()=>{return (`${cuttingLandApi.baseCuttingUrl}/GetAllCuttingColor`)},

        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getCuttingLandById:()=>{return (`${cuttingLandApi.baseCuttingLandUrl}/GetById?id=${id}`)},
        updateCuttingLand:()=>{return (`${cuttingLandApi.baseCuttingLandUrl}/Update?id=${id}&date=${date}&quantity=${quantity}`)},
    }

    let handleLandChange=(event)=>{
        setSelectedLand(event.target.value);
    } 

    let handleCuttingChange=(event)=>{
        setSelectedCutting(event.target.value);
    } 

    return(

        <UpdateToLand
        getAllurl={cuttingLandApi.getAllCuttingColor()}
        set1data={false}
        setData={setCuttingColor}
        cuttingColor={cuttingColor}
  
        getInfoUrl={cuttingLandApi.getCuttingLandById()}
        fsetQuantity={setQuantity}
        fsetDate={setDate}
        fsetSelectedLand={setSelectedLand}
        fsetSelectedCutting={setSelectedCutting}
        // fsetQuantity={setQuantity}
        
  
        Updateurl={cuttingLandApi.updateCuttingLand()}
       
        direction="/cuttingLand"
        inputcutting={false}
        quantityInput={false}
        Date={false}
  
        date={date}
        setDate={setDate}
        selectedLand={selectedLand}
        selectedCutting={selectedCutting}
        quantity={quantity}
  
        handleLandChange={handleLandChange}
        handleCuttingChange={handleCuttingChange}
        setQuantity={setQuantity}
      />
    );
}