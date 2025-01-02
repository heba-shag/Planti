import { useState } from 'react';
import UpdateToLand from '../Components/Forms/ToLand/UpdateToLand';

export default function UpdateFlower(){

    let [cuttingLand,setCuttingLand]=useState([]);
    let [count,setCount]=useState(0);
    let [selectedCuttingLand,setSelectedCuttingLand]=useState("");
    let [date,setDate]=useState(new Date().toISOString());
    let [note,setNote]=useState("");
    let [workerName,setWorkerName]=useState("");
    let [long,setLong]=useState(0);
    let id=window.location.pathname.split("/").slice(-1)[0];

    let handleCuttingLandChange=(event)=>{
        setSelectedCuttingLand(event.target.value);
    } 

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const flowerApi = isDev? {
        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${flowerApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseFlowerUrl: process.env.REACT_APP_API_FLOWER_URL,
        getFlowerById:()=>{return (`${flowerApi.baseFlowerUrl}/GetById?id=${id}`)},
        updateFlower:()=>{return (`${flowerApi.baseFlowerUrl}/Update?id=${id}&worker=${workerName}&note=${note}&long=${long}&count=${count}&date=${date}&cuttingLandId=${selectedCuttingLand}`)},
    }:{
        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${flowerApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseFlowerUrl: process.env.REACT_APP_API_FLOWER_URL,
        getFlowerById:()=>{return (`${flowerApi.baseFlowerUrl}/GetById?id=${id}`)},
        updateFlower:()=>{return (`${flowerApi.baseFlowerUrl}/Update?id=${id}&worker=${workerName}&note=${note}&long=${long}&count=${count}&date=${date}&cuttingLandId=${selectedCuttingLand}`)},
    }

    return(

        <UpdateToLand
            getAllurl={flowerApi.getAllCuttingLand()}
            set2data={false}
            setDatas={setCuttingLand}
            cuttingLand={cuttingLand}

            getInfoUrl={flowerApi.getFlowerById()}
            fsetCount={setCount}
            fsetDate={setDate}
            fsetSelectedLand={setSelectedCuttingLand}
            fsetNote={setNote}   
            fsetWorker={setWorkerName}   
            fsetLong={setLong}
            Updateurl={flowerApi.updateFlower()}
           
            direction="/flowers"
            
            Date={false}
            flowers={false}
            quantityInput={false}

            handleCuttingLandChange={handleCuttingLandChange}
            setQuantity={setCount}
            setDate={setDate}
            setNote={setNote}
            setWorkerName={setWorkerName}
            setLong={setLong}
            selectedCuttingLand={selectedCuttingLand}
            date={date}
            quantity={count}
            note={note}
            workerName={workerName}
            long={long}

        />
    );
}