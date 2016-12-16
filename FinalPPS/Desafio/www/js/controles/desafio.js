
angular.module('desafio.controllers', ['ngCordova'])

.controller('DesafioCtrl', function($scope, $ionicPopup, $timeout,$state,$cordovaVibration,$cordovaNativeAudio,UsuarioService,DesafioService) {

	$scope.mostrar=false;
  $scope.aceptados=false;
  $scope.todos=true;
  $scope.datos=[];
  $scope.usuario = {};
  $scope.DateNow = new Date().getTime();
  $scope.userID = firebase.auth().currentUser.uid;

  try{
   var refDesafio = firebase.database().ref('Desafios/');
    refDesafio.on('child_added', function(snapshot){
        $timeout(function(){
          var desafio = snapshot.val();
    
          var id=snapshot.key;
        
          if(!desafio.computado && ((desafio.fechaFin - $scope.DateNow) / 1000)<=0)
          {

            ComputarDesafio(desafio, id); 
          }
          else
          {
            $scope.datos.push(desafio);
          }  
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

  function ComputarDesafio(desafio, id){
    // NO COMPUTADOS
    if(!desafio.computado && ((desafio.fechaFin - $scope.DateNow) / 1000)<=0){
        // NO FUE ACEPTADO
        if(desafio.jugador == '') {
        
          UsuarioService.BuscarPorId(desafio.creador).then(function(respuesta){
            var usuario=respuesta;
            usuario.credito += parseInt(desafio.valor);
            UsuarioService.Modificar(usuario);
            desafio.disponible=false;
            desafio.computado=true;
            var desf = firebase.database().ref().child('Desafios/' + id);
            desf.set( { creador: desafio.creador, 
                        disponible: false,
                        computado: true,
                        jugador: desafio.jugador,
                        valor: desafio.valor,
                        ganador: desafio.creador,
                        fechaInicio: desafio.fechaInicio,
                        fechaFin: desafio.fechaFin,
                        pregunta: desafio.pregunta 
                      }, function(error){
                        console.log(error); 
                    });          
          })

          // SI ES EL CREADOR SE LE MUESTRA UN MENSAJE INFORMANDO
          if(firebase.auth().currentUser.uid == desafio.creador)
          {
            //ReproducirPositivo();
              $ionicPopup.alert({
                title: 'Nadie acepto el desafio!!',
                template: 'No hubo jugadores por lo tanto no ha ganado dinero, se le devuelve el monto apostado',
                cssClass:'salida',
                okType: 'button-balanced'
              });

          }
        }
        else{
          // FUE ACEPTADO
          if(desafio.jugador)
          {
            // SI ES EL CREADOR DEBE DECIDIR QUIEN GANA
            if(firebase.auth().currentUser.uid == desafio.creador)
            {
               var confirmPopup = $ionicPopup.confirm({
                 title: 'Desafio Terminado: ',
                 template: '¿Gana el otro jugador?',
                 cssClass:'salida'
               });

               confirmPopup.then(function(res) {
                 if(res) {
                  UsuarioService.BuscarPorId(desafio.jugador).then(function(respuesta){
          
                    var usuario=respuesta;
            
                    usuario.credito += (parseInt(desafio.valor) * 2);
                    UsuarioService.Modificar(usuario);
                    var desf = firebase.database().ref().child('Desafios/' + id);
                    desf.set( { creador: desafio.creador, 
                                disponible: false,
                                computado: true,
                                jugador: desafio.jugador,
                                valor: desafio.valor,
                                ganador : desafio.jugador,
                                fechaInicio: desafio.fechaInicio,
                                fechaFin: desafio.fechaFin,
                                 pregunta: desafio.pregunta 
                              }, function(error){
                                console.log(error); 
                            });           
                  })
                 } else {
                  UsuarioService.BuscarPorId(desafio.creador).then(function(respuesta){
              
                    var usuario=respuesta;
                    usuario.credito += (parseInt(desafio.valor)*2);
                    UsuarioService.Modificar(usuario);
                    var desf = firebase.database().ref().child('Desafios/' + id);
                    desf.set( { creador: desafio.creador, 
                                disponible: false,
                                computado: true,
                                jugador: desafio.jugador,
                                valor: desafio.valor,
                                ganador: desafio.creador,
                                fechaInicio: desafio.fechaInicio,
                                fechaFin: desafio.fechaFin,
                                pregunta: desafio.pregunta 
                              }, function(error){
                                console.log(error); 
                            }); 
                  })
                 }
               })
            }
         }
       }
    }
  }

    $scope.verDesafio = function(index){
    try{
    $cordovaVibration.vibrate(300);
     } 
     catch(Exception){
    console.log("Vibracion",Exception.Message);
     }

    $state.go('app.aceptarDesafio', {desafio:index} );

  }


});
