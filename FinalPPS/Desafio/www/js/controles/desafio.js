
angular.module('desafio.controllers', ['ngCordova'])

.controller('DesafioCtrl', function($scope, $ionicModal, $timeout,$state,$cordovaVibration) {

  	$scope.UsuarioLogueado=firebase.auth().currentUser;
  	$scope.EmailUsuario = $scope.UsuarioLogueado.email;

});
