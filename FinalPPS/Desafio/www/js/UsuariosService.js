'use strict';
angular.module('usuarios.service', ["firebase"])

    .service('UsuarioService', ["$firebaseArray", 
        function($firebaseArray){
            
            this.ref = firebase.database().ref('Usuarios/');
            this.arrayUsuarios = $firebaseArray(this.ref);
         
           this.TraerTodos= function(){
                    return this.arrayUsuarios.$loaded().then(function(datos){
                        console.log(datos);
                        return datos;
                    })
                };
            this.Agregar = function(usuario){
                    var refUsuarios = firebase.database().ref().child('Usuarios/' + usuario.id);
                    refUsuarios.set( { credito: usuario.credito, primerInicio: usuario.primerInicio, nombre: usuario.nombre }, function(error){
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

