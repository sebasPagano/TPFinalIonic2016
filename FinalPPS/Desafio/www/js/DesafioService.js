'use strict';
angular.module('desafios.service', ["firebase"])

    .service('DesafioService', ["$firebaseArray", 
        function($firebaseArray){
            
            this.ref = firebase.database().ref('Desafios/');
            this.arrayDesafios = $firebaseArray(this.ref);

            this.TraerTodos = function(){
                    return this.arrayDesafios.$loaded().then(function(datos){
                   
                        return datos;
                    })
                };

            this.Agregar = function(desafio){
                this.arrayDesafios.$add(desafio).then(function(ref){
                    var id = ref.key;
                    console.log("Agregado Desafio");
                });
            };

            this.BuscarPorIndex = function(index){
                return this.arrayDesafios.$loaded().then(function(datos){
                    return datos[index];
                })
            };

            this.Modificar = function(index){
                this.arrayDesafios.$save(index).then(function(ref){
                    var id = ref.key;
                    console.log("Se modifico el item con id " + id);
                })
            };

 }])