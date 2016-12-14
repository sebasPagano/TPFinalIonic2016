// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
   'ngCordova',
   'menu.controllers',
   'login.controllers',
   'DesafioAceptado.controllers',
   'MisDesafios.controllers',
   'CrearDesafio.controllers',
   'desafio.controllers',
   'perfil.controllers',
   'credito.controllers',
   'usuarios.service',
   'creditos.service',
   'autor.controllers'
   ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
    cache: false
    })

    .state('app.autor', {
    url: '/autor',
    views: {
      'menuContent': {
        templateUrl: 'templates/autor.html',
        controller:'AutorCtrl'
      }
    }
  })
    .state('app.desafios', {
    url: '/desafios',
    views: {
      'menuContent': {
        templateUrl: 'templates/desafios.html',
        controller:'DesafioCtrl'
      }
    }
  })
    .state('app.CrearDesafio', {
    url: '/CrearDesafio',
    views: {
      'menuContent': {
        templateUrl: 'templates/CrearDesafio.html',
        controller:'CrearDesafioCtrl'
      }
    }
  })
    .state('app.DesafiosAceptados', {
    url: '/DesafiosAceptados',
    views: {
      'menuContent': {
        templateUrl: 'templates/DesafioAceptado.html',
        controller:'DesafioAceptadoCtrl'
      }
    }
  })
    .state('app.MisDesafios', {
    url: '/MisDesafios',
    views: {
      'menuContent': {
        templateUrl: 'templates/MisDesafios.html',
        controller:'MisDesafiosCtrl'
      }
    }
  })
    .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller:'PerfilCtrl'
      }
    }
  })
   .state('app.credito', {
    url: '/CargarCredito',
    views: {
      'menuContent': {
        templateUrl: 'templates/CargarCredito.html',
        controller:'CargarCreditoCtrl'
      }
    }
  });


  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
