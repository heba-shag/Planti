import { useState } from "react";
import UpdateToLand from "../../Components/Forms/ToLand/UpdateToLand";

export default function UpdateInsectMix(){
    let [mixName,setMixName]=useState("");
    let [note,setNote]=useState("");
    let [color,setColor]=useState("");
    let id=window.location.pathname.split("/").slice(-1)[0];

    let isDev=process.env.NODE_ENV === 'development';
    const insecticideMixApi = isDev? {
        baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getInsecMixById:()=>{return (`${insecticideMixApi.baseUrl}/GetMixById?id=${id}`)},
        updateInsecMix:()=>{return (`${insecticideMixApi.baseUrl}/UpdateMix?id=${id}&title=${mixName}&note=${note}&color=${color}`)},
    }:{
        baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getInsecMixById:()=>{return (`${insecticideMixApi.baseUrl}/GetMixById?id=${id}`)},
        updateInsecMix:()=>{return (`${insecticideMixApi.baseUrl}/UpdateMix?id=${id}&title=${mixName}&note=${note}&color=${color}`)},
    }

    let handleNoteChange=(event)=>{
        setNote(event.target.value);
    }

    let handleColorChange=(event)=>{
        setColor(event.target.value);
    }

    return(
        <UpdateToLand
            getInfoUrl={insecticideMixApi.getInsecMixById()}
            fsetNote={setNote}
            fsetTitle={setMixName}
            fsetColor={setColor}

            Updateurl={insecticideMixApi.updateInsecMix()}
            
            direction="/insecticide-mixes/show-insec-Mixes"
            
            newInsecMix={false}

            mixName={mixName}
            setMixName={setMixName}
            color={color}

            type={note}
            handleTypeChange={handleNoteChange}
            handleColorChange={handleColorChange}

        />
    )
}