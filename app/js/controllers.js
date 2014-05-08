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

        $scope.txtLoginDefaultMessage = "Please enter a login name";
        $scope.txtLogin = $scope.txtLoginDefaultMessage;
        $scope.txtPass1 = "";
        $scope.txtPass2 = "";
        $scope.msgLogin = "";
        $scope.msgPass1 = "";
        $scope.msgPass2 = "";
        $scope.msgStatus = "";

        $scope.register = function(){
            $scope.msgLogin = "";
            $scope.msgPass1 = "";
            $scope.msgPass2 = "";
            $scope.msgStatus = "";
            console.log('register clicked, login='+$scope.txtLogin+', pass1='+$scope.txtPass1+' , pass2='+$scope.txtPass2);
            console.log('register $scope.txtLogin.length=' + $scope.txtLogin.length);

            if ($scope.txtLogin.length <4) {
                $scope.msgLogin = "Error: Login name must be at least 6 characters!";
                return;
            }

            if ($scope.txtPass1 != $scope.txtPass2) {
                $scope.msgPass2 = "Error: Passwords must match!";
                return;
            }

            $http({method: 'GET', url: 'http://localhost:3000/createuser?login='+$scope.txtLogin + '&password='+$scope.txtPass1}).
                success(function(data) {
                    console.log('success: data:' + JSON.stringify( data ));
                    if (data.code == "OK"){
                        $scope.msgStatus = "You have been registered successfully!"
                    }else
                    {
                        $scope.msgStatus = "Error registering:"+data.code;
                    }

                }).
                error(function(data) {
                    console.log('error: data:' + JSON.stringify( data ));
                    $scope.msgStatus = "Unknown Error during registering:" + JSON.stringify(data);
                });
        }

        $scope.clearInitialMessage = function(){
            if ($scope.txtLogin == $scope.txtLoginDefaultMessage ) $scope.txtLogin = "";
        }
    }]);

