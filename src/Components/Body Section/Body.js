import React from 'react';
import './body.css';
import Top from './Top Section/Top'; 
import Listing from './Listing Section/Listing';
import Activity from './Activity Section/Activity';
import { Outlet } from 'react-router-dom';



export default function Body(){
    return(
        <div className='mainContent'>
            
            <Top/>
            <div className='bottom flex'>
                
                <Listing/>
                <Activity/>

            </div>
        </div>
    );
}