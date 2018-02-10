var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

var port = process.env.PORT || 8080;

app.use(cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://mosh.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://api.pepper.com',
    issuer: "https://mosh.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);


app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(port);