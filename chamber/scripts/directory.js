const ham=document.querySelector(".ham");
ham.addEventListener("click",()=>{
    const nav=document.querySelector(".nav");
    ham.classList.toggle("close");
    nav.classList.toggle("show");
})


const lastModified=document.querySelector("#last-modified");
var date= new Date();
lastModified.innerHTML=`Last Modified: ${date.toLocaleString()}`;