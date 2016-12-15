
angular.module('perfil.controllers', ['ngCordova'])

.controller('PerfilCtrl', function($scope, $ionicModal, UsuarioBatallaService,$timeout,$state,$cordovaVibration) {

  $scope.UsuarioLogueado=firebase.auth().currentUser;
	var idUsuario = $scope.UsuarioLogueado.uid

	UsuarioBatallaService.BuscarPorId(idUsuario).then(function(respuesta){
  		console.log(respuesta);
  		$scope.usuario = respuesta

  	}, function(error) {
            console.log(error);
    });

});
