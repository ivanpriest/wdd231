const ham=document.querySelector(".ham");
    ham.addEventListener("click",()=>{
    const nav=document.querySelector(".nav");
    ham.classList.toggle("close");
    nav.classList.toggle("show");
    })
    const lastModified=document.querySelector("#last-modified");
    var date= new Date();
    lastModified.innerHTML=`Last Modified: ${date.toLocaleString()}`;

    const copyright=document.querySelector("#copyright");
    copyright.innerHTML=`&copy;${date.getFullYear()} Tesano Chamber Of Commerce`;
    


    const applicationinfo=new URLSearchParams(window.location.search);
    const firstname=applicationinfo.get("firstname");
    const para1=document.createElement("p");
    const lastname=applicationinfo.get("lastname");
    para1.innerHTML=`Name: ${firstname} ${lastname}`;
    const email=applicationinfo.get("email");
    const para2=document.createElement("p");
    para2.innerHTML=`Email: ${email}`;
    const phone=applicationinfo.get("phone");
    const para3=document.createElement("p");
    para3.innerHTML=`Phone: ${phone}`;
    const businessname=applicationinfo.get("org-name");
    const para4=document.createElement("p");
    para4.innerHTML=`Organisation: ${org-name}`;
    const h2=document.createElement("h2");
    h2.innerHTML=`Thank you for the application below are the datails`
    const time=document.querySelector("#time-stamp");
    time.setAttribute("value",date.toLocaleDateString());
    const applinfo=document.querySelector(".application-info");
    applinfo.append(h2);
    applinfo.append(para1);
    applinfo.append(para2);
    applinfo.append(para3);
    applinfo.append(para4);




