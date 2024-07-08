// document.addEventListener('DOMContentLoaded', () => {
//     chrome.runtime.onInstalled.addEventListener(r => {
//         chrome.tabs.create({
//             url: 'onboard.html'
//         })
//     })
// })

// Block page if exsting in blocked websites
const blocked = [
   // "www.youtube.com",
   "facebook.com",
    "example.com"
]

const blockedPage = ''

blocked.map(el => {
    let currentUrl =  window.location.origin;
    if(currentUrl.includes(el.toLowerCase())){
        window.location.href = chrome.runtime.getURL("chrome-extensions://invalid"); // Redirect to the block page;
    }
});

const btn = document.getElementById('advanced');
btn.onclick = () => {
    const infoDiv = document.getElementById('hidden');

    // Logic for accordion
    if (infoDiv.className.includes('hidden')) {
        infoDiv.classList.remove('hidden');
        document.getElementById('toggle').setAttribute('src', 'images/chevron-up.png');
    } else {
        infoDiv.classList.add('hidden');
        document.getElementById('toggle').setAttribute('src', 'images/chevron-down.png')
    }
}