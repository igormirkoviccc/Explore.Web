import React, {useState, Fragment} from 'react';
import '../../App.css';

export default function Session({initialData, id}) {


    const renderQuestion = () =>{
        if(initialData && initialData.length){
            return <div>Test</div>
        }else{
            return <div>No canvass current</div>
        }
    }

    return (
        <>
            {renderQuestion()}
        </>
    )
}

