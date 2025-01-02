import { useState } from "react";
import AddtoLandForm from "../../Components/Forms/ToLand/AddtoLandForm";

export default function AddInsecMix(){
    let [insecticide,setInsecticide]=useState([]);
    let [selectedInsecticide, setSelectedInsecticide] = useState("");
    let [InsecticideName, setInsecticideName] = useState("");
    let [mixName,setMixName]=useState("");
    let [liter,setLiter]=useState("");
    let [color,setColor]=useState("");
    let [quantity,setQuantity]=useState(0);
    let [note,setNote]=useState("");
    let [mix,setMix]=useState([]);
    let [typeOption,setTypeOption]=useState(false);


    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const insecticideMixApi = isDev? {
        baseInsecticideUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllInsecticide:()=>{return (`${insecticideMixApi.baseInsecticideUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
        addNewInsecticideMix:()=>{return (`${insecticideMixApi.baseInsecticideUrl}/AddMix`)},

    }:{
        baseInsecticideUrl: process.env.REACT_APP_API_INSECTICIDE_URL,
        getAllInsecticide:()=>{return (`${insecticideMixApi.baseInsecticideUrl}/GetAll?pageSize=1000000000&pageNum=0`)},
        addNewInsecticideMix:()=>{return (`${insecticideMixApi.baseInsecticideUrl}/AddMix`)},
    }

    const handleInsecticideChange = (event) => {
        setSelectedInsecticide(event.target.value);
        const selectedType = event.target.options[event.target.selectedIndex].dataset.type;
        const selectedName = event.target.options[event.target.selectedIndex].dataset.name;
        setInsecticideName(selectedName);
        if(selectedType===1){
            setTypeOption(true);
        }else{
            setTypeOption(false);
        }
        
    }

    let handleColorChange=(event)=>{
        setColor(event.target.value);
    }
    return(
        <AddtoLandForm
            getAllurl={insecticideMixApi.getAllInsecticide()}
            set2data={false}
            setDatas={setInsecticide}
    
            Addurl={insecticideMixApi.addNewInsecticideMix()}
            AddedData={{title:mixName,
                note:note,
                color:parseInt(color),
                mixes:mix}}

            direction="/insecticide-mixes/show-insec-Mixes"
            
            newInsecMix={false}

            handleInsecticideChange={handleInsecticideChange}
            handleColorChange={handleColorChange}
            setLiter={setLiter}
            setNote={setNote}
            setPQuantity={setQuantity}
            InsecName={InsecticideName}
            insecticide={insecticide}
            selectedInsecticide={selectedInsecticide}
            setSelectedInsecticide={setSelectedInsecticide}
            liter={liter}
            note={note}
            powderquantity={quantity}
            typeOption={typeOption}
            setMix={setMix}
            mix={mix}
     
            

            mixName={mixName}
            setMixName={setMixName}
        />  
    )
}