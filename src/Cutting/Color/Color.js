import { useState } from "react";
import Table from "../../Components/Forms/Table";

export default function Color(){
    let [color,setColor]=useState([]);
    let [filterColor,setFilterColor]=useState(color);
    let [selectedOption,setSelectedOption]=useState("");
    let [selectedCodeOption,setSelectedCodeOption]=useState("");

    let handleTitleselectedOption=(selectedOption)=>{
        setSelectedOption(selectedOption);
        if (!selectedOption) {
            setFilterColor(color);
            return;
        }
        const filteredData = color.filter((item) =>(selectedOption.label===item.title));
        setSelectedCodeOption("");
        setFilterColor(filteredData);
    }

    let handleCodeselectedOption=(selectedCodeOption)=>{
        setSelectedCodeOption(selectedCodeOption);

        if (!selectedCodeOption) {
            setFilterColor(color);
            return;
        }
        const filteredData = color.filter((item) =>(selectedCodeOption.label===item.code));
        setSelectedOption("");
        setFilterColor(filteredData);
    }
    
   
    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showColorApi = isDev? {

        baseUrl: process.env.REACT_APP_API_COLOR_URL,
        getAllColor:()=>{return (`${showColorApi.baseUrl}/GetAll`)},
        deleteColor:()=>{return (`${showColorApi.baseUrl}/Remove`)}
    
    }:{
        baseUrl: process.env.REACT_APP_API_COLOR_URL,
        getAllColor:()=>{return (`${showColorApi.baseUrl}/GetAll`)},
        deleteColor:()=>{return (`${showColorApi.baseUrl}/Remove`)}
    }

    return(
        <Table
            pageTitle="Renkler."
            getUrl={showColorApi.getAllColor()}
            setData={setColor}
            
            deleteUrl={showColorApi.deleteColor()}

            actionTD={true}
            edit={false}
            delete={false}
            
            Data={color}
            message={true}

            columns={['title','code']}
            link="/color/addColor"
            linkLabel="Add new item"
            th={(<tr>
                <th>Ad</th>
                <th>Code</th>
                <th>işlemler</th>
                </tr>)}

            //filtering
            colorFilter={false}
            titles={true}
            setFilterData={setFilterColor}
            selctedOption={selectedOption}
            selectedCodeOption={selectedCodeOption}
            handleTitleSelectedChange={handleTitleselectedOption}
            handleCodeSelectedChange={handleCodeselectedOption}
            filterData={filterColor}
            setSelectedOption={setSelectedOption}
            setSelectedCodeOption={setSelectedCodeOption}

            pagination={false}

        />
    );
}