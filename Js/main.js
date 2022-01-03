var available=[]


window.onload=function () {
    url="https://elearning-aueb.herokuapp.com/"
    document.getElementById("search").onclick=getT;
}


function getT() {
    var myHead=new Headers();
    myHead.append("Accept","application/json");
    var init={
        method: "GET",
        headers: myHead
    };
    fetch(url+"categories/",init).then(obj=>obj.json())
    .then(fin=>{
        var text="";
        fin.forEach(el=>{
            text+=el.id+", "+el.title+"\n";
        })
        document.getElementById("hello").innerHTML=text;
    })
    .catch(err=>{console.log(err)})
}
window.addEventListener("keyup",event=>{
    if(event.key==="Enter"){
        if(document.getElementById("SearchInput")===document.activeElement){
            // getT();
        }
    }
})