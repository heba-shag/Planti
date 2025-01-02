import { useState } from 'react';
import UpdateForm from '../Components/Forms/UpdateForm';

export default function UpdateSamad(){

    let [title,setTitle]=useState("");
    let [publicTitle,setpublicTitle]=useState("");
    let [npk,setNpk]=useState("");
    let [description,setDescription]=useState("");

    let id=window.location.pathname.split("/").slice(-1)[0];  

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const updateSamadApi = isDev? {

        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getSamadById:()=>{return (`${updateSamadApi.baseUrl}/GetById?id=${id}`)},
        updateSamad:()=>{return (`${updateSamadApi.baseUrl}/Update?id=${id}`)} 
        
      }:{
        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getSamadById:()=>{return (`${updateSamadApi.baseUrl}/GetById?id=${id}`)},
        updateSamad:()=>{return (`${updateSamadApi.baseUrl}/Update?id=${id}`)} 
      }

    return(

        <UpdateForm
            gurl={(updateSamadApi.getSamadById())}
            
            fsetTitle={setTitle}
            fsetpublicTitle={setpublicTitle}
            fsetDescription={setDescription}
            fsetNpk={setNpk}
    
            surl={(updateSamadApi.updateSamad())}
            setData={{NPK:npk,
                Title:title,
                PublicTitle:publicTitle,
                Description:description}}
        
            inputSizeBox={true}
            inputTypeBox={true}
            inputNPKBox={false}
            inputDescription={false}

            direction="samads"
            TitleLabel="Bilimsel Adı:"
            bigLand={false}
            title={title}
            setTitle={setTitle}
            publicDetailsLabel="Ad:"
            publicDetails={publicTitle}
            setpublicDetails={setpublicTitle}
            descriptionLabel="Tanım:"
            description={description}
            setDescription={setDescription}
            NpkLabel="NPK:"
            Npk={npk}
            setNpk={setNpk}
            
            button="Tamamlandı"
            
        />
        
    );
}