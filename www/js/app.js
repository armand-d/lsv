(function(){
    'use strict';

    // Création du module starter
    var app = angular.module('starter', ['ionic', 'ui.router', 'ngStorage', 'firebase', 'ngCordova'])

    .run(function($ionicPlatform, $http, $localStorage) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                cordova.plugins.Keyboard.close();
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    // Configuration des controllers et de l'architecture de l'application
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $sceDelegateProvider){

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://firebasestorage.googleapis.com/**',
        'http://192.168.1.109:8100/**',
        'http://localhost:8100/**',
        'https://le-saviez-vous.firebaseio.com/**'
    ]);

    var config = {
        apiKey: "AIzaSyAZdpuncFV0IMm4Y8yS71rnLHV91ns4LNQ",
        authDomain: "le-saviez-vous.firebaseapp.com",
        databaseURL: "https://le-saviez-vous.firebaseio.com",
        projectId: "le-saviez-vous",
        storageBucket: "le-saviez-vous.appspot.com",
        messagingSenderId: "693337603808"
    };
    firebase.initializeApp(config);

    $stateProvider
        .state({
            name          : 'tuto',
            url           : '/tuto',
            templateUrl   : 'templates/tuto.html',
            controller    : 'TutoCtrl',
            controllerAs  : 'tutoCtrl'
        }).state({
            name          : 'main',
            url           : '/main',
            templateUrl   : 'templates/main.html',
            controller    : 'MainCtrl',
            controllerAs  : 'mainCtrl'
        }).state({
            name          : 'historic',
            url           : '/historic',
            templateUrl   : 'templates/historic.html',
            controller    : 'HistoricCtrl',
            controllerAs  : 'historicCtrl',
            cache         : false
        }).state({
            name          : 'add-q',
            url           : '/add-q',
            templateUrl   : 'templates/add-q.html',
            controller    : 'AddqCtrl',
            controllerAs  : 'addqCtrl',
            cache         : false
        }).state({
            name          : 'about',
            url           : '/about',
            templateUrl   : 'templates/about.html',
            controller    : 'AboutCtrl',
            controllerAs  : 'aboutCtrl'
        }).state({
            name          : 'favorite',
            url           : '/favorite',
            templateUrl   : 'templates/favorite.html',
            controller    : 'FavoriteCtrl',
            controllerAs  : 'favoriteCtrl',
            cache         : false
        }).state({
            name          : 'preference',
            url           : '/preference',
            templateUrl   : 'templates/preference.html',
            controller    : 'PreferenceCtrl',
            controllerAs  : 'preferenceCtrl',
            cache         : false
        });

        // Redirection vers la page d'accueil si url n'existe pas
        $urlRouterProvider.otherwise('main');
    });

})();
