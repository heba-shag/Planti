import { useState } from "react";
import Table from "../Components/Forms/Table";

export default function Lands(){
    let [lands,setLands]=useState([]);
    let [filterLand,setFilterLand]=useState(lands);
    let [selectedOption,setSelectedOption]=useState("");
    let [selectedSizeOption,setSelectedSizeOption]=useState("");

    let handleTitleselectedOption=(selectedOption)=>{
        setSelectedOption(selectedOption);
        if (!selectedOption) {
            setFilterLand(lands);
            return;
        }
        const filteredData = lands.filter((item) =>(selectedOption.label===item.title));
        setSelectedSizeOption("");
        setFilterLand(filteredData);
    }

    let handleSizeselectedOption=(selectedSizeOption)=>{
        setSelectedSizeOption(selectedSizeOption);

        if (!selectedSizeOption) {
            setFilterLand(lands);
            return;
        }
        const filteredData = lands.filter((item) =>(selectedSizeOption.label===item.size));
        setSelectedOption("");
        setFilterLand(filteredData);
    }
    
    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showLandApi = isDev? {

    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getAllLand:()=>{return (`${showLandApi.baseUrl}/GetAll`)},
    deleteLand:()=>{return (`${showLandApi.baseUrl}/Remove`)} 
        
    }:{
    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getAllLand:()=>{return (`${showLandApi.baseUrl}/GetAll`)},
    deleteLand:()=>{return (`${showLandApi.baseUrl}/Remove`)} 
    }


    return(

        <Table
            pageTitle="Tarlalar."
            getUrl={showLandApi.getAllLand()}
            setData={setLands}

            Data={lands}
            

            deleteUrl={showLandApi.deleteLand()}
            delete={false}
            edit={false}

            columns={['title','size','location']}
            actionTD={true}
            LandId={false}
            
            message={true}
            landData={false}

            link="/lands/addLandForm"
            linkLabel="Ekleme"
            th={(<tr>
                <th>Ad</th>
                <th>Boyut</th>
                <th>Konum</th>
                <th>işlemler</th>
                </tr>)}

            //filtering
            landFilter={false}
            titles={true}
            setFilterData={setFilterLand}
            selctedOption={selectedOption}
            selectedNumberOption={selectedSizeOption}
            handleTitleSelectedChange={handleTitleselectedOption}
            handleNumberSelectedChange={handleSizeselectedOption}
            filterData={filterLand}
            setSelectedOption={setSelectedOption}
            setSelectedNumberOption={setSelectedSizeOption}
    
        />
        
    );
}