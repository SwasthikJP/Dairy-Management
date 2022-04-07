const express = require('express');
const app = express();
const port = process.env.PORT|| 8000;
const cors=require('cors');
const bodyParser=require('body-parser');
const mysql=require('mysql2');
const datetime=require('date-and-time');
const res = require('express/lib/response');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

require('dotenv').config();



app.get('/', (req, res) => {
  res.send('Hello World!');
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
connection.connect();
console.log("db connected");
connection.query(
  'SELECT * FROM STAFF ',
  function(err,result,fields){
    if(err)
    console.log(err);
    console.log(result);
  }
)
connection.end();
})

app.post("/insertstaff",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`INSERT INTO STAFF SET ? `,[{SID:req.body.sid,SNAME:req.body.sname,
  ADDRESS:req.body.address,GENDER:req.body.gender,PASSWORD:req.body.password}],
  function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})


app.post("/updatestaff",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
connection.query(`UPDATE STAFF SET ? WHERE SID=? `,[{SNAME:req.body.sname,
ADDRESS:req.body.address,GENDER:req.body.gender,PASSWORD:req.body.password},req.body.sid],
    function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})



app.post("/deletestaff",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`DELETE FROM STAFF WHERE SID=? `,[req.body.SID],function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})


app.post("/searchstaff",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  let query='SELECT * FROM STAFF WHERE ';
  let conditions=[];
 for ( const key in req.body){
   conditions.push(`${key}='${req.body[key]}'`);
 }
 query=query+conditions.join(' AND ');
 console.log(query,conditions)
  connection.query(query,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})




app.post("/insertproducer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`INSERT INTO PRODUCER SET ? `,[{PID:req.body.pid,PNAME:req.body.pname,ADDRESS:req.body.address,CONTACT:req.body.contact}],function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})


app.post("/updateproducer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`UPDATE PRODUCER SET ? WHERE PID=? `,[{pname:req.body.pname,address:req.body.address,contact:req.body.contact},req.body.pid],function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})



app.post("/deleteproducer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`DELETE FROM PRODUCER WHERE PID=? `,[req.body.PID],function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})


app.post("/searchproducer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  let query='SELECT * FROM PRODUCER WHERE ';
  let conditions=[];
 for ( const key in req.body){
   conditions.push(`${key}='${req.body[key]}'`);
 }
 query=query+conditions.join(' AND ');
 console.log(query,conditions)
  connection.query(query,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})


// function insertStocks(ele){
//   var connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:"",
//     database:"dairy_management"
//   });
//   connection.query(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY+${ele.quantity} WHERE MILKTYPE=? AND SDATE=? `,[ele.milktype,datetime.format(new Date(),'YYYY-MM-DD')],function(err,result){
//    try{
//        if(err){
//      throw err;
//    }
//   connection.end();
//   }catch(err){
//     console.log(err.sqlMessage || "111error occured");
//     res.status(500).send(err.sqlMessage || "error occured");
//   }
//   });
//    connection.end();
// }

// function insertManages(ele){
//   var connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:"",
//     database:"dairy_management"
//   });

//   if(ele.milktype=='COW'){
//     S001
//   }
//   connection.query(`INSERT INTO MANAGES SET ? `,[{PID:req.body.pid,SID:req.body.sid,TOTALAMOUNT:req.body.amount,MILKTYPE:req.body.milktype,QUANTITY:req.body.quantity,RATE:req.body.rate}],function(err,result){
//    try{
//        if(err){
//      throw err;
//    }
//    res.status(200).send(result);
//   }catch(err){
//     console.log(err.sqlMessage || "error occured");
//     res.status(500).send(err.sqlMessage || "error occured");
//   }
//   });
//    connection.end();
// }

// app.post("/insertpurchases",(req,res)=>{
//   console.log(req.body);
//   var connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:"",
//     database:"dairy_management"
//   });
//   connection.query(`INSERT INTO PURCHASES SET ? `,[{PID:req.body.pid,SID:req.body.sid,TOTALAMOUNT:req.body.amount,MILKTYPE:req.body.milktype,QUANTITY:req.body.quantity,RATE:req.body.rate}],function(err,result){
//    try{
//        if(err){
//      throw err;
//    }
//   insertStocks(req.body);
//   // res.status(200).send(result);
//   //  insertManages(req.body);
  
//   }catch(err){
//     console.log(err.sqlMessage || "error occured");
//     res.status(500).send(err.sqlMessage || "error occured");
//   }
//   });
//    connection.end();
// })


app.post("/insertpurchases",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });

  let stid="";
  if(req.body.milktype==="COW"){
    stid='ST001';
  }else{stid="ST002";}


//   connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
//   connection.beginTransaction();
//   try{
//   connection.execute(`INSERT INTO PURCHASES (PID,SID,TOTALAMOUNT,MILKTYPE,QUANTITY,RATE) VALUES  (?,?,?,?,?,?  ) `,[req.body.pid,req.body.sid,req.body.amount,req.body.milktype,req.body.quantity,req.body.rate]);
//   connection.execute(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY+${req.body.quantity} WHERE MILKTYPE=? AND SDATE=? `,[req.body.milktype,datetime.format(new Date(),'YYYY-MM-DD')]);
//   connection.execute(`INSERT INTO MANAGES (STID,SID,TYPE) VALUES  (?,?,?) `,[stid,req.body.sid,"credit"],(err,result)=>{
//     res.status(200).send("done");
//     connection.commit();
//   });
 
 
  
 
// }
//    catch(err){
//      console.log(err);
//      res.status(500).send(err || "error occured");
//     connection.rollback();
//    }


try{

connection.beginTransaction(function(err) {
  if (err) { throw err; }
  connection.query(`INSERT INTO PURCHASES (PID,SID,TOTALAMOUNT,MILKTYPE,QUANTITY,RATE) VALUES  (?,?,?,?,?,?  ) `,[req.body.pid,req.body.sid,req.body.amount,req.body.milktype,req.body.quantity,req.body.rate], function (error, results, fields) {
    if (error) {
      return connection.rollback(function() {
        console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
      });
    }


    connection.query(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY+${req.body.quantity} WHERE MILKTYPE=? AND SDATE=? `,[req.body.milktype,datetime.format(new Date(),'YYYY-MM-DD')], function (error, results, fields) {
      if (error) {
        return connection.rollback(function() {
          console.log(error);
          res.status(500).send(error.sqlMessage || "error occured");
        });
      }

      connection.query(`INSERT INTO MANAGES (STID,SID,TYPE) VALUES  (?,?,?) `,[stid,req.body.sid,"credit"], function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            console.log(error);
            res.status(500).send(error.sqlMessage || "error occured");
          });
        }

      connection.commit(function(err) {
        if (err) {
          return connection.rollback(function() {
            console.log(err);
            res.status(500).send(err.sqlMessage || "error occured");
          });
        }
        console.log('success!');
        res.status(200).send("done");

      });
    });
  });
});
});
}catch(err){
  console.log(err);
  res.status(500).send(err || "error occured");
   
}






})



// app.post("/updatepurchases",(req,res)=>{
//   console.log(req.body);
//   var connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:"",
//     database:"dairy_management"
//   });
//   connection.query(`UPDATE PURCHASES SET ? WHERE PID=? AND SID=? AND PDATE=? `,[{quantity:req.body.quantity,milktype:req.body.milktype,TOTALAMOUNT:req.body.amount,rate:req.body.rate},req.body.pid,req.body.sid,datetime.format(new Date(req.body.date),'YYYY-MM-DD HH:mm:ss')],function(err,result){
//    try{
//        if(err){
//      throw err;
//    }
//    res.status(200).send(result);
//   }catch(err){
//     console.log(err.sqlMessage || "error occured");
//     res.status(500).send(err.sqlMessage || "error occured");
//   }
//   });
//    connection.end();
// }).

app.post("/updatepurchases",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });



  // connection.query(`UPDATE PURCHASES SET ? WHERE PID=? AND SID=? AND PDATE=? `,[{quantity:req.body.quantity,milktype:req.body.milktype,TOTALAMOUNT:req.body.amount,rate:req.body.rate},req.body.pid,req.body.sid,datetime.format(new Date(req.body.date),'YYYY-MM-DD HH:mm:ss')],function(err,result){
  //  try{
  //      if(err){
  //    throw err;
  //  }
  //  res.status(200).send(result);
  // }catch(err){
  //   console.log(err.sqlMessage || "error occured");
  //   res.status(500).send(err.sqlMessage || "error occured");
  // }
  // });





  try{

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(`UPDATE PURCHASES SET ? WHERE PID=? AND SID=? AND PDATE=? `,[{quantity:req.body.quantity,milktype:req.body.milktype,TOTALAMOUNT:req.body.amount,rate:req.body.rate},req.body.pid,req.body.sid,datetime.format(new Date(req.body.date),'YYYY-MM-DD HH:mm:ss')], function (error, resultss, fields) {
        if (error) {
          return connection.rollback(function() {
            console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
          });
        }
    
    
        connection.query(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY+${req.body.quantity-req.body.dcvalue} WHERE MILKTYPE=? AND SDATE=? `,[req.body.milktype,datetime.format(new Date(),'YYYY-MM-DD')], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
            });
          }
    
         
    
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                console.log(err);
                res.status(500).send(err.sqlMessage || "error occured");
              });
            }
            console.log('success!');
            res.status(200).send(resultss);
    
          });
      });
    });
    });
    }catch(err){
      console.log(err);
      res.status(500).send(err || "error occured");
       
    }




  //  connection.end();
})



app.post("/deletepurchases",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  //delete using pdate is not added
  // connection.query(`DELETE FROM PURCHASES WHERE PID=? AND SID=? AND PDATE=?  `,[req.body.PID,req.body.SID,datetime.format(new Date(req.body.PDATE),'YYYY-MM-DD HH:mm:ss')],function(err,result){
  //  try{
  //      if(err){
  //    throw err;
  //  }
  //  res.status(200).send(result);
  // }catch(err){
  //   console.log(err.sqlMessage || "error occured");
  //   res.status(500).send(err.sqlMessage || "error occured");
  // }
  // });
  //  connection.end();


  try{

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(`DELETE FROM PURCHASES WHERE PID=? AND SID=? AND PDATE=?  `,[req.body.PID,req.body.SID,datetime.format(new Date(req.body.PDATE),'YYYY-MM-DD HH:mm:ss')], function (error, resultss, fields) {
        if (error) {
          return connection.rollback(function() {
            console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
          });
        }
    
    
        connection.query(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY-${req.body.QUANTITY} WHERE MILKTYPE=? AND SDATE=? `,[req.body.MILKTYPE,datetime.format(new Date(req.body.PDATE),'YYYY-MM-DD')], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
            });
          }
    
         
    
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                console.log(err);
                  res.status(500).send(err.sqlMessage || "error occured");
              });
            }
            console.log('success!');
            res.status(200).send(resultss);
    
          });
      });
    });
    });
    }catch(err){
      console.log(err);
      res.status(500).send(err || "error occured");
       
    }


})


app.post("/searchpurchases",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  let query='SELECT * FROM PURCHASES WHERE ';
  let conditions=[];
 for ( const key in req.body){
   conditions.push(`${key}='${req.body[key]}'`);
 }
 query=query+conditions.join(' AND ');
 console.log(query,conditions)
  connection.query(query,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})







app.post("/insertconsumer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`INSERT INTO CONSUMER SET ? `,[{CID:req.body.cid,CNAME:req.body.cname,ADDRESS:req.body.address,CONTACT:req.body.contact}],function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();

})


app.post("/updateconsumer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`UPDATE CONSUMER SET ? WHERE CID=? `,[{cname:req.body.cname,address:req.body.address,contact:req.body.contact},req.body.cid],function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})



app.post("/deleteconsumer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`DELETE FROM CONSUMER WHERE CID=? `,[req.body.CID],function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})


app.post("/searchconsumer",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  let query='SELECT * FROM CONSUMER WHERE ';
  let conditions=[];
 for ( const key in req.body){
   conditions.push(`${key}='${req.body[key]}'`);
 }
 query=query+conditions.join(' AND ');
 console.log(query,conditions)
  connection.query(query,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})






app.post("/insertsales",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });



  let stid="";
  if(req.body.milktype==="COW"){
    stid='ST001';
  }else{stid="ST002";}
  


   try{

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(`INSERT INTO SALES (CID,SID,TOTALAMOUNT,MILKTYPE,QUANTITY,RATE) VALUES  (?,?,?,?,?,?  ) `,[req.body.cid,req.body.sid,req.body.amount,req.body.milktype,req.body.quantity,req.body.rate], function (error, results, fields) {
    
        if (error) {
          return connection.rollback(function() {
           
              console.log(error);
              res.status(500).send(error.sqlMessage || "error occured");
            });
        }
    
    
        connection.query(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY-${req.body.quantity} WHERE MILKTYPE=? AND SDATE=? `,[req.body.milktype,datetime.format(new Date(),'YYYY-MM-DD')], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
            
                  console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
                
            });
          }
    
          connection.query(`INSERT INTO MANAGES (STID,SID,TYPE) VALUES  (?,?,?) `,[stid,req.body.sid,"debit"], function (error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                
                    console.log(error);
                    res.status(500).send(error.sqlMessage || "error occured");
                  
              });
            }
    
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                
                    console.log(err);
                    res.status(500).send(err.sqlMessage || "error occured");
                  
              });
            }
            console.log('success!');
            res.status(200).send("done");
    
          });
        });
      });
      
    });
    });
    }catch(err){
      console.log(err);
      res.status(500).send(err.sqlMessage || "error occured");
       
    }


})



app.post("/updatesales",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });

  // connection.query(`UPDATE SALES SET ? WHERE CID=? AND SID=? AND SLDATE=? `,[{quantity:req.body.quantity,milktype:req.body.milktype,TOTALAMOUNT:req.body.amount,rate:req.body.rate},req.body.cid,req.body.sid,datetime.format(new Date(req.body.date),'YYYY-MM-DD HH:mm:ss')],function(err,result){
  //  try{
  //      if(err){
  //    throw err;
  //  }
  //  res.status(200).send(result);
  // }catch(err){
  //   console.log(err.sqlMessage || "error occured");
  //   res.status(500).send(err.sqlMessage || "error occured");
  // }
  // });
  //  connection.end();

  try{

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(`UPDATE SALES SET ? WHERE CID=? AND SID=? AND SLDATE=? `,[{quantity:req.body.quantity,milktype:req.body.milktype,TOTALAMOUNT:req.body.amount,rate:req.body.rate},req.body.cid,req.body.sid,datetime.format(new Date(req.body.date),'YYYY-MM-DD HH:mm:ss')], function (error, resultss, fields) {
        if (error) {
          return connection.rollback(function() {
            console.log(error);
            res.status(500).send(error.sqlMessage || "error occured");
          });
        }
    
    
        connection.query(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY-${req.body.quantity-req.body.dcvalue} WHERE MILKTYPE=? AND SDATE=? `,[req.body.milktype,datetime.format(new Date(),'YYYY-MM-DD')], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              console.log(error);
              res.status(500).send(error.sqlMessage || "error occured");
            });
          }
    
         
    
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                console.log(err);
              res.status(500).send(err.sqlMessage || "error occured");
              });
            }
            console.log('success!');
            res.status(200).send(resultss);
    
          });
      });
    });
    });
    }catch(err){
      console.log(err);
      res.status(500).send(err || "error occured");
       
    }


})



app.post("/deletesales",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  //delete using pdate is not added


  // connection.query(`DELETE FROM SALES WHERE CID=? AND SID=? AND SLDATE=?  `,[req.body.CID,req.body.SID,datetime.format(new Date(req.body.SLDATE),'YYYY-MM-DD HH:mm:ss')],function(err,result){
  //  try{
  //      if(err){
  //    throw err;
  //  }
  //  res.status(200).send(result);
  // }catch(err){
  //   console.log(err.sqlMessage || "error occured");
  //   res.status(500).send(err.sqlMessage || "error occured");
  // }
  // });
  //  connection.end();


  try{

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(`DELETE FROM SALES WHERE CID=? AND SID=? AND SLDATE=?  `,[req.body.CID,req.body.SID,datetime.format(new Date(req.body.SLDATE),'YYYY-MM-DD HH:mm:ss')], function (error, resultss, fields) {
        if (error) {
          return connection.rollback(function() {
            console.log(error);
              res.status(500).send(error.sqlMessage || "error occured");
          });
        }
    
    
        connection.query(`UPDATE STOCKS SET CURQUANTITY=CURQUANTITY+${req.body.QUANTITY} WHERE MILKTYPE=? AND SDATE=? `,[req.body.MILKTYPE,datetime.format(new Date(req.body.SLDATE),'YYYY-MM-DD')], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              console.log(error);
              res.status(500).send(error.sqlMessage || "error occured");
            });
          }
    
         
    
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                console.log(err);
                res.status(500).send(err.sqlMessage || "error occured");
              });
            }
            console.log('success!');
            res.status(200).send(resultss);
    
          });
      });
    });
    });
    }catch(err){
      console.log(err);
      res.status(500).send(err || "error occured");
       
    }


})


app.post("/searchsales",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  let query='SELECT * FROM SALES WHERE ';
  let conditions=[];
 for ( const key in req.body){
   conditions.push(`${key}='${req.body[key]}'`);
 }
 query=query+conditions.join(' AND ');
 console.log(query,conditions)
  connection.query(query,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})



app.post("/loginadmin",(req,res)=>{
  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  let query='SELECT * FROM ADMIN WHERE ';
  let conditions=[];
 for ( const key in req.body){
   conditions.push(`${key}='${req.body[key]}'`);
 }
 query=query+conditions.join(' AND ');
 console.log(query,conditions)
  connection.query(query,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
   connection.end();
})


app.post("/stockdata",(req,res)=>{

  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
 
  // connection.query(`SELECT * FROM ${req.body.table} WHERE SDATE='${datetime.format(new Date(),'YYYY-MM-DD')}'`,function(err,result){
  //  try{
  //      if(err){
  //    throw err;
  //  }
  //  res.status(200).send(result);
  // }catch(err){
  //   console.log(err.sqlMessage || "error occured");
  //   res.status(500).send(err.sqlMessage || "error occured");
  // }
  // });
  // connection.end();

  try{

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(`SELECT * FROM ${req.body.table} WHERE SDATE='${datetime.format(new Date(),'YYYY-MM-DD')}'`, function (error, resultss, fields) {
        if (error) {
          return connection.rollback(function() {
            console.log(error);
            res.status(500).send(error.sqlMessage || "error occured");
          });
        }
    
    if(resultss.length==0){
        connection.query(`INSERT INTO ${req.body.table} (STID,MILKTYPE,CURQUANTITY,SDATE,MAXQUANTITY) VALUES  (?,?,?,?,?)  `,['ST001','COW',0,datetime.format(new Date(),'YYYY-MM-DD'),2000], function (error, result, fields) {
          if (error) {
            return connection.rollback(function() {
              console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
            });
          }
          connection.query(`INSERT INTO ${req.body.table} (STID,MILKTYPE,CURQUANTITY,SDATE,MAXQUANTITY) VALUES  (?,?,?,?,?)  `,['ST002','BUFFALO',0,datetime.format(new Date(),'YYYY-MM-DD'),2000], function (error, result, fields) {
            if (error) {
              return connection.rollback(function() {
                console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
              });
            }

            connection.query(`SELECT * FROM ${req.body.table} WHERE SDATE='${datetime.format(new Date(),'YYYY-MM-DD')}'`, function (error, resultss, fields) {
              if (error) {
                return connection.rollback(function() {
                  console.log(error);
                  res.status(500).send(error.sqlMessage || "error occured");
                });
              }
         
    // console.log(result1)
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                console.log(err);
                res.status(500).send(err.sqlMessage || "error occured");
              });
            }
            // console.log(result2)
            console.log('success!');
            console.log(resultss)
            res.status(200).send(resultss);
    
          });
      });
    });
  });

    }else{
 connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                console.log(err);
                  res.status(500).send(err.sqlMessage || "error occured");
              });
            }
            // console.log(result2)
            console.log('success!');
            console.log(resultss)
            res.status(200).send(resultss);
    
          });
    }
    });
  
    });
    }catch(err){
      console.log(err);
      res.status(500).send(err || "error occured");
       
    }


})





app.post("/tabledata",(req,res)=>{
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  let query="";
  if(req.body.isstaff){
query=`SELECT * FROM ${req.body.table} WHERE SID='${req.body.sid}'`
  }else{
    query=`SELECT * FROM ${req.body.table}`;
  }
  connection.query(query,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
  connection.end();
})



app.post("/transactiontabledata",(req,res)=>{

  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`SELECT * FROM PURCHASES,SALES WHERE ORDER BY SID `,function(err,result){
   try{
       if(err){
     throw err;
   }
   res.status(200).send(result);
  }catch(err){
    console.log(err.sqlMessage || "error occured");
    res.status(500).send(err.sqlMessage || "error occured");
  }
  });
  connection.end();
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})