// ----------------------------------
// SAFE-SELECT Helper Function
// ----------------------------------
function $(selector) {
    return document.querySelector(selector);
}

// ----------------------------------
// MOBILE NAV
// ----------------------------------
const ham = $(".ham");
const nav = $(".nav");

if (ham) {
    ham.addEventListener("click", () => {
        ham.classList.toggle("close");
        nav.classList.toggle("show");
    });
}

// ----------------------------------
// FOOTER INFO
// ----------------------------------
const lastModified = $("#last-modified");
if (lastModified) {
    lastModified.textContent = `Last Modified: ${new Date().toLocaleString()}`;
}

const copyright = $("#copyright");
if (copyright) {
    copyright.innerHTML = `&copy; ${new Date().getFullYear()} Tesano Chamber Of Commerce`;
}

// ----------------------------------
// DIRECTORY PAGE ONLY
// ----------------------------------
const businessContainer = $("#business-container");

if (businessContainer) {
    // Only run business loading on directory.html
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch("./data/members.json");
            const data = await response.json();

            businessContainer.classList.add("business-cards");

            data.forEach(company => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <div class="card-head">
                        <h4>${company.name}</h4>
                        <hr>
                    </div>
                    <div class="business-info">
                        <div class="business-image">
                            <img src="${company.image}" alt="company logo" loading="lazy">
                        </div>
                        <div class="info">
                            <p><b>Address:</b> ${company.address}</p>
                            <p><b>Phone:</b> ${company.phone}</p>
                            <p><b>URL:</b> <a href="${company.website}">${company.website}</a></p>
                        </div>
                    </div>
                `;

                businessContainer.append(card);
            });
        } catch (err) {
            console.error("Directory Load Error:", err);
        }
    });
}

// ----------------------------------
// GRID / LIST BUTTONS (directory only)
// ----------------------------------
const grid = $(".grid");
const list = $(".list");

if (grid && list && businessContainer) {
    grid.addEventListener("click", async () => {
        businessContainer.className = "business-cards";
        businessContainer.innerHTML = "";
        loadDirectoryCards();
    });

    list.addEventListener("click", async () => {
        businessContainer.className = "business-list";
        businessContainer.innerHTML = "";
        loadDirectoryList();
    });
}

// ----------------------------------
// WEATHER FUNCTIONS (home only)
// ----------------------------------
async function loadCurrentWeather() {
    const weatherIcon = $(".weather-icon");
    const weatherdetails = $(".weather-details");

    if (!weatherIcon || !weatherdetails) return; // <- IMPORTANT FIX

    const lat = "5.577693814474199";
    const lon = "-0.20373718508071323";
    const APIkey = "bf9dd350cd169ab543cf79f3493e876b";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;

        weatherdetails.innerHTML = `
            <p>${data.main.temp.toFixed(1)} °C</p>
            <p>${data.weather[0].description}</p>
        `;
    } catch (err) {
        console.error("Weather Error:", err);
    }
}

async function loadForecast() {
    const forecastContainer = $(".forecast");
    if (!forecastContainer) return;

    const lat = "5.577693814474199";
    const lon = "-0.20373718508071323";
    const APIkey = "bf9dd350cd169ab543cf79f3493e876b";

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        forecastContainer.innerHTML = "";

        daily.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });

            const div = document.createElement("div");
            div.classList.add("forecast-day");

            div.innerHTML = `
                <h4>${date}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                <p>${day.main.temp.toFixed(1)}°C</p>
                <p>${day.weather[0].description}</p>
            `;

            forecastContainer.append(div);
        });
    } catch (err) {
        console.error("Forecast Error:", err);
    }
}

// ----------------------------------
// SPOTLIGHT MEMBERS (home only)
// ----------------------------------
async function loadSpotlights() {
    const section = $("#busi");
    if (!section) return;

    try {
        const response = await fetch("./data/members.json");
        const members = await response.json();

        const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");
        const random = filtered.sort(() => Math.random() - 0.5).slice(0, 3);

        section.innerHTML = "";

        random.forEach(member => {
            const div = document.createElement("div");
            div.classList.add("spotlight-card");

            div.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.membership} Member</p>
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            section.append(div);
        });
    } catch (err) {
        console.error("Spotlight Error:", err);
    }
}

// ----------------------------------
// RUN ONLY ON PAGES THAT HAVE ELEMENTS
// ----------------------------------
loadCurrentWeather();
loadForecast();
loadSpotlights();
