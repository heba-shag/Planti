import { useState } from 'react';
import UpdateForm from '../Components/Forms/UpdateForm';

export default function UpdateInsecticide(){

    let [title,setTitle]=useState("");
    let [publicTitle,setpublicTitle]=useState("");
    let [type,setType]=useState(0);
    let [description,setDescription]=useState("");

    let id=window.location.pathname.split("/").slice(-1)[0];

    // multiple environment

  let isDev=process.env.NODE_ENV === 'development';
  const updateInsecApi = isDev? {

    baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
    getIsecById:()=>{return (`${updateInsecApi.baseUrl}/GetById?id=${id}`)},
    updateInsec:()=>{return (`${updateInsecApi.baseUrl}/Update?id=${id}`)} 
    
  }:{
    baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
    getIsecById:()=>{return (`${updateInsecApi.baseUrl}/GetById?id=${id}`)},
    updateInsec:()=>{return (`${updateInsecApi.baseUrl}/Update?id=${id}`)} 
  }


    let handleTypeChange=(event)=>{
        setType(event.target.value);
    }
    
    return(
        <UpdateForm
            gurl={(updateInsecApi.getIsecById())}
            
            fsetType={setType}
            fsetTitle={setTitle}
            fsetpublicTitle={setpublicTitle}
            fsetDescription={setDescription}
    
            surl={(updateInsecApi.updateInsec())}
            setData={{type:type,
                title:title,
                publicTitle:publicTitle,
                description:description}}
        
            inputSizeBox={true}
            inputTypeBox={false}
            inputNPKBox={true}
            inputDescription={false}

            direction="insecticide"
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
            typeLabel="Tür"
            type={type}
            handleTypeChange={handleTypeChange}
            
            button="Tamamlandı"
            
        />
        
    );
}