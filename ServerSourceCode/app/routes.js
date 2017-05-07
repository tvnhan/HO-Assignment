// load model
var Driver = require('./model/driver');
var Location = require('./model/location');
var Passenger = require('./model/passenger');


module.exports = function (app, dirname) {


// api ---------------------------------------------------------------------
//A driver or passenger can sign up with a POST method.
    app.post('/drivers', function (req, res) {

        console.log(req.body);
        Driver.create({
            name: req.body.name,
            state: "available"
        }, function (err, driverData) {
            if (err)
                res.send(err);

            //return
            res.json(driverData);
        });

    });

    app.post('/passengers', function (req, res) {

        console.log(req.body);
        Passenger.create({
            name: req.body.name,
            type: "passenger"
        }, function (err, passengerData) {
            if (err)
                res.send(err);

            // return
            res.json(passengerData);
        });

    });


//Drivers will update their locations with a PUT request.
//     PUT /drivers/123/locations
//     {
//         "lng": 10.776345,
//         "lat": 106.686175
//     }

    app.put('/drivers/:id/locations', function (req, res, next) {
        console.log(req.body);

        //save to database
        Location.create({
            id: req.params.id,
            lat: parseFloat(req.body.lat),
            lng: parseFloat(req.body.lng)
        }, function (err, data) {
            if (err)
                res.send(err);

        });

        //cache the latest location of driver
        require('./cache/cache_location').updateLocation(req.params.id,
            {
                lat: parseFloat(req.body.lat),
                lng: parseFloat(req.body.lng)
            });

        //response to client
        var respVa = {
            id: req.params.id,
            location: {
                lat: parseFloat(req.body.lat),
                lng: parseFloat(req.body.lng)
            }
        };
        res.json(respVa);
    });





//To update the driver's status, we make a PATCH request:
//     PATCH /drivers/123
//     {
//         "driver": {
//         "state": "available"
//     }
//     }
    app.put('/drivers/:id', function (req, res) {
        console.log(req.body);

        var updateData = {
            state: req.body.driver.state
        };

        //update status in database
        Driver.findByIdAndUpdate(req.params.id, updateData, function (err, post) {
            if (err) return res.send(err);
        });

        //remove driver in cache
        if (req.body.driver.state == "busy") {
            require('./cache/cache_location').removeDriver(req.params.id);
        }


        //response to client
        var respVa = {
            data: {
                id: req.params.id,
                type: "driver",
                state: req.body.driver.state
            }
        };
        res.json(respVa);
    });

// A passenger can submit a ride request through a POST endpoint

    // POST /requests
    // {
    //     "passenger_id": 123,
    //     "location": {
    //     "lng": 123,
    //         "lat": 456
    // }
    // }

    // {
    //     "driver_id": 4,
    //     "location": {
    //     "lat": ...,
    //     "lng": ...
    // }
    // },
    // {
    //     "driver_id": 2,
    //     "location": {
    //     "lat": ...,
    //     "lng": ...
    // }
    app.post('/requests', function (req, res) {

        console.log(req.body);
        var dataResp = require('./cache/cache_location').findNearstNeighboor(
            parseFloat(req.body.location.lat),
            parseFloat(req.body.location.lng));
        res.json(dataResp);

    });

//A request can be submitted to trace a driver's past location within the last 30 minutes. (GET)


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};







