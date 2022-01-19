import Nav from './component/nav';
import Staff from './component/staff';
import './App.css';
import Purchase from './component/purchase';
import Stock from './component/stock';
import Sale from './component/sale';
import Transaction from './component/transaction';
import { useEffect, useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Producer from './component/producer';
import Consumer from './component/consumer';
import Home from './component/home';
import Login from './component/login';
import {
  BrowserRouter as Router,
  Routes,
  Route ,Navigate
} from 'react-router-dom';

function App() {



const getuser=()=>{
  console.log("gggg")
  let storage=window.localStorage;
  console.log("hhhhh"+storage.getItem('loginpassword'))
  if(storage.getItem('loginpassword')){
    return true;
  }else{
  return false
}
}

  return (
    <div >
    
       <Router>
  
  <Routes>
   
    <Route exact path="/" element= {<Home />} />
{console.log("lllll")}
    <Route path="/login" element= { <Login />} />


  </Routes>

</Router>
      <ToastContainer />
    </div>
  );
}

export default App;
