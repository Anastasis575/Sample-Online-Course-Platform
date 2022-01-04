const { response } = require("express");

var url;
window.onload=function (){
    let param=new URLSearchParams(window.location.search)
    let query=Object.fromEntries(param.entries());
    url="https://elearning-aueb.herokuapp.com/";
    let myHead=new Headers();
    myHead.append("Accept","application/json");
    let init={
        method: "GET",
        header: myHead
    };
    fetch(url+`/courses/search?category=${query["id"]}`,init)
    .then(res=>res.json())
    .then(fin=>{

    })
}