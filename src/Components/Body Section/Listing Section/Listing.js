import React from 'react';
import './listing.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';



//imported icons=====================>
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiDetail} from 'react-icons/bi'

//imported images===================>
import img1 from '../../../Assets/IMG-20221105-WA0000.jpg';
import img2 from '../../../Assets/IMG-20220804-WA0048.jpg';
import img3 from '../../../Assets/IMG-20220804-WA0046.jpg';

export default function Listing(){
    let [isPending,setIsPending]=useState(true);
    let [error,setError]=useState("");
    
    let [lands,setLands]=useState([]);

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const showLandApi = isDev? {

        baseUrl: process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${showLandApi.baseUrl}/GetAll`)},

    }:{
        baseUrl: process.env.REACT_APP_API_LAND_URL,
        getAllLand:()=>{return (`${showLandApi.baseUrl}/GetAll`)},

    }

    useEffect(()=>{
        fetch(showLandApi.getAllLand())
        .then((res)=>{
            if(!res.ok){
                throw Error("couldn't fetch data for that resource" );
            }
            return  res.json();
        })
        .then((data)=>{
            setLands(data)
            setIsPending(false);
            setError("");
        })
        .catch(err=>{
            setIsPending(false);
            setError(err.message);
            console.log(err)
        })
    },[]);

    const showLands=lands.slice(0,4).map((land,index)=>
        <tr key={index}>
            <td>{land.title}</td>
            <td>{land.size}</td>
            <td>{land.location}</td>
            <td ><Link to={`/lands/child/${land.id}`}> <BiDetail className="icon"/></Link></td>
        </tr>
    );
    return(
       
        <div className='listingSection'>
            {error&&<div>Hatalı</div>}
            {isPending&&<div>indir...</div>}
            <div className='heading flex'>
                <h1>My Listing</h1>
                <button className='btn flex'>
                Daha fazla göster<BsArrowRightShort className='icon'/>
                </button>
            </div>

            <div className='secContainer flex'>
                <div className='singleItem'>
                    <AiFillHeart className='icon'/>
                    <img src={img1} alt='Image Name'/>
                    <h3>Annual Vince </h3>
                </div>

                <div className='singleItem'>
                    <AiFillHeart className='icon'/>
                    <img src={img2} alt='Image Name'/>
                    <h3>Annual Vince </h3>
                </div>

                <div className='singleItem'>
                    <AiOutlineHeart className='icon'/>
                    <img src={img3} alt='Image Name'/>
                    <h3>Annual Vince </h3>
                </div>

            </div>


            {/* tables */}

            <div className='heading flex'>
                <h1>Tarlalar</h1>
                <Link to='/lands' className='btn flex'>
                Daha fazla göster <BsArrowRightShort className='icon'/>
                </Link>
            </div>

            <div className='tableContainer flex'>
                <table>
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Boyut</th>
                            <th>Konum</th>
                            <th>işlemler</th>
                        </tr>
                    </thead>

                    <tbody>
                    {showLands}
                    </tbody>
                </table>
            </div>
        </div>
    );
}