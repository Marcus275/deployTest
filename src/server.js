const express = require("express");
const app = express();


// Might need this, not sure
// app.use(express.static('public'));


app.post("/user/add", function(req, res) {
    res.send("OK");
});





const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});