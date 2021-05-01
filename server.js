const express=require('express');
const bodyParser=require('body-parser');
const{createUser,newTicket,checkUser,viewTickets,UpdateForm,updateTktStatus}=require('./controller');
//creating the express instance
const app= express();

//defining a port 
const PORT= process.env.PORT || 5000;

//start the server
app.listen(PORT, ()=>console.log(`Server is running on PORT ${PORT}`));

app.use(  bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
//mount a middleware to include css and js files
app.use('/public',express.static(__dirname +'/public'));

//routes
app.get('/newtkt',(req,res)=>{

res.render('newtkt', {name:'Asem',userid:'uid'});


});

app.post('/submitTkt',(req,res)=>{
    newTicket(req,res,req.body.username,req.body.typ,req.body.comdate,req.body.severity,req.body.compdesc);

});

app.get('/ejs',(req,res)=>{
    res.render('ejstest', {users:[{name: 'Asem',id:'1'},{name:'hamza',id:'2'}]});
});

app.get('/viewtkts',(req,res)=>{
    console.log(req.query.id);
    viewTickets(req,res,req.query.id);
});


app.get('/updateTkt',(req,res)=>{
    console.log(req.query.id);
    UpdateForm(req,res,req.query.id);
});

app.post('/updatetktstatus',(req,res)=>{
    updateTktStatus(req,res,req.body.tktid,req.body.newsts)
})


//the home page route
app.get('/',(req,res)=>{
    
    //app.use('/public',express.static(__dirname+'/public'));
    res.sendFile(__dirname+'/views/index.html');
});




//signup page
app.get('/signup',(req,res)=>{
    
    //app.use('/public',express.static(__dirname+'/public'));
    res.sendFile(__dirname+'/views/signup.html');
});

app.post('/loginsubmit',(req,res)=>{
    
    //app.use('/public',express.static(__dirname+'/public'));
    /* res.sendFile(__dirname+'/views/signup.html'); */
    checkUser(req,res,req.body.loginemail,req.body.loginpass);
});
 

//route to submit a new user 
app.post('/regsubmit',(req,res)=>{
console.log("*************");
console.log(req.body.role);
createUser(req,res,req.body.reg_Name,req.body.loginemail,req.body.gender,req.body.loginpass,req.body.role)

});

/* app.get('/main',(req,res)=>{
    res.render('main', {name:name});
}) */
