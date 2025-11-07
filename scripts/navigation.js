const hamburger=document.querySelector(".ham");
hamburger.addEventListener("click",()=>{
    const ham=document.querySelector(".hide");
    const nav=document.querySelector(".nav");
    nav.classList.toggle("close")
    ham.classList.toggle("show");
});

const close=document.querySelector(".close");
if (close){
    hamburger.addEventListener("click",()=>{
    const nav=document.querySelector(".close");
    const ham=document.querySelector(".show");
    nav.classList.toggle("close");
    ham.classList.toggle("show");
});
}