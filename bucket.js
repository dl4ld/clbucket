const cmdArgs = require('command-line-args')

const cmdOptions = [
	{ name: 'config', alias: 'c', type: String},
	{ name: 'debug', type: Boolean}
]
const options = cmdArgs(cmdOptions)

const Actor = (options.debug) ?  require('../cllibsecureamqp').Actor : require('secureamqp').Actor

options.config = options.config || "./config"
const config = require(options.config)
const toAddress = options.send

async function main() {
	const bucket = new Actor(config)
	await bucket.boot()
	bucket.createAbility('send', false, function(req, res) {
		console.log("Copy send request ", req.msg)
		// check token
		// check auditor ids
		// open vpn
		// start data services
		res.send("OK", 200)
	})
}

main()


