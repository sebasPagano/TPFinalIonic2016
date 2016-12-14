
angular.module('CrearDesafio.controllers', ['ngCordova'])

.controller('CrearDesafioCtrl', function($scope, UsuarioService, $timeout,$state,$cordovaVibration,DesafioService) {

  $scope.usuario = {};
  $scope.desafio = {};
  $scope.desafio.creador = firebase.auth().currentUser.uid;
  $scope.desafio.disponible=true;
  $scope.desafio.computado=false;
  $scope.desafio.jugador="";
  $scope.desafio.valor=50;
  $scope.desafio.quienGano="";
  $scope.desafio.quienPerdio="";

    $scope.arrayDias = Array.from(Array(6).keys()); 
  $scope.arrayHoras = Array.from(Array(24).keys()); 
  $scope.arrayMinutos = Array.from(Array(60).keys()); 
  $scope.arraySegundos = Array.from(Array(60).keys());

    $scope.tiempo = { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  console.log($scope.arrayDias);

  $scope.Aceptar=function(){
      var fechaFin;
      if ($scope.tiempo.dias == 0 && $scope.tiempo.horas == 0 && $scope.tiempo.minutos == 0 && $scope.tiempo.segundos == 0){
        alert("Debe seleccionar alguno");
        return false;
      }
      else{
        fechaFin = new Date();
        if ($scope.tiempo.dias != 0)
          fechaFin.setDate(fechaFin.getDate() + parseInt($scope.tiempo.dias));
        if ($scope.tiempo.horas != 0)
          fechaFin.setHours(fechaFin.getHours() + parseInt($scope.tiempo.horas));
        if ($scope.tiempo.minutos != 0)
          fechaFin.setMinutes(fechaFin.getMinutes() + parseInt($scope.tiempo.minutos));
        if ($scope.tiempo.segundos != 0)
          fechaFin.setSeconds(fechaFin.getSeconds() + parseInt($scope.tiempo.segundos));
      }

      $scope.desafio.fechaInicio = new Date().getTime(); //firebase.database.ServerValue.TIMESTAMP;
      $scope.desafio.fechaFin = fechaFin.getTime();

      var id = firebase.auth().currentUser.uid;
      UsuarioService.BuscarPorId(id).then(function(respuesta){
        //console.info(respuesta);
        $scope.usuario=respuesta;
        if($scope.usuario.credito < $scope.desafio.valor)
        {
         // $scope.showPopup('Saldo Insuficiente', 'No posee el crédito suficiente para crear un desafío por el valor ingresado.');
          return;
        }
        $scope.usuario.credito -= $scope.desafio.valor;
        UsuarioService.Modificar($scope.usuario);
        DesafioService.add($scope.desafio);
        console.log("Desafio agregado");
      },function(error){
        console.log(error);
      });

      //$scope.showPopup('El desafio se ha guardado correctamente', '', 'button-balanced');

      $state.go('app.perfil');
    }

});
