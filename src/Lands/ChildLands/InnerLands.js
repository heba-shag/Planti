import { useEffect, useState } from 'react';
import Table from '../../Components/Forms/Table';

export default function InnerLands(){

    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");
    let [runUseEffect,setRun]=useState(0);

    let [innerLands,setInnerLands]=useState([]);
    let [filterInnerLand,setFilterInnerLand]=useState(innerLands);
    let [uniqueTitleOptions, setUniqueTitleOptions] = useState([]);
    let [uniqueSizeOptions, setUniqueSizeOptions] = useState([]);
    let [selectedOption,setSelectedOption]=useState("");
    let [selectedSizeOption,setSelectedSizeOption]=useState(""); 
    let [parentName,setParentName]=useState('');
    
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

    useEffect(() => {
        fetch(showLandApi.getAllLand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
            return  res.json();
        })
        .then((data)=>{ 
        setParentName(data.title);
        setInnerLands(data.children);
        setFilterInnerLand(data.children);
        
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
        })
    }, [runUseEffect]);

    let handleTitleselectedOption=(selectedOption)=>{
        setSelectedOption(selectedOption);
        if (!selectedOption) {
            setFilterInnerLand(innerLands);
            return;
        }
        const filteredData = innerLands.filter((item) =>(selectedOption.label===item.title));
        setSelectedSizeOption("");
        setFilterInnerLand(filteredData);
        console.log(filterInnerLand);
    }

    let handleSizeselectedOption=(selectedSizeOption)=>{
        setSelectedSizeOption(selectedSizeOption);

        if (!selectedSizeOption) {
            setFilterInnerLand(innerLands);
            return;
        }
        const filteredData = innerLands.filter((item) =>(selectedSizeOption.label===item.size));
        setSelectedOption("");
        setFilterInnerLand(filteredData);
    }

    return(
        <Table
        pageTitle={`${parentName} Tarlalar.`}
        Data={innerLands}


        deleteUrl={showLandApi.deleteLand()}
        delete={false}
        
        columns={['title','size','location']}
        actionTD={true}
        innerLandId={false}
        link={`/lands/child/addNewChild/${id}`}
        linkLabel="Ekleme"
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
        setFilterData={setFilterInnerLand}
        selctedOption={selectedOption}
        selectedNumberOption={selectedSizeOption}
        handleTitleSelectedChange={handleTitleselectedOption}
        handleNumberSelectedChange={handleSizeselectedOption}
        filterData={filterInnerLand}
        setSelectedOption={setSelectedOption}
        setSelectedNumberOption={setSelectedSizeOption}
        uniqueTitleOptions={uniqueTitleOptions}
        uniqueNumberOptions={uniqueSizeOptions}
    />         
    );
}