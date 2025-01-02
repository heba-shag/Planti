
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./Components/Body Section/Body";
import SideBar from "./Components/SideBar section/SideBar";
import Lands from "./Lands/Lands";
import Samads from "./Samads/Samads";
import AddLandForm from "./Lands/AddLandForm";
import AddInnerForm from "./Lands/ChildLands/AddInnerForm";
import AddSamadForm from "./Samads/AddSamadForm";
import UpdateSamad from "./Samads/UpdateSamad";
import FertLand from "./Samads/FertLands/FertLand";
import FertLandForm from "./Samads/FertLands/FertLandForm";
import FLUpdateForm from "./Samads/FertLands/FLUpdateForm";
import Insecticide from "./Insecticide/Insecticide";
import AddInsecticideForm from "./Insecticide/AddInsecticideForm";
import UpdateInsecticide from "./Insecticide/UpdateInsecticide";
import InsecLands from "./Insecticide/InsecLands/InsecLands";
import InsecLandsForm from "./Insecticide/InsecLands/InsecLandsForm";
import InsecLandsUpdate from "./Insecticide/InsecLands/InsecLandsUpdate";
import Color from "./Cutting/Color/Color";
import AddColor from "./Cutting/Color/AddColor";
import UpdateColor from "./Cutting/Color/UpdateColor";
import Cutting from "./Cutting/Cutting";
import AddCutting from "./Cutting/AddCutting";
import UpdateCutting from "./Cutting/UpdateCutting";
import CuttingColor from "./Cutting/CuttingColor/CuttingColor";
import AddCuttingColor from "./Cutting/CuttingColor/AddCuttingColor";
import UpdateCuttingColor from "./Cutting/CuttingColor/UpdateCuttingColor";
import CuttingLand from "./Cutting/CuttingLand/CuttingLand";
import AddCuttingLand from "./Cutting/CuttingLand/AddCuttingLand";
import UpdateCuttingLand from "./Cutting/CuttingLand/UpdateCuttingLand";
import AddFlowers from "./Flowers/AddFlowers";
import Flowers from "./Flowers/Flowers";
import UpdateFlower from "./Flowers/UpdateFlowers";
import GrandChildrenLand from "./Lands/ChildLands/GrandChildLands/GrandChildrenLand";
import AddGrandChildLand from "./Lands/ChildLands/GrandChildLands/AddGrandChildLand";
import SmallestLand from "./Lands/ChildLands/GrandChildLands/SmallestLands/SmallestLands";
import InnerLands from "./Lands/ChildLands/InnerLands";
import AddSmallestLand from "./Lands/ChildLands/GrandChildLands/SmallestLands/AddSmallestLand";
import LandDetails from "./DetailsForms/LandDetails";
import FertDetails from "./DetailsForms/FertDetails";
import InsecDetails from "./DetailsForms/InsecDetails";
import CuttingColorDetails from "./DetailsForms/CuttingColorDetails";
import UpdateLand from "./Lands/UpdateLand";
import UpdateInnerLand from "./Lands/ChildLands/UpdateInnerLand";
import UpdateGrandChild from "./Lands/ChildLands/GrandChildLands/UpdateGrandChild";
import UpdateSmallestLand from "./Lands/ChildLands/GrandChildLands/SmallestLands/UpdateSmallestLand";
import DepotFlowers from "./Flowers/DepotFlowers";
import FlowerOrder from "./Orders/AddOrders/FlowerOrder";
import FlowerTableOrder from "./Orders/ShowOrders/FlowerTableorder";
import ShowClients from "./Orders/ShowOrders/ShowClients";
import AddClient from "./Orders/AddOrders/AddClient";
import AddFertMix from "./Samads/MixFerts/AddFertMix";
import ShowFertMix from "./Samads/MixFerts/ShowFertMix";
import UpdateFertMixes from "./Samads/MixFerts/UpdateFertMixes";
import InsecMixShow from "./Insecticide/InsecMix/InsecMixShow";
import AddInsecMix from "./Insecticide/InsecMix/AddInsecMix";
import UpdateInsectMix from "./Insecticide/InsecMix/UpdateInsecMix";
import AddInsecMixToLands from "./Insecticide/InsecMixToLand/AddInsecMixToLand";


export default function App() {
  console.log(process.env.NODE_ENV);
  return (
    <div className="container">
      <SideBar/>
      {/* <Body/> */}
      {/* <Lands/> */}
      <Routes>
        <Route path="/" element={<Body/>}/>
        {/* Quick Menu Items */}
        <Route path="/lands" element={<Lands/>}/>
        <Route path="/lands/addLandForm" element={<AddLandForm/>}/>
        <Route path="/lands/:id" element={<UpdateLand/>}/>
        <Route path="/lands/child/:id" element={<InnerLands/>}/>
        <Route path="/lands/child/addNewChild/:id" element={<AddInnerForm/>}/>
        <Route path="/lands/child/:id/updateChild/:id" element={<UpdateInnerLand/>}/>
        <Route path="/lands/child/:id/grandchild/:id" element={<GrandChildrenLand/>}/>
        <Route path="/lands/child/:id/grandchild/addNewGrandChild/:id" element={<AddGrandChildLand/>}/>
        <Route path="/lands/child/:id/grandchild/:id/updateGrandChild/:id" element={<UpdateGrandChild/>}/>
        <Route path="/lands/child/:id/grandchild/:id/pieceLand/:id" element={<SmallestLand/>}/>
        <Route path="/lands/child/:id/grandchild/:id/pieceLand/takeApiece/:id" element={<AddSmallestLand/>}/>
        <Route path="/lands/child/:id/grandchild/:id/pieceLand/:id/updateSmallestChild/:id" element={<UpdateSmallestLand/>}/>

        
        <Route path="/fertland/show-Fertilizer" element={<FertLand/>}/>
        <Route path="/fertland/samadLands" element={<FertLandForm/>}/>
        <Route path="/fertland/show-Fertilizer/:id" element={<FLUpdateForm/>}/>

        {/* new fertilizer mix */}
        <Route path="/fertilizer-mixes/show-fert-Mixes" element={<ShowFertMix/>}/>
        <Route path="/fertilizer-mixes/new-mix" element={<AddFertMix/>}/>
        <Route path="/fertilizer-mixes/show-fert-Mixes/:id" element={<UpdateFertMixes/>}/>

        {/* new insecticide mix land */}

        <Route path="/insecMixLand/show-mixToLand" element={<AddInsecMixToLands/>}/>
        
        {/* new insecticide mix */}
        <Route path="/insecticide-mixes/show-insec-Mixes" element={<InsecMixShow/>}/>
        <Route path="/insecticide-mixes/new-mix" element={<AddInsecMix/>}/>
        <Route path="/insecticide-mixes/show-insec-Mixes/:id" element={<UpdateInsectMix/>}/>


        <Route path="/inseLand/show-insecticide" element={<InsecLands/>} />
        <Route path="/inseLand/addInsecticideLand" element={<InsecLandsForm/>} />
        <Route path="/inseLand/show-insecticide/:id" element={<InsecLandsUpdate/>} />

        <Route path="/cuttingLand" element={<CuttingLand/>} />
        <Route path="/cuttingLand/addCuttingLand" element={<AddCuttingLand/>} />
        <Route path="/cuttingLand/:id" element={<UpdateCuttingLand/>} />



        {/* Products Menu */}
        <Route path="/samads" element={<Samads/>}/>
        <Route path="/samads/addsamad" element={<AddSamadForm/>}/>
        <Route path="/samads/:id" element={<UpdateSamad/>}/>
        <Route path="/insecticide" element={<Insecticide/>}/>
        <Route path="/insecticide/addInsecticide" element={<AddInsecticideForm/>}/>
        <Route path="/insecticide/:id" element={<UpdateInsecticide/>}/>
        <Route path="/color" element={<Color/>}/>
        <Route path="/color/addColor" element={<AddColor/>} />
        <Route path="/color/:id" element={<UpdateColor/>} />
        <Route path="/cutting" element={<Cutting/>}/>
        <Route path="/cutting/addCutting" element={<AddCutting/>} />
        <Route path="/cutting/:id" element={<UpdateCutting/>} /> 
        <Route path="/cutting/cuttingcolor/:id" element={<CuttingColor/>} /> 
        <Route path="cutting/cuttingcolor/addCuttingColor/:id"  element={<AddCuttingColor/>}/>  
        <Route path="/cutting/cuttingcolor/:id/:id" element={<UpdateCuttingColor/>} />
        <Route path="/flowers" element={<Flowers/>}/> 
        <Route path="/flowers/addFlowers" element={<AddFlowers/>}/> 
        <Route path="/flowers/:id" element={<UpdateFlower/>}/> 
        <Route path="/flowers/flowers-depot" element={<DepotFlowers/>}/>

        {/* details */}
        <Route path="/land-details-page/:id" element={<LandDetails/>}/>
        <Route path="/fertilize-details-page/:id" element={<FertDetails/>}/>
        <Route path="/insecticide-details-page/:id" element={<InsecDetails/>}/>
        <Route path="/cuttingColor-details-page/:id" element={<CuttingColorDetails/>}/>

        {/* orders */}
        <Route path="/clients" element={<ShowClients/>}/>
        <Route path="/clients/addNewClient" element={<AddClient/>}/>
        <Route path="/flowerOreders" element={<FlowerTableOrder/>}/>
        <Route path="/flowerOreders/OrderNewFlowers" element={<FlowerOrder/>}/>

      </Routes>
  
    </div>
  );
}


