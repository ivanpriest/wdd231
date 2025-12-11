
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

// Load and display FEATURED schools (4 items on home page)
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("./data/schools.json");
        const schools = await response.json();
        
        // LOCAL STORAGE: Get saved view preference
        const savedView = localStorage.getItem("schoolsView") || "grid";
        const featuredSchools = document.querySelector(".featured-schools");
        
        // Get only 4 schools for home page
        const featuredSchoolsData = schools.slice(0, 4);
        
        if (savedView === "list") {
            featuredSchools.classList.add("business-list");
            showFeaturedListView(featuredSchoolsData);
            list.classList.add("active");
        } else {
            featuredSchools.classList.add("business-cards");
            showFeaturedGridView(featuredSchoolsData);
            grid.classList.add("active");
        }

    } catch (error) {
        console.error("Error loading schools:", error);
        const featuredSchools = document.querySelector(".featured-schools");
        featuredSchools.innerHTML = `<p>Error loading schools. Please check console.</p>`;
    }
});

// Grid view function
const grid = document.querySelector(".grid");
grid.addEventListener("click", async () => {
    try {
        const response = await fetch("./data/schools.json");
        const schools = await response.json();
        
        // Get only 4 schools for home page
        const featuredSchoolsData = schools.slice(0, 4);
        showFeaturedGridView(featuredSchoolsData);
        
        // LOCAL STORAGE: Save preference
        localStorage.setItem("schoolsView", "grid");
        
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
        
        // Get only 4 schools for home page
        const featuredSchoolsData = schools.slice(0, 4);
        showFeaturedListView(featuredSchoolsData);
        
        // LOCAL STORAGE: Save preference
        localStorage.setItem("schoolsView", "list");
        
        // Update active button
        list.classList.add("active");
        grid.classList.remove("active");
        
    } catch (error) {
        console.error("Error:", error);
    }
});

// Show FEATURED grid view (4 schools)
function showFeaturedGridView(schools) {
    const featuredSchools = document.querySelector(".featured-schools");
    featuredSchools.classList.remove("business-list");
    featuredSchools.classList.add("business-cards");
    featuredSchools.innerHTML = ``;
    
    // Show only 4 schools on home page
    schools.forEach(school => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        const cardhead = document.createElement("div");
        cardhead.classList.add("card-head");
        
        const h4 = document.createElement("h4");
        h4.innerHTML = `${school.name}`;
        
        // DISPLAY 4+ PROPERTIES:
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
        
        // MODAL: Add click event for school details
        card.addEventListener("click", () => {
            showSchoolModal(school);
        });
        
        featuredSchools.append(card);
    });
}

// Show FEATURED list view (4 schools)
function showFeaturedListView(schools) {
    const featuredSchools = document.querySelector(".featured-schools");
    featuredSchools.classList.remove("business-cards");
    featuredSchools.classList.add("business-list");
    featuredSchools.innerHTML = "";
    
    // Show only 4 schools on home page
    schools.forEach(school => {
        const div1 = document.createElement("div");
        
        // DISPLAY 4+ PROPERTIES:
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
        
        // MODAL: Add click event for school details
        div1.addEventListener("click", () => {
            showSchoolModal(school);
        });
        
        featuredSchools.append(div1);
    });
}

// Helper functions
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

// In the DOMContentLoaded function, add this line after fetching schools:
const savedView = localStorage.getItem("schoolsView") || "grid";

// In the grid button click event, add this line:
localStorage.setItem("schoolsView", "grid");

// In the list button click event, add this line:
localStorage.setItem("schoolsView", "list");
// MODAL: Show school details
function showSchoolModal(school) {
    // Create modal if it doesn't exist
    let modal = document.querySelector(".modal");
    if (!modal) {
        modal = document.createElement("dialog");
        modal.className = "modal";
        document.body.appendChild(modal);
    }
    
    // Populate modal with 4+ properties
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
    
    // Show modal
    modal.showModal();
    
    // Close button
    modal.querySelector(".close-btn").addEventListener("click", () => {
        modal.close();
    });
    
    // Close on backdrop click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}