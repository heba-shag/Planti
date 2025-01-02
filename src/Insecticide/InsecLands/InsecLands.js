import { useEffect, useState } from "react";
import { BiEdit} from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgRemove } from "react-icons/cg";
import PaginatonTable from "../../Components/Forms/ToLand/PaginationTable";

export default function InsecLands(){

    let [allData,setAllData]=useState([]);
    let [filterinsecLand,setFilterinsecLand]=useState(allData);
    let [selectedLandOption,setSelectedLandOption]=useState("");
    let [selectedInsecOption,setSelectedInsecOption]=useState("");
    let [selectedNoteOption,setSelectedNoteOption]=useState("");
    let [selectedLiterOption,setSelectedLiterOption]=useState("");
    let [startDate,setStartDate]=useState("");
    let [endDate,setEndDate]=useState("");
    let [runUseEffect,setRun]=useState(0);

    //delete
    let [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let [deleteId,setDeleteId]=useState("");
    let [showDeletemessage,setShowDeleted]=useState(false);

    //excel
    let [excelFile,setExcelFile]=useState("ExcelFile");
    let [printConfirmation, setPrintConfirmation] = useState(false);
    let [showDonemessage,setShowPrintDone]=useState(false);
    let [buttonDisable,setIsDisable]=useState(true);

    const [activeItem, setActiveItem] = useState("");

    let  [isDrop, setIsDrop] = useState(false); 

    const handleItemClick = (itemIndex) => {
    setActiveItem(itemIndex);
    setIsDrop(true);
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
    const insecticideLandApi = isDev? {
        baseInsecticideLandUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        deleteIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/Remove?id=${deleteId}`)},
        excelIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/ExportExcel?LandId=${selectedLandOption.value}&from=${startDate}&to=${endDate}&fileName=${excelFile}`)},
        getAllIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/GetAll`)},

        baseLandUrl: process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${insecticideLandApi.baseLandUrl}/GetAll?justChildren=${true}`)},
    }:{
        baseInsecticideLandUrl: process.env.REACT_APP_API_INSECTICIDELAND_URL,
        deleteIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/Remove?id=${deleteId}`)},
        excelIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/ExportExcel?LandId=${selectedLandOption.value}&from=${startDate}&to=${endDate}&fileName=${excelFile}`)},
        getAllIsecticideLand:()=>{return (`${insecticideLandApi.baseInsecticideLandUrl}/GetAll`)},
        
        baseLandUrl: process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${insecticideLandApi.baseLandUrl}/GetAll?justChildren=${true}`)},
    }

    const deleteFunction = async()=> {
    
    try{
        let res=await axios.delete(insecticideLandApi.deleteIsecticideLand());//استخدمت أوايت لأنو بدي أستنا الحذف يخلص وبعدا اخد النتيجة واستخدما
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
            setFilterinsecLand(allData);
            return;
        }
        const filteredData =  allData.map((item) => ({insecticideLand:item.insecticideLand.filter((option) => 
            selectedLandOption.label === option.cuttingLand.land.title
        )}));
        const filterToFilter=filteredData.filter((item)=>item.insecticideLand.length>0);
        setSelectedInsecOption("");
        setSelectedNoteOption("");
        setSelectedLiterOption("");
        setStartDate("");
        setEndDate("");
        setFilterinsecLand(filterToFilter);
    }

    let handleInsecSelectedChange=(selectedInsecOption)=>{
        setSelectedInsecOption(selectedInsecOption);
        if (!selectedInsecOption) {
            setFilterinsecLand(allData);
            return;
        }
        const filteredData =  allData.map((item) => ({insecticideLand:item.insecticideLand.filter((option) => 
            selectedInsecOption.label === option.insecticide.publicTitle
        )}));

        const filterToFilter=filteredData.filter((item)=>item.insecticideLand.length>0);
        // const filteredData = allData.filter((item) =>(selectedInsecOption.label===item.insecticide.publicTitle));
        setSelectedLandOption("");
        setSelectedNoteOption("");
        setSelectedLiterOption("");
        setStartDate("");
        setEndDate("");
        setFilterinsecLand(filterToFilter);
    }

    let handleNoteSelectedChange=(selectedNoteOption)=>{
        setSelectedNoteOption(selectedNoteOption);
        if (!selectedNoteOption) {
            setFilterinsecLand(allData);
            return;
        }
        const filteredData =  allData.map((item) => ({insecticideLand:item.insecticideLand.filter((option) => 
            selectedNoteOption.label === option.note
        )}));

        const filterToFilter=filteredData.filter((item)=>item.insecticideLand.length>0);
        // const filteredData = allData.filter((item) =>(selectedNoteOption.label===item.note));
        setSelectedLandOption("");
        setSelectedInsecOption("");
        setSelectedLiterOption("");
        setStartDate("");
        setEndDate("");
        setFilterinsecLand(filterToFilter);
    }

    let handleLiterSelectedChange=(selectedLiterOption)=>{
        setSelectedLiterOption(selectedLiterOption);
        if (!selectedLiterOption) {
            setFilterinsecLand(allData);
            return;
        }

        const filteredData =  allData.map((item) => ({insecticideLand:item.insecticideLand.filter((option) => 
            selectedLiterOption.label === option.liter
        )}));

        const filterToFilter=filteredData.filter((item)=>item.insecticideLand.length>0);

        setSelectedLandOption("");
        setSelectedInsecOption("");
        setSelectedNoteOption("");
        setStartDate("");
        setEndDate("");
        setFilterinsecLand(filterToFilter);
    }

    let handleDateFilter = () => {
        let filteredData;
        if (!startDate && !endDate) {
            setFilterinsecLand(allData);
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
        setSelectedInsecOption("");
        setSelectedNoteOption("");
        setSelectedLiterOption("");
        setFilterinsecLand(filteredData);
    }

 
    

    const excelFunction = async()=> {
        
        try{

            let response=await axios.post(insecticideLandApi.excelIsecticideLand(),{responseType: 'blob'});
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
            pageTitle="ilaç oygulama."    
            getCuttingLand={insecticideLandApi.getAllLand()}
            getAll={insecticideLandApi.getAllIsecticideLand()}
            setAllData={setAllData}
            getCuttingLandFetch={false}

            allData={allData}

            runUseEffect={runUseEffect}

            AddToLand={`/inseLand/addInsecticideLand`}
            AddToLandLabel="Ekleme"
            sortedfilterData={filterinsecLand}

            handleItemClick={handleItemClick}
            setIsDrop={setIsDrop}
            isDrop={isDrop}
            activeItem={activeItem}
            
            //filter
            filter={false}
            setFilter={setFilterinsecLand}
            handleLandSelectedChange={handleLandselectedOption}
            handleInsecSelectedChange={handleInsecSelectedChange}
            handleNoteSelectedChange={handleNoteSelectedChange}
            handleLiterSelectedChange={handleLiterSelectedChange}
            handleDateFilter={handleDateFilter}
            
            setSelectedLandOption={setSelectedLandOption}
            setSelectedInsecOption={setSelectedInsecOption}
            setSelectedNoteOption={setSelectedNoteOption}
            setSelectedLiterOption={setSelectedLiterOption}
            setStartDate={setStartDate}
            setEndDate={setEndDate}

            selectedNoteOption={selectedNoteOption}
            selectedLandOption={selectedLandOption}
            selectedInsecOption={selectedInsecOption}
            selectedLiterOption={selectedLiterOption}
            startDate={startDate}
            endDate={endDate}
            
            insecLand={false}
            DateFilter={false}
            pagination={false}

            //delete
            deleteConfirmation={deleteConfirmation}
            cancelDelete={cancelDelete}
            deleteFunction={deleteFunction}
            showDeletemessage={showDeletemessage}
            handleDelete={handleDelete}

            //excel
            insecExcel={false}
            fileName={excelFile}
            setFileName={setExcelFile}
            handlePrint={handlePrint}
            printConfirmation={printConfirmation}
            cancelPrint={cancelPrint}
            excelFunction={excelFunction}
            showDonemessage={showDonemessage}
            buttonDisable={buttonDisable}
        />
    );
}