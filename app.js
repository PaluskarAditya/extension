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
	"www.facebook.com"
]

const blockedPage = ''

blocked.map(el => {
    if (window.location.href.includes(el)) {
        document.body.innerHTML = `
        <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: black; color: white;">
            <h1 style="color: white; font-size: 40px; font-weight: 100; display: flex; justify-content: center; align-items: center; gap: 10px;">404 | page not found</h1>
        </div>
    `;
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

const login = document.getElementById('login');

login.onclick = () => alert('Login Successfull!!!')