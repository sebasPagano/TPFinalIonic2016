
angular.module('perfil.controllers', ['ngCordova'])

.controller('PerfilCtrl', function($scope, $ionicModal, $timeout,$state,$cordovaVibration) {

  $scope.Cargar = function()
  {
  	$state.go('app.credito');
  }

});
