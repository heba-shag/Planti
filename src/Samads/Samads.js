import { useState } from 'react';
import Table from '../Components/Forms/Table';

export default function Samads(){
    let [samads,setSamads]=useState([]);
    let [filterSamad,setFilterSamad]=useState(samads);
    let [selectedOption,setSelectedOption]=useState("");
    let [selectedNpkOption,setSelectedNpkOption]=useState("");
    let [selectedPublicTitleOption,setSelectedPublicTitleOption]=useState("");
    let [selectedDescriptionOption,setSelectedDescriptionOption]=useState("");

    let handleTitleselectedOption=(selectedOption)=>{
        setSelectedOption(selectedOption);
        if (!selectedOption) {
            setFilterSamad(samads);
            return;
        }
        const filteredData = samads.filter((item) =>(selectedOption.label===item.title));
        setSelectedNpkOption("");
        setSelectedPublicTitleOption("");
        setSelectedDescriptionOption("")
        setFilterSamad(filteredData);
    }

    let handleNpkselectedOption=(selectedNpkOption)=>{
        setSelectedNpkOption(selectedNpkOption);

        if (!selectedNpkOption) {
            setFilterSamad(samads);
            return;
        }
        const filteredData = samads.filter((item) =>(selectedNpkOption.label===item.npk));
        setSelectedPublicTitleOption("");
        setSelectedDescriptionOption("")
        setSelectedOption("");
        setFilterSamad(filteredData);
    }

    let handlePublicTitleselectedOption=(selectedPublicTitleOption)=>{
        setSelectedPublicTitleOption(selectedPublicTitleOption);

        if (!selectedPublicTitleOption) {
            setFilterSamad(samads);
            return;
        }
        const filteredData = samads.filter((item) =>(selectedPublicTitleOption.label===item.publicTitle));
        setSelectedNpkOption("");
        setSelectedDescriptionOption("");
        setSelectedOption("");
        setFilterSamad(filteredData);
    }

    let handleDescriptionselectedOption=(selectedDescriptionOption)=>{
        setSelectedDescriptionOption(selectedDescriptionOption);

        if (!selectedDescriptionOption) {
            setFilterSamad(samads);
            return;
        }
        const filteredData = samads.filter((item) =>(selectedDescriptionOption.label===item.description));
        setSelectedNpkOption("");
        setSelectedPublicTitleOption("");
        setSelectedOption("");
        setFilterSamad(filteredData);
    }

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showSamadApi = isDev? {

        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getAllSamad:()=>{return (`${showSamadApi.baseUrl}/GetAll`)},
        deleteSamad:()=>{return (`${showSamadApi.baseUrl}/Remove`)} 
        
      }:{
        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getAllSamad:()=>{return (`${showSamadApi.baseUrl}/GetAll`)},
        deleteSamad:()=>{return (`${showSamadApi.baseUrl}/Remove`)} 
      }

    return(
        <Table
            pageTitle="Gübre."

            getUrl={showSamadApi.getAllSamad()}
            setData={setSamads}
            
            deleteUrl={showSamadApi.deleteSamad()}
            
            actionTD={true}
            Data={samads}
            edit={false}
            delete={false}
            message={true}

            columns={['npk','title','publicTitle','description']}
            link="/samads/addsamad"
            linkLabel="Ekleme"
            th={(<tr>
                <th>NPK</th>
                <th>Bilimsel Adı</th>
                <th>Ad</th>
                <th>Tanım</th>
                <th>işlemler</th>
                </tr>)}

            //filtering
            samadFilter={false}
            titles={true}
            setFilterData={setFilterSamad}
            selctedOption={selectedOption}
            selectedPBTitleOption={selectedPublicTitleOption}
            selectedNumberOption={selectedNpkOption}
            selectedDescriptionOption={selectedDescriptionOption}
            handleTitleSelectedChange={handleTitleselectedOption}
            handlePBTitleSelectedChange={handlePublicTitleselectedOption}
            handleNumberSelectedChange={handleNpkselectedOption}
            handleDescriptionSelectedChange={handleDescriptionselectedOption}
            filterData={filterSamad}
            setSelectedOption={setSelectedOption}
            setSelectedNumberOption={setSelectedNpkOption}
            setSelectedPBTitleOption={setSelectedPublicTitleOption}
            setSelectedDescriptionOption={setSelectedDescriptionOption}

            pagination={false}

        />
    );
}