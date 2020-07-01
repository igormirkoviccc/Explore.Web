import React from 'react';
import './App.css';
import {State} from './context/Auth';
import AppWithAuth from "./AppWithAuth";
import {BrowserRouter} from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <State>
                <AppWithAuth/>
            </State>
        </BrowserRouter>
    )
}

export default App;
