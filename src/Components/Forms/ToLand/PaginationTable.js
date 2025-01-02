import '../../../Lands/lands.css';
import { useEffect, useState } from "react";
import { BiArrowFromLeft, BiEdit, BiPlusCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FaArrowLeft, FaArrowRight, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { CgClose, CgRemove } from "react-icons/cg";
import {  BsFileExcelFill } from "react-icons/bs";
import { MdDateRange} from 'react-icons/md';
import moment from 'moment';

import recBin from "../../../Assets/recyclebin.png";


export default function PaginatonTable(props){

    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [currentPage, setCurrentPage] = useState(0);
    let [itemsPerPage, setItemsPerPage] = useState(20);
    let [hasNextPage,setHasNextPage]=useState(false);

    let [uniqueLandOptions, setUniqueLandOptions] = useState([]);
    let [uniqueLandObiect,setObjectLandOptions]=useState([]);
    //insected Land
    let [uniqueInsecLandOptions, setUniqueInsecLandOptions] = useState([]);
    let [uniqueInsecOptions,setUniqueInsecOptions]=useState([]);
    let [uniqueNoteOptions,setUniqueNoteOptions]=useState([]);
    let [uniqueLiterOptions,setUniqueLiterOptions]=useState([]);
    let [uniquePublicTitleOptions,setUniquePBtitleOptions]=useState([]);


    //cutting Land
    let [uniqueDateOptions, setuniqueDateOptions] = useState([]);
    let [uniqueCuttingLandOptions, setuniqueCuttingLandOptions] = useState([]);
    let [uniqueCuttingOptions, setuniqueCuttingOptions] = useState([]);
    let [uniqueLongOptions, setuniqueLongOptions] = useState([]);
    let [uniqueWorkerOptions, setuniqueWorkerOptions] = useState([]);
    let [uniqueColorOptions, setuniqueColorOptions] = useState([]);

    let [uniqueTitleOptions,setuniqueTitleOptions]= useState([]);
    const id=props.id;
    
    console.log(uniqueLandOptions);
    useEffect(()=>{
        fetch(`${props.getAll}?pageSize=${itemsPerPage}&pageNum=${currentPage}`)
        .then((res)=>{
        if(!res.ok){
            throw Error("couldn't fetch data for that resource" )
        }
        return  res.json();
        })
        .then((data)=>{

            if(props.cuttingColorFilter===false){
                const filteredData = data.filter((item) =>item.cutting.id===parseInt(id));
                    props.setAllData(filteredData);
                    props.setFilter(filteredData);
                    setHasNextPage(data.hasNextPage);
                    const uniqueCode= new Set(filteredData.map((item) => item.code));
                    props.setUniqueCodeOption(
                    Array.from(uniqueCode).map((code) => ({
                    value: code,
                    label: code,
                })));
            }else if(props.threeData===false){
                // console.log(data.data.data.map(((item)=>item.cuttingLand.cuttingColor.code))); 
                props.setAllData(data.data.data);
                props.setFilter(data.data.data);
                props.setCounter(data.totalCount);
                props.setFilterCounter(data.totalCount);
                setHasNextPage(data.data.hasNextPage);
                //flower 
                if(props.flowerFilter===false){
                    const uniqueFlowerLand=new Set(data.data.data.map((item)=>item.cuttingLand.land.title));
                    setuniqueCuttingLandOptions(
                        Array.from(uniqueFlowerLand).map((title)=>({
                            value:title,
                            label:title,
                        }))
                    );

                    const uniqueFlowerCutting=new Set(data.data.data.map(((item)=>item.cuttingLand.cuttingColor.cutting.title)));
                    setuniqueCuttingOptions(
                        Array.from(uniqueFlowerCutting).map((cutting)=>({
                            value:cutting,
                            label:cutting,
                        }))
                    );

                    const uniqueFlowerLong=new Set(data.data.data.map(((item)=>item.long)));
                    setuniqueLongOptions(
                        Array.from(uniqueFlowerLong).map((long)=>({
                            value:long,
                            label:long,
                        }))
                    );

                    const uniqueFlowerWorker=new Set(data.data.data.map(((item)=>item.worker)));
                    setuniqueWorkerOptions(
                        Array.from(uniqueFlowerWorker).map((worker)=>({
                            value:worker,
                            label:worker,
                        }))
                    );

                    const uniqueFlowerColor=new Set(data.data.data.map(((item)=>item.cuttingLand.cuttingColor.code)));
                    setuniqueColorOptions(
                        Array.from(uniqueFlowerColor).map((worker)=>({
                            value:worker,
                            label:worker,
                        }))
                    );
                    
                }
            }else{
                console.log(data.data);
            props.setAllData(data.data);
            setHasNextPage(data.hasNextPage);
            if(props.filter===false){
            props.setFilter(data.data);}
            if(props.cuttingLand===false){
                const uniqueDate= new Set(data.data.map((item) => item.date));
                setuniqueDateOptions(
                    Array.from(uniqueDate).map((date) => ({
                        value:new Date(date).toLocaleDateString(),
                        label: new Date(date).toLocaleDateString(),
                    }))
                );
            }
            if(props.insecticde===false){
                const uniqueInsec= new Set(data.data.map((item) => item.title));
                setUniqueInsecOptions(
                    Array.from(uniqueInsec).map((insec) => ({
                        value: insec,
                        label: insec,
                    }))
                );

                const uniqueNote=new Set(data.data.map((item) => item.description));
                console.log(uniqueNote);
                setUniqueNoteOptions(
                    Array.from(uniqueNote).map((description) => ({
                        value: description,
                        label:description,
                    }))
                );

                const uniqueLiter=new Set(data.data.map((item) => item.publicTitle));
                setUniquePBtitleOptions(
                    Array.from(uniqueLiter).map((publicTitle) => ({
                        value: publicTitle,
                        label:publicTitle,
                    }))
                );
            }

            //insected Land Filter
            if(props.insecLand===false){
                const uniqueInsec= new Set(data.data.flatMap((dat)=>dat.insecticideLand.map((item) => item.insecticide.publicTitle)));
                console.log(uniqueInsec);
                setUniqueInsecLandOptions(
                    Array.from(uniqueInsec).map((insec) => ({
                        value: insec,
                        label: insec,
                    }))
                );

                const uniqueNote=new Set(data.data.flatMap((dat)=>dat.insecticideLand.map((item) => item.note)));
                console.log(uniqueNote);
                setUniqueNoteOptions(
                    Array.from(uniqueNote).map((note) => ({
                        value: note,
                        label:note,
                    }))
                );

                const uniqueLiter=new Set(data.data.flatMap((dat)=>dat.insecticideLand.map((item) => item.liter)));
                console.log(uniqueLiter);
                setUniqueLiterOptions(
                    Array.from(uniqueLiter).map((liter) => ({
                        value: liter,
                        label:liter,
                    }))
                );

            };

            if(props.DateFilter===false){
                const uniqueDate= new Set(data.data.map((item) => item.date));
                setuniqueDateOptions(
                    Array.from(uniqueDate).map((date) => ({
                        value:new Date(date).toLocaleDateString(),
                        label: new Date(date).toLocaleDateString(),
                    }))
                );
            };

            if(props.mixFilterTitle===false){
                const uniqueTitle= new Set(data.data.map((item) => item.title));
                setuniqueTitleOptions(
                    Array.from(uniqueTitle).map((title) => ({
                        value:title,
                        label: title,
                    }))
                );
            };
            if(props.mixFilterNote===false){
                const uniqueNote= new Set(data.data.map((item) => item.note));
                setUniqueNoteOptions(
                    Array.from(uniqueNote).map((note) => ({
                        value:note,
                        label: note,
                    }))
                );
            };

        }
        setIsPending(false);
        setError("");})
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err);
        });

        {props.getCuttingLandFetch===false&&
        (fetch(props.getCuttingLand)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" )
            }
        return  res.json();
        })
        .then((data)=>{
            const landFilters=new Set(data.map((item)=>item));
            setUniqueLandOptions(Array.from(landFilters).map((landi) => ({
                value: landi.id,
                label: landi.title,
            })));
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err);
        })
        )}
        
    },[currentPage,props.runUseEffect,itemsPerPage]);
    

    const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    ];
    
    let showData=props.sortedData;
  
    const clearLandFilter = () => {
        props.setSelectedLandOption("");
        if(props.selectedLandOption){
            if(props.fertFilter===false){
                props.setSamadFilter(props.allData);
            }else{
                props.setFilter(props.allData);
            }
        }; 
    }

    //clear insec Filters
    const clearInsecFilter = () => {
        props.setSelectedInsecOption("");
        if(props.selectedInsecOption){
        props.setFilter(props.allData)}; 
    }

    const clearPbTitleFilter=()=>{
        props.setSelectedPBOption("");
        if(props.selectedPBtitleOption){
        props.setFilter(props.allData)}; 
    }

    const clearNoteFilter = () => {
        props.setSelectedNoteOption("");
        if(props.selectedNoteOption){
        props.setFilter(props.allData)}; 
    }

    const clearLiterFilter = () => {
        props.setSelectedLiterOption("");
        if(props.selectedLiterOption){
        props.setFilter(props.allData)}; 
    }
    
    const clearDateFilter = () => {
        props.setSelectedDateOption("");
        if(props.selectedDateOption){
        props.setFilter(props.allData)}; 
    }

    const clearFromToDateFilter = () => {
        props.setStartDate("");
        props.setEndDate("");
        if(props.startDate|| props.endDate){
            if( props.insecLand===false||props.flowerFilter===false){
                props.setFilter(props.allData);
                props.setCounter(props.counter);
            }else{
                props.setSamadFilter(props.allData);
            }
        }; 
    }

    //flower

    const clearCuttingLandFilter=()=>{
        props.setSelectedCuttingLandOption("")
        if(props.selectedCuttingLandOption){
            props.setFilter(props.allData);
            props.setCounter(props.counter);
        }
    }

    const clearCuttingFilter=()=>{
        props.setSelectedCuttingOption("")
        if(props.selectedCuttingOption){
            props.setFilter(props.allData);
            props.setCounter(props.counter);
        }
    }

    const clearColorFilter=()=>{
        props.setSelectedColorOption("")
        if(props.selectedColorOption){
            props.setFilter(props.allData);
            props.setCounter(props.counter);
        }
    }

    const clearLongFilter=()=>{
        props.setSelectedLongOption("")
        if(props.selectedLongOption){
            props.setFilter(props.allData);
            props.setCounter(props.counter);
        }
    }

    const clearWorkerFilter=()=>{
        props.setSelectedWorkerOption("")
        if(props.selectedWorkerOption){
            props.setFilter(props.allData);
            props.setCounter(props.counter);
        }
    }

    const clearTitleFilter=()=>{
        props.setSelectedTitleOption("")
        if(props.selectedTitleOption){
            props.setFilter(props.allData);
        }
    }

    

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
        <div className='LandsContainer'>
            {error&&<div>Hatalı</div>}
            {isPending&&<div>indir..</div>}
            <div className='title'>
                <h1>{props.pageTitle}</h1>
            </div>
            <div className='headerSection flex'>
               
                <div className='searchBar'>
                    <div className="filterSection flex">

                        {props.LandSelect===false && (<div className='filtering flex' style={{border:props.selectedLandOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter" styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueLandOptions}  value={props.selectedLandOption} onChange={props.handleLandSelectedChange} placeholder="Tarla.."  />
                            
                            {props.selectedLandOption && (<button onClick={clearLandFilter} className='flex'>< CgClose className="icon"/></button>)}
                            
                            </div>
                        )}

                        {props.mixFilterTitle===false && (<div className='filtering flex' style={{border:props.selectedTitleOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter" styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueTitleOptions}  value={props.selectedTitleOption} onChange={props.handleTitleSelectedChange} placeholder="Tarla.."  />
                            
                            {props.selectedTitleOption && (<button onClick={clearTitleFilter} className='flex'>< CgClose className="icon"/></button>)}
                            
                            </div>
                        )}

                        {props.mixFilterNote===false && (<div className='filtering flex' style={{border:props.selectedNoteOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                    }),
                                }}  options={uniqueNoteOptions}  value={props.selectedNoteOption} onChange={props.handleNoteSelectedChange} placeholder="Note" /> 
                            {props.selectedNoteOption&& (<button onClick={clearNoteFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>
                        )}

                        {props.cuttingColorFilter===false && (<div className='filtering flex' style={{border:props.selectedCodeOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  options={props.uniqueCodeOptions}  value={props.selectedCodeOption} onChange={props.handleCodeSelectedChange}  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }} placeholder="Code.." /> 
                            {props.selectedCodeOption &&(<button onClick={props.clearCodeFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>)} 

                        {/* insecticide land Filter */}
                        {props.insecLand===false &&(
                        <>

                        <div className='filtering flex' style={{border:props.selectedLandOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter" styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueLandOptions}  value={props.selectedLandOption} onChange={props.handleLandSelectedChange} placeholder="Tarla.."  />
                            
                            {props.selectedLandOption && (<button onClick={clearLandFilter} className='flex'>< CgClose className="icon"/></button>)}
                            
                            </div>

                        <div className='filtering flex' style={{border:props.selectedInsecOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueInsecLandOptions}  value={props.selectedInsecOption} onChange={props.handleInsecSelectedChange} placeholder="ilaç" /> 
                            {props.selectedInsecOption &&(<button onClick={clearInsecFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>


                        <div className='filtering flex' style={{border:props.selectedNoteOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                    }),
                                }}  options={uniqueNoteOptions}  value={props.selectedNoteOption} onChange={props.handleNoteSelectedChange} placeholder="Note" /> 
                            {props.selectedNoteOption&& (<button onClick={clearNoteFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>

                        <div className='filtering flex' style={{border:props.selectedLiterOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                    }),
                                }}  options={uniqueLiterOptions}  value={props.selectedLiterOption} onChange={props.handleLiterSelectedChange} placeholder="Litre" /> 
                            {props.selectedLiterOption&& (<button onClick={clearLiterFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>
                        </>

                        )}

                        { props.insecticde===false&&(
                        <>
                        <div className='filtering flex' style={{border:props.selectedInsecOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                    }),
                                }}  options={uniqueInsecOptions}  value={props.selectedInsecOption} onChange={props.handleInsecSelectedChange} placeholder="Ad" /> 
                            {props.selectedInsecOption &&(<button onClick={clearInsecFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>

                        <div className='filtering flex' style={{border:props.selectedNoteOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueNoteOptions}  value={props.selectedNoteOption} onChange={props.handleNoteSelectedChange} placeholder="Tanım" /> 
                            {props.selectedNoteOption &&(<button onClick={clearNoteFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>

                        <div className='filtering flex' style={{border:props.selectedPBtitleOption ?"solid .15rem #528e25":"white" }}>
                            <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                    }),
                                }}  options={uniquePublicTitleOptions}  value={props.selectedPBtitleOption} onChange={props.handlePBtitleSelectedChange} placeholder="Ad" /> 
                            {props.selectedPBtitleOption &&(<button onClick={clearPbTitleFilter} className='flex'>< CgClose className="icon"/></button>)}
                        </div>
                        </>

                        )}

                        {/* cuttingLand land Filter */}
                        {props.cuttingLand===false &&(

                            <div className='filtering flex' style={{border:props.selectedDateOption ?"solid .15rem #528e25":"white" }}>
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueDateOptions}  value={props.selectedDateOption} onChange={props.handleDateSelectedChange} placeholder="Tarih" /> 
                                {props.selectedDateOption &&(<button onClick={clearDateFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>)}

                        {(props.fertFilter===false || props.insecLand===false||props.flowerFilter===false) && (
                                <div className='filtering-date flex' style={{border:(props.startDate||props.endDate) ?"solid .15rem #528e25":"white" }}>
                                    <input type='date' className="input" value={props.startDate} onChange={(e)=>props.setStartDate(e.target.value)}/>
                                    <BiArrowFromLeft className='icon' style={{color:"#79797c"}}/>
                                    <input type='date' className="input" value={props.endDate} onChange={(e)=>props.setEndDate(e.target.value)}/>
                                    {(props.startDate||props.endDate)&&(<button onClick={props.handleDateFilter} className='flex'>< MdDateRange className="icon"/></button>)}
                                    {(props.startDate||props.endDate)&&(<button onClick={clearFromToDateFilter} className='flex'>< CgClose className="icon"/></button>)}
                                </div>)}

                            {/* flower */}
                        {props.flowerFilter===false && (
                                <>
                            <div className='filtering flex' style={{border:props.selectedCuttingLandOption ?"solid .15rem #528e25":"white" }}> 
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueCuttingLandOptions}  value={props.selectedCuttingLandOption} onChange={props.handleCuttingLandSelectedChange} placeholder="Tarlalar" /> 
                                {props.selectedCuttingLandOption&& (<button onClick={clearCuttingLandFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='filtering flex' style={{border:props.selectedCuttingOption ?"solid .15rem #528e25":"white" }}> 
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueCuttingOptions}  value={props.selectedCuttingOption} onChange={props.handleCuttingSelectedChange} placeholder="Fide" /> 
                                {props.selectedCuttingOption&& (<button onClick={clearCuttingFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='filtering flex' style={{border:props.selectedColorOption ?"solid .15rem #528e25":"white" }}> 
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueColorOptions}  value={props.selectedColorOption} onChange={props.handleColorChange} placeholder="Renk Code" /> 
                                {props.selectedColorOption&& (<button onClick={clearColorFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='filtering flex' style={{border:props.selectedLongOption ?"solid .15rem #528e25":"white" }}> 
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueLongOptions}  value={props.selectedLongOption} onChange={props.handleLongSelectedChange} placeholder="Long" /> 
                                {props.selectedLongOption&& (<button onClick={clearLongFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='filtering flex' style={{border:props.selectedWorkerOption ?"solid .15rem #528e25":"white" }}> 
                                <Select className="selectFilter"  styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueWorkerOptions}  value={props.selectedWorkerOption} onChange={props.handleWorkerSelectedChange} placeholder="Worker" /> 
                                {props.selectedWorkerOption&& (<button onClick={clearWorkerFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>

                            <div className='input-box flex' > 
                                <label  className="details">Toplam sayı:</label>
                               {(props.selectedCuttingLandOption||props.selectedCuttingOption||props.selectedColorOption||props.selectedLongOption||props.selectedWorkerOption||props.startDate||props.endDate)?(<input disabled={true} style={{background:"white"}} value={props.filterCounter} />):<input disabled={true} style={{background:"white"}} value={props.counter} />}
                            </div>
                            </>
                            )}

                            {(props.fertExcel===false|| props.insecExcel===false) &&(
                            <div className={`excel-btn flex ${(props.selectedLandOption==="" && props.startDate==="" &&props.endDate==="")?"disabled":""}`} >
                                <button className=" flex" disabled={props.selectedLandOption==="" && props.startDate==="" &&props.endDate===""} onClick={()=>props.handlePrint()} >Excel File <BsFileExcelFill className="excel-icon"/> </button>
                            </div> 
                            )}

                    </div> 
                </div>

                <div className='adminDiv flex'>
                    <Link to={`${props.AddToLand}`} className='btn'><BiPlusCircle className='icon'/><p>{props.AddToLandLabel}</p></Link>
                </div> 
    
            </div>

            <div className='tableContainer flex'>             
            {(props.FertilizerLand===false||props.insecLand===false) &&(
                <div className='title'>
                    <h1>Dates List:</h1>
                </div>
            )}
            
            {props.FertilizerLand===false?(
                <div className='grid' style={{width:"100%"}}>
                    {(props.sortedfilterData.map((dat,index)=>
                        <>
                            <li className='flex' key={index} onClick={()=>{props.handleItemClick(index);props.setIsDrop(!props.isDrop)}}>{ moment(dat.date).format('YYYY-MM-DD HH:mm')} {(props.activeItem===index && props.isDrop)?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}</li>
                            {props.activeItem===index && props.isDrop&&dat.fertilizerLand.length>0&& ( 
                            <table>
                               <thead>
                                    <tr>
                                        <th>Tarla</th>
                                        <th>Gübre</th>
                                        <th>Sayı</th>
                                        <th>Tür</th>
                                        <th>işlemler</th>
                                    </tr>
                               </thead>
           
                               <tbody>
                                {dat.fertilizerLand.map((id,i)=>
                                  
                                    <tr key={i}>
                                        <td><Link className="Link" to={`/land-details-page/${id.cuttingLand.land.id}`}>{id.cuttingLand.land.title}</Link></td>
                                        <td><Link className="Link" to={`/fertilize-details-page/${id.fertilizer.id}`}>{id.fertilizer.publicTitle}</Link></td>
                                        <td>{id.quantity}</td>
                                        <td>{id.type===0?"Yaprak gübreleme":"damlama gübreleme"}</td>
                                        <td>
                                        <Link to={`${id.id}`}> <BiEdit className='icon'/></Link>
                                        <CgRemove onClick={()=>props.handleDelete(id.id)} style={{color:"red"}} className='icon'/>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                            
                            )}
                        
                        </>))}
                    
                    </div>
                    ):
                    props.insecLand===false?(
                        <div className='grid' style={{width:"100%"}}>
                    {(props.sortedfilterData.map((dat,index)=>
                        <>
                        {console.log(dat)}
                            <li className='flex' key={index} onClick={()=>{props.handleItemClick(index);props.setIsDrop(!props.isDrop)}}>{ moment(dat.date).format('YYYY-MM-DD HH:mm')} {(props.activeItem===index && props.isDrop)?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}</li>
                            {props.activeItem===index && props.isDrop&&dat.insecticideLand.length>0&& ( 
                            <table>
                               <thead>
                                    <tr>
                                    <th>Tarla</th>
                                    <th>ilaç Adı</th>
                                    <th>litre</th>
                                    <th>Sayı</th>
                                    <th>Note</th>
                                    <th>işlemler</th>
                                    </tr>
                               </thead>
           
                               <tbody>
                                {dat.insecticideLand.map((id,i)=>
                                  
                                    <tr key={i}>
                                        <td><Link className="Link" to={`/land-details-page/${id.cuttingLand.land.id}`}>{id.cuttingLand.land.title}</Link></td>
                                        <td><Link className="Link" to={`/insecticide-details-page/${id.insecticide.id}`}>{id.insecticide.publicTitle}</Link></td>
                                        <td>{id.liter}</td>
                                        <td>{id.quantity}</td>
                                        <td>{id.note}</td>
                                        <td>
                                        <Link to={`${id.id}`}> <BiEdit className='icon'/></Link>
                                        <CgRemove onClick={()=>props.handleDelete(id.id)} style={{color:"red"}} className='icon'/>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                            
                            )}
                        
                        </>))}
                    
                    </div>
                    ):
                (<table>
                    <thead>
                        {props.th}
                    </thead>

                    <tbody>
                        {showData}
                    </tbody>
                
                </table>)
                }
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

        {props.printConfirmation && (
        <div className="delete-message flex">
            <form className='message' >
                <p className='sureMessage flex'>dosya Adı?</p>
                <input type="text" value={props.fileName} onChange={(e)=>props.setFileName(e.target.value)}  placeholder='dosya Adı...'/>
                <div className='deleteFormBtns flex'>
                <button type="button" className='no-btn' onClick={props.cancelPrint}>
                    iptal
                </button>
                <button type="button" className='no-btn' onClick={props.excelFunction}>
                    indirmek!
                </button>
                </div>
            </form>
        </div>
        )}
        {props.showDonemessage && <div className="done-delete flex" style={{border: "0.2rem solid var(--PrimaryColor)"}} ><p className='done-message flex'>başarıyla indirildi!</p></div>}
        
        {/* delete */}
        {props.deleteConfirmation && (
        <div className="delete-message flex">
            <div className='img'>
                <img src={recBin} alt='Task Image'/>
            </div>
            <form className='message' >
                <p className='sureMessage flex'>Silmek istediğinizden emin misiniz?</p>
                <div className='deleteFormBtns flex'>
                <button type="button" className='no-btn' onClick={props.cancelDelete}>
                    hayır
                </button>
                <button type="button" className='yes-btn' onClick={props.deleteFunction}>
                    evet
                </button>
                </div>
            </form>
        </div>
        )}
        {props.showDeletemessage && <div className="done-delete flex"><p className='done-message flex'>başarıyla silindi!</p></div>}
    
        {/* empty */}
        {props.emptyConfirmation && (
        <div className="delete-message flex">
            <form className='message' >
                <p className='sureMessage flex'>you wannab harvest the land?</p>
                <div className='deleteFormBtns flex'>
                <button type="button" className='no-btn' onClick={props.cancelEmpty}>
                    hayır
                </button>
                <button type="button" className='yes-btn' onClick={props.emptyFunction}>
                    evet
                </button>
                </div>
            </form>
        </div>
        )}
        {props.showEmptymessage && <div className="done-delete flex"><p className='done-message flex'>başarıyla silindi!</p></div>}
    

    </div>

    );
}