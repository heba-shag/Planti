import {  useState } from 'react';
import UpdateToLand from '../../Components/Forms/ToLand/UpdateToLand';

export default function FLUpdateForm(){
    let id=window.location.pathname.split("/").slice(-1)[0];
    let [type,setType]=useState(0);
    let [selectedLand, setSelectedLand] = useState([]);
    let [samad,setSamad]=useState([]);
    let [selectedSamad, setSelectedSamad] = useState("");
    let [quantity,setQuantity]=useState(0);
    let [date,setDate]=useState(new Date().toISOString());


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const fertilizerLandApi = isDev? {
      baseFertilizerLandUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
      getFertilizerLandById:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/GetById?id=${id}`)},
      updateFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/Update?id=${id}`)},

      baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
      getAllFertilizer:()=>{return (`${fertilizerLandApi.baseFertilizerUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

    }:{
      baseFertilizerLandUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
      getFertilizerLandById:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/GetById?id=${id}`)},
      updateFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/Update?id=${id}`)},

      baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
      getAllFertilizer:()=>{return (`${fertilizerLandApi.baseFertilizerUrl}/GetAll?pageSize=1000000000&pageNum=0`)},

    }

    const handleSamadChange = (event) => {
        setSelectedSamad(event.target.value);
      };

      const handleLandChange = (event) => {
        setSelectedLand(event.target.value);
      };

      let handleTypeChange=(event)=>{
        setType(event.target.value);
      }

      console.log(type);
    return(

        
      <UpdateToLand
      getAllurl={fertilizerLandApi.getAllFertilizer()}
      set2data={false}
      setDatas={setSamad}

      getInfoUrl={fertilizerLandApi.getFertilizerLandById()}
      fsetType={setType}
      fsetQuantity={setQuantity}
      fsetDate={setDate}
      fsetSelectedLand={setSelectedLand}
      fsetSelectedSamad={setSelectedSamad}

      Updateurl={fertilizerLandApi.updateFertilizerLand()}
      UpdatedData={{quantity:quantity,
        date:date,
        type:parseInt(type),
        cuttingLandId:selectedLand,
        fertilizerId:selectedSamad}}

      direction="/fertland/show-Fertilizer"
      inputMix={false}
      landInput={false}
      Date={false}

      date={date}
      type={type}
      setDate={setDate}
      selectedLand={selectedLand}
      SelectedSamad={selectedSamad}
      Samad={samad}
      quantity={parseFloat(quantity)}

      handleTypeChange={handleTypeChange}
      handleLandChange={handleLandChange}
      handleSamadChange={handleSamadChange}
      setQuantity={setQuantity}
    />
        
    );
}
