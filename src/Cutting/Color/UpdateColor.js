import { useState } from 'react';
import UpdateForm from '../../Components/Forms/UpdateForm';

export default function UpdateColor(){

    let [title,setTitle]=useState("");
    let [code,setCode]=useState("");
    let id=window.location.pathname.split("/").slice(-1)[0];
    
    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const updateColorApi = isDev? {

        baseUrl: process.env.REACT_APP_API_COLOR_URL,
        getColorById:()=>{return (`${updateColorApi.baseUrl}/GetById?id=${id}`)},
        updateColor:()=>{return (`${updateColorApi.baseUrl}/Update?id=${id}&title=${title}&code=${code}`)}
    
    }:{
        baseUrl: process.env.REACT_APP_API_COLOR_URL,
        getColorById:()=>{return (`${updateColorApi.baseUrl}/GetById?id=${id}`)},
        updateColor:()=>{return (`${updateColorApi.baseUrl}/Update?id=${id}&title=${title}&code=${code}`)}
    }

    return(
        <UpdateForm
            gurl={(updateColorApi.getColorById())}
            
            fsetTitle={setTitle}
            fsetCode={setCode}
    
            surl={(updateColorApi.updateColor())}
        
            inputSizeBox={true}
            inputTypeBox={true}
            inputNPKBox={true}
            inputDescription={true}

            direction="color"
            TitleLabel="Ad:"
            bigLand={false}
            title={title}
            setTitle={setTitle}
            publicDetailsLabel="Code:"
            publicDetails={code}
            setpublicDetails={setCode}
            
            button="Tamamlandı"
            
        />
    );
}