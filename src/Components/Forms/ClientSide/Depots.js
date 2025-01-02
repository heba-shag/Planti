import { BiDetail, BiEdit, BiPlusCircle } from 'react-icons/bi';
import '../../../Lands/lands.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CgClose, CgCloseO, CgRemove } from 'react-icons/cg';
import axios from 'axios';
import Select from "react-select";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import recBin from "../../../Assets/recyclebin.png";

export default function Depots(props){

    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [currentPage, setCurrentPage] = useState(0);
    let [itemsPerPage, setItemsPerPage] = useState(20);
    let [hasNextPage,setHasNextPage]=useState(false);

    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);
    let [runUseEffect,setRun]=useState(0);
    
    useEffect(()=>{
        fetch(`${props.getUrl}?pageSize=${itemsPerPage}&pageNum=${currentPage}`)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" );
            }
            return  res.json();
        })
        .then((data)=>{
            console.log(data.data);
            props.setData(data.data);
            props.setFilterData(data.data);

            if(props.flowerFilter===false){
                props.setCodeFilter(data.data.map((code)=>({value:code.code,label:code.code})));
            }
            
            
            setIsPending(false);
            setError("");

        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err)
        })
    
    },[currentPage,runUseEffect,itemsPerPage]);

    const options = [
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 50, label: "50" },
      ];


      //flower Filter Clear
      const clearCodeFilter = () => {
        props.setSelectedCodeOption("");
        if(props.selectedCodeOption){
        props.setFilterData(props.Data)}; 
    }
    
   

const handleDelete = async (id) => {
        setDeleteConfirmation(true);
        setDeleteId(id);
    };

    const deleteFunction = async()=> {
        
        try{
            let res=await axios.delete(`${props.deleteUrl}?id=${deleteId}`);
            if(res.status===200){
                setDeleteConfirmation(false);
                if(props.landSetRun===false){
                    props.setRun((prev)=>prev+1);
                }else{
                    setRun((prev)=>prev+1);
                }
                setShowDeleted(true);
                setTimeout(() => setShowDeleted(false), 1500); 
                
            }
        }catch{
            console.log("none");
        }
     }

     const cancelDelete = () => {
        setDeleteConfirmation(false);
      };

     const showFilterData = props.filterData.map((d,index) => (
        <tr key={index} >
            {props.columns.map((column) => (
                
                <td>{d[column]}</td>))}

            {props.actionTD===true&&(<td >
                {props.edit===false && (<Link to={`${d.id}`}> <BiEdit className='icon'/></Link>)}
                {props.innerLandId===false && (<Link to={`updateChild/${d.id}`}> <BiEdit className='icon'/></Link>)}
                {props.grandchildLandId===false && (<Link to={`updateGrandChild/${d.id}`}> <BiEdit className='icon'/></Link>)}
                {props.smallestChild===false && (<Link to={`updateSmallestChild/${d.id}`}> <BiEdit className='icon'/></Link>)}
                {props.icon===false && (<Link to={`${props.details}${d.id}`}><BiDetail className="icon"/></Link>)}
                {props.LandId===false && (<Link to={`child/${d.id}`}> <BiDetail className="icon"/></Link>)}
                {props.innerLandId===false &&(<Link to={`grandchild/${d.id}`} > <BiDetail className="icon"/></Link>)}
                {props.grandchildLandId===false &&(<Link to={`pieceLand/${d.id}`} > <BiDetail className="icon"/></Link>)}
                {props.delete===false && (<CgRemove onClick={()=>handleDelete(d.id)} style={{color:"red"}} className='icon'/>)}

            </td> )}

        </tr>
    ));

    let handleNextPage=()=>{
        if(handleNextPage){
            setCurrentPage(currentPage+1);
        }
    }

    let handlePreviousPage=()=>{
        if(currentPage>0){
            setCurrentPage(currentPage-1);
        }
    }
    return(
        <div className='LandsContainer '>
            {error&&(<div>Hatalı</div>)}
            {isPending&&(<div>indir...</div>)}
             
            <div className='title'>
                <h1>{props.pageTitle}</h1>
            </div>
            <div className='headerSection flex'>
                

                <div className='searchBar flex'>

                    <div className="filterSection flex">

                        {/* {props.titles===true && (<div className='filtering flex' >
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueTitleOptions}  value={props.selctedOption} onChange={props.handleTitleSelectedChange} placeholder="Ad" /> 
                            {props.selctedOption && (<button onClick={clearFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>)} */}
                        
                        {/* flower Filter */}
                        {props.flowerFilter===false &&(<div className='filtering flex' >
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={props.codeFilter}  value={props.selectedCodeOption} onChange={props.handleCodeSelectedChange} placeholder="Code" /> 
                            {props.selectedCodeOption &&(<button onClick={clearCodeFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>)}

                        {/* Samad Filter */}
                        {/* {props.samadFilter===false &&(
                        <>

                            <div className='filtering flex' >
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }} options={uniquePublicTitleOptions}  value={props.selectedPBTitleOption} onChange={props.handlePBTitleSelectedChange} placeholder="Adı" /> 
                                {props.selectedPBTitleOption &&(<button onClick={clearPBTitleFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='filtering flex' >
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueNumberOptions}  value={props.selectedNumberOption} onChange={props.handleNumberSelectedChange} placeholder="NPK" /> 
                                {props.selectedNumberOption && (<button onClick={clearNumberFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='filtering flex' >
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueDescriptionOptions}  value={props.selectedDescriptionOption} onChange={props.handleDescriptionSelectedChange} placeholder="Tanım" /> 
                                {props.selectedDescriptionOption &&(<button onClick={clearDescriptionFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                        </>
                        )} */}

                        {/* Land Filter */}
                        {/* {props.landFilter===false &&(
                        <div className='filtering flex' >
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                    }),
                                }}  options={uniqueNumberOptions}  value={props.selectedNumberOption} onChange={props.handleNumberSelectedChange} placeholder="Boyut" /> 
                            {props.selectedNumberOption &&(<button onClick={clearNumberFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>
                        )} */}

                        {/* Inner Land Filter */}
                        {/* {props.innerLandFilter===false &&(
                            <>
                            <div className='filtering flex' >
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={props.uniqueTitleOptions}  value={props.selctedOption} onChange={props.handleTitleSelectedChange} placeholder="Ad" /> 
                                {props.selctedOption &&(<button onClick={clearFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                        <div className='filtering flex' >
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={props.uniqueNumberOptions}  value={props.selectedNumberOption} onChange={props.handleNumberSelectedChange} placeholder="Boyut" /> 
                                {props.selectedNumberOption &&(<button onClick={clearNumberFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>
                            </>
                        )} */}

                        {/*cutting Filter*/}
                        {/* {props.cuttingFilter===false &&(
                        <>
                            <div className='filtering flex' >
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueNumberOptions}  value={props.selectedNumberOption} onChange={props.handleNumberSelectedChange} placeholder="Yaş" /> 
                               {props.selectedNumberOption &&(<button onClick={clearNumberFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='filtering flex' >
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                    }),
                                }}  options={uniqueDescriptionOptions}  value={props.selectedDescriptionOption} onChange={props.handleDescriptionSelectedChange} placeholder="Tür" /> 
                                {props.selectedDescriptionOption &&(<button onClick={clearDescriptionFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>
                            
                        </>
                        )} */}

                    </div>

                </div>
                {/* <div className='adminDiv flex'>
                    <Link to={`${props.link}`} className='btn'><BiPlusCircle className='icon'/><p>{props.linkLabel}</p></Link>
                </div> */}
                
            </div>

            <div className='tableContainer flex'>
            
                <table>
                    <thead>
                        
                        {props.th}
                        
                    </thead>

                    <tbody>
                        {showFilterData}
                    </tbody>

                </table>
                
            </div>
            {props.pagination===false&&(
            <div  className='pageination flex '>
                <div className=" pagination-filter flex">
                <button className="btn" onClick={handlePreviousPage} disabled={currentPage === 0}><FaArrowLeft/></button>

                <Select calssName="paginationSelect flex"
                placeholder={itemsPerPage}
                menuPlacement="top"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.value)}
                options={options}
                />
                <button className="btn" onClick={handleNextPage} disabled={!hasNextPage} ><FaArrowRight/></button>
                </div>
                
            </div>)}
     
            {deleteConfirmation && (
            <div className="delete-message flex">
                <div className='img'>
                    <img src={recBin} alt='Task Image'/>
                </div>
                <form className='message' >
                    <p className='sureMessage flex'>Silmek istediğinizden emin misiniz?</p>
                    <div className='deleteFormBtns flex'>
                    <button type="button" className='no-btn' onClick={cancelDelete}>
                        hayır
                    </button>
                    <button type="button" className='yes-btn' onClick={deleteFunction}>
                        evet
                    </button>
                    </div>
                </form>
            </div>
            )}
            {showDeletemessage && <div className="done-delete flex"><p className='done-message flex'>başarıyla silindi!</p></div>}
        </div>
        
    );
}