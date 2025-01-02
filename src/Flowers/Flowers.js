import { useEffect, useState } from "react";
import {  BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgRemove } from "react-icons/cg";
import PaginatonTable from "../Components/Forms/ToLand/PaginationTable";

export default function Flowers(){
    let [flower,setFlower]=useState([]);
    let [flowerFilter,setFlowerFilter]=useState(flower);
    let [counter,setCounter]=useState("");
    let [filterCounter,setFilterCounter]=useState(counter)
    let [selectedCuttingLand,setSelectedCuttingLand]=useState("");
    let [selectedCutting,setSelectedCutting]=useState("");
    let [selectedColor,setSelectedColor]=useState("");
    let [selectedLong,setSelectedLong]=useState("");
    let [selectedWorker,setSelectedWorker]=useState("");
    let [startDate,setStartDate]=useState("");
    let [endDate,setEndDate]=useState("");
    let [runUseEffect,setRun]=useState(0);

    //delete
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);

    let handleCuttingLandIdselectedOption=(selectedCuttingLand)=>{
        setSelectedCuttingLand(selectedCuttingLand);
        if (!selectedCuttingLand) {
            setFlowerFilter(flower);
            setFilterCounter(counter); 
            return;
        }
        const filteredData = flower.filter((item) =>(selectedCuttingLand.label===item.cuttingLand.land.title));
        const total = filteredData.map((item) => item.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setStartDate("");
        setEndDate("");
        setSelectedColor("");
        setSelectedCutting("");
        setSelectedLong("");
        setSelectedWorker("");
        setFlowerFilter(filteredData);
        setFilterCounter(total);
    }

    let handleCuttingSelectedChange=(selectedCutting)=>{
        setSelectedCutting(selectedCutting);
        if (!selectedCutting) {
            setFlowerFilter(flower);
            setFilterCounter(counter);
            return;
        }
        const filteredData = flower.filter((item) =>(selectedCutting.label===item.cuttingLand.cuttingColor.cutting.title));
        const total = filteredData.map((item) => item.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setStartDate("");
        setEndDate("");
        setSelectedColor("");
        setSelectedCuttingLand("");
        setSelectedLong("");
        setSelectedWorker("");
        setFlowerFilter(filteredData);
        setFilterCounter(total);
    }

    let handleColorChange=(selectedColor)=>{
        setSelectedColor(selectedColor);
        if (!selectedColor) {
            setFlowerFilter(flower);
            setFilterCounter(counter); 
            return;
        }
        const filteredData = flower.filter((item) =>(selectedColor.label===item.cuttingLand.cuttingColor.code));
        const total = filteredData.map((item) => item.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setStartDate("");
        setEndDate("");
        setSelectedCutting("");
        setSelectedCuttingLand("");
        setSelectedLong("");
        setSelectedWorker("");
        setFlowerFilter(filteredData);
        setFilterCounter(total);
    }

    let handleLongSelectedChange=(selectedLong)=>{
        setSelectedLong(selectedLong);
        if (!selectedLong) {
            setFlowerFilter(flower);
            setFilterCounter(counter); 
            return;
        }
        const filteredData = flower.filter((item) =>(selectedLong.label===item.long));
        const total = filteredData.map((item) => item.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setStartDate("");
        setEndDate("");
        setSelectedCutting("");
        setSelectedCuttingLand("");
        setSelectedColor("");
        setSelectedWorker("");
        setFlowerFilter(filteredData);
        setFilterCounter(total);
    }

    let handleWorkerSelectedChange=(selectedWorker)=>{
        setSelectedWorker(selectedWorker);
        if (!selectedWorker) {
            setFlowerFilter(flower);
            setFilterCounter(counter); 
            return;
        }
        const filteredData = flower.filter((item) =>(selectedWorker.label===item.worker));
        const total = filteredData.map((item) => item.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setStartDate("");
        setEndDate("");
        setSelectedCutting("");
        setSelectedCuttingLand("");
        setSelectedColor("");
        setSelectedLong("");
        setFlowerFilter(filteredData);
        setFilterCounter(total);
    }

    let handleDateFilter = () => {
        let filteredData;
        if (!startDate && !endDate) {
            setFlowerFilter(flower);
            setFilterCounter(counter); 
            return;
        }
        else if(!endDate){
             filteredData = flower.filter((item) => {
                const itemDate =new Date(item.date);
                const start= new Date(startDate);
                return itemDate>=start;
            });
        }
        else if(!startDate){
            filteredData = flower.filter((item) => {
                const itemDate =new Date(item.date);
                const end= new Date(endDate);
                return itemDate<=end;
            });
        }
        else if(startDate &&endDate) {
            filteredData = flower.filter((item) => {
                const itemDate =new Date(item.date);
                const start= new Date(startDate);
                const end=new Date(endDate);
                return itemDate>=start && itemDate <end;
            });
        }
        const total = filteredData.map((item) => item.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setSelectedCutting("");
        setSelectedWorker("");
        setSelectedColor("");
        setSelectedLong("");
        setSelectedCuttingLand("")
        setFlowerFilter(filteredData);
        setFilterCounter(total);
    }


    const handleDelete = async (id) => {
        setDeleteConfirmation(true);
        setDeleteId(id);
    };

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const flowerApi = isDev? {
        baseUrl: process.env.REACT_APP_API_FLOWER_URL,
        getAllFlower:()=>{return (`${flowerApi.baseUrl}/GetAll`)},
        deleteFlower:()=>{return (`${flowerApi.baseUrl}/Remove?id=${deleteId}`)},
    }:{
        baseUrl: process.env.REACT_APP_API_FLOWER_URL,
        getAllFlower:()=>{return (`${flowerApi.baseUrl}/GetAll`)},
        deleteFlower:()=>{return (`${flowerApi.baseUrl}/Remove?id=${deleteId}`)},
    }

    async function deleteFlower(id){
        try{
            let res=await axios.delete(flowerApi.deleteFlower());
            if(res.status===200){
                setDeleteConfirmation(false);
                setRun((prev)=>prev+1);
                setShowDeleted(true); // Show success message
                setTimeout(() => setShowDeleted(false), 1500); 
            }
        }catch{
            console.log("none");
        }
    }

    const cancelDelete = () => {
        setDeleteConfirmation(false);
    };


    return( 

        <PaginatonTable
        pageTitle="Çiçek."
        getAll={flowerApi.getAllFlower()}
        cuttingLandId="cuttingLandId"
        cuttingLId={selectedCuttingLand.value}
        setAllData={setFlower}

        allData={flower}
        setCounter={setCounter}
        counter={counter}

        runUseEffect={runUseEffect}

        AddToLand={`/flowers/addFlowers`}
        AddToLandLabel="Ekleme"Sayı

        sortedData={flowerFilter.map((dat)=>
            <tr >
                <td>{new Date(dat.date).toLocaleDateString()}</td>
                <td><Link className="Link" to={`/land-details-page/${dat.cuttingLand.land.id}`}>{dat.cuttingLand.land.title}</Link></td>
                <td><Link className="Link" to={`/cuttingColor-details-page/${dat.cuttingLand.cuttingColor.id}`}>{dat.cuttingLand.cuttingColor.cutting.title}</Link></td>
                <td><Link className="Link" to={`/cuttingColor-details-page/${dat.cuttingLand.cuttingColor.id}`}>{dat.cuttingLand.cuttingColor.color.code}</Link></td>
                <td>{dat.count}</td>
                <td>{dat.long} cm</td>
                <td>{dat.note}</td>
                <td>{dat.worker}</td>
                <td ><Link to={`${dat.id}`}> <BiEdit className='icon'/></Link>
                    <CgRemove onClick={()=>handleDelete(dat.id)} style={{color:"red"}} className='icon'/>
                </td> 
            </ tr>)}

            th={(<tr>
                <th>Tarih</th>
                <th>Tarla</th>
                <th>Fide Ad</th>
                <th>Renk Code</th>
                <th>Adit</th>
                <th>Long</th>
                <th>Note</th>
                <th>Worker</th>
                <th>işlemler</th>
            </tr>)}


        //filter
        threeData={false} 
        flowerFilter={false}
        setFilter={setFlowerFilter}
        setFilterCounter={setFilterCounter}
        handleDateFilter={handleDateFilter}
        handleCuttingLandSelectedChange={handleCuttingLandIdselectedOption}
        handleCuttingSelectedChange={handleCuttingSelectedChange}
        handleColorChange={handleColorChange}
        handleLongSelectedChange={handleLongSelectedChange}
        handleWorkerSelectedChange={handleWorkerSelectedChange}

        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSelectedCuttingLandOption={setSelectedCuttingLand}
        setSelectedCuttingOption={setSelectedCutting}
        setSelectedColorOption={setSelectedColor}
        setSelectedLongOption={setSelectedLong}
        setSelectedWorkerOption={setSelectedWorker}


        startDate={startDate}
        endDate={endDate}
        selectedCuttingLandOption={selectedCuttingLand}
        filterCounter={filterCounter}
        selectedCuttingOption={selectedCutting}
        selectedColorOption={selectedColor}
        selectedLongOption={selectedLong}
        selectedWorkerOption={selectedWorker}

        pagination={false}

        //delete
        deleteConfirmation={deleteConfirmation}
        cancelDelete={cancelDelete}
        deleteFunction={deleteFlower}
        showDeletemessage={showDeletemessage}

    />

    )
}