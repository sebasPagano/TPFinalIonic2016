
angular.module('perfil.controllers', ['ngCordova'])

.controller('PerfilCtrl', function($scope, UsuarioService, $timeout,$state,$cordovaVibration) {

	$scope.UsuarioLogueado=firebase.auth().currentUser;
	var idUsuario = $scope.UsuarioLogueado.uid

	UsuarioService.BuscarPorId(idUsuario).then(function(respuesta){
  		console.log(respuesta);
  		$scope.usuario = respuesta

  	}, function(error) {
            console.log(error);
    });


});
