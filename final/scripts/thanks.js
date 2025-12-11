// thanks.js - Thank you page functionality

// Hamburger menu
const ham = document.querySelector(".ham");
if (ham) {
    ham.addEventListener("click", () => {
        const nav = document.querySelector(".nav");
        ham.classList.toggle("close");
        nav.classList.toggle("show");
    });
}

// Footer updates
document.addEventListener("DOMContentLoaded", function() {
    // Set copyright and last modified
    const lastModified = document.querySelector("#last-modified");
    if (lastModified) {
        lastModified.innerHTML = `Last Modified: ${new Date().toLocaleString()}`;
    }
    
    const copyright = document.querySelector("#copyright");
    if (copyright) {
        copyright.innerHTML = `&copy;${new Date().getFullYear()} Accra High Schools`;
    }
    
    // Process URL parameters and display submitted data
    displaySubmittedData();
    
    // Generate submission ID and timestamp
    generateSubmissionInfo();
});

// Function to parse URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    
    // Get all parameters
    params.forEach((value, key) => {
        data[key] = decodeURIComponent(value);
    });
    
    return data;
}

// Function to generate random submission ID
function generateSubmissionId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 6);
    return `SHS-${timestamp}-${random}`.toUpperCase();
}

// Function to format date
function formatDate(dateString) {
    if (!dateString) return new Date().toLocaleString();
    
    try {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return new Date().toLocaleString();
    }
}

// Function to generate submission info
function generateSubmissionInfo() {
    const submissionId = generateSubmissionId();
    const submissionTime = new Date().toISOString();
    
    // Store in localStorage for consistency
    localStorage.setItem('lastSubmissionId', submissionId);
    localStorage.setItem('lastSubmissionTime', submissionTime);
    
    // Display on page
    const submissionIdElement = document.getElementById('submission-id');
    const submissionTimeElement = document.getElementById('submission-time');
    
    if (submissionIdElement) {
        submissionIdElement.textContent = submissionId;
    }
    
    if (submissionTimeElement) {
        submissionTimeElement.textContent = formatDate(submissionTime);
    }
}

// Function to display submitted data
function displaySubmittedData() {
    const submittedData = getUrlParams();
    const dataContainer = document.querySelector('.data-container');
    
    if (!dataContainer || Object.keys(submittedData).length === 0) {
        // If no URL params, try localStorage
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            displayDataFromStorage(JSON.parse(savedData), dataContainer);
        }
        return;
    }
    
    // Save to localStorage for future reference
    localStorage.setItem('contactFormData', JSON.stringify(submittedData));
    
    // Display the data
    displayFormData(submittedData, dataContainer);
}

// Function to display form data from URL params
function displayFormData(data, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    // Map of field names to display labels
    const fieldLabels = {
        firstname: 'First Name',
        lastname: 'Last Name',
        schoolname: 'School Name',
        location: 'School Location',
        email: 'Email Address',
        message: 'Additional Information',
        'time-submitted': 'Submission Time'
    };
    
    // Process each field
    Object.entries(data).forEach(([key, value]) => {
        if (!value || key === 'undefined') return;
        
        const label = fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        const dataItem = document.createElement('div');
        dataItem.className = 'data-item';
        
        dataItem.innerHTML = `
            <h4>${label}</h4>
            <p>${value}</p>
        `;
        
        container.appendChild(dataItem);
    });
    
    // If no data items were added, show a message
    if (container.children.length === 0) {
        container.innerHTML = `
            <div class="data-item">
                <h4>No Data Available</h4>
                <p>Form data could not be retrieved. Please return to the contact page and submit again.</p>
            </div>
        `;
    }
}

// Function to display data from localStorage
function displayDataFromStorage(data, container) {
    if (!container) return;
    
    container.innerHTML = `
        <div class="data-item">
            <h4>Previous Submission</h4>
            <p>Displaying data from your previous submission. Please return to the contact page to submit new information.</p>
        </div>
    `;
}

// Add animation for confirmation icon
document.addEventListener('DOMContentLoaded', function() {
    const icon = document.querySelector('.confirmation-icon');
    if (icon) {
        // Add animation class after a short delay
        setTimeout(() => {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }, 100);
        
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 400);
    }
});

// In displaySubmittedData function, add this line to save form data:
localStorage.setItem('contactFormData', JSON.stringify(submittedData));

// In generateSubmissionInfo function, add this line to save submission ID:
localStorage.setItem('lastSubmissionId', submissionId);