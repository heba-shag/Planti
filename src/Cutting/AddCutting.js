import { useState } from 'react';
import AddForm from '../Components/Forms/AddForm';

export default function AddCutting(){

    let [title,setTitle]=useState("");
    let [type,setType]=useState("");
    let [age,setAge]=useState(0);
    
    // multiple environment

  let isDev=process.env.NODE_ENV === 'development';
  console.log(isDev); 
  const addCuttingApi = isDev? {

    baseUrl: process.env.REACT_APP_API_CUTTING_URL,
    addCutting:()=>{return (`${addCuttingApi.baseUrl}/Add?title=${title}&type=${type}&age=${age}`)} 
    
  }:{
    baseUrl: process.env.REACT_APP_API_CUTTING_URL,
    addCutting:()=>{return (`${addCuttingApi.baseUrl}/Add?title=${title}&type=${type}&age=${age}`)} 
  }

  console.log(addCuttingApi.addCutting());

    return(

        <AddForm
            url={(addCuttingApi.addCutting())}

            inputSizeBox={false}
            inputTypeBox={true}
            inputNPKBox={true}
            inputDescription={true}
            
            direction="cutting"
            TitleLabel="Ad:"
            bigLand={false}
            title={title}
            setTitle={setTitle}
            publicDetailsLabel="Tür:"
            publicDetails={type}
            setpublicDetails={setType}
            quantityLabel="Yaş:"
            quantity={age}
            setQuantity={setAge}
            
            button="Ekleme" 
        />
    );
}