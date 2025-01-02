import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import { CgRemove } from "react-icons/cg";
import moment from 'moment';
// import FileSaver from 'file-saver';
import PaginatonTable from "../../Components/Forms/ToLand/PaginationTable";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function FertLand(){
    let [allData,setAllData]=useState([]);
    let [fertLandFilter,setFertLandFilter]=useState(allData);
    let [selectedLandOption,setSelectedLandOption]=useState("");
    let [startDate,setStartDate]=useState("");
    let [endDate,setEndDate]=useState("");
    let [runUseEffect,setRun]=useState(0);

    //excel
    let [excelFile,setExcelFile]=useState("ExcelFile");
    let [printConfirmation, setPrintConfirmation] = useState(false);
    let [showDonemessage,setShowPrintDone]=useState(false);
    let [buttonDisable,setIsDisable]=useState(true);

    //delete
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);

    const [activeItem, setActiveItem] = useState("");

    let  [isDrop, setIsDrop] = useState(false); 
    const handleItemClick = (itemIndex) => {
    setActiveItem(itemIndex);
    // setIsDrop(true);
    };

    const handleDelete = async (id) => {
        setDeleteConfirmation(true);
        setDeleteId(id);
    };

    const handlePrint = async () => {
        setPrintConfirmation(true);
    };

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const fertilizerLandApi = isDev? {
        baseFertilizerLandUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
        deleteFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/Remove?id=${deleteId}`)},
        excelFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/ExportExcel?LandId=${selectedLandOption.value}&from=${startDate}&to=${endDate}&fileName=${excelFile}`)},
        getAllFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/GetAll`)},

        baseLandUrl: process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${fertilizerLandApi.baseLandUrl}/GetAll?justChildren=${true}`)},
    }:{
        baseFertilizerLandUrl: process.env.REACT_APP_API_FERTILIZERLAND_URL,
        deleteFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/Remove?id=${deleteId}`)},
        excelFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/ExportExcel?LandId=${selectedLandOption.value}&from=${startDate}&to=${endDate}&fileName=${excelFile}`)},
        getAllFertilizerLand:()=>{return (`${fertilizerLandApi.baseFertilizerLandUrl}/GetAll`)},

        baseLandUrl: process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${fertilizerLandApi.baseLandUrl}/GetAll?justChildren=${true}`)},
    }

    const deleteFunction = async()=> {
        
        try{
            let res=await axios.delete(fertilizerLandApi.deleteFertilizerLand());//استخدمت أوايت لأنو بدي أستنا الحذف يخلص وبعدا اخد النتيجة واستخدما
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

    let handleLandselectedOption=(selectedLandOption)=>{
        setSelectedLandOption(selectedLandOption);
        if (!selectedLandOption) {
            
            setFertLandFilter(allData);
            return;
        }
        const filteredData =  allData.map((item) => ({fertilizerLand:item.fertilizerLand.filter((option) => 
            selectedLandOption.label === option.cuttingLand.land.title
            
        )}));
        const filterToFilter=filteredData.filter((item)=>item.fertilizerLand.length>0);
        setStartDate("");
        setEndDate("");
        setFertLandFilter(filterToFilter);
        }

    let handleDateFilter = () => {
        let filteredData;
        if (!startDate && !endDate) {
            setFertLandFilter(allData);
            return;
        }
        else if(!endDate){
                filteredData = allData.filter((item) => {
                const itemDate =new Date(item.date);
                const start= new Date(startDate);
                return itemDate>=start;
            });
        }
        else if(!startDate){
            filteredData = allData.filter((item) => {
                const itemDate =new Date(item.date);
                const end= new Date(endDate);
                return itemDate<=end;
            });
        }
        else if(startDate &&endDate) {
            filteredData = allData.filter((item) => {
                const itemDate =new Date(item.date);
                const start= new Date(startDate);
                const end=new Date(endDate);
                return itemDate>=start && itemDate <end;
            });
        }
        setSelectedLandOption("");
        setFertLandFilter(filteredData);
    }

    

    const excelFunction = async()=> {
        
        try{

            let response=await axios.post(fertilizerLandApi.excelFertilizerLand(),{responseType: 'blob'});
            const blob = new Blob([response.data],  { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${excelFile}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            if(response.status===200){
               
                setPrintConfirmation(false);
                setRun((prev)=>prev+1);
                setShowPrintDone(true); // Show success message
                setTimeout(() => setShowPrintDone(false), 2000); 
            }else{
                console.error(`Failed to download file:`,response.status)
            }
        }catch(error){
            console.error("Error downloading file:",error.message);
        }
    }
    const cancelPrint = () => {
        setPrintConfirmation(false);
    };

   

    return(
        <PaginatonTable
            pageTitle="Gübre oygulama."
            getCuttingLand={fertilizerLandApi.getAllLand()}
            getAll={fertilizerLandApi.getAllFertilizerLand()}
            setAllData={setAllData}
            FertilizerLand={false}
            allData={allData}

            getCuttingLandFetch={false}
            runUseEffect={runUseEffect}

            AddToLand={`/fertland/samadLands`}
            AddToLandLabel="Ekleme"

            sortedfilterData={fertLandFilter}

            handleItemClick={handleItemClick}
            setIsDrop={setIsDrop}
            isDrop={isDrop}
            activeItem={activeItem}
            //filter
            filter={false}
            setFilter={setFertLandFilter}
            landId={false}
            LandSelect={false}
            fertFilter={false}

            handleLandSelectedChange={handleLandselectedOption}
            handleDateFilter={handleDateFilter}

            setSelectedLandOption={setSelectedLandOption}
            setSamadFilter={setFertLandFilter}   
            setStartDate={setStartDate}
            setEndDate={setEndDate}   

            selectedLandOption={selectedLandOption}
            startDate={startDate}
            endDate={endDate}
            
            pagination={false}

            //excel
            fertExcel={false}
            fileName={excelFile}
            setFileName={setExcelFile}
            handlePrint={handlePrint}
            printConfirmation={printConfirmation}
            cancelPrint={cancelPrint}
            excelFunction={excelFunction}
            showDonemessage={showDonemessage}
            buttonDisable={buttonDisable}

            //delete
            handleDelete={handleDelete}
            deleteConfirmation={deleteConfirmation}
            cancelDelete={cancelDelete}
            deleteFunction={deleteFunction}
            showDeletemessage={showDeletemessage}
        />
    );
}