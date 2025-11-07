const lastmodified= document.querySelector("#last-modified");
const year=document.querySelector("#year");
const now= new Date();
lastmodified.innerHTML=`Last Modification: ${now.toLocaleString()}`;
year.innerHTML=now.getFullYear();
