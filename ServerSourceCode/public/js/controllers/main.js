angular.module('gruberController', [])

// inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Grubers', function ($scope, $http, Grubers) {
        $scope.formData = {};
        $scope.headerTitle = "Gruber system  ";
        $scope.typeUserString = '';
        $scope.driverName = '';
        $scope.passengerName = '';
        $scope.loading = false;
        $scope.showAddName = true;
        $scope.showPutLocation = false;
        $scope.showSearchDriver = false;
        $scope.loadingDriver = false;
        $scope.driverState = "available";
        $scope.driverList = [];


        // // GET =====================================================================
        // // when landing on the page, get all todos and show them
        // // use the service to get all the todos
        // Grubers.get()
        //     .success(function (data) {
        //         $scope.todos = data;
        //         $scope.loading = false;
        //     });

        // CREATE DRIVER==================================================================
        // when submitting the add form, send the name to the node API
        $scope.createDriver = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.name != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Grubers.createDriver($scope.formData)

                // if successful creation, show alert to notify user
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.typeUserString = 'Driver  ';
                        $scope.headerTitle = "Hello  ";
                        $scope.driverName = data._id; // assign our new list of todos
                        $scope.showAddName = false;
                        $scope.showPutLocation = true;
                        $scope.driverState = "available";
                        $scope.showSearchDriver = false;
                    });
            }
        };


        // CREATE PASSENGER==================================================================
        // when submitting the add form, send the name to the node API
        $scope.createPassenger = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.name != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Grubers.createPassenger($scope.formData)

                // if successful creation, show alert to notify user
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.typeUserString = 'Passenger  ';
                        $scope.headerTitle = "Hello  ";
                        $scope.passengerName = data._id; // assign our new list of todos
                        $scope.showAddName = false;
                        $scope.showPutLocation = false;
                        $scope.showSearchDriver = true;
                    });
            }
        };


        // PUT LOCATION==================================================================
        $scope.sendLocation = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.lat != undefined && $scope.formData.lng) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                var location = {
                    lat: $scope.formData.lat,
                    lng: $scope.formData.lng
                };
                Grubers.sendLocation($scope.driverName, location)

                // if successful creation, show alert to notify user
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                    });
            }
        };


        // PATCH STATE==================================================================
        $scope.changeSate = function () {

            $scope.loading = true;

            //set state
            var state = {
                driver: {
                    state: $scope.driverState
                }
            };
            if ($scope.driverState == "available") {
                state.driver.state = "busy"
            }
            else {
                state.driver.state = "available"
            }


            Grubers.changeSate($scope.driverName, state)

            // if successful creation, show alert to notify user
                .success(function (data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.driverState = state.driver.state;
                });

        };


        // POST STATE==================================================================
        $scope.searchDriver = function () {

            $scope.loadingDriver = true;

            var dataRequest = {
                passenger_id: $scope.passengerName,
                location: {
                    lat: $scope.formData.latP,
                    lng: $scope.formData.lngP
                }
            };

            Grubers.searchDriver(dataRequest)

            // if successful creation, show alert to notify user
                .success(function (data) {
                    $scope.loadingDriver = false;
                    $scope.formData = {};
                    $scope.driverList = data;
                });

        };


    }]);