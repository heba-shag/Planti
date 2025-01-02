import { useEffect, useState } from 'react';
import UpdateToLand from '../../Components/Forms/ToLand/UpdateToLand';

export default function UpdateCuttingColor(){
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [code,setCode]=useState("");
    let [colors,setColors]=useState([]);
    let [cutting,setCutting]=useState("");
    let [selectedColor,setSelectedColor]=useState("");

    let id=window.location.pathname.split("/").slice(-1)[0];
    let cutId=window.location.pathname.split("/").slice(3,4)[0];


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const cuttingColorApi = isDev? {

        baseCuttingUrl: process.env.REACT_APP_API_CUTTING_URL,
        getCuttingById:()=>{return (`${cuttingColorApi.baseCuttingUrl}/GetById?id=${cutId}`)},
        getCuttingColorById:()=>{return (`${cuttingColorApi.baseCuttingUrl}/GetCuttingColorById?id=${id}`)},
        updateCuttingColor:()=>{return(`${cuttingColorApi.baseCuttingUrl}/UpdateCuttingColor?id=${id}`)},

        baseColorUrl:process.env.REACT_APP_API_COLOR_URL,
        getAllColor:()=>{return (`${cuttingColorApi.baseColorUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
    }:{
        baseCuttingUrl: process.env.REACT_APP_API_CUTTING_URL,
        getCuttingById:()=>{return (`${cuttingColorApi.baseCuttingUrl}/GetById?id=${cutId}`)},
        getCuttingColorById:()=>{return (`${cuttingColorApi.baseCuttingUrl}/GetCuttingColorById?id=${id}`)},
        updateCuttingColor:()=>{return(`${cuttingColorApi.baseCuttingUrl}/UpdateCuttingColor?id=${id}`)},

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
            setIsPending(false);
            setError("");
           
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message)
        })

        fetch(cuttingColorApi.getCuttingColorById())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{
            setCode(data.code);
            setSelectedColor(data.color.title);
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message)
        })

    },[]);
    console.log(selectedColor);


    let handleColor=(event)=>{
        setSelectedColor(event.target.value);
    }

    return(
        <UpdateToLand
        getAllurl={cuttingColorApi.getAllColor()}
        set2data={false}
        setDatas={setColors}
        cuttingColorForm={false}
  
        Updateurl={cuttingColorApi.updateCuttingColor()}
        UpdatedData={{code: code,
            colorId: selectedColor,
            cuttingId: cutId}}
  
        direction={`/cutting/cuttingcolor/${cutId}`}
  
        cutting={cutting}
        colors={colors}
        code={code}
        selectedColor={selectedColor}
        
        setCode={setCode}
        handleColor={handleColor}
      />
    );
}