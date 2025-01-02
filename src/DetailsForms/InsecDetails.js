import { useState } from "react";
import DetailsForm from "../Components/Forms/DetailsForm";

export default function InsecDetails(){
    const id=window.location.pathname.split("/").slice(-1)[0];
    let [title,setTitle]=useState("");
    let [publicTitle,setPublicTitle]=useState("");
    let [type,setType]=useState("");
    let [description,setDescription]=useState("");

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const InsecticideApi = isDev? {
        baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getInsecticideById:()=>{return (`${InsecticideApi.baseUrl}/GetById?id=${id}`)},

        
    }:{
        baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getInsecticideById:()=>{return (`${InsecticideApi.baseUrl}/GetById?id=${id}`)},
    }

    return(
    <DetailsForm
        detailsTitle="ilaç"
        getById={InsecticideApi.getInsecticideById()}
        insecticideDetails={false}
        setTitle={setTitle}
        setPublicTitle={setPublicTitle}
        setType={setType}
        setDescription={setDescription}

        TitleLabel="Bilimsel Adı:"
        publicTitleLabel="ilaç Adı:"
        typeLabel="Tür:"
        descriptionLabel="Tanım:"

        title={title}
        publicTitle={publicTitle}
        type={type===0?"Sıvı ilaç":"Toz ilaç"}
        description={description}
    />
    );
}