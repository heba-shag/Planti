import { BiArrowFromLeft, BiDetail, BiEdit, BiPlusCircle, BiSolidArrowFromLeft } from 'react-icons/bi';
import '../../../Lands/lands.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CgClose, CgCloseO, CgRemove } from 'react-icons/cg';
import axios from 'axios';
import Select from "react-select";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import recBin from "../../../Assets/recyclebin.png";
import { MdDateRange } from 'react-icons/md';

export default function TableOrders(props){

    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");

    let [currentPage, setCurrentPage] = useState(0);
    let [itemsPerPage, setItemsPerPage] = useState(20);
    let [hasNextPage,setHasNextPage]=useState(false);

    let [uniqueClientName,setUniqueClientName]=useState([]);
    useEffect(()=>{

        fetch(`${props.getInfoUrl}?pageSize=${itemsPerPage}&pageNum=${currentPage}`)
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" );
            }
            return  res.json();
        })
        .then((data)=>{
            console.log(data.data);
            props.setInfoData(data.data);

            setIsPending(false);
            setError("");

        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err)
        });

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
            const clientFilters=new Set(data.data.map((item)=>item.name));
            setUniqueClientName(Array.from(clientFilters).map((name) => ({
                value: name,
                label: name,
            })));

            setIsPending(false);
            setError("");

        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err)
        })
    
    },[currentPage,props.runUseEffect,itemsPerPage]);

    const options = [
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 50, label: "50" },
      ];


      //flower Order Filter Clear
      const clearFromToDateFilter = () => {
        props.setStartDate("");
        props.setEndDate("");
        if(props.startDate|| props.endDate){
            props.setFilterData(props.Data);
        }; 
    }

    const clearNameFilter=()=>{
        props.setSelectedNameOption("");
        if(props.selectedNameOption){
        props.setFilterData(props.Data)}; 
    }

   
    const showFilterData = props.filterData;

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

                        
                        {/* flower Order Filter */}
                        {props.flowerOrderFilter===false &&(
                            <div className='filtering-date flex'>
                                <input type='date' className="input" value={props.startDate} onChange={(e)=>props.setStartDate(e.target.value)}/>
                                <BiSolidArrowFromLeft className='icon' style={{color:"#79797c"}}/>
                                <input type='date' className="input" value={props.endDate} onChange={(e)=>props.setEndDate(e.target.value)}/>
                                {(props.startDate||props.endDate)&&(<button onClick={props.handleDateFilter} className='flex'>< MdDateRange className="icon"/></button>)}
                                {(props.startDate||props.endDate)&&(<button onClick={clearFromToDateFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>
                        )}

                        {/* clients Filter */}
                        {props.clientsFilter===false &&(<div className='filtering flex' >
                            <Select className="selectFilter" styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none', 
                                    }),
                                }}  options={uniqueClientName}  value={props.selectedNameOption} onChange={props.handleNameSelectedChange} placeholder="Names.."  />
                            
                            {props.selectedNameOption && (<button onClick={clearNameFilter} className='flex'>< CgClose className="icon"/></button>)}
                            </div>
                        )}

                        

                    </div>

                </div>
                <div className='adminDiv flex'>
                    <Link to={`${props.link}`} className='btn'><BiPlusCircle className='icon'/><p>{props.linkLabel}</p></Link>
                </div>
                
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
     
            {props.printConfirmation && (
            <div className="delete-message flex">
            <form className='message' >
                <p className='sureMessage flex'>Bought Tarih?</p>
                <input type="datetime-local" value={props.isBoughtDate} onChange={(e)=>props.setIsBoughtDate(e.target.value)} />
                
                <div className='deleteFormBtns flex'>
                <button type="button" className='no-btn' onClick={props.cancelPrint}>
                    iptal
                </button>
                <button type="button" className='no-btn' onClick={props.updateSubmit}>
                    Tamamlandı!
                </button>
                </div>
            </form>
        </div>
        )}
        {props.showDonemessage && <div className="done-delete flex" style={{border: "0.2rem solid var(--PrimaryColor)"}} ><p className='done-message flex'>başarıyla indirildi!</p></div>}

        {props.editConfirmation && (
        <div className="order-message flex">
            
            <form className='message' >
            <p className='sureMessage flex'>Order Edit</p>
                {/* <div className=" flex"> */}
                    <div className="input-box " >
                        <label className='details'>Order Tarih?</label>
                        <input  type="datetime-local" value={props.orderDate} onChange={(e)=>props.setOrderDate(e.target.value)} />
                    </div>
                    <div className="input-box " >
                        <label className="details">ilaç:</label>
                        <select id="selectedSamad" value={props.selectedClient} onChange={props.handleClientChange} >
                            <option value="">Seçimler</option>
                            {props.infoData.map((option) => (<option key={option.id} value={option.id} >{option.name}</option>))}
                        </select>
                    </div>
                    
                    <div className='deleteFormBtns flex'>
                    <button type="button" className='no-btn' onClick={props.cancelEdit}>
                        iptal
                    </button>
                    <button type="button" className='no-btn' onClick={props.updateOrder}>
                        Tamamlandı!
                    </button>
                    </div>
                {/* </div> */}
            </form>
            
        </div>
        )}
        {props.showDonemessage && <div className="done-delete flex" style={{border: "0.2rem solid var(--PrimaryColor)"}} ><p className='done-message flex'>başarıyla indirildi!</p></div>}
        
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
    
        </div>
        
    );
}