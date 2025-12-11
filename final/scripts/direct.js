// direct.js - EXACT SAME as home.js but shows ALL schools

const ham = document.querySelector(".ham");
ham.addEventListener("click", () => {
    const nav = document.querySelector(".nav");
    ham.classList.toggle("close");
    nav.classList.toggle("show");
});

// Footer updates
const lastModified = document.querySelector("#last-modified");
const date = new Date();
lastModified.innerHTML = `Last Modified: ${date.toLocaleString()}`;

const copyright = document.querySelector("#copyright");
copyright.innerHTML = `&copy;${date.getFullYear()} Accra High Schools`;

// Load and display ALL schools in directory
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("./data/schools.json");
        const schools = await response.json();
        
        // LOCAL STORAGE: Get saved view preference
        const savedView = localStorage.getItem("directoryView") || "grid";
        const schoolsContainer = document.querySelector(".schools-container");
        
        // IMPORTANT: Use ALL schools (no .slice())
        const allSchools = schools; // ALL schools, not just 4
        
        if (savedView === "list") {
            schoolsContainer.classList.add("business-list");
            showListView(allSchools); // Show ALL schools
            list.classList.add("active");
        } else {
            schoolsContainer.classList.add("business-cards");
            showGridView(allSchools); // Show ALL schools
            grid.classList.add("active");
        }

    } catch (error) {
        console.error("Error loading schools:", error);
        const schoolsContainer = document.querySelector(".schools-container");
        schoolsContainer.innerHTML = `<p>Error loading schools. Please check console.</p>`;
    }
});

// Grid view function
const grid = document.querySelector(".grid");
grid.addEventListener("click", async () => {
    try {
        const response = await fetch("./data/schools.json");
        const schools = await response.json();
        
        // Use ALL schools
        const allSchools = schools; // ALL schools, not just 4
        showGridView(allSchools);
        
        // LOCAL STORAGE: Save preference
        localStorage.setItem("directoryView", "grid");
        
        // Update active button
        grid.classList.add("active");
        list.classList.remove("active");
        
    } catch (error) {
        console.error("Error:", error);
    }
});

// List view function
const list = document.querySelector(".list");
list.addEventListener("click", async () => {
    try {
        const response = await fetch("./data/schools.json");
        const schools = await response.json();
        
        // Use ALL schools
        const allSchools = schools; // ALL schools, not just 4
        showListView(allSchools);
        
        // LOCAL STORAGE: Save preference
        localStorage.setItem("directoryView", "list");
        
        // Update active button
        list.classList.add("active");
        grid.classList.remove("active");
        
    } catch (error) {
        console.error("Error:", error);
    }
});

// Show ALL grid view (EXACT SAME as home.js)
function showGridView(schools) {
    const schoolsContainer = document.querySelector(".schools-container");
    schoolsContainer.classList.remove("business-list");
    schoolsContainer.classList.add("business-cards");
    schoolsContainer.innerHTML = ``;
    
    // Loop through ALL schools
    schools.forEach(school => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        const cardhead = document.createElement("div");
        cardhead.classList.add("card-head");
        
        const h4 = document.createElement("h4");
        h4.innerHTML = `${school.name}`;
        
        // EXACT SAME PROPERTIES as home page:
        const para1 = document.createElement("p");
        para1.innerHTML = `<b>📍 Location:</b> ${school.location}`;
        
        const para2 = document.createElement("p");
        para2.innerHTML = `<b>🏷️ Category:</b> ${school.category}`;
        
        const para3 = document.createElement("p");
        para3.innerHTML = `<b>📅 Founded:</b> ${getFoundedYear(school.history)}`;
        
        const para4 = document.createElement("p");
        para4.innerHTML = `<b>🎓 Type:</b> ${getSchoolType(school.history)}`;
        
        const businessinfo = document.createElement("div");
        businessinfo.classList.add("business-info");
        
        const businessimage = document.createElement("div");
        businessimage.classList.add("business-image");
        
        const img = document.createElement("img");
        img.setAttribute("src", school.logo);
        img.setAttribute("alt", `${school.name} logo`);
        img.setAttribute("loading", "lazy");
        businessimage.append(img);
        
        const info = document.createElement("div");
        info.classList.add("info");
        info.append(para1);
        info.append(para2);
        info.append(para3);
        info.append(para4);
        
        businessinfo.append(businessimage);
        businessinfo.append(info);
        
        cardhead.append(h4);
        cardhead.append(document.createElement("hr"));
        
        card.append(cardhead);
        card.append(businessinfo);
        
        // MODAL: Add click event
        card.addEventListener("click", () => {
            showSchoolModal(school);
        });
        
        schoolsContainer.append(card);
    });
}

// Show ALL list view (EXACT SAME as home.js)
function showListView(schools) {
    const schoolsContainer = document.querySelector(".schools-container");
    schoolsContainer.classList.remove("business-cards");
    schoolsContainer.classList.add("business-list");
    schoolsContainer.innerHTML = "";
    
    // Loop through ALL schools
    schools.forEach(school => {
        const div1 = document.createElement("div");
        
        // EXACT SAME PROPERTIES as home page:
        const para1 = document.createElement("p");
        para1.innerHTML = `${school.name}`;
        
        const para2 = document.createElement("p");
        para2.innerHTML = `${school.location}`;
        
        const para3 = document.createElement("p");
        para3.innerHTML = `${school.category}`;
        
        const para4 = document.createElement("p");
        para4.innerHTML = `${getFoundedYear(school.history)}`;
        
        const para5 = document.createElement("p");
        para5.innerHTML = `${getSchoolType(school.history)}`;
        
        div1.classList.add("list-item");
        div1.append(para1);
        div1.append(para2);
        div1.append(para3);
        div1.append(para4);
        div1.append(para5);
        
        // MODAL: Add click event
        div1.addEventListener("click", () => {
            showSchoolModal(school);
        });
        
        schoolsContainer.append(div1);
    });
}

// Helper functions (EXACT SAME as home.js)
function getFoundedYear(history) {
    const foundedMatch = history.match(/Founded in (\d{4})/);
    const establishedMatch = history.match(/Established in (\d{4})/);
    
    if (foundedMatch) return foundedMatch[1];
    if (establishedMatch) return establishedMatch[1];
    return "Unknown";
}

function getSchoolType(history) {
    if (history.toLowerCase().includes("girls")) return "Girls School";
    if (history.toLowerCase().includes("boys")) return "Boys School";
    if (history.toLowerCase().includes("co-ed")) return "Co-educational";
    if (history.toLowerCase().includes("technical")) return "Technical School";
    return "General School";
}

// MODAL: Show school details (EXACT SAME as home.js)
function showSchoolModal(school) {
    let modal = document.querySelector(".modal");
    if (!modal) {
        modal = document.createElement("dialog");
        modal.className = "modal";
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <img src="${school.logo}" alt="${school.name} logo">
                <h2>${school.name}</h2>
            </div>
            <div class="modal-body">
                <p><strong>📍 Location:</strong> ${school.location}</p>
                <p><strong>🏷️ Category:</strong> ${school.category}</p>
                <p><strong>📅 Founded:</strong> ${getFoundedYear(school.history)}</p>
                <p><strong>🎓 Type:</strong> ${getSchoolType(school.history)}</p>
                <p><strong>📚 History:</strong> ${school.history}</p>
            </div>
            <div class="modal-footer">
                <button class="close-btn">Close</button>
            </div>
        </div>
    `;
    
    modal.showModal();
    
    modal.querySelector(".close-btn").addEventListener("click", () => {
        modal.close();
    });
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}
// In the DOMContentLoaded function, add this line after fetching schools:
const savedView = localStorage.getItem("directoryView") || "grid";

// In the grid button click event, add this line:
localStorage.setItem("directoryView", "grid");

// In the list button click event, add this line:
localStorage.setItem("directoryView", "list");