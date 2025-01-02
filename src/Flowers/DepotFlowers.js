import { useState } from "react";
import Depots from "../Components/Forms/ClientSide/Depots";

export default function DepotFlowers(){
    let [flowerDepot,setFlowerDepot]=useState([]);
    let [filterFlowerDepot,setFilterFlowerDepot]=useState(flowerDepot);

    let [codeFilter,setCodeFilter]=useState([]);
    let [selectedCode,setSelectedCode]=useState("");

    let handleCodeselectedOption=(selectedCodeOption)=>{
        setSelectedCode(selectedCodeOption);

        if (!selectedCodeOption) {
            setFilterFlowerDepot(flowerDepot);
            return;
        }
        const filteredData = flowerDepot.filter((item) =>(selectedCodeOption.label===item.code));
        setFilterFlowerDepot(filteredData);
    }


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const flowerApi = isDev? {
        baseUrl: process.env.REACT_APP_API_FLOWER_URL,
        getAllFlowerStore:()=>{return (`${flowerApi.baseUrl}/GetAllFlowerStore`)},
    }:{
        baseUrl: process.env.REACT_APP_API_FLOWER_URL,
        getAllFlowerStore:()=>{return (`${flowerApi.baseUrl}/GetAllFlowerStore`)},
    }


    return(

        <Depots
        
            pageTitle="Flowers Depot."
            getUrl={flowerApi.getAllFlowerStore()}
            setData={setFlowerDepot}
            
            // deleteUrl={`http://cultivation.runasp.net/api/Color/Remove`}

            actionTD={true}
            // edit={false}
            delete={false}
            
            Data={flowerDepot}
            message={true}

            columns={['code','count',`totalCount`,`remainedCount`,`flowerLong`,`trashedCount`,`externalCount`]}
            // link="/color/addColor"
            linkLabel="Add new item"
            th={(<tr>
                <th>Code</th>
                <th>Count</th>
                <th>Total Count</th>
                <th>Remained Count</th>
                <th>Flower Long</th>
                <th>Trashed Count</th>
                <th>External Count</th>
                <th>işlemler</th>
                </tr>)}

            // filtering
            setCodeFilter={setCodeFilter}
            flowerFilter={false}
            codeFilter={codeFilter}
            setFilterData={setFilterFlowerDepot}
            selectedCodeOption={selectedCode}
            // handleTitleSelectedChange={handleTitleselectedOption}
            handleCodeSelectedChange={handleCodeselectedOption}
            filterData={filterFlowerDepot}
            // setSelectedOption={setSelectedOption}
            setSelectedCodeOption={setSelectedCode}

            pagination={false}

        />
        
    );
}