importScripts('/lib/sha1.js')
importScripts('./chrome.js')
importScripts('./functions.js')

const ORIGIN = 'https://onlyfans.com'


class OnlyFansClient {
	constructor () {
	}

	async api (method, path, options) {
		return fetch(`${ORIGIN}/api2/v2${path}`, {
			method, 
			headers: {
				"accept": "application/json, text/plain, */*",
				referer: ORIGIN
			},
			...options
		}).then(response => response.json())
	}
}
