const express = require('express');

var app = express();
var server = app.listen(4000, () => {
    console.log('listening to requests on port 4000');
});

app.use(express.static('.\\src\\public'));