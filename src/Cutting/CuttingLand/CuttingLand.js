import { useEffect, useState } from "react";
import {  BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgRemove } from "react-icons/cg";
import { GiShears } from "react-icons/gi";
import PaginatonTable from "../../Components/Forms/ToLand/PaginationTable";

export default function CuttingLand(){
    let [cuttingLand,setCuttingLand]=useState([]);
    let [cuttingLandFilter,setCuttingLandFilter]=useState(cuttingLand);
    let [selectedDateOption,setSelectedDateOption]=useState("");
    let [runUseEffect,setRun]=useState(0);

    //delete
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);

    //empty
    let [emptyConfirmation, setEmptyConfirmation] = useState(false);
    let [emptyId,setEmptyId]=useState("");
    let [showEmptymessage,setShowEmptied]=useState(false);


    const handleDelete = async (id) => {
        setDeleteConfirmation(true);
        setDeleteId(id);
    };

    const handleEmpty = async (id) => {
        setEmptyConfirmation(true);
        setEmptyId(id);
    };

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const cuttingLandApi = isDev? {

        baseUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${cuttingLandApi.baseUrl}/GetAll`)},
        deleteCuttingLand:()=>{return (`${cuttingLandApi.baseUrl}/Remove?id=${deleteId}`)},
        updateCuttingLand:()=>{return (`${cuttingLandApi.baseUrl}/UpdateIsActive?id=${emptyId}`)},
    }:{
        baseUrl: process.env.REACT_APP_API_CUTTINGLAND_URL,
        getAllCuttingLand:()=>{return (`${cuttingLandApi.baseUrl}/GetAll`)},
        deleteCuttingLand:()=>{return (`${cuttingLandApi.baseUrl}/Remove?id=${deleteId}`)},
        updateCuttingLand:()=>{return (`${cuttingLandApi.baseUrl}/UpdateIsActive?id=${emptyId}`)},
    }

    

    const deleteFunction = async()=> {
    
    try{
        let res=await axios.delete(cuttingLandApi.deleteCuttingLand());//استخدمت أوايت لأنو بدي أستنا الحذف يخلص وبعدا اخد النتيجة واستخدما
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

    const emptyFunction = async()=> {
    
        try{
            let res=await axios.post(cuttingLandApi.updateCuttingLand());
            if(res.status===200){
                setEmptyConfirmation(false);
                setRun((prev)=>prev+1);
                setShowEmptied(true); 
                setTimeout(() => setShowEmptied(false), 2000); 
            }
        }catch{
            console.log("none");
        }
        }


    const cancelDelete = () => {
        setDeleteConfirmation(false);
    };

    const cancelEmpty = () => {
        setEmptyConfirmation(false);
    };

    let handleDateselectedOption=(selectedDateOption)=>{
    setSelectedDateOption(selectedDateOption);
    if (!selectedDateOption) {
        setCuttingLandFilter(cuttingLand);
        return;
    }
    const filteredData = cuttingLand.filter((item) =>(selectedDateOption.label===new Date(item.date).toLocaleDateString()));
    setCuttingLandFilter(filteredData);
    }

    const id=window.location.pathname.split("/").slice(-1)[0];
 
    return( 

        <PaginatonTable
        pageTitle="Dikildi Tarlalar."
        getAll={cuttingLandApi.getAllCuttingLand()}
        setAllData={setCuttingLand}

        allData={cuttingLand}

        runUseEffect={runUseEffect}

        AddToLand={`/cuttingLand/addCuttingLand`}
        AddToLandLabel="Ekleme"

        sortedData={cuttingLandFilter.map((dat,index)=>
            <tr >
                {console.log(dat)}
                <td>{new Date(dat.date).toLocaleDateString()}</td>
                <td><Link className="Link" to={`/land-details-page/${dat.land.id}`}>{dat.land.title}</Link></td>
                <td><Link className="Link" to={`/cuttingColor-details-page/${dat.cuttingColor.id}`}>{dat.cuttingColor.code}</Link></td>
                <td>{dat.quantity}</td>
                <td ><Link to={`${dat.id}`}> <BiEdit className='icon'/></Link>
                    <CgRemove onClick={()=>handleDelete(dat.id)} style={{color:"red"}} className='icon'/>
                    <GiShears onClick={()=>handleEmpty(dat.id)} className="icon"/>
                </td> 
            </ tr>)}

            th={(<tr>
                <th>Tarih</th>
                <th>Tarla</th>
                <th>Dikilme Renk Code</th>
                <th>Sayı</th>
                <th>işlemler</th>
            </tr>)}


        //filter
        filter={false}
        cuttingLand={false}
        setFilter={setCuttingLandFilter}
        handleDateSelectedChange={handleDateselectedOption}

        setSelectedDateOption={setSelectedDateOption}

        selectedDateOption={selectedDateOption}

        //delete
        deleteConfirmation={deleteConfirmation}
        cancelDelete={cancelDelete}
        deleteFunction={deleteFunction}
        showDeletemessage={showDeletemessage}

        //empty
        emptyConfirmation={emptyConfirmation}
        cancelEmpty={cancelEmpty}
        emptyFunction={emptyFunction}
        showEmptymessage={showEmptymessage}

        pagination={false}

    />

    )
}

