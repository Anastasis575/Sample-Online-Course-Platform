var url;

window.onload=function () {
    url="https://elearning-aueb.herokuapp.com/";
    getInitial(url);
    document.getElementById("search").onclick=searchLesson;
}

//
function searchLesson(){
    //GET request
    let myHead=new Headers();
    myHead.append("Accept","application/json");
    let text=document.getElementById("SearchInput");
    let dns;
    if(text){
        dns=document.getElementById("SearchInput").value;
    }else{
        console.log("Error text input not find");
    }
    let init={
        method: "GET",
        headers: myHead
    };
    fetch(url+`courses/search?title=${dns.replace(" ","%20")}`,init)
//  Turning the results to JSON
    .then(res=>res.json())
//   Generating the object data for the Class sections
    .then(obj=>{
        document.getElementById("Class-Data").innerHTML="";
        var data=[];
        obj.forEach(el=>{
            // console.log(el["category"]);
            let o=el;
            o.img_dest=`https://elearning-aueb.herokuapp.com/static/images/${el.img}`;
            o.img_alt=el.title+"_image";
            data.push(o);
        })
        loadEntries(data);
    })
    .catch(err=>{
        console.log(err);
    });
}

// Initial Fetch Request to get Categories
function getInitial(url) {
    let myHead=new Headers();
    myHead.append("Accept","application/json");
    let init={
        method: "GET",
        headers: myHead
    };
    fetch(url+"categories/",init)
    .then(obj=>obj.json())
    .then(fin=>{
        console.log("Loaded");
        var data=[];
        fin.forEach(el=>{
            let o=el;
            o.link=`contents.html?category=${o.id}`;
            data.push(o);
        })
        loadMenu(data);
    })
    .catch(err=>{console.log(err)})
}


// Loading the handlebars template and loading the content
function loadEntries(data) {
    let template=document.getElementById("lesson-template").innerHTML;
    let compiled_template=Handlebars.compile(template);
    let finall=compiled_template({classes: data});
    let sec=document.getElementById("Class-Data");
    sec.innerHTML=finall;
}


function loadMenu(data) {
    let template=document.getElementById("menu-template").innerHTML;
    let compiled_template=Handlebars.compile(template);
    let finall=compiled_template({categories: data});
    let sec=document.getElementById("Menu");
    sec.innerHTML=finall;
}

// Event listener for Enter events
window.addEventListener("keyup",event=>{
    if(event.key==="Enter"){
        if(document.getElementById("SearchInput")===document.activeElement){
            searchLesson();
        }
    }
})