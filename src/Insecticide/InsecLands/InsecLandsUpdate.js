import { useState } from 'react';
import UpdateToLand from '../../Components/Forms/ToLand/UpdateToLand';

export default function InsecLandsUpdate(){

    let [selectedLand, setSelectedLand] = useState("");
    let [selectedLandId, setSelectedLandId] = useState("");
    let [insecticide,setInsecticide]=useState([]);
    let [selectedInsecticide, setSelectedInsecticide] = useState("");
    let [date,setDate]=useState(new Date().toISOString());
    let [liter,setLiter]=useState("");
    let [quantity,setQuantity]=useState(0);
    let [note,setNote]=useState("");
    let [typeOption,setTypeOption]=useState("");
    let id=window.location.pathname.split("/").slice(-1)[0];

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const insecticideLandApi = isDev? {
        baseInsecticideLandUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        getIsecticideLandById:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/GetById?id=${id}`)},
        updateIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/Update?id=${id}`)},

        baseInsecticideUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllInsecticide:()=>{return (`${insecticideLandApi.baseInsecticideUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

       
    }:{
        baseInsecticideLandUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        getIsecticideLandById:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/GetById?id=${id}`)},
        updateIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/Update?id=${id}`)},

        baseInsecticideUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllInsecticide:()=>{return (`${insecticideLandApi.baseInsecticideUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }


    const handleInsecticideChange = (event) => {
    setSelectedInsecticide(event.target.value);
    const selectedType = event.target.options[event.target.selectedIndex].dataset.type;
    setTypeOption(selectedType);
    }

    let handleLandChange=(event)=>{
    setSelectedLand(event.target.value);
    }   

    return(
        <UpdateToLand
        getAllurl={insecticideLandApi.getAllInsecticide()}
        set2data={false}
        setDatas={setInsecticide}
        insecticide={insecticide}
  
        getInfoUrl={insecticideLandApi.getIsecticideLandById()}
        fsetNote={setNote}
        fsetDate={setDate}
        fsetSelectedLand={setSelectedLand}
        fsetLiter={setLiter}
        fsetQuantity={setQuantity}
        fsetSelectedInsecticide={setSelectedInsecticide}
        fsetSelectedLandId={setSelectedLandId} 
  
        Updateurl={insecticideLandApi.updateIsecticideLand()}
        UpdatedData={{
            note:note,
            liter: liter,
            quantity: quantity,
            cuttingLandId: selectedLand,
            insecticideId: selectedInsecticide,
            date:date          
        }}

        direction="/inseLand/show-insecticide"
        inputinsecticide={false}
        insecticideInput={false}
        landInput={false}
        Date={false}

        date={date}
        setDate={setDate}
        selectedLand={selectedLand}
        selectedLandId={selectedLandId}
        selectedInsecticide={selectedInsecticide}
        quantity={quantity}
        liter={liter}
        note={note}
        typeOption={typeOption}
  
        handleLandChange={handleLandChange}
        handleInsecticideChange={handleInsecticideChange}
        setQuantity={setQuantity}
        setLiter={setLiter}
        setNote={setNote}
        />

    );
}