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
   'perfil.controllers',
   'usuarios.controllers',
   'autor.controllers',
   'usuariosBatalla.service',
   'creditos.service',
   'credito.controllers'

   ])

.run(function($ionicPlatform, $cordovaNativeAudio) {
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
    if(window.plugins && window.plugins.NativeAudio)
    { 

      $cordovaNativeAudio.preloadComplex('correcto', 'sonidos/correcto.mp3', 1, 1);
       $cordovaNativeAudio.preloadComplex('incorrecto', 'sonidos/incorrecto.mp3', 1, 1);
      $cordovaNativeAudio.preloadComplex('moneda', 'sonidos/moneda.mp3', 1, 1);
 
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

    .state('app.credito', {
    url: '/CargarCredito',
    views: {
      'menuContent': {
        templateUrl: 'templates/CargarCredito.html',
        controller:'CargarCreditoCtrl'
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

      .state('app.usuarios', {
    url: '/usuarios',
    views: {
      'menuContent': {
        templateUrl: 'templates/usuarios.html',
        controller:'UsuariosCtrl'
      }
    }
  });

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
