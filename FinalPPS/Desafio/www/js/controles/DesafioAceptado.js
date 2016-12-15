
angular.module('DesafioAceptado.controllers', ['ngCordova'])

.controller('DesafioAceptadoCtrl', function($scope, $ionicPopup, $timeout,$state,$cordovaVibration) {

  $scope.mostrar=false;
  $scope.aceptados=true;
  $scope.todos=false;
  $scope.userID = firebase.auth().currentUser.uid;
  $scope.datos=[];
  $scope.DateNow = new Date().getTime();
  
  try{
   var refDesafio = firebase.database().ref('Desafios/');
    refDesafio.on('child_added', function(snapshot){
        $timeout(function(){
          var desafio = snapshot.val();
          var id=snapshot.key;
            $scope.datos.push(desafio); 
        });
    });  
  }
  catch(err)
  {
      $ionicPopup.alert({
              title: 'No se pudo obtener los desafios. Revise su conexion.',
              cssClass:'salida',
              okType: 'button-energized',
          });
  }



});
