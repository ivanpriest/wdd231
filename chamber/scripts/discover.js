// discover.js - Main functionality for discover page
import attractions from '../data/attractions.mjs' assert { type: 'json' };

// DOM Elements
const attractionsGrid = document.getElementById('attractions-grid');
const visitMessage = document.getElementById('visit-message');
const lastModified = document.getElementById('last-modified');
const copyright = document.getElementById('copyright');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Update footer dates
    updateFooterDates();
    
    // Display visit message
    displayVisitMessage();
    
    // Load and display attraction cards
    displayAttractions();
    
    // Setup mobile navigation
    setupMobileNav();
});

// Update footer with current dates
function updateFooterDates() {
    const date = new Date();
    lastModified.textContent = `Last Modified: ${date.toLocaleString()}`;
    copyright.innerHTML = `&copy; ${date.getFullYear()} Tesano Chamber Of Commerce`;
}

// Display visit message using localStorage
function displayVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSince < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSince === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysSince} days ago.`;
        }
    }
    
    // Store current visit
    localStorage.setItem('lastVisit', now);
}

// Display attraction cards
function displayAttractions() {
    attractions.forEach(attraction => {
        const card = createAttractionCard(attraction);
        attractionsGrid.appendChild(card);
    });
}

// Create individual attraction card
function createAttractionCard(attraction) {
    const card = document.createElement('article');
    card.className = 'attraction-card';
    
    // Image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'card-image';
    
    const img = document.createElement('img');
    img.src = `../images/attractions/${attraction.image}`;
    img.alt = attraction.name;
    img.loading = 'lazy';
    imageDiv.appendChild(img);
    
    // Content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'card-content';
    
    // Title
    const title = document.createElement('h2');
    title.textContent = attraction.name;
    
    // Address
    const address = document.createElement('address');
    address.textContent = attraction.address;
    
    // Description
    const description = document.createElement('p');
    description.textContent = attraction.description;
    
    // Learn More Button
    const button = document.createElement('button');
    button.className = 'learn-more-btn';
    button.textContent = 'Learn More';
    button.addEventListener('click', () => {
        alert(`More information about ${attraction.name} coming soon!`);
    });
    
    // Assemble card
    contentDiv.appendChild(title);
    contentDiv.appendChild(address);
    contentDiv.appendChild(description);
    contentDiv.appendChild(button);
    
    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    
    return card;
}

// Mobile navigation setup
function setupMobileNav() {
    const ham = document.querySelector(".ham");
    if (ham) {
        ham.addEventListener("click", () => {
            const nav = document.querySelector(".nav");
            ham.classList.toggle("close");
            nav.classList.toggle("show");
        });
    }
}