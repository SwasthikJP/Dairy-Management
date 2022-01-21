

import {  useEffect, useState } from "react";
import axios from "axios";
import {toast } from "react-toastify";

export default function Consumer(props){

    const [cid,setcid]=useState("");
    const [cname,setcname]=useState("");
    const [address,setaddress]=useState("");
    const [contact,setcontact]=useState("");
    const [tabledata,settabledata]=useState([]);
    const [updatedata,setupdatedata]=useState(false);
    const [search,setsearch]=useState(false);

    useEffect(()=>{
    gettabledata();
    },[]);

    const gettabledata=async()=>{
        await axios.post('http://localhost:8000/tabledata',{table:"CONSUMER"})
        .then((res)=>{
            console.log(res.data);
            settabledata(res.data);
        })
        .catch((err)=>{
            console.log(err.response.data);
            toast.error(err.response.data);
        })
    }

    const clearInput=(e)=>{
        e.preventDefault();
        setcid("");
        setcname("");
        setaddress("");
        setcontact("");
        setupdatedata(false);
    }

    const insertData=async(e)=>{
     e.preventDefault();
     console.log("hee");
     var data={
         cid,
         cname,
         address,
         contact
     }
     console.log(`http://localhost:8000/${updatedata? "updatestaff": "insertstaff"}`)
     await axios.post(`http://localhost:8000/${updatedata? "updateconsumer": "insertconsumer"}`,data)
     .then((res)=>{
         console.log(res);
          clearInput(e);
         gettabledata();
         toast.success(updatedata?`Updated ${res.data.changedRows} tuples`:"Successfully inserted tuple!")
     })
     .catch((err)=>{
      console.log(err.response.data);
      toast.error(err.response.data);
     })
    }

    const searchData=async(e)=>{
        e.preventDefault();
        console.log("hee");
        var data={};

            if(cid!==""){
            data['cid']=cid;
            }  
            if(cname!==""){
                data['cname']=cname
            }
            if(address!==""){
                data['address']=address
            } 
            if(contact!==""){
                data['contact']=contact
            }

        console.log(`http://localhost:8000/searchproducer`)
        await axios.post(`http://localhost:8000/searchconsumer`,data)
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
        await axios.post(`http://localhost:8000/deleteconsumer`,ele)
        .then((res)=>{
            console.log(res);
            gettabledata();
            toast.success("Deleted 1 tuple!")
        })
        .catch((err)=>{
            console.log(err.response.data);
            toast.error(err.response.data);
        })
    }

    const setupdate=(ele)=>{
        console.log("gg")
        setupdatedata(true);
        setcid(ele.CID);
        setcname(ele.CNAME);
        setaddress(ele.ADDRESS);
        setcontact(ele.CONTACT);
    }
    
    return <div id="staff">
        <h2>Add Customer details</h2>
        <form onSubmit={(e)=>search? searchData(e):insertData(e)}>
            <div className="formdiv">
            <div className="col1">
            <label htmlFor="sid">CID {search? <input type="text" id="sid" value={cid} onChange={(e)=>{setcid(e.target.value.toLocaleUpperCase())}} />: <input  required type="text" id="sid" value={cid} onChange={(e)=>{setcid(e.target.value.toLocaleUpperCase())}} />}</label>
            <label htmlFor="sname">PRODUCER NAME {search?<input minLength={3} type="text" id="sname" value={cname} onChange={(e)=>{setcname(e.target.value)}}></input>: <input required minLength={3} type="text" id="sname" value={cname} onChange={(e)=>{setcname(e.target.value)}} />}</label>
            </div>
            <div className="col2">
            <label htmlFor="sid">ADDRESS {search? <input minLength={5} type="text" id="sid" value={address} onChange={(e)=>{setaddress(e.target.value)}}></input>:<input required minLength={5} type="text" id="sid" value={address} onChange={(e)=>{setaddress(e.target.value)}} /> }</label>
            <label htmlFor="contact">CONTACT {search? <input title="valid mobile number(10 digits)"  pattern="^[6-9]\d{9}" type="tel" name="contact" id="contact"  value={contact} onChange={(e)=>{setcontact(e.target.value)}}/>: <input title="valid mobile number(10 digits)"  required pattern="^[6-9]\d{9}" type="tel" name="contact" id="contact"  value={contact} onChange={(e)=>{setcontact(e.target.value)}}/>}</label>
                </div>
                </div>
                <div className="group">
               
                <button type="submit">{search? "SEARCH" : updatedata? "UPDATE": "ADD"}</button>
               
                <button onClick={(e)=>clearInput(e)}>CLEAR</button>
                <label htmlFor="search">Toggle to Search results:<input value={search} onChange={()=>{setsearch((prev)=>!prev);gettabledata();}} type="checkbox" name="search" id="search" /></label>
                </div>
        </form>
        <hr />
        <table>
            <thead>
            <tr>
                <th>CID</th>
                <th>PRODUCER NAME</th>
                <th>ADDRESS</th>
                <th>CONTACT</th>
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
                {ele.CNAME}
                </td>
                <td>
                {ele.ADDRESS}
                </td>
                <td>
                    {ele.CONTACT}
                </td>
                <td>
                    <button className="deleteBut" onClick={()=>deletedata(ele)} >Delete</button>
                </td>
            </tr>
            })
            
           }
           </tbody>
        </table>
      { tabledata.length==0 && <p style={{textAlign:'center'}}>No available data</p> }
    </div>
}