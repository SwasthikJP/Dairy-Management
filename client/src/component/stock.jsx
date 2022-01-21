import {  useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import dateAndTime from 'date-and-time';

export default function Stock(props){

    const [table1data,settable1data]=useState([]);
    const [table2data,settable2data]=useState([]);
    let storage=window.localStorage;

    useEffect(()=>{
        gettable1data();
       
        },[]);
    
        const gettable1data=async()=>{
           
                await axios.post(`http://localhost:8000/stockdata`,{table:"STOCKS"})
            .then((res)=>{
                console.log(res.data);
                if(storage.getItem('loginusername')){
               gettable3data();
                }else{
                settable1data(res.data);
                }
                // settable1data(res.data);
                // if(storage.getItem('loginusername')) { gettable2data()};
            })
            .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data);
            }) 
            
        }
        

        const gettable3data=async()=>{
            await axios.post(`http://localhost:8000/tabledata`,{table:"STOCKS"})
            .then((res)=>{
                console.log(res.data);
                settable1data(res.data);
                 gettable2data();
            })
            .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data);
            })
        }
        const gettable2data=async()=>{
            await axios.post('http://localhost:8000/tabledata',{table:"MANAGES"})
            .then((res)=>{
                console.log(res.data);
                settable2data(res.data);
            })
            .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data);
            })
        }
    
    return <div id="staff">
        <h2>Stock of milk</h2>
        <table>
            <thead>
            <tr>
                <th>STOCK ID</th>
                <th>MILKTYPE</th>
                <th>CURRENT QUANTITY</th>
                <th>MAX QUANTITY</th>
                <th>DATE</th>
            </tr>
           </thead>
           <tbody>
           {table1data.length!==0 &&
            table1data.map((ele,index)=>{
                return <tr key={index} >
                <td>
                    {ele.STID}
                </td>
                <td>
                    {ele.MILKTYPE}
                </td>
                <td>
                    {ele.CURQUANTITY}
                </td>
                <td>
                    {ele.MAXQUANTITY}
                </td>
                <td>
                    {dateAndTime.format(new Date(ele.SDATE),'DD-MM-YYYY')}
                </td>
            </tr>
            })
            
           }
     </tbody>
        </table>
        { table1data.length==0 && <p style={{textAlign:'center'}}>No available data</p> }
       
        <hr />
        
        {storage.getItem('loginusername') &&    <h2>Staff transaction</h2>}
       {storage.getItem('loginusername') && <table>
            <thead>
            <tr>
                <th>STAFF ID</th>
                <th>STOCK ID</th>
                <th>TYPE</th>
            </tr>
         </thead>
         
         <tbody>
             
         {table2data.length!==0 &&
            table2data.map((ele,index)=>{
                return <tr key={index} >
                <td>
                    {ele.SID}
                </td>
                <td>
                    {ele.STID}
                </td>
                <td>
                    {ele.TYPE}
                </td>
            </tr>
            })
            
           }
         </tbody>
     
        </table>
}
{storage.getItem('loginusername') &&    table2data.length==0 && <p style={{textAlign:'center'}}>No available data</p> }
     
    </div>
}