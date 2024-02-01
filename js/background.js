var window = globalThis

var OFD_ORIGIN = 'https://onlyfansdownloader.co'
var API_BASEURL = `${OFD_ORIGIN}/api/v1`

importScripts('/lib/lodash.min.js')
importScripts('./onlyfans.js')

var client = new OnlyFansClient()

chrome.runtime.onMessageExternal.addListener((msg, sender, reply) => {
	if (msg.cmd === "callFunction" && msg.args) {
		var func = _.get(window, msg.name)
		var context = msg.name.indexOf('.') > -1 ? _.get(window, msg.name.substring(0, msg.name.lastIndexOf('.'))) : window
		var result
		try {
			result = func.apply(context, msg.args)
		} catch(error) {
			reply({error: error.message})
			return
		}
		if (result && result.then) {
			result.then(result => {
				reply({result})
			})
		} else {
			reply({result})
			return
		}
		if (result && result.catch) {
			result.catch(error => {
				reply({error: error.message})
			})
		}
		if (result && result.fail) {
			result.fail(error => {
				reply({error: error.message})
			})
		}
	}

})

chrome.management.getSelf(extension => {
	chrome.cookies.set({url: OFD_ORIGIN, name: 'extensionId', value: extension.id})
})

