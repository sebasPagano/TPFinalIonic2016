'use strict';
angular.module('creditos.service', ["firebase"])

    .service('CreditoService', ["$firebaseArray", 
        function($firebaseArray){
            
            this.ref = firebase.database().ref('Creditos/');
            this.arrayCreditos = $firebaseArray(this.ref);
         
            this.AgregarCredito = function(cantidad, credito){
                for(var i=0;i<cantidad.valor;i++)
                {
                    this.arrayCreditos.$add(credito).then(function(ref){
                        var id = ref.key;
                        console.log("Se agrego el id " + id);
                    });
                }
            };

            this.TraerTodos = function(){
                    return this.arrayCreditos.$loaded().then(function(datos){
                        console.log(datos);
                        return datos;
                    })
                };
            this.Eliminar = function(index){
                    this.arrayCreditos.$remove(index).then(function(ref){
                        console.log("Se elimino credito");
                    })
                };
            this.BuscarPorId = function(id){
                    return this.arrayCreditos.$loaded().then(function(datos){
                        return datos.$getRecord(id);
                    })
                };


           /*this.TraerTodos= function(){
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
                };*/

        }])
;