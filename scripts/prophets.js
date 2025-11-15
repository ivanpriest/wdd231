const url='https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards=document.querySelector("#cards");

async function getProphetData() {
    try{
        const response= await fetch(url);
        const data=await response.json();
        displayProphets(data.prophets);

    }catch(error){
        console.error(error);
    }

}
getProphetData();

const displayProphets=(prophets)=>{
    prophets.forEach((prophet) => {
        const card=document.createElement("section");
        const name=document.createElement("h2");
        const portrait=document.createElement("img");
        name.textContent=`${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute("src",prophet.imageurl);
        portrait.setAttribute("alt",`portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day President`);
        portrait.setAttribute("loading","lazy");
        portrait.setAttribute("width","240");
        portrait.setAttribute("height","340");
        card.appendChild(name);
        card.appendChild(portrait);
        card.classList.add("card");
        cards.appendChild(card);
    })
}