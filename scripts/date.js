let currentyear=document.querySelector("#currentyear");
currentyear.innerText=new Date().getFullYear();
let lastmodified=document.querySelector("#lastModified");
lastmodified.innerText=`Latest update ${new Date().toLocaleString()}`;