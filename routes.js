const fs = require("fs");
const crypto = require("crypto");

/**
 * {
	"request": {
		"verb": "GET",
		"path": "/hello",
		"body": "{\"hello\": \"world\"}"
	},
	"response": {
		"status": 200,
		"body": "{\"goodbye\": \"folks\"}"
	}
}
 * 
 */
function record(req, res) {
    const { request, response } = req.body;

    const hash = crypto.createHash('sha1').update(JSON.stringify(request)).digest('hex');
    const filename = `${__dirname}/mocks/${request.path}_${request.verb}_${hash}`;
    const body = JSON.stringify(response);
    fs.writeFileSync(filename, body);
    res.status(204).send();
}

module.exports = { record };