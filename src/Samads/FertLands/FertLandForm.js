import { useState } from 'react';
import AddtoLandForm from '../../Components/Forms/ToLand/AddtoLandForm';

export default function FertLandForm(){
    let [type,setType]=useState("");
    let [selectedLand, setSelectedLand] = useState([]);
    let [samad,setSamad]=useState([]);
    let [selectedSamad, setSelectedSamad] = useState("");
    let [selectedSamadName, setSelectedSamadName] = useState("");
    let [mix,setMix]=useState([]);
    let [date,setDate]=useState(new Date().toISOString());


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const fertilizerLandApi = isDev? {
        baseFertilizerLandUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
        addFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/Add`)},

        baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getAllFertilizer:()=>{return (`${fertilizerLandApi.baseFertilizerUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

        baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${fertilizerLandApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }:{
      baseFertilizerLandUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
      addFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/Add`)},

      baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
      getAllFertilizer:()=>{return (`${fertilizerLandApi.baseFertilizerUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

      baseCuttingLandUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
      getAllCuttingLand:()=>{return (`${fertilizerLandApi.baseCuttingLandUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }

    const handleSamadChange = (event) => {
      setSelectedSamad(event.target.value);
      const selectedName = event.target.options[event.target.selectedIndex].dataset.type;
      setSelectedSamadName(selectedName);
    };

    let handleTypeChange=(event)=>{
      setType(event.target.value);
    }


    return(

      <AddtoLandForm
        getlandUrl={fertilizerLandApi.getAllCuttingLand()}
        getAllurl={fertilizerLandApi.getAllFertilizer()}
        set2data={false}
        setDatas={setSamad}

        Addurl={fertilizerLandApi.addFertilizerLand()}
        AddedData={{date:date,
                type:parseInt(type),
                cuttingLandIds:selectedLand,
                mixes:mix}}

        direction="/fertland/show-Fertilizer"
        
        Date={false}
        inputMix={false}

        date={date}
        setDate={setDate}
        type={type}
        handleTypeChange={handleTypeChange}
        selectedLand={selectedLand}
        setSelectedLand={setSelectedLand}
        SelectedSamad={selectedSamad}
        setSelectedSamad={setSelectedSamad}
        samadName={selectedSamadName}
        handleSamadChange={handleSamadChange}
        Samad={samad}
        setMix={setMix}
        mix={mix}
      />
    );
}