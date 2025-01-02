import { useState } from 'react';
import UpdateForm from '../Components/Forms/UpdateForm';

export default function UpdateCutting(){

    let [title,setTitle]=useState("");
    let [type,setType]=useState("");
    let [age,setAge]=useState(0);

    let id=window.location.pathname.split("/").slice(-1)[0];
   
    // multiple environment

  let isDev=process.env.NODE_ENV === 'development';
  console.log(isDev); 
  const updateCuttingApi = isDev? {

    baseUrl: process.env.REACT_APP_API_CUTTING_URL,
    getCuttingById:()=>{return (`${updateCuttingApi.baseUrl}/GetById?id=${id}`)},
    updateCutting:()=>{return (`${updateCuttingApi.baseUrl}/Update?id=${id}&title=${title}&type=${type}&age=${age}`)} 
    
  }:{
    baseUrl: process.env.REACT_APP_API_CUTTING_URL,
    getCuttingById:()=>{return (`${updateCuttingApi.baseUrl}/GetById?id=${id}`)},
    updateCutting:()=>{return (`${updateCuttingApi.baseUrl}/Update?id=${id}&title=${title}&type=${type}&age=${age}`)} 
  }

  console.log(updateCuttingApi.getCuttingById());
  console.log(updateCuttingApi.updateCutting());

    return(
        <UpdateForm
            gurl={(updateCuttingApi.getCuttingById())}
            
            fsetType={setType}
            fsetTitle={setTitle}
            fsetAge={setAge}
    
            surl={(updateCuttingApi.updateCutting())}
        
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
            
            button="Tamamlandı"
            
        />
    );
}