const stats = {
	visited: 16,
	unknown: 34,
	blacklisted: 9
}

localStorage.setItem('objects', JSON.stringify(stats));

document.addEventListener('DOMContentLoaded', () => {
	chrome.tabs.onCreated.addListener((tab) => {
		// if (tab.url.startsWith("http")) {
		alert(tab.url);
		// }
	});

	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		// if (changeInfo.url && tab.url.startsWith("http")) {
		//alert(tab.url);
		// }
	});

	// Get active tab url
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		let activeTab = tabs[0];
		let host = new URL(activeTab.url).hostname;
		let url = activeTab.url;

		document.getElementById('hostname').textContent = host;
		fetch('https://ronityadav.pythonanywhere.com/predict', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		}).then(response => response.json())
			.then(data => {
				if (data.prediction === "phishing") {
					chrome.notifications.create({
						type: 'basic',
						iconUrl: 'images/48logo_blue.png',
						title: 'Phishing Alert!',
						message: 'The site you are visiting might be a phishing site.'
					});
				} else {
					document.getElementById('prediction').textContent = data.prediction;
					document.getElementById('legit').textContent = data.probability_legitimate + '%';
					document.getElementById('phishing').textContent = data.probability_phishing + '%';
				}
			});
	});

	const logout = document.getElementById('logout');
	logout.onclick = () => {
		localStorage.clear();
		chrome.notifications.create(
			"Phishblockr Alert",
			{
				type: "basic",
				iconUrl: "./images/logo.jpg",
				title: "Logout Successfulll!!!",
				message: "you are successfully logged out",
				priority: 1
			},
			function () { }
		);
		window.location.href = './login.html';
	};

});