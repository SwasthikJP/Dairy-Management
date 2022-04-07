import Nav from './nav';
import Staff from './staff';
import Purchase from './purchase';
import Stock from './stock';
import Sale from './sale';
import Transaction from './transaction';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Producer from './producer';
import Consumer from './consumer';
import Login from './login';
import { Navigate } from 'react-router-dom';

export default function Home(props){

 const [curOption,setcurOption]=useState(0);
 let storage=window.localStorage;
 const [user,setuser]=useState(()=>{
    console.log("hhhhh"+storage.getItem('loginpassword'))
    if(storage.getItem('loginpassword')){
      return true;
    }
    return false;
  });
const [isadmin,setisadmin]=useState(()=>{
    console.log("hhhhh"+storage.getItem('loginsid'))
    if(storage.getItem('loginsid')){
      return false;
    }
    return true;
  });

  if(!user){
return <Navigate to="/login"/>
  }

    return  <div >
    <Nav logout={true}></Nav>
    {isadmin?
    <div className="main">
      <div className="navBar">
      <button className="navBut"   style={{boxShadow:curOption==0 ?"black 0px 0px 0px 2px":"none"}}  onClick={()=>setcurOption(0)}>Staff</button> 
      <button className="navBut"   style={{boxShadow:curOption==1 ?"black 0px 0px 0px 2px":"none"}}  onClick={()=>setcurOption(1)}>Producer</button>  
      <button className="navBut"   style={{boxShadow:curOption==2 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(2)} >Buy</button> 
       <button className="navBut"  style={{boxShadow:curOption==3 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(3)}>Stock</button> 
       <button className="navBut"style={{boxShadow:curOption==4 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(4)}>Consumer</button> 
        <button className="navBut" style={{boxShadow:curOption==5 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(5)}>Sell</button> 
        
      </div>

     {curOption==0 && <Staff></Staff>}
     {curOption==1 && <Producer />}
   {  curOption==2 && <Purchase></Purchase>}
      { curOption==3 && <Stock></Stock> }
      {curOption==4 && <Consumer />}
      {curOption==5 && <Sale></Sale> }
      {curOption==6 && <Transaction></Transaction>}
     
    </div>
    : <div className="main">
    <div className="navBar">
    <button className="navBut"   style={{boxShadow:curOption==0 ?"black 0px 0px 0px 2px":"none"}}  onClick={()=>setcurOption(0)}>Producer</button>  
    <button className="navBut"   style={{boxShadow:curOption==1 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(1)} >Buy</button> 
     <button className="navBut"  style={{boxShadow:curOption==2 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(2)}>Stock</button> 
     <button className="navBut"style={{boxShadow:curOption==3 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(3)}>Customer</button> 
      <button className="navBut" style={{boxShadow:curOption==4 ?"black 0px 0px 0px 2px":"none"}} onClick={()=>setcurOption(4)}>Sell</button> 
    </div>

   {curOption==0 && <Producer />}
 {  curOption==1 && <Purchase></Purchase>}
    { curOption==2 && <Stock></Stock> }
    {curOption==3 && <Consumer />}
    {curOption==4 && <Sale></Sale> }
    {curOption==5 && <Transaction></Transaction>}
   
  </div>
}
    </div>
}