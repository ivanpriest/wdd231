import attractions from "../data/attractions.mjs";
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

document.addEventListener("DOMContentLoaded",()=>{
    try{
         const attractionscontainer=document.querySelector("#attractions-container");
         attractions.forEach(attraction => {
            const card = document.createElement("div");
            card.classList.add("card");
            const attractionhead=document.createElement("div");
            attractionhead.classList.add("attraction-head");
            const h2=document.createElement("h2");
            h2.innerHTML=`${attraction.name}`;
            const attractionimage= document.createElement("div");
            attractionimage.classList.add("attraction-image");
            const attractioninfo=document.createElement("div");
            attractioninfo.classList.add("attraction-info");
            const img=document.createElement("img");
            img.setAttribute("src",attraction.image);
            img.setAttribute("alt","company logo");
            img.setAttribute("loading","lazy");
            const para1=document.createElement("p");
            para1.innerHTML=`${attraction.description}`;
            const address=document.createElement("address");
            address.innerText=`${attraction.address}`;
            attractionhead.append(h2);
            attractionhead.append(document.createElement("hr"));
            attractionimage.append(img);
            attractioninfo.append(address);
            attractioninfo.append(para1);
            card.append(attractionhead);
            card.append(attractionimage);
            card.append(attractioninfo);
            attractionscontainer.append(card);

        });

    }
    catch(error){
        console.error(error);

    }
    
})

const messageContainer = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = new Date();

if (!lastVisit) {
  // First time visit
  messageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const lastVisitDate = new Date(lastVisit);
  const diffTime = now - lastVisitDate; // difference in milliseconds
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert to days

  if (diffDays < 1) {
    messageContainer.textContent = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    messageContainer.textContent = "You last visited 1 day ago.";
  } else {
    messageContainer.textContent = `You last visited ${diffDays} days ago.`;
  }
}

// Store the current visit date in localStorage
localStorage.setItem("lastVisit", now.toISOString());