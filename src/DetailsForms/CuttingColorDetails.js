import { useState } from "react";
import DetailsForm from "../Components/Forms/DetailsForm";

export default function CuttingColorDetails(){
    const id=window.location.pathname.split("/").slice(-1)[0];
    let [code,setCode]=useState("");
    let [colorCode,setColorCode]=useState("");
    let [colorTitle,setColorTitle]=useState("");
    let [cuttingAge,setCuttingAge]=useState("");
    let [cuttingType,setCuttingType]=useState("");
    let [cuttingTitle,setCuttingTitle]=useState("");

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const cuttingColorApi = isDev? {
        baseUrl: process.env.REACT_APP_API_CUTTING_URL,
        getCuttingColorById:()=>{return (`${cuttingColorApi.baseUrl}/GetCuttingColorById?id=${id}`)},

        
    }:{
        baseUrl: process.env.REACT_APP_API_CUTTING_URL,
        getCuttingColorById:()=>{return (`${cuttingColorApi.baseUrl}/GetCuttingColorById?id=${id}`)},
    }

    return(
    <DetailsForm
        detailsTitle="Dikilme Renk"
        getById={cuttingColorApi.getCuttingColorById()}
        cuttingColorDetails={false}
        setCode={setCode}
        setColorCode={setColorCode}
        setColorTitle={setColorTitle}
        setCuttingAge={setCuttingAge}
        setCuttingType={setCuttingType}
        setCuttingTitle={setCuttingTitle}

        codeLabel="Dikilme Renk Code:"
        colorTitleLabel="Renk Ad:"
        colorCodeLabel="Renk Code:"
        cuttingTitleLabel="Dikilme Ad:"
        cuttingAgeLabel="Dikilme Yaş:"
        cuttingTypeLabel="Dikilme Tür:"

        code={code}
        colorCode={colorCode}
        colorTitle={colorTitle}
        cuttingAge={cuttingAge}
        cuttingType={cuttingType}
        cuttingTitle={cuttingTitle}

    />
    );
}