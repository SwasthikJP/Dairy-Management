const express = require('express');
const app = express();
const port = process.env.PORT|| 8000;
const cors=require('cors');
const bodyParser=require('body-parser');
const mysql=require('mysql2');

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
  connection.query(`INSERT INTO STAFF SET ? `,[{SID:req.body.sid,SNAME:req.body.sname,ADDRESS:req.body.address,GENDER:req.body.gender}],function(err,result){
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
  connection.query(`UPDATE STAFF SET ? WHERE SID=? `,[{SNAME:req.body.sname,ADDRESS:req.body.address,GENDER:req.body.gender},req.body.sid],function(err,result){
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

app.post("/tabledata",(req,res)=>{

  console.log(req.body);
  var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"dairy_management"
  });
  connection.query(`SELECT * FROM ${req.body.table}`,function(err,result){
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