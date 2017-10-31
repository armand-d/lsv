(function(){
'use-strict';

    angular
    .module('starter')
    .controller('TutoCtrl', TutoCtrl);

    function TutoCtrl ($scope, $localStorage, $location, $ionicModal, $rootScope) {
        const tutoCtrl = this;
    };

    TutoCtrl.$inject = ['$scope', '$localStorage', '$location', '$ionicModal', '$rootScope'];

})();
