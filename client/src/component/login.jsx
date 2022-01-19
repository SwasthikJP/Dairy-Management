import Nav from "./nav";
import "../css/login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [isadmin,setisadmin]=useState(false);
    let navigate=useNavigate();
    
    const searchData=async(e)=>{
        e.preventDefault();
        console.log("hee"+isadmin);
        var data={};
             if(isadmin){
                 data['USERNAME']=username;
             }else{
                 data['SID']=username;
             }
          data['PASSWORD']=password;

        console.log(`http://localhost:8000/${isadmin? "loginadmin": "searchstaff"}`)
        await axios.post(`http://localhost:8000/${isadmin? "loginadmin": "searchstaff"}`,data)
        .then((res)=>{
            console.log(res);
            if(res.data.length>0){
                console.log("login complete")
                let storage=window.localStorage;
                console.log(data)
                if(isadmin){
                storage.setItem('loginusername',data['USERNAME']);
                }else{
                storage.setItem('loginsid',data['SID']);
                }
                storage.setItem('loginpassword',data['PASSWORD']);
                console.log(storage.getItem('loginpassword'))
                toast.success("Login complete")
              
                navigate('/')
            }else{
                toast.error("user not found")

            }
        })
        .catch((err)=>{
         console.log(err.response.data);
         toast.error(err.response.data);
        })
       }

    return <div id="topbox"><Nav />
    <div className="box2">
    <form  className="box" onSubmit={(e)=>searchData(e)}>
    {isadmin? <h3>Admin Login</h3> :<h3>Staff Login</h3>}
            <input type="text" required value={username} id="username" onChange={(e)=>setusername(e.target.value)} placeholder={isadmin?"Enter username":"Enter Staff id"}/>
             <input type="password" required value={password} onChange={(e)=>setpassword(e.target.value)} name="password" id="password" placeholder="Enter password" /> 
            <button type="submit">Login</button>
       
        </form>
        <button id="undbutton" onClick={()=>{setisadmin((prev)=>!prev);setpassword("");setusername("")}}>{!isadmin? "Admin Login":"Staff Login"}</button>
        </div>
    </div>
}