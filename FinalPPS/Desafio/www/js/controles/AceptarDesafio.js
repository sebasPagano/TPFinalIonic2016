angular.module('aceptarDesafio.controllers', ['ngCordova'])

.controller('AceptarDesafioCtrl', function($scope, $stateParams,$ionicPopup, $timeout,$state,$cordovaVibration,UsuarioService,DesafioService) {

var index = $stateParams.desafio;
  console.log(index);
  $scope.usuario = {};
  $scope.credito=0;

  DesafioService.BuscarPorIndex(index).then(function(respuesta){
    $scope.desafio=respuesta;
    console.log("Desafio",$scope.desafio);
      // Esta validacion no va a estar cuando se permita que un desafio sea aceptado por mas de 1 usuario
    if ($scope.desafio.jugador != "" && $scope.desafio.jugador != $scope.usuario.$id){
    //  $scope.showPopup('Desafio no disponible', 'El desafío ya ha sido aceptado por otro usuario.');
      $state.go('app.desafios');
    }
  },function(error){
    console.log(error);
  });

var id = firebase.auth().currentUser.uid;
  UsuarioService.BuscarPorId(id).then(function(respuesta){
    $scope.usuario=respuesta;
    if($scope.usuario)
      $scope.credito = $scope.usuario.credito;
  },function(error){
    console.log(error);
  });

  $scope.AceptarDesafio=function(){
      $scope.desafio.jugador = $scope.usuario.$id;
      if($scope.usuario.credito < $scope.desafio.valor){
        //$scope.showPopup('Saldo Insuficiente', 'No posee el crédito suficiente para aceptar este desafío.');
        //$scope.desafio.respuestaElegida = "";
        return;
      }
      $scope.usuario.credito -= $scope.desafio.valor;
      UsuarioService.Modificar($scope.usuario);
      DesafioService.Modificar($scope.desafio);
      console.log("Desafio modificado");
      //$scope.showPopup('El desafio ha sido aceptado. El jugador que creó el desafío decidirá quién es el ganador.', '', 'button-balanced');
      $state.go('app.desafios');
  }

});
