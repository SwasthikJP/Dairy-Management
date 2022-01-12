
export default function Transaction(props){
    
    return <div id="staff">
        <h2>Transaction</h2>
        <table>
            <tr>
                <th>TRANSACTION ID</th>
                <th>STAFF ID</th>
                <th>DATE</th>
                <th>TOTAL AMOUNT</th>
                <th>TYPE</th>
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
                    <button className="deleteBut">Delete</button>
                </td>
            </tr>
     
        </table>
        <p style={{textAlign:'center'}}>No available data</p>
       
    </div>
}