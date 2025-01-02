import { useState } from "react";

import Table from "../Components/Forms/Table";

export default function Cutting(){
    let [cutting,setCutting]=useState([]);
    let [filterCutting,setFilterCutting]=useState(cutting);
    let [selectedOption,setSelectedOption]=useState("");
    let [selectedTypeOption,setSelectedTypeOption]=useState("");
    let [selectedAgeOption,setSelectedAgeOption]=useState("");

    let handleTitleselectedOption=(selectedOption)=>{
        setSelectedOption(selectedOption);
        if (!selectedOption) {
            setFilterCutting(cutting);
            return;
        }
        const filteredData = cutting.filter((item) =>(selectedOption.label===item.title));
        setSelectedAgeOption("");
        setSelectedTypeOption("");
        setFilterCutting(filteredData);
    }

    let handleAgeselectedOption=(selectedAgeOption)=>{
        setSelectedAgeOption(selectedAgeOption);

        if (!selectedAgeOption) {
            setFilterCutting(cutting);
            return;
        }
        const filteredData = cutting.filter((item) =>(selectedAgeOption.label===item.age));
        setSelectedOption("");
        setSelectedTypeOption("");
        setFilterCutting(filteredData);
    }

    let handleTypeselectedOption=(selectedTypeOption)=>{
        setSelectedTypeOption(selectedTypeOption);

        if (!selectedTypeOption) {
            setFilterCutting(cutting);
            return;
        }
        const filteredData = cutting.filter((item) =>(selectedTypeOption.label===item.type));
        setSelectedOption("");
        setSelectedAgeOption("");
        setFilterCutting(filteredData);
    }

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    console.log(isDev); 
    const showCuttingApi = isDev? {

        baseUrl: process.env.REACT_APP_API_CUTTING_URL,
        getAllCutting:()=>{return (`${showCuttingApi.baseUrl}/GetAll`)},
        deleteCutting:()=>{return (`${showCuttingApi.baseUrl}/Remove`)} 
        
    }:{
        baseUrl: process.env.REACT_APP_API_CUTTING_URL,
        getAllCutting:()=>{return (`${showCuttingApi.baseUrl}/GetAll`)},
        deleteCutting:()=>{return (`${showCuttingApi.baseUrl}/Remove`)} 
    }

    console.log(showCuttingApi.getAllCutting());
    console.log(showCuttingApi.deleteCutting());

    return(  
        <Table
            pageTitle="Dikilme."
            getUrl={showCuttingApi.getAllCutting()}
            setData={setCutting}
            
            deleteUrl={showCuttingApi.deleteCutting()}

            actionTD={true}
            icon={false}
            edit={false}
            delete={false}
            details="cuttingcolor/"
            
            Data={cutting}
            message={true}

            columns={['title','type','age']}
            link="/cutting/addCutting"
            linkLabel="Ekleme"
            th={(<tr>
                <th>Ad</th>
                <th>Tür</th>
                <th>Yaş</th>
                <th>işlemler</th>
                </tr>)}
            
            //filter
            cuttingFilter={false}
            titles={true}
            setFilterData={setFilterCutting}
            selctedOption={selectedOption}
            selectedNumberOption={selectedAgeOption}
            selectedDescriptionOption={selectedTypeOption}
            handleTitleSelectedChange={handleTitleselectedOption}
            handleNumberSelectedChange={handleAgeselectedOption}
            handleDescriptionSelectedChange={handleTypeselectedOption}
            filterData={filterCutting}
            setSelectedOption={setSelectedOption}
            setSelectedNumberOption={setSelectedAgeOption}
            setSelectedDescriptionOption={setSelectedTypeOption}


        />

    )
}