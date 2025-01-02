import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgRemove } from "react-icons/cg";
import PaginatonTable from "../../Components/Forms/ToLand/PaginationTable";

export default function CuttingColor(){

    let [cuttingColor,setCuttingColor]=useState([]);
    let [cuttingColorFilter,setCuttingColorFilter]=useState(cuttingColor);
    // let [cutting,setCutting]=useState("");
    let [runUseEffect,setRun]=useState(0);//deleteFunction
    let [uniqueCodeOption,setUniqueCodeOption]=useState("");
    let [selectedCodeOption,setSelectedCodeOption]=useState("");
    const id=window.location.pathname.split("/").slice(-1)[0];

    //delete
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);


    const handleDelete = async (id) => {
        setDeleteConfirmation(true);
        setDeleteId(id);
    };


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const cuttingColorApi = isDev? {

    baseUrl: process.env.REACT_APP_API_CUTTING_URL,
    getAllCuttingColor:()=>{return (`${cuttingColorApi.baseUrl}/GetAllCuttingColor`)},
    deleteCuttingColor:()=>{return (`${cuttingColorApi.baseUrl}/RemoveCuttingColor?id=${deleteId}`)},
    
    }:{
        baseUrl: process.env.REACT_APP_API_CUTTING_URL,
        getAllCuttingColor:()=>{return (`${cuttingColorApi.baseUrl}/GetAllCuttingColor`)},
        deleteCuttingColor:()=>{return (`${cuttingColorApi.baseUrl}/RemoveCuttingColor?id=${deleteId}`)},
    }

    const deleteFunction = async()=> {
    
        try{
            let res=await axios.delete(cuttingColorApi.deleteCuttingColor());//استخدمت أوايت لأنو بدي أستنا الحذف يخلص وبعدا اخد النتيجة واستخدما
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


    const clearCodeFilter = () => {
        setSelectedCodeOption("");
        if(selectedCodeOption){
        setCuttingColorFilter(cuttingColor)}; // Reset filtered data to all data
    }

    let handleCodeselectedOption=(selectedCodeOption)=>{
        setSelectedCodeOption(selectedCodeOption);
        if (!selectedCodeOption) {
            setCuttingColorFilter(cuttingColor);
            return;
        }
        const filteredData = cuttingColor.filter((item) =>(selectedCodeOption.label===item.code));
            setCuttingColorFilter(filteredData);
    }



    return( 
        <PaginatonTable
            pageTitle="Dikilme Renkler."
            getAll={cuttingColorApi.getAllCuttingColor()}
            setAllData={setCuttingColor}
            setFilter={setCuttingColorFilter}
            id={id}
            allData={cuttingColor}
            AddToLand={`/cutting/cuttingcolor/addCuttingColor/${id}`}
            AddToLandLabel="Ekleme"
            sortedData={cuttingColorFilter.map((dat)=>
                <tr >
                    <td>{dat.cutting.title}</td>
                    <td>{dat.color.title}</td>
                    <td>{dat.code}</td>
                    <td ><Link to={`${dat.id}`}> <BiEdit className='icon'/></Link>
                        <CgRemove onClick={()=>handleDelete(dat.id)} style={{color:"red"}} className='icon'/>
                    </td> 
                </tr>
            )}

            th={ <tr>
                <th>Dikilme Ad</th>
                <th>Renk</th>
                <th>Code</th>
                <th>işlemler</th>
            </tr>}
            setUniqueCodeOption={setUniqueCodeOption}
            runUseEffect={runUseEffect}
            // oneData={false}

            //filter
            cuttingColorFilter={false}
            uniqueCodeOptions={uniqueCodeOption}
            selectedCodeOption={selectedCodeOption}
            handleCodeSelectedChange={handleCodeselectedOption}
            clearCodeFilter={clearCodeFilter}

            //delete
            deleteConfirmation={deleteConfirmation}
            cancelDelete={cancelDelete}
            deleteFunction={deleteFunction}
            showDeletemessage={showDeletemessage}

        />
    )
}