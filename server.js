const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/algorithms', (req, res) => {
    console.log('recieve post request');
    console.log(req.body);
    res.send('Ok')
});


// Implement algorithms from python to js
function shelf_nf(rectangles, W, H){
    let shelf = null;
    let shelf_count = 0;
    let points = [];
}


app.listen(port, () => console.log(`Listening on port ${port}`));




