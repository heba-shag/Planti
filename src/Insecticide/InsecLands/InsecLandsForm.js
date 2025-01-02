import { useState } from 'react';
import AddtoLandForm from '../../Components/Forms/ToLand/AddtoLandForm';

export default function InsecLandsForm(){

    let [selectedLand, setSelectedLand] = useState("");
    let [insecticide,setInsecticide]=useState([]);
    let [selectedInsecticide, setSelectedInsecticide] = useState("");
    let [InsecticideName, setInsecticideName] = useState("");
    let [date,setDate]=useState(new Date().toISOString());
    let [liter,setLiter]=useState("");
    let [quantity,setQuantity]=useState(0);
    let [note,setNote]=useState("");
    let [mix,setMix]=useState([]);
    let [typeOption,setTypeOption]=useState(false);

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const insecticideLandApi = isDev? {
        baseInsecticideLandUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        addIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/Add`)},

        baseInsecticideUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllInsecticide:()=>{return (`${insecticideLandApi.baseInsecticideUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${insecticideLandApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }:{
        baseInsecticideLandUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        addIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/Add`)},

        baseInsecticideUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllInsecticide:()=>{return (`${insecticideLandApi.baseInsecticideUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${insecticideLandApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }

    const handleInsecticideChange = (event) => {
        setSelectedInsecticide(event.target.value);
        const selectedType = event.target.options[event.target.selectedIndex].dataset.type;
        const selectedName = event.target.options[event.target.selectedIndex].dataset.name;
        setInsecticideName(selectedName);
        if(selectedType===1){
            setTypeOption(true);
        }else{
            setTypeOption(false);
        }
        
    }

    return(
        <AddtoLandForm
            getlandUrl={insecticideLandApi.getAllCuttingLand()}
            getAllurl={insecticideLandApi.getAllInsecticide()}
            set2data={false}
            setDatas={setInsecticide}

            Addurl={insecticideLandApi.addIsecticideLand()}
            AddedData={{note:note,
                date:date,
                cuttingLandIds: selectedLand,
                mixes:mix}}

            direction="/inseLand/show-insecticide"
            
            Date={false}
            inputinsecticide={false}
            insecticideInput={false}

            handleInsecticideChange={handleInsecticideChange}
            setSelectedLand={setSelectedLand}
            setLiter={setLiter}
            setNote={setNote}
            setPQuantity={setQuantity}
            setDate={setDate}
            InsecName={InsecticideName}

            insecticide={insecticide}
            selectedLand={selectedLand}
            selectedInsecticide={selectedInsecticide}
            setSelectedInsecticide={setSelectedInsecticide}
            liter={liter}
            date={date}
            note={note}
            powderquantity={quantity}
            typeOption={typeOption}
            setMix={setMix}
            mix={mix}
        />
    );
}