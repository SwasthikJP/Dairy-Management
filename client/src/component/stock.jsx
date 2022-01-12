

export default function Stock(props){
    
    return <div id="staff">
        <h2>Stock of milk</h2>
        <table>
            <tr>
                <th>STOCK ID</th>
                <th>MILKTYPE</th>
                <th>QUANTITY</th>
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
                    <button className="deleteBut">Delete</button>
                </td>
            </tr>
     
        </table>
        <p style={{textAlign:'center'}}>No available data</p>
        <hr />
        <h2>Staff transaction</h2>
        <table>
            <tr>
                <th>STAFF ID</th>
                <th>STOCK ID</th>
                <th>DATE</th>
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
                    <button className="deleteBut">Delete</button>
                </td>
            </tr>
     
        </table>
        <p style={{textAlign:'center'}}>No available data</p>
    </div>
}