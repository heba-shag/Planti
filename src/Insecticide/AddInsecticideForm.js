import { useState } from 'react';
import AddForm from '../Components/Forms/AddForm';

export default function AddInsecticideForm(){

  // multiple environment

  let isDev=process.env.NODE_ENV === 'development';
  const addInsecApi = isDev? {

    baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
    addInsec:()=>{return (`${addInsecApi.baseUrl}/Add`)} 
    
  }:{
    baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
    addInsec:()=>{return (`${addInsecApi.baseUrl}/Add`)} 
  }


    let [title,setTitle]=useState("");
    let [publicTitle,setpublicTitle]=useState("");
    let [type,setType]=useState("");
    let [description,setDescription]=useState(""); 

    let handleTypeChange=(event)=>{
        setType(event.target.value);
    }

    return(
        <AddForm
                url={(addInsecApi.addInsec())}
                data={{type:parseInt(type),
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
                
                button="Ekleme"
                
        />
        
    );
}