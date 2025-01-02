import { useEffect, useState } from 'react';
import UpdateForm from '../../../Components/Forms/UpdateForm';

export default function UpdateGrandChild(){

    
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [parentSize,setParentSize]=useState("");
    let [parentId,setParentId]=useState("");
    let [title,setTitle]=useState("");
    let [size,setSize]=useState(0);
    let [location,setLocation]=useState("");
    const id=window.location.pathname.split("/").slice(-1)[0];
    const parentLinkId=window.location.pathname.split("/").slice(-3)[0];  
    const grandchild=window.location.pathname.split("/").slice(-5)[0];  

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const updateLandApi = isDev? {

    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getParentLandId:()=>{return (`${updateLandApi.baseUrl}/GetById?id=${parentLinkId}`)},
    getLandById:()=>{return (`${updateLandApi.baseUrl}/GetById?id=${id}`)},
    updateLand:()=>{return (`${updateLandApi.baseUrl}/Update?id=${id}`)} 
        
    }:{
    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getParentLandId:()=>{return (`${updateLandApi.baseUrl}/GetById?id=${parentLinkId}`)},
    getLandById:()=>{return (`${updateLandApi.baseUrl}/GetById?id=${id}`)},
    updateLand:()=>{return (`${updateLandApi.baseUrl}/Update?id=${id}`)} 
    }

    useEffect(() => {
      fetch(updateLandApi.getParentLandId())
      .then((res)=>{
        if(!res.ok){
            throw Error("couldn't fetch data for that resource" )
        }
        return  res.json();
      })
      .then((data)=>{
        setParentSize(data.size);
        setParentId(data.id);
        setIsPending(false);
        setError("");
      })
      .catch(err=>{
        setIsPending(false);
        setError(err.message)
      });
  
    }, []);

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

            direction={`lands/child/${grandchild}/grandchild/${parentLinkId}`}
            TitleLabel="Ad:(Please don't modify )"
            childLands={false}
            title={title}
            setTitle={setTitle}
            publicDetailsLabel="Konum:"
            publicDetails={location}
            setpublicDetails={setLocation}
            quantityLabel="Boyut:"
            quantity={size}
            setQuantity={setSize}
            parentSize={parentSize}

            
            button="Tamamlandı"
            
        />
        
    );
}