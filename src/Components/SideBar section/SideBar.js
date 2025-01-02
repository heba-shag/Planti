import React, { useState } from 'react';
import './sidebar.css';

//imporetsd images 
import logo from "../../Assets/leaf.png";

//imported icons
import { IoIosColorPalette, IoMdSpeedometer } from "react-icons/io";
import { MdAgriculture,  MdLandslide} from "react-icons/md";
import { BsEye} from "react-icons/bs";
import {  NavLink } from 'react-router-dom';
import { FaCaretDown, FaCaretUp, FaSprayCan } from 'react-icons/fa';
import { IoFlowerSharp } from 'react-icons/io5';
import { GiFertilizerBag, GiMedicinePills } from 'react-icons/gi';
import { FaCartFlatbed, FaPlantWilt, FaSunPlantWilt } from 'react-icons/fa6';
import { CgAdd, CgDetailsLess } from 'react-icons/cg';
import { LuWarehouse } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { RxMixerVertical } from "react-icons/rx";

export default function SideBar(){
    const [activeItem, setActiveItem] = useState("");
    const [innerActiveItem, setInnerActiveItem] = useState("");
    let  [isDrop, setIsDrop] = useState(false); 
  const handleItemClick = (itemIndex) => {
    setActiveItem(itemIndex );
    setIsDrop(true);
  };
  const handleInnerItemClick = (itemIndex) => {
    setInnerActiveItem(itemIndex );
    setIsDrop(true);
  };
  
    return(
        <div className='sideBar grid'>

            <div className='logoDiv flex'>
                <img src={logo} alt='Image Name'/>
                <h2>Planti.</h2> 
            </div>

            <div className='menuDiv'>
                <h3 className='divTitle'>
                    QUICK MENU
                </h3>

                <ul className='menuLists grid'>

                    <li className='listItem' onClick={()=>handleItemClick(10)}>
                        <NavLink activeClassName="active"  to='/' className='menuLink flex' style={{color:activeItem===10?"#528e25":"#bebebe"}}> 
                            <IoMdSpeedometer className='icon' />
                            <span className='smallText'>
                                Dashboard
                            </span>
                        </NavLink>
   
                    </li>

                    <li className='listItem' onClick={()=>handleItemClick(0)}>
                        <NavLink className='menuLink flex' style={{color:activeItem===0?"#528e25":"#bebebe"}}> 
                            <MdLandslide  className='icon' />
                            <span className='smallText' >
                                Tarlalar  
                            </span>
                            {activeItem===0 ?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===0 && (
                            <ul>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to='/lands' className='menuLink flex' > 
                                <BsEye className='icon'/>
                                    <span className='smallText'>
                                        göster
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem'>
                                <NavLink activeClassName="active"  to='/lands/addLandForm' className='menuLink flex' > 
                                < CgAdd className='icon'/>
                                    <span className='smallText'>
                                        Ekleme
                                    </span>
                                </NavLink>
                            </li>
                            </ul>

                        )}

                    </li>

                    <li className='listItem' onClick={()=>handleItemClick(1)}>
                        <NavLink style={{color:activeItem===1?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <FaSprayCan  className='icon' />
                            <span className='smallText'>
                                ilaç oygulama
                            </span>
                            {activeItem===1?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===1 && (
                        
                            <ul>

                                <li className='listItem'  onClick={()=>handleInnerItemClick(1)}>
                                    <NavLink style={{color:innerActiveItem===1?"#528e25":"#bebebe"}} className='menuLink flex'> 
                                        <CgDetailsLess  className='icon' />
                                        <span className='smallText'>
                                            Mix Tarlala
                                        </span>
                                        {innerActiveItem===1?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                                    </NavLink>
                                    {innerActiveItem===1  && (

                                        <ul>
                                            <li className='inner-listItem' >
                                                <NavLink activeClassName="active"  to='/insecMixLand/show-mixToLand' className='menuLink flex' >  
                                                <BsEye className='icon'/>
                                                    <span className='smallText'>
                                                        göster
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className='inner-listItem' >
                                                <NavLink activeClassName="active"  to="/inseLand/addInsecticideLand" className='menuLink flex' >  
                                                < CgAdd className='icon'/>
                                                    <span className='smallText'>
                                                        Ekleme
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                        )
                                    }
                                </li>
                                <li className='listItem'  onClick={()=>handleInnerItemClick(2)}>
                                    <NavLink style={{color:innerActiveItem===2?"#528e25":"#bebebe"}} className='menuLink flex'> 
                                        <CgDetailsLess  className='icon' />
                                        <span className='smallText'>
                                            ilaç
                                        </span>
                                        {innerActiveItem===2?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                                    </NavLink>
                                    {innerActiveItem===2  && (

                                        <ul>
                                            <li className='inner-listItem' >
                                                <NavLink activeClassName="active"  to='/inseLand/show-insecticide' className='menuLink flex' >  
                                                <BsEye className='icon'/>
                                                    <span className='smallText'>
                                                        göster
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className='inner-listItem' >
                                                <NavLink activeClassName="active"  to="/inseLand/addInsecticideLand" className='menuLink flex' >  
                                                < CgAdd className='icon'/>
                                                    <span className='smallText'>
                                                        Ekleme
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                        )
                                    }
                                </li>

                                <li className='listItem'  onClick={()=>handleInnerItemClick(3)}>
                                <NavLink style={{color:innerActiveItem===3?"#528e25":"#bebebe"}} className='menuLink flex'> 
                                    <RxMixerVertical  className='icon' />
                                    <span className='smallText'>
                                    Mixes
                                    </span>
                                    {innerActiveItem===3?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                                </NavLink>
                                {innerActiveItem===3 && (
                                    <ul>
                                        <li className='inner-listItem' >
                                            <NavLink activeClassName="active"  to="/insecticide-mixes/show-insec-Mixes" className='menuLink flex' >  
                                            < BsEye className='icon'/>
                                                <span className='smallText'>
                                                    Show Mixes
                                                </span>
                                            </NavLink>
                                        </li>
                                        <li className='inner-listItem' >
                                            <NavLink activeClassName="active"  to="/insecticide-mixes/new-mix" className='menuLink flex' >  
                                            < CgAdd className='icon'/>
                                                <span className='smallText'>
                                                    New Mix
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                    )
                                }
                                </li>
                            </ul>                            

                        )}
                    </li>

                    <li className='listItem'  onClick={()=>handleItemClick(2)}>
                        <NavLink style={{color:activeItem===2?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <MdAgriculture  className='icon' />
                            <span className='smallText'>
                                Gübre oygulama
                            </span>
                            {activeItem===2?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===2  && (
                            <ul>
                                <li className='listItem'  onClick={()=>handleInnerItemClick(5)}>
                                    <NavLink style={{color:innerActiveItem===5?"#528e25":"#bebebe"}} className='menuLink flex'> 
                                        <CgDetailsLess  className='icon' />
                                        <span className='smallText'>
                                            Gübre
                                        </span>
                                        {innerActiveItem===5?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                                    </NavLink>
                                    {innerActiveItem===5  && (

                                        <ul>
                                            <li className='inner-listItem' >
                                                <NavLink activeClassName="active"  to='/fertland/show-Fertilizer' className='menuLink flex' >  
                                                <BsEye className='icon'/>
                                                    <span className='smallText'>
                                                        göster
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li className='inner-listItem' >
                                                <NavLink activeClassName="active"  to="/fertland/samadLands" className='menuLink flex' >  
                                                < CgAdd className='icon'/>
                                                    <span className='smallText'>
                                                        Ekleme
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                        )
                                    }
                                </li>

                                <li className='listItem'  onClick={()=>handleInnerItemClick(6)}>
                                <NavLink style={{color:innerActiveItem===6?"#528e25":"#bebebe"}} className='menuLink flex'> 
                                    <RxMixerVertical  className='icon' />
                                    <span className='smallText'>
                                    Mixes
                                    </span>
                                    {innerActiveItem===6?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                                </NavLink>
                                {innerActiveItem===6 && (
                                    <ul>
                                        <li className='inner-listItem' >
                                            <NavLink activeClassName="active"  to="/fertilizer-mixes/show-fert-Mixes" className='menuLink flex' >  
                                            < BsEye className='icon'/>
                                                <span className='smallText'>
                                                    Show Mixes
                                                </span>
                                            </NavLink>
                                        </li>
                                        <li className='inner-listItem' >
                                            <NavLink activeClassName="active"  to="/fertilizer-mixes/new-mix" className='menuLink flex' >  
                                            < CgAdd className='icon'/>
                                                <span className='smallText'>
                                                    New Mix
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                    )
                                }
                                </li>
                            </ul>

                        )}
                    </li>

                    <li className='listItem' onClick={()=>handleItemClick(3)}>
                        <NavLink style={{color:activeItem===3?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <FaSunPlantWilt  className='icon' />
                            <span className='smallText'>
                                Dikildi Tarlalar
                            </span>
                            {activeItem===3?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===3 && (
                            <ul>
                            <li className='inner-listItem'>
                                <NavLink activeClassName="active"  to='/cuttingLand' className='menuLink flex' >  
                                <BsEye className='icon'/>
                                    <span className='smallText'>
                                        göster
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem'>
                                <NavLink activeClassName="active"  to="/cuttingLand/addCuttingLand" className='menuLink flex' >  
                                < CgAdd className='icon'/>
                                    <span className='smallText'>
                                        Ekleme
                                    </span>
                                </NavLink>
                            </li>
                            </ul>

                        )}
                    </li>

                </ul>
            </div>

            <div className='settigsDiv'>
                <h3 className='divTitle'>
                    Ürünler
                </h3>

                <ul className='menuLists grid'>

                    <li className='listItem' onClick={()=>handleItemClick(4)}>
                        <NavLink style={{color:activeItem===4?"#528e25":"#bebebe"}} className='menuLink flex'> 

                            <GiMedicinePills  className='icon' />
                            <span className='smallText'>
                                ilaç
                            </span>
                            {activeItem===4?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===4 && (
                            <ul>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to='/insecticide' className='menuLink flex' >  
                                <BsEye className='icon'/>
                                    <span className='smallText'>
                                       göster
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to="/insecticide/addInsecticide" className='menuLink flex' >  
                                < CgAdd className='icon'/>
                                    <span className='smallText'>
                                        Ekleme
                                    </span>
                                </NavLink>
                            </li>
                            </ul>
                        )}
                    </li>


                    <li className='listItem' onClick={()=>handleItemClick(5)}>
                        <NavLink style={{color:activeItem===5?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <GiFertilizerBag  className='icon' />
                            <span className='smallText'>
                                Gübre 
                            </span>
                            {activeItem===5?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===5  && (
                            <ul>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to='/samads' className='menuLink flex' >  
                                <BsEye className='icon'/>
                                    <span className='smallText'>
                                        göster
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem'>
                                <NavLink activeClassName="active"  to="/samads/addsamad" className='menuLink flex' >  
                                < CgAdd className='icon'/>
                                    <span className='smallText'>
                                        Ekleme
                                    </span>
                                </NavLink>
                            </li>
                            </ul>
                        )}
                    </li>

                    <li className='listItem' onClick={()=>handleItemClick(6)}>
                        <NavLink style={{color:activeItem===6?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <IoIosColorPalette  className='icon' />
                            <span className='smallText'>
                                Renkler 
                            </span>
                            {activeItem===6?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===6 && (
                            <ul>
                            <li className='inner-listItem'>
                                <NavLink activeClassName="active"  to='/color' className='menuLink flex' >  
                                <BsEye className='icon'/>
                                    <span className='smallText'>
                                        göster
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to="/color/addColor" className='menuLink flex' >  
                                < CgAdd className='icon'/>
                                    <span className='smallText'>
                                        Ekleme
                                    </span>
                                </NavLink>
                            </li>
                            </ul>
                        )}
                    </li>

                    <li className='listItem' onClick={()=>handleItemClick(7)}>
                        <NavLink style={{color:activeItem===7?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <FaPlantWilt  className='icon' />
                            <span className='smallText'>
                                Fide 
                            </span>
                            {activeItem===7?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===7 && (
                            <ul>
                            <li className='inner-listItem'>
                                <NavLink activeClassName="active"  to='/cutting' className='menuLink flex' >  
                                <BsEye className='icon'/>
                                    <span className='smallText'>
                                        göster
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem'>
                                <NavLink activeClassName="active"  to="/cutting/addCutting" className='menuLink flex' >  
                                < CgAdd className='icon'/>
                                    <span className='smallText'>
                                        Ekleme
                                    </span>
                                </NavLink>
                            </li>
                            </ul>
                        )}
                    </li>

                    <li className='listItem' onClick={()=>handleItemClick(8)}>
                        <NavLink style={{color:activeItem===8?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <IoFlowerSharp  className='icon' />
                            <span className='smallText'>
                                Çiçek 
                            </span>
                            {activeItem===8?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===8  && (
                            <ul>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to='/flowers' className='menuLink flex' >  
                                <BsEye className='icon'/>
                                    <span className='smallText'>
                                        göster
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to="/flowers/addFlowers" className='menuLink flex' >  
                                < CgAdd className='icon'/>
                                    <span className='smallText'>
                                        Ekleme 
                                    </span>
                                </NavLink>
                            </li>
                            <li className='inner-listItem' >
                                <NavLink activeClassName="active"  to="/flowers/flowers-depot" className='menuLink flex' >  
                                < LuWarehouse  className='icon'/>
                                    <span className='smallText'>
                                        Depot 
                                    </span>
                                </NavLink>
                            </li>
                            </ul>
                        )}
                    </li>

                </ul>
            </div>

            <div className='settigsDiv'>
                <h3 className='divTitle'>
                    Orders
                </h3>
                <ul className='menuLists grid'>
                    <li className='listItem' onClick={()=>handleItemClick(9)}>
                        <NavLink style={{color:activeItem===9?"#528e25":"#bebebe"}} className='menuLink flex'> 
                            <FaUsers  className='icon' />
                            <span className='smallText'>
                                Clients
                            </span>
                            {activeItem===9?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                        </NavLink>
                        {activeItem===9  && (
                            <ul>
                                <li className='inner-listItem' >
                                    <NavLink activeClassName="active"  to='/clients' className='menuLink flex' >  
                                    <BsEye className='icon'/>
                                        <span className='smallText'>
                                            göster
                                        </span>
                                    </NavLink>
                                </li>
                                <li className='inner-listItem' >
                                    <NavLink activeClassName="active"  to="/clients/addNewClient" className='menuLink flex' >  
                                    < FaCartFlatbed className='icon'/>
                                        <span className='smallText'>
                                            Order Ekleme 
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className='listItem' onClick={()=>handleItemClick(10)}>
                            <NavLink style={{color:activeItem===10?"#528e25":"#bebebe"}} className='menuLink flex'> 
                                <IoFlowerSharp  className='icon' />
                                <span className='smallText'>
                                    Çiçek Order
                                </span>
                                {activeItem===10?<FaCaretUp className='icon'/>:<FaCaretDown className='icon'/>}
                            </NavLink>
                            {activeItem===10  && (
                                <ul>
                                    <li className='inner-listItem' >
                                        <NavLink activeClassName="active"  to='/flowerOreders' className='menuLink flex' >  
                                        <BsEye className='icon'/>
                                            <span className='smallText'>
                                                göster
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className='inner-listItem' >
                                        <NavLink activeClassName="active"  to="/flowerOreders/OrderNewFlowers" className='menuLink flex' >  
                                        < FaCartFlatbed className='icon'/>
                                            <span className='smallText'>
                                                Order Ekleme 
                                            </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
            </div>
        </div>
    );
}