import { useState } from "react";
import UpdateToLand from "../../Components/Forms/ToLand/UpdateToLand";

export default function UpdateFertMixes(){
    let [mixName,setMixName]=useState("");
    let [type,setType]=useState("");
    let [color,setColor]=useState("");
    let id=window.location.pathname.split("/").slice(-1)[0];

    let isDev=process.env.NODE_ENV === 'development';
    const fertMixApi = isDev? {
        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getFertMixById:()=>{return (`${fertMixApi.baseUrl}/GetMixById?id=${id}`)},
        updateFertMix:()=>{return (`${fertMixApi.baseUrl}/UpdateMix?id=${id}&title=${mixName}&type=${type}&color=${color}`)},
    }:{
        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getFertMixById:()=>{return (`${fertMixApi.baseUrl}/GetMixById?id=${id}`)},
        updateFertMix:()=>{return (`${fertMixApi.baseUrl}/UpdateMix?id=${id}&title=${mixName}&type=${type}&color=${color}`)},
    }

    let handleTypeChange=(event)=>{
        setType(event.target.value);
    }

    let handleColorChange=(event)=>{
        setColor(event.target.value);
    }
    return(
        <UpdateToLand
            getInfoUrl={fertMixApi.getFertMixById()}
            fsetType={setType}
            fsetTitle={setMixName}
            fsetColor={setColor}
            
            Updateurl={fertMixApi.updateFertMix()}
            
            direction="/fertilizer-mixes/show-fert-Mixes"
            
            newMix={false}

            mixName={mixName}
            setMixName={setMixName}
            color={color}
            type={type}
            handleTypeChange={handleTypeChange}
            handleColorChange={handleColorChange}

        />
    )
}