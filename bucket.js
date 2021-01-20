const cmdArgs = require('command-line-args')
const secureAmqp = require('../cllibsecureamqp')

const cmdOptions = [
	{ name: 'send', alias: 's', type: String},
	{ name: 'config', alias: 'c', type: String}
]
const options = cmdArgs(cmdOptions)
options.config = options.config || "./config"
const config = require(options.config)
const toAddress = options.send

async function main() {
	await secureAmqp.init(config)
	const myAddress = secureAmqp.getMyAddress()
	console.log("Actor address: ", myAddress)
	console.log("Actor keys: ", secureAmqp.keys())

	secureAmqp.registerFunction('.f.send', null, function(req, res) {
		console.log("Copy send request ", req.msg)
		// check token
		// check auditor ids
		// open vpn
		// start data services
		res.send("OK")
	})

	secureAmqp.registerFunction('.f.receive', null, function(req, res) {
		console.log("Copy receive request ", req.msg)
		// check token
		// check auditor ids
		// open vpn
		// start data services
		res.send("OK")
	})
}

main()


