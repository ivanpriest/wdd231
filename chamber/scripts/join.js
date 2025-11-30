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

    const np=document.querySelector(".np");
    const bronze=document.querySelector(".bronze");
    const silver=document.querySelector(".silver");
    const gold=document.querySelector(".gold");

    const npmodal=document.querySelector(".np-modal");
    const bronzemodal=document.querySelector(".bronze-modal");
    const silvermodal=document.querySelector(".silver-modal");
    const goldmodal=document.querySelector(".gold-modal");

    const npclosebtn=document.querySelector(".npclose-btn");
    const bronzeclosebtn=document.querySelector(".bronzeclose-btn");
    const silverclosebtn=document.querySelector(".silverclose-btn");
    const goldclosebtn=document.querySelector(".goldclose-btn");

    const time=document.querySelector("#time-stamp");
    time.setAttribute("value",date.toLocaleDateString());


    np.addEventListener("click",()=>{
        npmodal.showModal();
    })
    bronze.addEventListener("click",()=>{
        bronzemodal.showModal();
    })
    silver.addEventListener("click",()=>{
        silvermodal.showModal();
    })
    gold.addEventListener("click",()=>{
        goldmodal.showModal();
    })


    npclosebtn.addEventListener("click",()=>{
        npmodal.close();
    })
    bronzeclosebtn.addEventListener("click",()=>{
        bronzemodal.close();
    })
    silverclosebtn.addEventListener("click",()=>{
        silvermodal.close();
    })
    goldclosebtn.addEventListener("click",()=>{
        goldmodal.close();
    })