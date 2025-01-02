import { useEffect, useState } from 'react';
import AddtoLandForm from '../../Components/Forms/ToLand/AddtoLandForm';

export default function AddCuttingColor(){

  let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [code,setCode]=useState("");
    let [colors,setColors]=useState([]);
    let [cutting,setCutting]=useState("");
    let [cuttingId,setCuttingId]=useState("");
    let [selectedColor,setSelectedColor]=useState("");
    let id=window.location.pathname.split("/").slice(-1)[0];


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const cuttingColorApi = isDev? {

    baseCuttingUrl: process.env.REACT_APP_API_CUTTING_URL,
    getCuttingById:()=>{return (`${cuttingColorApi.baseCuttingUrl}/GetById?id=${id}`)},
    AddCuttingColor:()=>{return (`${cuttingColorApi.baseCuttingUrl}/AddCuttingColor`)},

    baseColorUrl:process.env.REACT_APP_API_COLOR_URL,
    getAllColor:()=>{return (`${cuttingColorApi.baseColorUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }:{
      baseCuttingUrl: process.env.REACT_APP_API_CUTTING_URL,
      getCuttingById:()=>{return (`${cuttingColorApi.baseCuttingUrl}/GetById?id=${id}`)},
      AddCuttingColor:()=>{return (`${cuttingColorApi.baseCuttingUrl}/AddCuttingColor`)},

      baseColorUrl:process.env.REACT_APP_API_COLOR_URL,
      getAllColor:()=>{return (`${cuttingColorApi.baseColorUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }

    
    useEffect(()=>{
        fetch(cuttingColorApi.getCuttingById())
        .then((res)=>{
          if(!res.ok){
              throw Error("couldn't fetch data for that resource" )
          }
          return  res.json();
      })
        .then((data)=>{
            setCutting(data.title);
            setCuttingId(data.id);
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message)
        })
    },[])

    let handleColor=(event)=>{
        setSelectedColor(event.target.value);
    }

    return(

      <AddtoLandForm
      getAllurl={cuttingColorApi.getAllColor()}
      set2data={false}
      setDatas={setColors}

      Addurl={cuttingColorApi.AddCuttingColor()}
      AddedData={{code: code,
        colorId: selectedColor,
        cuttingId: cuttingId}}

      direction={`/cutting/cuttingcolor/${id}`}
      cuttingColorForm={false}

      cutting={cutting}
      colors={colors}
      code={code}
      selectedColor={selectedColor}


      setCode={setCode}
      handleColor={handleColor}
    />

    );
}