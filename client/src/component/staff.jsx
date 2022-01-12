import {  useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

export default function Staff(props){

    const [sid,setsid]=useState("");
    const [sname,setsname]=useState("");
    const [address,setaddress]=useState("");
    const [gender,setgender]=useState("M");
    const [date,setdate]=useState(new Date().toDateString());
    const [tabledata,settabledata]=useState([]);
    const [updatedata,setupdatedata]=useState(false);
    const [search,setsearch]=useState(false);

    useEffect(()=>{
    gettabledata();
    },[]);

    const gettabledata=async()=>{
        await axios.post('http://localhost:8000/tabledata',{table:"STAFF"})
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
        setsid("");
        setsname("");
        setaddress("");
        setgender("M");
        setupdatedata(false);
    }

    const insertData=async(e)=>{
     e.preventDefault();
     console.log("hee");
     var data={
         sid,
         sname,
         address,
         gender
     }
     console.log(`http://localhost:8000/${updatedata? "updatestaff": "insertstaff"}`)
     await axios.post(`http://localhost:8000/${updatedata? "updatestaff": "insertstaff"}`,data)
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

            if(sid!==""){
            data['SID']=sid;
            }  
            if(sname!==""){
                data['SNAME']=sname
            }
            if(address!==""){
                data['address']=address
            } 
            data['GENDER']=gender;

        console.log(`http://localhost:8000/searchstaff`)
        await axios.post(`http://localhost:8000/searchstaff`,data)
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
        await axios.post(`http://localhost:8000/deletestaff`,ele)
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
        setsid(ele.SID);
        setsname(ele.SNAME);
        setaddress(ele.ADDRESS);
        setgender(ele.GENDER);
    }
    
    return <div id="staff">
        <h2>Add staff member</h2>
        <form onSubmit={(e)=>search? searchData(e):insertData(e)}>
            <div className="formdiv">
            <div className="col1">
            <label htmlFor="date">DATE :  <input disabled  type="text" name="date" id="date" value={date} onChange={(e)=>{setdate(e.target.value)}} /> </label>
            <label htmlFor="sid">SID {search? <input type="text" id="sid" value={sid} onChange={(e)=>{setsid(e.target.value.toLocaleUpperCase())}} />: <input  required type="text" id="sid" value={sid} onChange={(e)=>{setsid(e.target.value.toLocaleUpperCase())}} />}</label>
            <label htmlFor="sname">STAFF NAME {search?<input minLength={3} type="text" id="sname" value={sname} onChange={(e)=>{setsname(e.target.value)}}></input>: <input required minLength={3} type="text" id="sname" value={sname} onChange={(e)=>{setsname(e.target.value)}} />}</label>
            </div>
            <div className="col2">
            <label htmlFor="sid">ADDRESS {search? <input minLength={5} type="text" id="sid" value={address} onChange={(e)=>{setaddress(e.target.value)}}></input>:<input required minLength={5} type="text" id="sid" value={address} onChange={(e)=>{setaddress(e.target.value)}} /> }</label>
            <label htmlFor="sid">GENDER <select name="gender" id="gender" value={gender} onChange={(e)=>{setgender(e.target.value)}}>
                <option value="MALE">male</option>
                <option value="FEMALE">female</option></select></label>
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
                <th>SID</th>
                <th>DATE</th>
                <th>STAFF NAME</th>
                <th>GENDER</th>
                <th>ADDRESS</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {tabledata.length!==0 &&
            tabledata.map((ele,index)=>{
                return <tr key={index} onDoubleClick={()=>setupdate(ele)}>
                <td>
                    {ele.SID}
                </td>
                <td>
                    {ele.DATE}
                </td>
                <td>
                    {ele.SNAME}
                </td>
                <td>
                    {ele.GENDER}
                </td>
                <td>
                    {ele.ADDRESS}
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