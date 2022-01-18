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
    }else i{
        
    }
    // userDAO.printAll();
});

app.post("/login",(req,res)=>{
    let cType=req.header("Content-type");
    if (cType==="application/json"){

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