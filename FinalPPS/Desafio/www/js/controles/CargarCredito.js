
angular.module('credito.controllers', ['ngCordova'])

.controller('CargarCreditoCtrl', function($scope, $timeout,$ionicPopup,$state,$cordovaVibration,$cordovaNativeAudio,CreditoService,UsuarioService,$cordovaBarcodeScanner) {

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

      UsuarioService.BuscarPorId(id).then(function(respuesta){
      $scope.usuario = respuesta;
    },function(error){
    console.log(error);
  });


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
                  
                try{
                   $cordovaNativeAudio.play('moneda');
                   $cordovaVibration.vibrate(300);
                 }
                 catch(e)
                 {
                    console.log("Plugins solo en celulares POR FAVOR!! :)");
                 }
                 $ionicPopup.alert({
                    title: 'Se ha cargado credito satisfactoriamente!!',
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
      console.log("Plugins en celulares");
    }
  }

});
