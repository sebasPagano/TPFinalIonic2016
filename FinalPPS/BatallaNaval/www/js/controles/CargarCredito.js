
angular.module('credito.controllers', ['ngCordova'])

.controller('CargarCreditoCtrl', function($scope, $timeout,$ionicPopup,$state,$cordovaVibration,CreditoService,UsuarioBatallaService,$cordovaBarcodeScanner) {




	$scope.UsuarioLogueado=firebase.auth().currentUser;
	var id = $scope.UsuarioLogueado.uid;
	$scope.ListadoCreditos={};
	  $scope.carga = {};
	$scope.usuario = {};
	$scope.credito = {};

    CreditoService.TraerTodos().then(function(respuesta){
    $scope.ListadoCreditos=respuesta;
  },function(error){
    console.log(error);
  });

      UsuarioBatallaService.BuscarPorId(id).then(function(respuesta){
      $scope.usuario = respuesta;
    },function(error){
    console.log(error);
  });

    $scope.CargarCredito=function(){    
    CreditoService.BuscarPorId($scope.carga.id).then(function(respuesta){
      $scope.credito=respuesta;
      $scope.usuario.credito += parseInt($scope.credito.valor);
      UsuarioBatallaService.Modificar($scope.usuario); 

      //$scope.showPopup('Correcto!', 'Carga de credito realizada correctamente');
      $state.go('app.perfil');
    });  
  } 

  $scope.Escanear=function(){
    try
    {
      document.addEventListener("deviceready", function () {
          $cordovaBarcodeScanner.scan()
          .then(function(barcodeData) {
            if(barcodeData.text!=""){
              CreditoService.BuscarPorId(barcodeData.text).then(function(respuesta){
                $scope.credito=respuesta;
                $scope.usuario.credito += parseInt($scope.credito.valor);
                UsuarioService.Modificar($scope.usuario); 
  
                 $ionicPopup.alert({
                    title: 'Se ha cargado credito!!',
                    cssClass:'salida',
                    okType: 'button-energized',
                });
                $state.go('app.perfil');
              }); 
            }
          }, function(error) {
            console.log(error);
          });
      }, false);
    }
    catch(err)
    {
      console.log("Escanear solo en celulares");
    }
  }

});
