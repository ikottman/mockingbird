const express = require("express");
const PORT = 8080;

// Create an express app
const app = express();

// express.json():be able to read request bodies of JSON requests a.k.a. body-parser
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.get("/", (req, res) => {
  res.json({"hello": "world"})
});

app.get("/hello", (req, res) => {
  res.json({"hello": "world"})
});


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
