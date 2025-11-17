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

document.addEventListener("DOMContentLoaded",async()=>{
    try{
        var response= await fetch("./data/members.json");
        const data=await response.json();
        const businesscards=document.querySelector("#business-container");
        businesscards.classList.add("business-cards");
        data.forEach(company => {
            const card = document.createElement("div");
            card.classList.add("card");
            const cardhead=document.createElement("div");
            cardhead.classList.add("card-head");
            const h4=document.createElement("h4");
            h4.innerHTML=`${company.name}`;
            const para1=document.createElement("p");
            para1.innerHTML=`<b>Address: </b>${company.address}`;
            const para2=document.createElement("p");
            para2.innerHTML=`<b>Phone: </b>${company.phone}`;
            const para3=document.createElement("p");
            para3.innerHTML=`<b>URL: </b>${company.website}`;
            const businessinfo=document.createElement("div");
            businessinfo.classList.add("business-info");
            const businessimage= document.createElement("div");
            businessimage.classList.add("business-image");
            const img=document.createElement("img");
            img.setAttribute("src",company.image);
            img.setAttribute("alt","company logo");
            img.setAttribute("loading","lazy")
            businessimage.append(img);
            const info=document.createElement("div");
            info.classList.add("info");
            info.append(para1);
            info.append(para2);
            info.append(para3);
            businessinfo.append(businessimage);
            businessinfo.append(info);
            cardhead.append(h4);
            cardhead.append(document.createElement("hr"));
            card.append(cardhead);
            card.append(businessinfo);
            businesscards.append(card);

        });

    }
    catch(error){
        console.error(error);

    }
    
})

const grid=document.querySelector(".grid");
const list=document.querySelector(".list");

grid.addEventListener("click", async()=>{
    const businesscards=document.querySelector("#business-container");
    if(businesscards.classList.contains("business-list"))
    {
        businesscards.classList.remove("business-list");
    }
    businesscards.classList.add("business-cards");
    businesscards.innerHTML=``;

    try{
           var response= await fetch("./data/members.json");
            const data=await response.json();
           
           data.forEach(company => {
            const card = document.createElement("div");
            card.classList.add("card");
            const cardhead=document.createElement("div");
            cardhead.classList.add("card-head");
            const h4=document.createElement("h4");
            h4.innerHTML=`${company.name}`;
            const para1=document.createElement("p");
            para1.innerHTML=`<b>Address: </b>${company.address}`;
            const para2=document.createElement("p");
            para2.innerHTML=`<b>Phone: </b>${company.phone}`;
            const para3=document.createElement("p");
            para3.innerHTML=`<b>URL: </b><a href="${company.website}">${company.website}</a>`;
            const businessinfo=document.createElement("div");
            businessinfo.classList.add("business-info");
            const businessimage= document.createElement("div");
            businessimage.classList.add("business-image");
            const img=document.createElement("img");
            img.setAttribute("src",company.image);
            img.setAttribute("alt","company logo");
            img.setAttribute("loading","lazy")
            businessimage.append(img);
            const info=document.createElement("div");
            info.classList.add("info");
            info.append(para1);
            info.append(para2);
            info.append(para3);
            businessinfo.append(businessimage);
            businessinfo.append(info);
            cardhead.append(h4);
            cardhead.append(document.createElement("hr"));
            card.append(cardhead);
            card.append(businessinfo);
            businesscards.append(card);

        });

    }
    catch(error){
        console.error(error);

    }


})

list.addEventListener("click", async()=>{
    const businesslist=document.querySelector("#business-container");
    if(businesslist.classList.contains("business-cards")){
        businesslist.classList.remove("business-cards");
    }
    businesslist.classList.add("business-list");
    businesslist.innerHTML="";
    try{
        var response= await fetch("./data/members.json");
        const data=await response.json();
        data.forEach(company => {
            const div1=document.createElement("div");
            const para1=document.createElement("p");
            para1.innerHTML=`${company.name}`;
            const para2=document.createElement("p");
            para2.innerHTML=`${company.address}`;
            const para3=document.createElement("p");
            para3.innerHTML=`${company.phone}`;
            const para4=document.createElement("p");
            para4.innerHTML=`<a href="${company.website}">${company.website}</a>`;
            div1.classList.add("list-item");
            div1.append(para1);
            div1.append(para2);
            div1.append(para3);
            div1.append(para4);
            businesslist.append(div1);


        })
       
    }
    catch(error){
        console.error(error);
    }


})