/*
Code by Ronit Yadav<ry176@student.aru.ac.uk>
As part of the major project 2022-23
*/

// Add an event listener to ensure the script runs after the DOM (Document Object Model) has fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Fetching prediction and displaying hostname
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;

        let urlDiv = document.getElementById('url');
        if (urlDiv) {
            urlDiv.textContent = 'Hostname: ' + hostname;
        }

        fetch('https://ronityadav.pythonanywhere.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: url})
        })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.getElementById('result');
            let probLegitimateDiv = document.getElementById('prob-legitimate');
            let probPhishingDiv = document.getElementById('prob-phishing');
            
            if (resultDiv && probLegitimateDiv && probPhishingDiv) {
                resultDiv.textContent = 'Prediction: ' + data.prediction;
                probLegitimateDiv.textContent = 'Probability Legitimate: ' + data.probability_legitimate * 100 + '%';
                probPhishingDiv.textContent = 'Probability Phishing: ' + data.probability_phishing * 100 + '%';
            }
        });

        // Listen for messages (potentially from background.js or other scripts)
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if(request.hostname) {
                    document.getElementById("hostname").textContent = request.hostname;
                }
            }
        );
    });

    // Navigating to settings.html when the settings button is clicked
    document.getElementById('settings-button').addEventListener('click', function() {
        window.location.href = 'settings.html';
    });

    // Toggling dark mode
    document.getElementById('darkModeToggle').addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
    });
});

