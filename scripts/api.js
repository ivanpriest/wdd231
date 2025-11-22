// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const lat="5.577693814474199";
const lon="-0.20373718508071323";
const APIkey="bf9dd350cd169ab543cf79f3493e876b";
const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;

async function apifetch(){

    try  {
        const response=await fetch(url);
        if(response.ok){
            const data =await response.json();
            // console.log(data);
            captionDesc.innerHTML=`${data.weather[0].icon}`;
              
    }
    else {
        throw Error(await response.text());
    }
      }
    catch(error){
        console.error(error);
    }
   

}
apifetch();