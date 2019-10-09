//App-n component a, vory ete lini poqratar chi haskacvelu

//render()-y virtual DOMic real DOM texapoxoxn a

// componenty stanum a props (tvyal), veradarzdnum jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css'

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
         <App/> 
    </BrowserRouter>, 
document.getElementById('root'));