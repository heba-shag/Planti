import { useEffect, useState } from "react";
import DetailsForm from "../Components/Forms/DetailsForm";

export default function LandDetails(){
    const id=window.location.pathname.split("/").slice(-1)[0];
    let [title,setTitle]=useState("");
    let [size,setSize]=useState("");
    let [location,setLocation]=useState("");
    let [grandName,setGrandName]=useState("");
    let [error,setError]=useState("");


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const LandApi = isDev? {
        baseUrl: process.env.REACT_APP_API_LAND_URL,
        getLandById:()=>{return (`${LandApi.baseUrl}/GetById?id=${id}`)},

        
    }:{
        baseUrl: process.env.REACT_APP_API_LAND_URL,
        getLandById:()=>{return (`${LandApi.baseUrl}/GetById?id=${id}`)},
    }

    useEffect(() => {
        const fetchGrandparents = async () => {
            const grandparentTitle = await getGrandparentTitle(id); 
            if (grandparentTitle) {
                setGrandName(grandparentTitle);
            }
        };

        fetchGrandparents(); 
    }, []); 

    async function getGrandparentTitle(id) {
        try {
        const response = await fetch(LandApi.getLandById());

        if (!response.ok) {
            throw Error("couldn't fetch data for that resource" );             
        }

        const data = await response.json();

        if (data.parentId === null) {
            return data.title;
        }

        return await getGrandparentTitle(data.parentId); 
        } catch (error) {
            setError(error.message);
        }
    }

    return(
    <DetailsForm
        detailsTitle="Tarla."
        getById={LandApi.getLandById()}
        landDetails={false}
        setTitle={setTitle}
        setSize={setSize}
        setLocation={setLocation}
        error={error}

        TitleLabel="Tarla Adı:"
        GrandTitleLabel="Büyük Tarla:"
        locationLabel="Konum:"
        sizeLabel="Boyut:"

        title={title}
        grandName={grandName}
        location={location}
        size={size}
    />
    );
}