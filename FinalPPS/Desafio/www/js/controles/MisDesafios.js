
angular.module('MisDesafios.controllers', ['ngCordova'])

.controller('MisDesafiosCtrl', function($scope, $ionicModal, $timeout,$state,$cordovaVibration,DesafioService,UsuarioService) {

$scope.userID = firebase.auth().currentUser.uid;

  $scope.DateNow = new Date().getTime();
  $scope.datos=[];

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
              title: 'Revise su conexion.',
              cssClass:'salida',
              okType: 'button-energized',
          });
  }


  

});
