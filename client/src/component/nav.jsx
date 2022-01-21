import "../css/nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav(props){
    console.log(props.logout)
    let navigate=useNavigate();
    let storage=window.localStorage;
    const logout=()=>{
        let storage=window.localStorage;
        storage.clear();
        navigate("/login");
    }

    return <nav>
        <h1>DAIRY MANAGEMENT</h1>
        {props.logout && <button className="logoutbut" onClick={()=>logout()}>{storage.getItem('loginsid')?"Staff ":"Admin "}Logout</button>}
    </nav>
}