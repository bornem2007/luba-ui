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

phonecatControllers.controller('RegisterCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {

        $scope.txtLoginDefaultMessage = "Please enter a login name";
        $scope.txtLogin = $scope.txtLoginDefaultMessage;
        $scope.txtPass1 = "";
        $scope.txtPass2 = "";

        $scope.register = function(){
            console.log('register clicked, login='+$scope.txtLogin+', pass1='+$scope.txtPass1+' , pass2='+$scope.txtPass2);

            //if $scope

            $http({method: 'GET', url: 'http://localhost:3000/createuser?login='+$scope.txtLogin + '&password='+$scope.txtPass1}).
                success(function(data, status, headers, config) {
                    console.log('success: data:' + JSON.stringify( data ));
                }).
                error(function(data, status, headers, config) {
                    console.log('error: data:' + JSON.stringify( data ));
                });
        }

        $scope.clearInitialMessage = function(){
            if ($scope.txtLogin == $scope.txtLoginDefaultMessage ) $scope.txtLogin = "";
        }
    }]);

