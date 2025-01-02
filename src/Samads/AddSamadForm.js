import { useState } from 'react';

import AddForm from '../Components/Forms/AddForm';
export default function AddSamadForm(){

    // multiple environment

    let isDev=process.env.NODE_ENV === 'development';
    const addSamadApi = isDev? {

        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        addSamad:()=>{return (`${addSamadApi.baseUrl}/Add`)} 
        
      }:{
        baseUrl: process.env.REACT_APP_API_FERTILIZER_URL,
        addSamad:()=>{return (`${addSamadApi.baseUrl}/Add`)} 
      }


    let [title,setTitle]=useState("");
    let [publicTitle,setpublicTitle]=useState("");
    let [npk,setNpk]=useState("");
    let [description,setDescription]=useState("");

    return(

            <AddForm
                url={(addSamadApi.addSamad())}
                data={{
                    NPK:npk,
                    Title:title,
                    PublicTitle:publicTitle,
                    Description:description}}
                inputSizeBox={true}
                inputTypeBox={true}
                inputNPKBox={false}
                inputDescription={false}
                
                direction="samads"
                TitleLabel="Bilimsel Adı:"
                bigLand={false}
                title={title}
                setTitle={setTitle}
                publicDetailsLabel="Ad:"
                publicDetails={publicTitle}
                setpublicDetails={setpublicTitle}
                descriptionLabel="Tanım:"
                description={description}
                setDescription={setDescription}
                NpkLabel="NPK:"
                Npk={npk}
                setNpk={setNpk}

                button="Ekleme" 
            />
    );
}