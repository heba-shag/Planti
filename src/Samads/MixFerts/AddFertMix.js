import { useState } from "react";
import AddtoLandForm from "../../Components/Forms/ToLand/AddtoLandForm";

export default function AddFertMix(){
    let [fertilizer,setFertilizer]=useState([]);
    let [mixName,setMixName]=useState("");
    let [selectedFert,setSelectedFert]=useState("");
    let [color,setColor]=useState("");
    let [selectedFertName,setSelectedFertName]=useState("");
    let [mix,setMix]=useState([]);
    let [type,setType]=useState("")


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const fertilizerMixApi = isDev? {
        baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getAllFertilizer:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
        addNewFertilizerMix:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/AddMix`)},

    }:{
        baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getAllFertilizer:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
        addNewFertilizerMix:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/AddMix`)},
    }

    const handleSamadChange = (event) => {
        setSelectedFert(event.target.value);
        const selectedName = event.target.options[event.target.selectedIndex].dataset.type;
        setSelectedFertName(selectedName);
    };

    let handleTypeChange=(event)=>{
    setType(event.target.value);
    }

    let handleColorChange=(event)=>{
        setColor(event.target.value);
    }

    return(
        <AddtoLandForm
            getAllurl={fertilizerMixApi.getAllFertilizer()}
            set2data={false}
            setDatas={setFertilizer}
    
            Addurl={fertilizerMixApi.addNewFertilizerMix()}
            AddedData={{title:mixName,
                    type:parseInt(type),
                    color:parseInt(color),
                    mixes:mix}}
     
            direction="/fertilizer-mixes/show-fert-Mixes"
            
            newMix={false}

            mixName={mixName}
            setMixName={setMixName}
            type={type}
            handleTypeChange={handleTypeChange}
            handleColorChange={handleColorChange}
            SelectedSamad={selectedFert}
            setSelectedSamad={setSelectedFert}
            samadName={selectedFertName}
            handleSamadChange={handleSamadChange}
            Samad={fertilizer}
            setMix={setMix}
            mix={mix}
            />
    )
}