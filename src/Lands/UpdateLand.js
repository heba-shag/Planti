import { useState } from 'react';
import UpdateForm from '../Components/Forms/UpdateForm';

export default function UpdateLand(){

    let [title,setTitle]=useState("");
    let [size,setSize]=useState(0);
    let [location,setLocation]=useState("");
    const id=window.location.pathname.split("/").slice(-1)[0];

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const updateLandApi = isDev? {

    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getLandById:()=>{return (`${updateLandApi.baseUrl}/GetById?id=${id}`)},
    updateLand:()=>{return (`${updateLandApi.baseUrl}/Update?id=${id}`)} 
        
    }:{
    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getLandById:()=>{return (`${updateLandApi.baseUrl}/GetById?id=${id}`)},
    updateLand:()=>{return (`${updateLandApi.baseUrl}/Update?id=${id}`)} 
    }

    return(

        <UpdateForm
            gurl={(updateLandApi.getLandById())}
            
            fsetTitle={setTitle}
            fsetSize={setSize}
            fsetLocation={setLocation}

            surl={(updateLandApi.updateLand())}
            setData={{title:title,
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
            
            button="Tamamlandı"
            
        />
        
    );
}