import Nav from './component/nav';
import Staff from './component/staff';
import './App.css';
import Purchase from './component/purchase';
import Stock from './component/stock';
import Sale from './component/sale';
import Transaction from './component/transaction';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

 const [curOption,setcurOption]=useState(0);

  return (
    <div >
      <Nav></Nav>
      <div className="main">
        <div className="navBar">
        <button className="navBut"   style={{boxShadow:curOption==0 ?"black 0px 0px 0px 2px":"none"}}  onClick={()=>setcurOption(0)}>Staff</button>  
        <button className="navBut"   style={{boxShadow:curOption==1 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(1)} >Purchase</button> 
         <button className="navBut"  style={{boxShadow:curOption==2 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(2)}>Stock</button> 
          <button className="navBut" style={{boxShadow:curOption==3 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(3)}>Sales</button> 
           <button className="navBut"style={{boxShadow:curOption==4 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(4)}>Transaction</button> 
         
        </div>

       {curOption==0 && <Staff></Staff>}
     {  curOption==1 && <Purchase></Purchase>}
        { curOption==2 && <Stock></Stock> }
        {curOption==3 && <Sale></Sale> }
        {curOption==4 && <Transaction></Transaction>}
       
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
