window.onload=()=>{
    let button=document.getElementById("SubmitBtn");
    // this.setCustomValidity("");
    button.onclick=customSubmit;
    
    console.log("Set the function");
};

function customSubmit(e){
    //The submit button was causing my page to refresh and would not finish its operations
    // e.preventDefault();
    if(!checkVal())return;
    let form=document.getElementById("userRegistration");
    // console.log(form);
    let fdata=new FormData(form);
    let msg=new URLSearchParams(fdata).toString();
    let h=new Headers();
    h.append("Content-Type","application/x-www-form-urlencoded");
    url="http://localhost:8080/user";
    let init={
        method: "POST",
        headers: h,
        body: msg
    };
    console.log("Send the Request");
    fetch(url,init)
    .then(res=>{
        if (res.status==201) {
            console.log('Object Created');
            let frm=document.getElementById("userRegistration");
            let rtn=document.getElementById("ReturnLink");
            frm.style="display:none;"
            rtn.hidden=false;
        }
    })
    .catch(err=>{console.log(err);});
    
}

function checkVal(){
    let pass1=document.getElementById("password").value;
    let pass2=document.getElementById("rePassword").value;
    // Check for the two passwords to be equal
    // console.log(pass1===pass2);
    if (pass1!==pass2){
        document.getElementById("rePassword").setCustomValidity("Οι κωδικοί δεν ταιριάζουν");
        return false;
    }
    // Check for the password to be of at least 8 characters
    if (pass1.length<8){
        document.getElementById("password").setCustomValidity("Ο κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.");
        return false;
    }
    // Check the password must contain at least one letter, one number and one special character
    console.log(pass1);
    console.log(pass2);
    if(!(/[1-9]{1,}/g.test(pass1))){
        document.getElementById("password").setCustomValidity("Ο κωδικός πρέπει να περιέχει τουλάχιστον 1 αριθμό.");
        return false;
    }
    if(!(/[a-zA-Z]{1,}/g.test(pass1))){
        document.getElementById("password").setCustomValidity("Ο κωδικός πρέπει να περιέχει τουλάχιστον 1 χαρακτήρα.");
        return false;
    }
    if(!(/[!@#$%^&*]{1,}/g.test(pass1))){
        document.getElementById("password").setCustomValidity("Ο κωδικός πρέπει να περιέχει τουλάχιστον 1 ειδικό χαρακτήρα.");
        return false;
    }
    document.getElementById("password").setCustomValidity("");
    document.getElementById("rePassword").setCustomValidity("")
    console.log("Good");
    return true;
}