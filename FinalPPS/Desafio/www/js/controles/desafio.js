
angular.module('desafio.controllers', ['ngCordova'])

.controller('DesafioCtrl', function($scope, $ionicModal, $timeout,$state,$cordovaVibration,UsuarioService) {

  	$scope.UsuarioLogueado=firebase.auth().currentUser;
  	//$scope.EmailUsuario = $scope.UsuarioLogueado.email;

  	UsuarioService.TraerTodos().then(function(respuesta){
  		console.log(respuesta);
  	}, function(error) {
            console.log(error);
    });

});
