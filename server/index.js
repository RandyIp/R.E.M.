require("dotenv").config();
const express = require('express')
const app = express()
const path = require("path");
const serveStatic = require('serve-static')

// set get requests for js to gzip
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(path.join(__dirname, "../client/dist")))

app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);