'use strict';
angular.module('usuariosBatalla.service', ["firebase"])

    .service('UsuarioBatallaService', ["$firebaseArray", 
        function($firebaseArray){
            
            this.ref = firebase.database().ref('UsuariosBatalla/');
            this.arrayUsuarios = $firebaseArray(this.ref);
         
           this.TraerTodos= function(){
                    return this.arrayUsuarios.$loaded().then(function(datos){
                        console.log(datos);
                        return datos;
                    })
                };
            this.Agregar = function(usuario){
                    var refUsuarios = firebase.database().ref().child('UsuariosBatalla/' + usuario.id);
                    refUsuarios.set( { credito: usuario.credito, email: usuario.email ,nombre: usuario.nombre }, function(error){
                        if (error)
                            console.log("Error al guardar: " + error)
                        else
                            console.log("Exito Agregado " +usuario.id + " a la base de datos."); 
                    });
                };

            this.BuscarPorId = function(id){
                    return this.arrayUsuarios.$loaded().then(function(datos){
                        return datos.$getRecord(id);
                    })
                };

            this.Modificar = function(index){
                    this.arrayUsuarios.$save(index).then(function(ref){
                        var id = ref.key;
                        console.log("Se modifico el usuario con id " + id);
                   })
             };

        }])
;

