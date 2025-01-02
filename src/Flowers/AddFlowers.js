import { useState } from 'react';
import AddtoLandForm from '../Components/Forms/ToLand/AddtoLandForm';

export default function AddFlowers(){

    let [cuttingLand,setCuttingLand]=useState([]);
    let [count,setCount]=useState(0);
    let [long,setLong]=useState(0);
    let [selectedCuttingLand,setSelectedCuttingLand]=useState("");
    let [note,setNote]=useState("");
    let [date,setDate]=useState(new Date().toISOString());
    let [workerName,setWorkerName]=useState("");
    let [mix,setMix]=useState([]);


    let handleCuttingLandChange=(event)=>{
        setSelectedCuttingLand(event.target.value);
    } 

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const flowerApi = isDev? {
        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${flowerApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseFlowerUrl: process.env.REACT_APP_API_FLOWER_URL,
        addFlower:()=>{return (`${flowerApi.baseFlowerUrl}/Add?cuttingLandId=${selectedCuttingLand}`)},
    }:{
        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${flowerApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseFlowerUrl: process.env.REACT_APP_API_FLOWER_URL,
        addFlower:()=>{return (`${flowerApi.baseFlowerUrl}/Add?cuttingLandId=${selectedCuttingLand}`)},
    }

    return(

        <AddtoLandForm
            getAllurl={flowerApi.getAllCuttingLand()}
            set2data={false}
            setDatas={setCuttingLand}
            cuttingLand={cuttingLand}

            Addurl={flowerApi.addFlower()}

            AddedData={{
                date:date,
                worker:workerName,
                flowers:mix
                
                }}

            direction="/flowers"
            
            Date={false}
            flowers={false}

            handleCuttingLandChange={handleCuttingLandChange}
            setCount={setCount}
            setLong={setLong}
            setDate={setDate}
            setNote={setNote}
            setMix={setMix}
            setWorkerName={setWorkerName}

            selectedCuttingLand={selectedCuttingLand}
            date={date}
            count={count}
            long={long}
            mix={mix}
            note={note}
            workerName={workerName}
        />
    );
}