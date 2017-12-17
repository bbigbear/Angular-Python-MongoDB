/**
 * Created by pratikdhage on 12/15/17.
 */


// added CityService as module dependency
var CityApp = angular.module("CityApp", ["CityService"]);

CityApp.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}]);


//Injected factory service 'CityOpFactory'
CityApp.controller("CityAppController", function ($scope, $http, CityOpFactory) {

    $scope.title = "this is just a starting !";

    var app = this;

    // display all data
    var refreshData = function () {

        CityOpFactory.refreshCityStateService()
            .then(function (response) {

                    app.citytable = response.data.output;

                }, function (error) {
                    console.log('can not get the data.' + error.message);
                }
            );

    };

    refreshData();

    // adds a new record
    app.addCityState = function (cityrecord) {
        if (cityrecord.cname !== '' || cityrecord.state !== '') {

            CityOpFactory.addCityStateService(cityrecord)
                .then(function (response) {

                        app.citytable.push(response.data.output);
                        refreshData();
                        $scope.cityrecord = {};

                    }, function (error) {
                        console.log('can not post the cityrecord data.' + error.message);
                    }
                );
        }
    };

    // deletes a given record
    app.deleteCityState = function (cityrecord) {

        CityOpFactory.deleteCityStateService(cityrecord)
            .then(function (response) {

                    $scope.cityrecord = response.data.output;
                    refreshData();
                        $scope.cityrecord = {};

                }, function (error) {
                    console.log('can not delete the given cityrecord data.' + error.message);
                }
            );
    };

    // edit functionality for the state for a given cityrecord
    app.editState = function (cityrecord) {

        if (cityrecord.cname !== '' || cityrecord.state !== '') {

            CityOpFactory.editCityStateService(cityrecord)
                .then(function (response) {

                        $scope.cityrecord = response.data.output;
                        refreshData();

                    }, function (error) {
                        console.log('can not edit the cityrecord data.' + error.message);
                    }
                );
        }

    };

    // updates the state for a given cityrecord
    app.updateState = function (cityrecord) {

        if (cityrecord.cname !== '' || cityrecord.state !== '') {

            CityOpFactory.updateCityStateService(cityrecord)
                .then(function (response) {

                        app.citytable.push(response.data.output);
                        refreshData();
                        $scope.cityrecord = {};

                    }, function (error) {
                        console.log('can not update the given cityrecord data.' + error.message);
                    }
                );
        }

    };


});