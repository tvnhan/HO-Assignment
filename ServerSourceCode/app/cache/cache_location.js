/**
 * Created by navnahn on 5/7/17.
 */

"use strict";
const NUMBER_NEIGHBOOR = 5;
var dic_location = {};

exports.updateLocation = function (id, location) {
    dic_location [id] = location;
};

exports.removeDriver = function (id) {
    delete dic_location[id];
};

exports.findNearstNeighboor = function (lat, lng) {
    var listDriver = {};
    //use bruceforce algorithm for this demo
    for(var key in dic_location) {
        var loc = dic_location[key];
        var dis = _calculateDistance(loc.lat, loc.lng, lat, lng);
        if (Object.keys(listDriver).length< NUMBER_NEIGHBOOR) {
            console.log("add to list Driver");
            listDriver[key] = dis;
        }
        else {
            listDriver = _updateListDriverReturn(listDriver, key, dis);
        }
    }

    console.log("return listDriver");
    return _transformDataFormat(listDriver);
};

var _calculateDistance = function (lat1, lng1, lat2, lng2) {
    return Math.sqrt((lat1-lat2)*(lat1-lat2) + (lng1-lng2)*(lng1-lng2));
};

var _updateListDriverReturn = function (listDriver, keyI, dis) {
    var maxdis = -1;
    var savekey;
    for(var key in listDriver) {
        var dist = listDriver[key];
        if (dist> maxdis) {
            maxdis = dist;
            savekey = key;
        }
    }

    if (dis<maxdis) {
        delete listDriver[key];
        listDriver [keyI] = dis;
    }

    return listDriver;
};

var _transformDataFormat = function (listDriver) {
    // "driver_id": 4,
    //     "location": {
    //     "lat": ...,
    //     "lng": ...
    var result = [];
    for(var key in listDriver) {
        var data = {
            driver_id: key,
            location: dic_location[key]
        };
        result.push(data)
    }

    return result;
};
