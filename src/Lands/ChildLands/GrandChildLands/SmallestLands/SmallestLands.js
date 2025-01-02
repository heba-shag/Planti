import { useEffect, useState } from 'react';
import Table from '../../../../Components/Forms/Table';

export default function SmallestLand(){

    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");
    let [runUseEffect,setRun]=useState(0);

    let [pieceLands,setPieceLands]=useState([]);
    let [filterPieceLand,setFilterPieceLand]=useState(pieceLands);
    let [uniqueTitleOptions, setUniqueTitleOptions] = useState([]);
    let [uniqueSizeOptions, setUniqueSizeOptions] = useState([]);
    let [selectedOption,setSelectedOption]=useState("");
    let [selectedSizeOption,setSelectedSizeOption]=useState("");
    let [parentName,setParentName]=useState("");

    const grandParentId=window.location.pathname.split("/").slice(-5)[0];
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
            setPieceLands(data.children);
            setFilterPieceLand(data.children);

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
    
    //   console.log(grandChildLands);
    let handleTitleselectedOption=(selectedOption)=>{
        setSelectedOption(selectedOption);
        if (!selectedOption) {
            setFilterPieceLand(pieceLands);
            return;
        }
        const filteredData = pieceLands.filter((item) =>(selectedOption.label===item.title));
        setSelectedSizeOption("");
        setFilterPieceLand(filteredData);
    }

    let handleSizeselectedOption=(selectedSizeOption)=>{
        setFilterPieceLand(selectedSizeOption);

        if (!selectedSizeOption) {
            setFilterPieceLand(pieceLands);
            return;
        }
        const filteredData = pieceLands.filter((item) =>(selectedSizeOption.label===item.size));
        setSelectedOption("");
        setFilterPieceLand(filteredData);
    }

    return(
        <Table
        pageTitle={`${parentName} Tarlalar.`}
        Data={pieceLands}

        deleteUrl={showLandApi.deleteLand()}
        delete={false}

        columns={['title','size','location']}
        link={`/lands/child/${grandParentId}/grandchild/${parentId}/pieceLand/takeApiece/${id}`}
        linkLabel="Ekleme"
        smallestChild={false}
        actionTD={true}
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
        setFilterData={setFilterPieceLand}
        selctedOption={selectedOption}
        selectedNumberOption={selectedSizeOption}
        handleTitleSelectedChange={handleTitleselectedOption}
        handleNumberSelectedChange={handleSizeselectedOption}
        filterData={filterPieceLand}
        setSelectedOption={setSelectedOption}
        setSelectedNumberOption={setSelectedSizeOption}
        uniqueTitleOptions={uniqueTitleOptions}
        uniqueNumberOptions={uniqueSizeOptions}
    /> 
    );
}