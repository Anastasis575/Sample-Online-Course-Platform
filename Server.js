const express = require('express');
const app = express();
const port = 8080;
function DAO(){
    this.users=[]
    this.add=us=>{
        this.users.push(us);
    }

    this.lookup=email=>{
        for (let usr of this.users){
            if (usr.email===email){
                return usr;
            }
        } 
        return null;
    };
    this.checkExistingUser=(email)=> {
        // Returns true if a user with the same emal address exist in the registered version
        // Otherwise return false
        if(this.users.length===0) return false;
        for (let user of this.users){
            if (email===user.email) return true;
        }
        return false;
    }
    this.printAll=()=>{console.log(this.users)}
}

function Users(name,surname,phnum,educ,mail,pass){
    this.name=name;
    this.surname=surname;
    this.phnum=phnum;
    this.educ=educ;
    this.email=mail;
    this.pass=pass;
}

app.use("/static",express.static(__dirname));

app.use(express.urlencoded({extended: false}));

app.use(express.json());


app.post("/user",(req,res)=>{
    let contentType=req.header("Content-Type");
    console.log(`Object received`);
    if(contentType==="application/json"){
        // console.log(req.body.length);
        if(userDAO.checkExistingUser(req.body["email"])){
            res.status(409).send("object already exists");
        }else{
            let u=new Users(req.body["name"],req.body["surname"],req.body["phone"],req.body["educationLevel"],req.body["email"],req.body["password"]);
            userDAO.add(u);
            res.type("application/json").status(201).send(JSON.stringify({'debug':"Object created"}));
        }
    }else if(contentType==="application/x-www-form-urlencoded"){
        console.log(req.body);
        if(userDAO.checkExistingUser(req.body["email"])){
            res.status(409).send("object already exists");
        }else{
            let u=new Users(req.body["name"],req.body["surname"],req.body["phone"],req.body["educationLevel"],req.body["email"],req.body["password"]);
            userDAO.add(u);
            res.type("application/json").status(201).send(JSON.stringify({'debug':"Object created"}));
        }
    }else{
        res.status(406).send("Unacceptable data type");
    }
    // userDAO.printAll();
});


app.post("/login",(req,res)=>{
    console.log("Attempting login");
    // let cType= req.header("Content-Type");
    console.log(req.body);
    let cred={email:req.body["email"],pass:req.body["password"]}
    let usr=userDAO.lookup(cred.email);
    if(usr===null){
        res.status(404).send("No user with this email is found");
    }else if(usr.pass===cred.pass){
        res.status(200).send("User has been identified correctly");
    }else{
        res.status(400).send("Password was not Correct");
    }
})


app.get("/login",(req,res)=>{
    console.log("Succesfull reach of server");
    let param=req.query.email;
    console.log(param)
    let usr= userDAO.lookup(param);
    if(usr===null){
        res.status(404).type("application/json").send({debug:"No user with that email"});
    }
    else{
        console.log(usr);
        res.status(200).type("application/json").send(usr);
    }
})

app.get("/test",(req,res)=>{
    console.log("Connected with Client ");
    res.status(200);
    res.type("application/json")
    res.send('{"debug": "server responding"}');
});


app.listen(port);
var userDAO=new DAO();
console.log("Server Online!");