async function getCookies(query) {
	return new Promise((resolve, reject) => {
		chrome.cookies.getAll(query, resolve)
	})
} 

async function downloadUrl (url) {
	chrome.downloads.download({url})
} 

function getExtensionInfo () {
	return new Promise(resolve => chrome.management.getSelf(resolve))
}