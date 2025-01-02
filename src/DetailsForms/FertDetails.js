import { useState } from "react";
import DetailsForm from "../Components/Forms/DetailsForm";

export default function FertDetails(){
    const id=window.location.pathname.split("/").slice(-1)[0];
    let [title,setTitle]=useState("");
    let [publicTitle,setPublicTitle]=useState("");
    let [npk,setNpk]=useState("");
    let [description,setDescription]=useState("");

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const fertilizerApi = isDev? {
        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getFertilizerById:()=>{return (`${fertilizerApi.baseUrl}/GetById?id=${id}`)},

        
    }:{
        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getFertilizerById:()=>{return (`${fertilizerApi.baseUrl}/GetById?id=${id}`)},
    }

    return(
    <DetailsForm
        detailsTitle="Gübre"
        getById={fertilizerApi.getFertilizerById()}
        fertilizerDetails={false}
        setTitle={setTitle}
        setPublicTitle={setPublicTitle}
        setNpk={setNpk}
        setDescription={setDescription}

        TitleLabel=" Bilimsel Adı :"
        publicTitleLabel="Gübre Adı:"
        NPKLabel="NPK:"
        descriptionLabel="Tanım:"

        title={title}
        publicTitle={publicTitle}
        npk={npk}
        description={description}
    />
    );
}