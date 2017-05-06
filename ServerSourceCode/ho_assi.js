"use strict";

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const config = require('config');




var master_db_config = config.get('db');
var master_db_schema = 'mongodb://' + master_db_config.user + ':' + master_db_config.password + '@' + master_db_config.url;
var db;




MongoClient.connect(master_db_schema, function (err, database) {
    if (err) return console.log(err);

    db = database;
    app.listen(config.get('port'), function() {
        console.log('listening on '+ config.get('port'));
    });

    //console.log(database.listCollections);
});

app.get('/', function (req, res) {
    res.send('Welcome to gruber system \ TccHtnn');
});



app.get('/testdb', function (req, res) {
    console.log('get masterdata!')


        var docs = {
            "name" : "navnahn"
        };
        db.collection(config.get('collection_name.driver')).insertOne(docs, function (err, result) {
            console.log("Inserted a document.");
            if (err == null) {
                console.log("result.insertedId");
                // //return callback with objectID
                // callback(result.insertedId);
                res.send("Insert OK");
            }
        });

});



