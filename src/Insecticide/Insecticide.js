import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgRemove } from "react-icons/cg";
import PaginatonTable from "../Components/Forms/ToLand/PaginationTable";
 
export default function Insecticide(){
    let [insecticide,setInsecticide]=useState([]);
    let [insecFilter,setInsecFilter]=useState(insecticide);
    let [selectedInsecOption,setSelectedInsecOption]=useState("");
    let [selectedNoteOption,setSelectedNoteOption]=useState("");
    let [selectedPBOption,setSelectedPBOption]=useState("");
    let [runUseEffect,setRun]=useState(0);//deleteFunction

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
    const showInsecApi = isDev? {

        baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllIsec:()=>{return (`${showInsecApi.baseUrl}/GetAll`)},
        deleteInsec:()=>{return (`${showInsecApi.baseUrl}/Remove?id=${deleteId}`)} 
        
    }:{
        baseUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllIsec:()=>{return (`${showInsecApi.baseUrl}/GetAll`)},
        deleteInsec:()=>{return (`${showInsecApi.baseUrl}/Remove?id=${deleteId}`)} 
    }


    const deleteFunction = async()=> {
    
    try{
        let res=await axios.delete(showInsecApi.deleteInsec());//استخدمت أوايت لأنو بدي أستنا الحذف يخلص وبعدا اخد النتيجة واستخدما
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


let handleInsecSelectedChange=(selectedInsecOption)=>{
    setSelectedInsecOption(selectedInsecOption);
    if (!selectedInsecOption) {
        setInsecFilter(insecticide);
        return;
    }
    const filteredData = insecticide.filter((item) =>(selectedInsecOption.label===item.title));
    setSelectedNoteOption("");
    setSelectedPBOption("");
    setInsecFilter(filteredData);
}

let handleNoteSelectedChange=(selectedNoteOption)=>{
    setSelectedNoteOption(selectedNoteOption);
    if (!selectedNoteOption) {
        setInsecFilter(insecticide);
        return;
    }
    const filteredData = insecticide.filter((item) =>(selectedNoteOption.label===item.description));
    setSelectedInsecOption("");
    setSelectedPBOption("");
    setInsecFilter(filteredData);
}

let handlePBSelectedChange=(selectedPBOption)=>{
    setSelectedPBOption(selectedPBOption);
    if (!selectedPBOption) {
        setInsecFilter(insecticide);
        return;
    }
    const filteredData = insecticide.filter((item) =>(selectedPBOption.label===item.publicTitle));
    setSelectedInsecOption("");
    setSelectedNoteOption("");
    setInsecFilter(filteredData);
}

    return(

        <PaginatonTable
            pageTitle="ilaç."
            getAll={showInsecApi.getAllIsec()}
            setAllData={setInsecticide}

            allData={insecticide}

            runUseEffect={runUseEffect}

            AddToLand={`/insecticide/addInsecticide`}
            AddToLandLabel="Ekleme"
            sortedData={insecFilter.map((dat)=>
                <tr >
                    <td>{dat.title}</td>
                    <td>{dat.publicTitle}</td>
                    <td>{dat.description}</td>
                    <td>{dat.type===0?"Liquid":"Powder"}</td>
                    <td ><Link to={`${dat.id}`}> <BiEdit className='icon'/></Link>
                        <CgRemove onClick={()=>handleDelete(dat.id)} style={{color:"red"}} className='icon'/>
                    </td> 
                </tr>
            )}

            th={<tr>
                <th>Bilimsel Adı</th>
                <th>Ad</th>
                <th>Tanım</th>
                <th>Tür</th>
                <th>işlemler</th>
            </tr>}

            //filter
            filter={false}
            insecticde={false}
            setFilter={setInsecFilter}
            handleInsecSelectedChange={handleInsecSelectedChange}
            handleNoteSelectedChange={handleNoteSelectedChange}
            handlePBtitleSelectedChange={handlePBSelectedChange}
            
            setSelectedInsecOption={setSelectedInsecOption}
            setSelectedNoteOption={setSelectedNoteOption}
            setSelectedPBOption={setSelectedPBOption}

            selectedNoteOption={selectedNoteOption}
            selectedInsecOption={selectedInsecOption}
            selectedPBtitleOption={selectedPBOption}
            pagination={false}
            
            //delete
            deleteConfirmation={deleteConfirmation}
            cancelDelete={cancelDelete}
            deleteFunction={deleteFunction}
            showDeletemessage={showDeletemessage}

        />
    )
}