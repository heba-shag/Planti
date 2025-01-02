import { useState } from "react";
import PaginatonTable from "../../Components/Forms/ToLand/PaginationTable";
import { CgRemove } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ShowFertMix(){

    let [mixes,setMixes]=useState([]);
    let [mixesFilter,setMixesFilter]=useState(mixes);
    let [selectedTitleOption,setSelectedTitleOption]=useState("");

    //delete
    let [runUseEffect,setRun]=useState(0);
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);

    const handleDelete = async (id) => {
        setDeleteConfirmation(true);
        setDeleteId(id);
    };
    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const fertilizerMixApi = isDev? {
        baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getAllFertilizerMix:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/GetAllMixes`)},
        deleteFertilizerMix:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/RemoveMix?id=${deleteId}`)},

    }:{
        baseFertilizerUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        getAllFertilizerMix:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/GetAllMixes`)},
        deleteFertilizerMix:()=>{return (`${fertilizerMixApi.baseFertilizerUrl}/RemoveMix?id=${deleteId}`)},
    }

    const deleteFunction = async()=> {
        
        try{
            let res=await axios.delete(fertilizerMixApi.deleteFertilizerMix());//استخدمت أوايت لأنو بدي أستنا الحذف يخلص وبعدا اخد النتيجة واستخدما
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

      let handleTitleSelectedChange=(selectedTitle)=>{
        setSelectedTitleOption(selectedTitle);
        if (!selectedTitle) {
            setMixesFilter(mixes);
            // return;
        }
        const filteredData = mixes.filter((item) =>(selectedTitle.label===item.title));
        setMixesFilter(filteredData);
    }

    console.log(mixesFilter);
    return( 
        <PaginatonTable
            pageTitle="Gübre Mixes."
            getAll={fertilizerMixApi.getAllFertilizerMix()}
            setAllData={setMixes}
            setFilter={setMixesFilter}

            mixFilterTitle={false}
            // id={id}
            allData={mixes}
            AddToLand={`/fertilizer-mixes/new-mix`}
            AddToLandLabel="Ekleme"
            sortedData={mixesFilter.map((dat,index=0)=>
                <tr  >
                    <td>{dat.title}</td> 
                    <td>{dat.type===0?"Yaprak gübreleme":"damlama gübreleme"}</td>
                    <td>{dat.color===0?"Red":1?"Blue":2?"Green":3?"Yellow":4?"Purple":"Orange"}</td>
                    <td>
                        <table className="innerTable">
                            <thead>
                                <tr  style={{backgroundColor:"#bebebe"}}>
                                    <th>Gübre</th>
                                    <th >Döz</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dat.mixDetails.map((item)=>
                        
                                <tr >
                                    <td>{item.fertilizer.publicTitle}</td>
                                    <td>{item.quantity}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </td>
                    <td ><Link to={`${dat.id}`}> <BiEdit className='icon'/></Link>
                        <CgRemove onClick={()=>handleDelete(dat.id)} style={{color:"red"}} className='icon'/>
                    </td> 
                </tr>
            )}

            th={ <tr>
                <th>Mix Ad</th>
                <th>Type</th>
                <th>Renk</th>
                <th>Gübre Details </th>
                <th>işlemler</th>
            </tr>}
            runUseEffect={runUseEffect}

            //filter
            filter={false}
            selectedTitleOption={selectedTitleOption}
            setSelectedTitleOption={setSelectedTitleOption}
            handleTitleSelectedChange={handleTitleSelectedChange}

            //delete
            deleteConfirmation={deleteConfirmation}
            cancelDelete={cancelDelete}
            deleteFunction={deleteFunction}
            showDeletemessage={showDeletemessage}

        />
    )
}   