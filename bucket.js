const cmdArgs = require('command-line-args')

const cmdOptions = [
	{ name: 'config', alias: 'c', type: String},
	{ name: 'debug', type: Boolean}
]
const options = cmdArgs(cmdOptions)

const Actor = (options.debug) ?  require('../cllibsecureamqp').Actor : require('secureamqp').Actor

options.config = options.config || "./config"
const config = require(options.config)
const toAddress = options.senda
const data = [1,2,3,4,5,6,7,8,9,0]
const manifest = {
	name: 'myData',
	type: Array,
	iat: new Date().toISOString(),
	hash: "deadbeef",
	authActors: ["YAkJunLY0Pv3AjZHD++blx5PKOYydceseKmejkQqCGA="]
}

async function main() {
	const bucket = new Actor(config)
	await bucket.boot()
	bucket.exposeAsset('myData', manifest, data, function(req) {
		// return true or flase to allow to serve data
		return true
	})
	setInterval(() => {
		data[0] += 1
		bucket.updateData('myData', manifest, data)
	}, 3000)
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


