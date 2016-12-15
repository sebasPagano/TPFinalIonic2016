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

            this.BuscarPorId = function(id){
                    return this.arrayCreditos.$loaded().then(function(datos){
                        return datos.$getRecord(id);
                    })
                };



        }])
;