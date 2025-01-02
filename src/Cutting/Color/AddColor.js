import { useState } from 'react';
import AddForm from '../../Components/Forms/AddForm';

export default function AddColor(){

    let [title,setTitle]=useState("");
    let [code,setCode]=useState("");

    // multiple environment

  let isDev=process.env.NODE_ENV === 'development';
  const addColorApi = isDev? {

    baseUrl: process.env.REACT_APP_API_COLOR_URL,
    addColor:()=>{return (`${addColorApi.baseUrl}/Add?title=${title}&code=${code}`)} 
    
  }:{
    baseUrl: process.env.REACT_APP_API_COLOR_URL,
    addColor:()=>{return (`${addColorApi.baseUrl}/Add?title=${title}&code=${code}`)} 
  }

    return(

        <AddForm
            url={(addColorApi.addColor())}

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
            
            button="Ekleme" 
        />
    );
}