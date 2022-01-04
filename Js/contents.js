var url;
window.onload=function (){
    let param=new URLSearchParams(window.location.search)
    let query=Object.fromEntries(param.entries());
    url="https://elearning-aueb.herokuapp.com/";
    loadContent(query,url);
}

function loadContent(q,url){
    let myHead=new Headers();
    myHead.append("Accept","application/json");
    let init={
        method: "GET",
        header: myHead
    };
    fetch(url+`courses/search?category=${q["category"]}`,init)
    .then(res=>res.json())
    .then(obj=>{
        document.getElementById("Class-Data");
        var data=[];
        obj.forEach(el=>{
            let o=el;
            o.img_dest=`https://elearning-aueb.herokuapp.com/static/images/${el.img}`;
            o.img_alt=el.title+"_image";
            data.push(o);
        })
        loadEntries(data);
    })
    .catch(err=>{
        console.log(err);
    })
}

// Loading the handlebars template and loading the content
function loadEntries(data) {
    let template=document.getElementById("lesson-template").innerHTML;
    let compiled_template=Handlebars.compile(template);
    let finall=compiled_template({classes: data});
    let sec=document.getElementById("Class-Data");
    sec.innerHTML=finall;
}
