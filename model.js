/* const{db}=require('./dbconn'); */

const sqlite3=require('sqlite3').verbose();

const db=new sqlite3.Database('./DB/mydb.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("connected to db");
});

function createNewUser(name,mail,gender,pass,role)
{
    var valid=0;
    let mypromise=new Promise((myResolve,myReject)=>{
       
            var sql=`INSERT INTO Users (Name,email,Password,Gender,Role) VALUES ('${name}','${mail}','${gender}','${pass}','${role}')`;
            db.run(sql,[],(err)=>{
                if(err){
                    console.log(err);
                return valid=0; 
                }
                else
                valid=1;

                if(valid){
                    myResolve(valid);
                }
                else{
                    myReject("Error");
                }
            });
        

    });
    mypromise.then(
        function (value){return value;},
        function (error){console.log("Error");}
    )
    return mypromise;
}

function createNewTicket(name,compTyp,compDat,sev,compDesc){
    let mypromise=new Promise((myResolve,myReject)=>{
   /*      let sql = `SELECT DISTINCT id FROM Users WHERE ORDER BY name`;

db.all(sql, [], (err, rows) => {
if (err) {
 throw err;
}
rows.forEach((row) => {
 console.log(row.name);
});
}); */
var mydate=new Date();
var entry_date=mydate.toLocaleString()

        var sql=`INSERT INTO Tkts (Name,Type,Date,Severity,Description,Entry_date,User_id) VALUES ('${name}','${compTyp}','${compDat}','${sev}','${compDesc}','${entry_date}','13')`;
        db.run(sql,[],(err)=>{
            if(err){
                console.log(err);
            return valid=0; 
            }
            else
            valid=1;

            if(valid){
                myResolve(valid);
            }
            else{
                myReject("Error");
            }
        });
    

});
mypromise.then(
    function (value){return value;},
    function (error){console.log("Error");}
)
return mypromise;

}


function userCheck(mail,pass)
{
    var resdata=[];
    var valid=0;
    let mypromise=new Promise((myResolve,myReject)=>{
       

console.log("usercheck");
        var sql=`SELECT id,Name,email,Password,Role FROM Users WHERE email='${mail}' AND Password='${pass}'`;


db.all(sql, [], (err, rows) => {
  if (err) {
    myReject("Error");
   // throw err;
    
  }
  rows.forEach((row) => {
    valid=1;
    resdata[0]=row.Role;
    resdata[1]=row.Name
    resdata[2]=row.id

    
  });
  if(valid){
      console.log(resdata);
       myResolve(resdata);}
  else { console.log("not validhhh");
  resdata[0]==-2;
  myResolve(resdata);}
});
           
    });
    mypromise.then(
        function (value){return value;},
        function (error){
            console.log("handler");
            return error;}
    )
    return mypromise;
}


function getTickets(id)
{
    var resdata=[];
    var valid=0;
    let mypromise=new Promise((myResolve,myReject)=>{
       

console.log("usercheck");
        var sql=`SELECT id,Name,Type,Date,Severity,Description,Entry_date,Status FROM Tkts WHERE User_id='${id}'`;


db.all(sql, [], (err, rows) => {
  if (err) {
    myReject("Error");
   // throw err;
    
  }
  rows.forEach((row) => {
    valid=1;
    console.log(row);
    resdata.push(row);

    
  });
  if(valid){
      console.log(resdata);
       myResolve(resdata);}
  else { console.log("not valid");
  resdata[0]==-2;
  myResolve(resdata);}
});
           
    });
    mypromise.then(
        function (value){return value;},
        function (error){
            console.log("handler");
            return error;}
    )
    return mypromise;
}




function getTicketsAdmin()
{
    var resdata=[];
    var valid=0;
    let mypromise=new Promise((myResolve,myReject)=>{
       

console.log("usercheck");
        var sql=`SELECT id,Name,Type,Date,Severity,Description,Entry_date,Status FROM Tkts ORDER BY Status DESC`;


db.all(sql, [], (err, rows) => {
  if (err) {
    myReject("Error");
   // throw err;
    
  }
  rows.forEach((row) => {
    valid=1;
    console.log(row);
    resdata.push(row);

    
  });
  if(valid){
      console.log(resdata);
       myResolve(resdata);}
  else { console.log("not valid");
  resdata[0]==-2;
  myResolve(resdata);}
});
           
    });
    mypromise.then(
        function (value){return value;},
        function (error){
            console.log("handler");
            return error;}
    )
    return mypromise;
}





function get_updateForm(id)
{
    var resdata=[];
    var valid=0;
    let mypromise=new Promise((myResolve,myReject)=>{
       

        var sql=`SELECT id,Name,Type,Date,Severity,Description,Entry_date,Status FROM Tkts WHERE id='${id}'`;


db.all(sql, [], (err, rows) => {
  if (err) {
    myReject("Error");
   // throw err;
    
  }
  rows.forEach((row) => {
    valid=1;
    console.log(row);
    resdata.push(row);

    
  });
  if(valid){
      console.log(resdata);
       myResolve(resdata);}
  else { 
  resdata[0]==-2;
  myResolve(resdata);}
});
           
    });
    mypromise.then(
        function (value){return value;},
        function (error){
            console.log("handler");
            return error;}
    )
    return mypromise;
}


function updatetkt(id,status)
{
    var resdata=[];
    var valid=0;
    let mypromise=new Promise((myResolve,myReject)=>{
       

        var sql=`UPDATE Tkts SET Status=? WHERE id=?`;




db.run(sql,  [status, id], function(err){
    // 
    if(err) myReject("error");

    myResolve(resdata);
  });
           
    });
    mypromise.then(
        function (value){return value;},
        function (error){
            console.log("handler");
            return error;}
    )
    return mypromise;
}


module.exports={
    createNewUser,
    createNewTicket,
    userCheck,
    getTickets,
    getTicketsAdmin,
    get_updateForm,
    updatetkt,
}