
angular.module('login.controllers', ['ngCordova'])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout,$state,$cordovaVibration,UsuarioService) {

  $scope.unabandera = true;
  
  $timeout(function(){
          $scope.unabandera = false;
        }, 3000);     
  
  $scope.loginData = {};
  $scope.loginData.username = "jugador1@hotmail.com";
  $scope.loginData.password = "123456";

  $scope.Login = function()
  { 
    try{
    $cordovaVibration.vibrate(300);
     }
     
     catch(Exception){
    console.log("Vibracion",Exception.Message);
     }
     $scope.Funciona = false;
    $scope.NoFunciona = false;  

     firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
     .then(function(Respuesta){
        $scope.Funciona = true;
        $scope.UsuarioLogueado=firebase.auth().currentUser;
        console.log($scope.UsuarioLogueado.uid);

        console.log("Respuesta: ", Respuesta);  
    $timeout(function(){
          $state.go("app.desafios");
        }, 3000);        
      })
     .catch(function(Error){
          $scope.NoFunciona = true;
          console.log("Error: ", Error);
      });
  }

   $scope.Acceso = function(correo, clave){
        $scope.loginData.username  = correo;
        $scope.loginData.password = clave;
    
    }
    $scope.Registro = function()
  {
  var user = firebase.auth().createUserWithEmailAndPassword($scope.loginData.username,$scope.loginData.password).then(function(respuesta){
          console.info("Respuesta: ",respuesta);
          $scope.loginData.username="";
          $scope.loginData.password="";
          
          var usuario = {};
          usuario.id = respuesta.uid;
          usuario.credito = 0;
          usuario.primerInicio = true;
          usuario.nombre = respuesta.email;
          
          UsuarioService.Agregar(usuario);
          console.log("usuario agregado");
          // $state.go('app.autor');
    
        })
        .catch(function(error){
          console.info("Error: ",error);

        });
 // alert("Registrado Exitosamente");

  }


});
