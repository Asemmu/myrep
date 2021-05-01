const  data_b  = require("./model");



async function createUser(req,res,name,mail,gender,password,role)
{
    try{
        const data=await data_b.createNewUser(name,mail,gender,password,role)
        /* return name; */
        if(role=="1")
        res.render('main', {name:name});
        
        if(role=="2")
        res.render('admin', {name:name});


       
    }
    catch(error){
        console.log(error);
    }
}




async function checkUser(req,res,mail,password)
{
    try{
        const data=await data_b.userCheck(mail,password)
        /* return name; */
        if(data[0]=="1")
        res.render('main', {name:data[1],id:data[2]});
        
        if(data[0]=="2"){
        const mytkts=await data_b.getTicketsAdmin();
        res.render('adminTkts', {tkts:mytkts});
        }
        else{
            res.redirect('/');
        }


       
    }
    catch(error){
        console.log(error);
    }
}

async function newTicket(req,res,name,compTyp,compDat,sev,compDesc)
{
    try{
        const data=await data_b.createNewTicket(name,compTyp,compDat,sev,compDesc);
        res.send("New Ticket has been created");
    }
    catch(error){
        console.log(error);
    }
}


async function viewTickets(req,res,id)
{
    id=13;
    try{
        const data=await data_b.getTickets(id)
        /* return name; */
       
        res.render('userTick', {tkts:data});
        



       
    }
    catch(error){
        console.log(error);
    }
}

async function UpdateForm(req,res,id)
{
    try{
        const data=await data_b.get_updateForm(id);
        /* return name; */
        
        res.render('updateform', {tkt:data});
        

       
    }
    catch(error){
        console.log(error);
    }
}


async function updateTktStatus(req,res,id,status)
{
    try{
        const data=await data_b.updatetkt(id,status);
        /* return name; */
        const mytkts=await data_b.getTicketsAdmin();
        
        res.render('adminTkts', {tkts:mytkts});
        

       
    }
    catch(error){
        console.log(error);
    }
}
module.exports={
    createUser,
    newTicket,
    checkUser,
    viewTickets,
    UpdateForm,
    updateTktStatus,
}