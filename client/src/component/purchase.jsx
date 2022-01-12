import '../css/purchase.css';
import { useState } from 'react';
export default function Purchase(props){

    const [sid,setsid]=useState("");
    const [pname,setpname]=useState("");
    const [address,setaddress]=useState("");
    const [contact,setcontact]=useState("");
    const [quantity,setquantity]=useState("");
    const [rate,setrate]=useState("");
    const [amount,setamount]=useState("");
    const [milktype,setmilktype]=useState("M");
    const [date,setdate]=useState(new Date().toDateString());
    
    return <div id="staff">
        <h2>Purchase of milk</h2>
        <form>
            <div className="formdiv">
            <div className="col1">
            <label htmlFor="date">DATE  <input disabled type="text" name="date" id="date" value={date} onChange={(e)=>{setdate(e.target.value)}}/></label>
            <label htmlFor="sid">STAFF ID <input type="text" id="sid" value={sid} onChange={(e)=>{setsid(e.target.value)}} /></label>
            <label htmlFor="pName">PRODUCER NAME <input type="text" id="pName" value={pname} onChange={(e)=>{setpname(e.target.value)}} /></label>
            </div>
            <div className="col2">
            <label htmlFor="sid">ADDRESS <input type="text" id="sid" value={address} onChange={(e)=>{setaddress(e.target.value)}} /></label>
            <label htmlFor="contact">CONTACT <input type="number" name="contact" id="contact"  value={contact} onChange={(e)=>{setcontact(e.target.value)}}/></label>
            <label htmlFor="quantity">QUANTITY <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e)=>{setquantity(e.target.value)}}/></label>

           
                </div>
              <div className="col3">
              <label htmlFor="milktype">MILKTYPE <select name="milktype" id="milktype" value={milktype} onChange={(e)=>{setmilktype(e.target.value)}}>
                <option value="C">Cow</option>
                <option value="B">Buffalo</option></select></label>
           
            <label htmlFor="rate">RATE <input type="number" name="rate" id="rate" value={rate} onChange={(e)=>{setrate(e.target.value)}}/></label>
            <label htmlFor="amount">AMOUNT <input type="number" name="amount" id="amount" value={amount} onChange={(e)=>{setamount(e.target.value)}}/></label>
               


              </div>
              
                </div>
                <div className="group">
                <button type="submit">ADD</button>
                <button type="reset">CLEAR</button>
                <label htmlFor="search">Toggle to Search results:<input  type="checkbox" name="search" id="search" /></label>
                </div>
        </form>
        <hr />
        <table>
            <tr>
                <th>PID</th>
                <th>PRODUCER NAME</th>
                <th>DATE</th>
                <th>STAFF ID</th>
                <th>ADDRESS</th>
                <th>CONTACT</th>
                <th>MILKTYPE</th>
                <th>QUANTITY</th>
                <th>RATE</th>
                <th>TOTAL AMOUNT</th>

                <th></th>
            </tr>
            <tr>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    No 1
                </td>
                <td>
                    <button className="deleteBut">Delete</button>
                </td>
            </tr>
     
        </table>
        <p style={{textAlign:'center'}}>No available data</p>
    </div>
}