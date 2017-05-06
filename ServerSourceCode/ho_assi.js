"use strict";

const express = require('express');
const app = express();

var port = 5009;


app.listen(port, function() {
    console.log('listening on '+ port);
});


