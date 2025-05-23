let hamburger= document.querySelector(".ham");
let nav=document.querySelector(".navigation");

hamburger.addEventListener("click",()=>{
    nav.classList.toggle("show");
    nav.classList.toggle("hide");
    hamburger.classList.toggle("show");
});