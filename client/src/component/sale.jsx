import '../css/purchase.css';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { useState,useEffect } from 'react';

import dateAndTime from 'date-and-time';

export default function Sale(props){

    let storage=window.localStorage;
    const [sid,setsid]=useState(()=>{
        return storage.getItem('loginsid')||""
    });
    const [cid,setcid]=useState("");
    const [quantity,setquantity]=useState("");
    const [rate,setrate]=useState("");
    const [amount,setamount]=useState("");
    const [milktype,setmilktype]=useState("COW");
    const [date,setdate]=useState(new Date().toDateString());
    const [tabledata,settabledata]=useState([]);
    const [updatedata,setupdatedata]=useState(false);
    const [search,setsearch]=useState(false);
    const [dcvalue,setdcvalue]=useState("");
   const [stockdata,setstockdata]=useState([{CURQUANTITY:0,MAXQUANTITY:100},{CURQUANTITY:0,MAXQUANTITY:100}]);
  const [consumerdata,setconsumerdata]=useState([]);
    

    const [isstaff,setisstaff]=useState(()=>{
        console.log("hhhhh"+storage.getItem('loginsid'))
        if(storage.getItem('loginsid')==null){
          return false;
        }
        return true;
       })

    useEffect(()=>{
        gettabledata();
        getstockdata();
        getconsumerdata();
        },[]);
    
        const gettabledata=async()=>{
            await axios.post('http://localhost:8000/tabledata',{table:"BUYS",isstaff:isstaff,sid:storage.getItem('loginsid')||""})
            .then((res)=>{
                console.log(res.data);
                settabledata(res.data);
                setsid(storage.getItem('loginsid')||"")

            })
            .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data);
            })
        }

        const getconsumerdata=async()=>{
            await axios.post('http://localhost:8000/tabledata',{table:"CONSUMER"})
        .then((res)=>{
            console.log(res.data);
            setconsumerdata(res.data);
            if(res.data.length!=0){
            setcid(res.data[0].CID)
            }
        })
        .catch((err)=>{
            console.log(err.response.data);
            toast.error(err.response.data);
        })
        }


        const getstockdata=async()=>{
            await axios.post('http://localhost:8000/stockdata',{table:"STOCKS"})
            .then((res)=>{
                console.log(res.data);
                if(res.data.length!=0){
                setstockdata(res.data);
                }
            })
            .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data);
            })
        }

        const clearInput=(e)=>{
            e.preventDefault();
            setsid(storage.getItem('loginsid')||"");
            setcid(consumerdata.length!=0?consumerdata[0]['CID']:"");
            setquantity("");
            setrate("");
            setamount("");
            setmilktype("COW");
            setupdatedata(false);
        }

        const setupdate=(ele)=>{
            console.log("gg")
            setupdatedata(true);
            setsid(ele.SID);
            setcid(ele.CID);
            setdate(dateAndTime.format(new Date(ele.BDATE),'YYYY-MM-DD HH:mm:ss'));
            setquantity(ele.QUANTITY);
            setrate(ele.RATE);
            setamount(ele.TOTALAMOUNT);
            setmilktype(ele.MILKTYPE);
            setdcvalue(ele.QUANTITY);
        }

        const insertData=async(e)=>{
            e.preventDefault();
            console.log("hee");
            var data={
                sid,
                cid,
                quantity,rate,amount,milktype,date,dcvalue
            }
            console.log(`http://localhost:8000/${updatedata? "updatebuys": "insertbuys"}`)
           
            if(cid!==""){
            await axios.post(`http://localhost:8000/${updatedata? "updatebuys": "insertbuys"}`,data)
            .then((res)=>{
                console.log(res);
                 clearInput(e);
                gettabledata();
                getstockdata();
                toast.success(updatedata?`Updated ${res.data.changedRows} tuples`:"Successfully inserted tuple!")
            })
            .catch((err)=>{
             console.log(err.response.data);
             toast.error(err.response.data);
            })
        }
            else{
                toast.error("Please Add Customer!");
            }
           }
       
           const searchData=async(e)=>{
               e.preventDefault();
           
               console.log(date);
               var data={};
       
                   if(sid!==""){
                   data['SID']=sid;
                   }  
                   if(cid!==""){
                       data['CID']=cid
                   }
                   if(quantity!==""){
                       data['QUANTITY']=quantity
                   }
                   if(rate!==""){
                       data['RATE']=rate
                   }
                   if(amount!==""){
                       data['TOTALAMOUNT']=amount
                   }
                   if(date!==""){
                       data['BDATE']=dateAndTime.format(new Date(date),'YYYY-MM-DD HH:mm:ss');
                       
                   }
                   console.log(dateAndTime.format(new Date(date),'YYYY-MM-DD HH:mm:ss'))

                   data['MILKTYPE']=milktype;
       
               console.log(`http://localhost:8000/searchbuys`)
               await axios.post(`http://localhost:8000/searchbuys`,data)
               .then((res)=>{
                   console.log(res);
                    settabledata(res.data);
                    toast.success(`${res.data.length} results found`)
               })
               .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data);
               })
              }
       
           const deletedata=async(ele)=>{
               await axios.post(`http://localhost:8000/deletebuys`,ele)
               .then((res)=>{
                   console.log(res);
                   gettabledata();
                   getstockdata();
                   toast.success("Deleted 1 tuple!")
               })
               .catch((err)=>{
                   console.log(err.response.data);
                   toast.error(err.response.data);
               })
           }
    
    return <div id="staff">
        <h2>Selling Of Milk</h2>
        <form onSubmit={(e)=>search? searchData(e):insertData(e)}>
            <div className="formdiv">
            <div className="col1">
            <label htmlFor="date">DATE {search? <input  type="datetime-local" name="date" id="date" value={date} onChange={(e)=>{setdate(e.target.value)}}/>: <input disabled type="text" name="date" id="date" value={date} onChange={(e)=>{setdate(e.target.value)}}/>}</label>
            <label htmlFor="sid">STAFF ID {search? <input  type="text" id="sid" value={sid} onChange={(e)=>{setsid(e.target.value)}} />:<input required disabled={isstaff} type="text" id="sid" value={sid} onChange={(e)=>{setsid(e.target.value)}} /> 
        }</label>
            <label htmlFor="pName">CONSUMER ID {search? <input  minLength={3} type="text" id="pName" value={cid} onChange={(e)=>{setcid(e.target.value)}} />:
            //  <input required minLength={3} type="text" id="pName" value={cid} onChange={(e)=>{setcid(e.target.value)}} /> 
            <select required  disabled={consumerdata.length==0} name="producer id" id="milktype" value={cid} onChange={(e)=>{setcid(e.target.value)}}>
            {consumerdata.length!=0? consumerdata.map((ele,index)=>{
                return <option key={index} value={ele.CID}>{ele.CID}</option>
            }):<option value="">NO CONSUMERS EXIST</option>
        }
        </select>
        }</label>
            </div>
            <div className="col2">
            <label htmlFor="quantity">QUANTITY (Litre)  {search? <input  type="number" name="quantity" id="quantity" value={quantity} onChange={(e)=>{setquantity(e.target.value);setamount(rate*e.target.value)}}/>: 
            
            <input   required type="number" min={0} step={0} 
         max={updatedata?null:milktype==="COW"?stockdata[0]['CURQUANTITY']==0?null:stockdata[0]['CURQUANTITY']:stockdata[1]['CURQUANTITY']==0?null:stockdata[1].CURQUANTITY}
            name="quantity" id="quantity" value={quantity} onChange={(e)=>{setquantity(e.target.value);setamount(rate*e.target.value)}}/> }</label>
            <label htmlFor="milktype">MILKTYPE   <select  name="milktype" id="milktype" value={milktype} onChange={(e)=>{setmilktype(e.target.value)}}>
                <option value="COW">Cow</option>
                <option value="BUFFALO">Buffalo</option></select></label>
           
                </div>
              <div className="col3">
     
           
            <label htmlFor="rate">RATE  {search? <input type="number" name="rate" id="rate" value={rate} onChange={(e)=>{setrate(e.target.value);setamount(quantity*e.target.value);}}/>: <input required type="number" name="rate" id="rate" value={rate} onChange={(e)=>{setrate(e.target.value);setamount(quantity*e.target.value);}}/>}</label>
            <label htmlFor="amount">AMOUNT {search? <input  type="number" name="amount" id="amount" value={amount} onChange={(e)=>{setamount(e.target.value)}}/>: <input required type="number" name="amount" id="amount" value={amount} onChange={(e)=>{setamount(e.target.value)}}/>}</label>
               


              </div>
              
                </div>
                <div className="group">
                <button type="submit">{search? "SEARCH" : updatedata? "UPDATE": "ADD"}</button>
                <button onClick={(e)=>clearInput(e)}>CLEAR</button>
                <label htmlFor="search"><input value={search} onChange={()=>{setsearch((prev)=>
                    {if(prev){setdate(new Date().toDateString())}else{setdate("");}return !prev;});gettabledata();setcid(consumerdata.length!=0?consumerdata[0]['CID']:"");}} 
                     type="checkbox" name="search" id="search" />  Check Here To Search</label>
                </div>
        </form>
        <hr />
        <table>
            <thead>
            <tr>
                <th>CID</th>
                <th>STAFF ID</th>
                <th>DATE</th>
                <th>MILKTYPE</th>
                <th>QUANTITY</th>
                <th>RATE</th>
                <th>TOTAL AMOUNT</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
            {tabledata.length!==0 &&
            tabledata.map((ele,index)=>{
                return <tr key={index} onDoubleClick={()=>setupdate(ele)}>
                     <td>
                    {ele.CID}
                </td>
                <td>
                    {ele.SID}
                </td>
                <td>
                    { dateAndTime.format(new Date(ele.BDATE),'YYYY-MM-DD HH:mm:ss')}
                </td>
                <td>
                    {ele.MILKTYPE}
                </td>
                <td>
                    {ele.QUANTITY}
                </td>
                <td>
                    {ele.RATE}
                </td>
                <td>
                    {ele.TOTALAMOUNT}
                </td>
               
                <td>
                    <button className="deleteBut" onClick={()=>deletedata(ele)} >Delete</button>
                </td>
            </tr>
            })
            
           }
           </tbody>
     
        </table>
        { tabledata.length==0 && <p style={{textAlign:'center'}}>No available data</p>}
    </div>
}