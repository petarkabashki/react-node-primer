var express = require('express'),
    bodyParser = require('body-parser');

var vegies = require('./mongodb/vegies')

var app = express()

app.use(express.json())

const port = 4000

// respond with "hello world" when a GET request is made to the homepage
app.get('/api/vegies', function (req, res) {
    setTimeout(async () => {
        const vegieItems = await vegies.findAll();

        res.set('Access-Control-Allow-Origin', '*');
        res.send(vegieItems);
    }, 1000)
})

app.post('/api/vegies', function (req, res) {
    console.log("endpoint HIIIIIT", req.body)
    res.set('Access-Control-Allow-Origin', '*');
    (async () => {
        await vegies.add(req.body);

        const vegieItems = await vegies.findAll();
        res.send(vegieItems);
    })()
    
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))