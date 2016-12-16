
angular.module('menu.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {

	$scope.UsuarioLogueado = {};
  	$scope.UsuarioLogueado=firebase.auth();


  $scope.LogOut = function(){

    firebase.auth().signOut().catch(function(Error){
      console.log("Error: ", Error);
    }).then(function(Respuesta){
      console.log("Respuesta: ", Respuesta);
	$state.go("login");

    });
	}

});
