import { useState } from 'react';
import AddForm from '../Components/Forms/AddForm';


export default function AddLandForm(){

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const addLandApi = isDev? {

        baseUrl: process.env.REACT_APP_API_LAND_URL,
        addLand:()=>{return (`${addLandApi.baseUrl}/Add`)} 
        
      }:{
        baseUrl: process.env.REACT_APP_API_LAND_URL,
        addLand:()=>{return (`${addLandApi.baseUrl}/Add`)} 
      }


    let [title,setTitle]=useState("");
    let [size,setSize]=useState(0);
    let [location,setLocation]=useState("");

    return(

        <AddForm
            url={(addLandApi.addLand())}
            data={{title:title,
                    size:size,
                    location:location}}
                
            inputSizeBox={false}
            inputTypeBox={true}
            inputNPKBox={true}
            inputDescription={true}

            direction="lands"
            TitleLabel="Ad:"
            bigLand={false}
            title={title}
            setTitle={setTitle}
            publicDetailsLabel="Konum:"
            publicDetails={location}
            setpublicDetails={setLocation}
            quantityLabel="Boyut:"
            quantity={size}
            setQuantity={setSize}
            
            button="Ekleme"
            
        />
        
    );
}