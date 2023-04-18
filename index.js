// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//date route
app.get("/api/:date?", (req, res, next) => {
	const date = req.params.date
	const parsedDate = Date.parse(date)
	if (!date) {
		res.json({
			unix: Math.floor(new Date().getTime()),
			utc: new Date().toUTCString()
		})
	} else if (date && !Number.isNaN(parsedDate)) {
		res.json({ unix: parsedDate, utc: new Date(parsedDate).toUTCString() })
	} else if (date && !Number.isNaN(Number(date))) {
		res.json({ unix: Number(date), utc: new Date(Number(date)).toUTCString() })
	} else {
		const err = new Error("Invalid Date")
		err.status = 400
		next(err)
	}
})

// Error handling middleware
app.use(function (err, req, res, next) {
	res.status(err.status || 500)
	res.json({ error: err.message })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
