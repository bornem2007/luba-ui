'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.phone = data;
    });
  }]);

/**
 * This method handles the register button click.
 * Validates input, and sends the register user backend call, dispays results.
 */
phonecatControllers.controller('RegisterCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.serverStatusError = undefined;
        $scope.serverStatusOK = undefined;
        $scope.registerStatusMessage = ""; // displayed message


        $scope.register = function(){
            console.log('register clicked, login='+$scope.user.name+',' +
                'pass1='+$scope.user.password1+' , ' +
                'pass2='+$scope.user.password2);
            $scope.serverStatusError = undefined;
            $scope.serverStatusOK = undefined;

            $http({method: 'GET', url: 'http://localhost:3000/createuser?login='+$scope.user.name + '&password='+$scope.user.password1}).
                success(function(data) {
                    console.log('success: data:' + JSON.stringify( data ));
                    if (data.code == "OK"){
                        $scope.serverStatusError = false;
                        $scope.serverStatusOK = true;
                        $scope.registerStatusMessage = "You have been successfully registered!"
                    }else
                    {
                        $scope.serverStatusError = true;
                        $scope.serverStatusOK = false;
                        $scope.registerStatusMessage = "Error registering:"+data.code;
                    }

                }).
                error(function(data) {
                    console.log('error: data:' + JSON.stringify( data ));
                    $scope.serverStatusError = true;
                    $scope.serverStatusOK = false;
                    $scope.registerStatusMessage = "Error registering:"+JSON.stringify( data );
                });
        }

        //////////////////////////////

        // function to submit the form after all validation has occurred
        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                $scope.register();
            }

        };


    }]);

