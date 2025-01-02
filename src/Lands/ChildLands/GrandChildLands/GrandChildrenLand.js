import { useEffect, useState } from 'react';
import Table from '../../../Components/Forms/Table';

export default function GrandChildrenLand(){

    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");
    let [runUseEffect,setRun]=useState(0);


    let [grandChildLands,setGrandChildLands]=useState([]);
    let [filtergrandChildLand,setFiltergrandChildLand]=useState(grandChildLands);
    let [uniqueTitleOptions, setUniqueTitleOptions] = useState([]);
    let [uniqueSizeOptions, setUniqueSizeOptions] = useState([]);
    let [selectedOption,setSelectedOption]=useState("");
    let [selectedSizeOption,setSelectedSizeOption]=useState("");
    let [parentName,setParentName]=useState('');

    const parentId=window.location.pathname.split("/").slice(-3)[0];
    const id=window.location.pathname.split("/").slice(-1)[0];

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showLandApi = isDev? {

    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getAllLand:()=>{return (`${showLandApi.baseUrl}/GetById?id=${id}`)},
    deleteLand:()=>{return (`${showLandApi.baseUrl}/Remove`)} 
        
    }:{
    baseUrl: process.env.REACT_APP_API_LAND_URL,
    getAllLand:()=>{return (`${showLandApi.baseUrl}/GetById?id=${id}`)},
    deleteLand:()=>{return (`${showLandApi.baseUrl}/Remove`)} 
    }


    useEffect(()=>{
        fetch(showLandApi.getAllLand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{  
        setParentName(data.title);
        setGrandChildLands(data.children);
        setFiltergrandChildLand(data.children);

        const uniqueTitles = new Set(data.children.map((item) => item.title));
        setUniqueTitleOptions(Array.from(uniqueTitles).map((title) => ({
            value: title,
            label: title,
        })));

        const uniqueSize= new Set(data.children.map((item) => item.size));
        setUniqueSizeOptions(
            Array.from(uniqueSize).map((size) => ({
                value: size,
                label: size,
            }))
        );
        setIsPending(false);
        setError("");

        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message)
        });

        
    },[runUseEffect]);
    
    let handleTitleselectedOption=(selectedOption)=>{
        setSelectedOption(selectedOption);
        if (!selectedOption) {
            setFiltergrandChildLand(grandChildLands);
            return;
        }
        const filteredData = grandChildLands.filter((item) =>(selectedOption.label===item.title));
        setSelectedSizeOption("");
        setFiltergrandChildLand(filteredData);
    }

    let handleSizeselectedOption=(selectedSizeOption)=>{
        setSelectedSizeOption(selectedSizeOption);

        if (!selectedSizeOption) {
            setFiltergrandChildLand(grandChildLands);
            return;
        }
        const filteredData = grandChildLands.filter((item) =>(selectedSizeOption.label===item.size));
        setSelectedOption("");
        setFiltergrandChildLand(filteredData);
    }

    return(
        <Table
        pageTitle={`${parentName} Tarlalar.`}
        Data={grandChildLands}

        deleteUrl={showLandApi.deleteLand()}
        delete={false}

        columns={['title','size','location']}
        actionTD={true}
        grandchildLandId={false}
        link={`/lands/child/${parentId}/grandchild/addNewGrandChild/${id}`}
        linkLabel="Ekleme"
        innerlandParent={false}
        message={false}
        error={error}
        isPending={isPending}
        setRun={setRun}
        landSetRun={false}

        th={(<tr>
            <th>Ad</th>
            <th>Boyut</th>
            <th>Konum</th>
            <th>işlemler</th>
            </tr>)}

        //filter
        innerLandFilter={false}
        titles={false}
        setFilterData={setFiltergrandChildLand}
        selctedOption={selectedOption}
        selectedNumberOption={selectedSizeOption}
        handleTitleSelectedChange={handleTitleselectedOption}
        handleNumberSelectedChange={handleSizeselectedOption}
        filterData={filtergrandChildLand}
        setSelectedOption={setSelectedOption}
        setSelectedNumberOption={setSelectedSizeOption}
        uniqueTitleOptions={uniqueTitleOptions}
        uniqueNumberOptions={uniqueSizeOptions}
    /> 
    );
}