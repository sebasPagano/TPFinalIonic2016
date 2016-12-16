angular.module('aceptarDesafio.controllers', ['ngCordova'])

.controller('AceptarDesafioCtrl', function($scope, $stateParams,$ionicPopup, $timeout,$state,$cordovaVibration,$cordovaNativeAudio,UsuarioService,DesafioService) {

var index = $stateParams.desafio;
  console.log(index);
  $scope.usuario = {};
  $scope.credito=0;

  DesafioService.BuscarPorIndex(index).then(function(respuesta){
    $scope.desafio=respuesta;
    console.log("Desafio",$scope.desafio);

    if ($scope.desafio.jugador != "" && $scope.desafio.jugador != $scope.usuario.$id){
         $ionicPopup.alert({
              title: 'Este desafio ya fue aceptado',
              cssClass:'salida',
              okType: 'button-energized',
          });
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
          
            try{
             $cordovaNativeAudio.play('incorrecto');
           }
           catch(e)
           {
              console.log("Plugins solo en celulares POR FAVOR!! :)");
           }

          $ionicPopup.alert({
              title: 'Saldo Insuficiente.',
              cssClass:'salida',
              okType: 'button-energized',
          });
        return;
      }else
      {

      try{
         $cordovaNativeAudio.play('correcto');
       }
       catch(e)
       {
          console.log("Plugins solo en celulares POR FAVOR!! :)");
       }
      $scope.usuario.credito -= $scope.desafio.valor;
      UsuarioService.Modificar($scope.usuario);
      DesafioService.Modificar($scope.desafio);
      console.log("Desafio modificado");
      $ionicPopup.alert({
              title: 'Desafio Aceptado.',
              cssClass:'salida',
              okType: 'button-energized',
          });
     
      $state.go('app.desafios');
    }
  }

});
