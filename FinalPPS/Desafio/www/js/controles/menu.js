
angular.module('menu.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {

	
  	$scope.UsuarioLogueado=firebase.auth().currentUser;
  	//console.log($scope.UsuarioLogueado.email);
	//console.info($scope.UsuarioLogueado.email);

  $scope.LogOut = function(){

    firebase.auth().signOut().catch(function(Error){
      console.log("Error: ", Error);
    }).then(function(Respuesta){
      console.log("Respuesta: ", Respuesta);
	$state.go("login");

    });
	}

});
