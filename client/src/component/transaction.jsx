import { useEffect,useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

export default function Transaction(props){
    const [tabledata,settabledata]=useState([]);

    useEffect(()=>{
        gettabledata();
        },[]);
    
        const gettabledata=async()=>{
            await axios.post('http://localhost:8000/transactiontabledata',{table:"STAFF"})
            .then((res)=>{
                console.log(res.data);
                settabledata(res.data);
            })
            .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data);
            })
        }
    
    return <div id="staff">
        <h2>Transaction</h2>
        <table>
        <thead>
            <tr>
                {/* <th>TRANSACTION ID</th> */}
                <th>STAFF ID</th>
                <th>DATE</th>
                <th>TOTAL AMOUNT</th>
                <th>TYPE</th>
                {/* <th></th> */}
            </tr>
           </thead>
            <tbody>
            {tabledata.length!==0 &&
            tabledata.map((ele,index)=>{
         return   <tr key={index}>
               
                <td>
                    {ele.SID}
                </td>
                <td>
                {ele.PDATE || ele.BDATE}
                </td>
                <td>
                   {ele.TOTALAMOUNT}
                </td>
                <td>
                    sf
                </td>
               
                
            </tr>
            })}
           </tbody>
        </table>
        { tabledata.length==0 && <p style={{textAlign:'center'}}>No available data</p> }
       
    </div>
}