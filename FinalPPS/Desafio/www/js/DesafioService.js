'use strict';
angular.module('desafios.service', ["firebase"])

    .service('DesafioService', ["$firebaseArray", 
        function($firebaseArray){
            
            this.ref = firebase.database().ref('Desafios/');
            this.arrayDesafios = $firebaseArray(this.ref);

            this.TraerTodos = function(){
                    return this.arrayDesafios.$loaded().then(function(datos){
                        console.log("desafios",datos);
                        return datos;
                    })
                };

            this.Agregar = function(desafio){
                this.arrayDesafios.$add(desafio).then(function(ref){
                    var id = ref.key;
                    console.log("Se agrego el id " + id);
                });
            };
 }])