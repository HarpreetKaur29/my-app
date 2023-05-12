import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import TableScreen from './Screens/Table_Screen';
import FormScreen from './Screens/Form_Screen';
import ChartScreen from './Screens/Chart_Screen';


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<TableScreen/>}/>
        <Route path ='/form' element={<FormScreen/>}/>
        <Route path = '/chart' element={<ChartScreen/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
