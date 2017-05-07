angular.module('gruberService', [])

// super simple service
// each function returns a promise object
    .factory('Grubers', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            createDriver : function(driverName) {
                return $http.post('/drivers', driverName);
            },

            createPassenger : function(passengerName) {
                return $http.post('/passengers', passengerName);
            },

            sendLocation : function (id, location) {
                return $http.put('/drivers/'+id+'/locations', location);
            },

            changeSate : function (id, state) {
                return $http.put('/drivers/'+id, state);
            },

            searchDriver: function (requestData) {
                return $http.post('/requests', requestData);
            }
            
        }
    }]);