var url="http://localhost:8080/login"

window.onload=()=>{
    let subB=document.getElementById("loginB");
    if(!subB)console.log("wtf");
    subB.onclick=attemptLogIn;
}

function attemptLogIn(params) {
    let fdata=new FormData(document.getElementById("loginForm"));
    let obj=new URLSearchParams(fdata);
    console.log(obj.toString());
    let hd=new Headers();
    hd.append("Content-Type","application/x-www-form-urlencoded");
    let init={
        method:"POST",
        headers: hd,
        body:obj.toString()
    }
    fetch(url,init)
    .then(res=>{
        console.log(obj.get("email"));
        if(res.status===200){
            console.log("Successful authentication");
            //Call the fetch function with the email info
            fetchUser(obj.get("email"));
        }else if(res.status===404){
            alert("No user with this email is found.");
        }else if(res.status===400){
            alert("Password was incorrect.");
        }
    }).catch(err=>{console.log(err);})
}
function fetchUser(email) {
    let urlL=new URL(url);
    urlL.search=new URLSearchParams({email:email}).toString();
    // console.log(urlL);
    let hd=new Headers();
    hd.append("Accept","application/json");
    let init={
        method: "GET",
        headers:hd
    }
    fetch(urlL,init)
    .then(res=>res.json())
    .then(obj=>{loadFormat(obj)})
    .catch(err=>{console.log(err);})    
}


function loadFormat(user) {
    document.getElementById("loginForm").hidden=true;
    let temp=document.getElementById("profile-template");
    let compiled_template=Handlebars.compile(temp.innerHTML);
    let final=compiled_template(user);
    document.getElementById("Prof").innerHTML=final;
}

