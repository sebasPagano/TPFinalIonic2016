
angular.module('desafio.controllers', ['ngCordova'])

.controller('DesafioCtrl', function($scope, $ionicPopup, $timeout,$state,$cordovaVibration,UsuarioService,DesafioService) {

	$scope.mostrar=false;
  $scope.aceptados=false;
  $scope.todos=true;
  $scope.datos=[];
  $scope.usuario = {};
  $scope.DateNow = new Date().getTime();
  $scope.userID = firebase.auth().currentUser.uid;

      $ionicPopup.alert({
              title: 'Hola.',
              cssClass:'salida',
              okType: 'button-energized',
          });
  try{
   var refDesafio = firebase.database().ref('Desafios/');
    refDesafio.on('child_added', function(snapshot){
        $timeout(function(){
          var desafio = snapshot.val();
          console.log(snapshot);
          var id=snapshot.key;
          if(!desafio.computado && ((desafio.fechaFin - $scope.DateNow) / 1000)<=0)
          {

            Computar(desafio, id); 
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

  function Computar(desafio, id){
    // NO COMPUTADOS
    if(!desafio.computado && ((desafio.fechaFin - $scope.DateNow) / 1000)<=0){
        // NO FUE ACEPTADO
        if(desafio.jugador == '') {
          //NotificationService.sendNotification(desafio.creador,"DesafíaMente","Un desafío terminó sin resultados");
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
                        quienGano: desafio.quienGano,
                        quienPerdio: desafio.quienPerdio,
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
                title: 'NADA!!',
                template: 'No hubo jugadores para el desafio',
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
                 title: 'Tiempo de desafio agotado',
                 template: 'El otro jugador gana?',
                 cssClass:'salida'
               });

               confirmPopup.then(function(res) {
                 if(res) {
                  UsuarioService.BuscarPorId(desafio.jugador).then(function(respuesta){
                    //console.info(respuesta);
                    var usuario=respuesta;
                    //NotificationService.sendNotification(desafio.creador,"DesafíaMente",usuario.nombre+" ganó el desafío");
                   // NotificationService.sendNotification(desafio.jugador,"DesafíaMente",usuario.nombre+" ganó el desafío");
                    usuario.credito += (parseInt(desafio.valor) * 2);
                    UsuarioService.Modificar(usuario);
                    var desf = firebase.database().ref().child('Desafios/' + id);
                    desf.set( { creador: desafio.creador, 
                                disponible: false,
                                computado: true,
                                jugador: desafio.jugador,
                                valor: desafio.valor,
                                quienGano: desafio.jugador,
                                quienPerdio: desafio.creador,
                                fechaInicio: desafio.fechaInicio,
                                fechaFin: desafio.fechaFin,
                                pregunta: desafio.pregunta 
                              }, function(error){
                                console.log(error); 
                            });           
                  })
                 } else {
                  UsuarioService.BuscarPorId(desafio.creador).then(function(respuesta){
                    //console.info(respuesta);
                    var usuario=respuesta;
                  //  NotificationService.sendNotification(desafio.creador,"DesafíaMente",usuario.nombre+" perdió el desafío");
                   // NotificationService.sendNotification(desafio.jugador,"DesafíaMente",usuario.nombre+" perdió el desafío");
                    $scope.usuario.credito += (parseInt(desafio.valor)*2);
                    UsuarioService.Modificar(usuario);
                    var desf = firebase.database().ref().child('Desafios/' + id);
                    desf.set( { creador: desafio.creador, 
                                disponible: false,
                                computado: true,
                                jugador: desafio.jugador,
                                valor: desafio.valor,
                                quienGano: desafio.creador,
                                quienPerdio: desafio.jugador,
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

    $scope.mostrarDesafio = function(index){
    $state.go('app.aceptarDesafio', {desafio:index} );
  }


});
