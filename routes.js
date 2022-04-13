const fs = require("fs");
const crypto = require("crypto");

function getFilename(request) {
    // TODO: this makes it consistent across the real request and the record, but it limits us to only JSON
    // maybe use a custom format instead of JSON for the record?
    const toHash = `${request.verb}${request.path}${JSON.stringify(request.body)}`;
    console.log(toHash);
    const hash = crypto.createHash('sha1').update(toHash).digest('hex');
    return `${__dirname}/mocks${request.path}_${request.verb}_${hash}`;
}

/**
 * {
	"request": {
		"verb": "GET",
		"path": "/hello",
		"body": "{\"hello\":\"world\"}" // this has to be JSON.stringified
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
    const filename = getFilename(request);
    fs.writeFileSync(filename, JSON.stringify(response));
    res.status(204).send();
}

function mock(req, res) {
    const request = {
        verb: req.method,
        path: req.path,
        body: JSON.stringify(req.body)
    }
    const filename = getFilename(request);
    
    const body = JSON.parse(fs.readFileSync(filename));
    console.log(body);
    res.status(body.status).send(body.body);
}

module.exports = { record, mock };