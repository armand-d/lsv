(function(){
'use-strict';

    angular
    .module('starter')
    .controller('TutoCtrl', TutoCtrl);

    function TutoCtrl ($ionicSlideBoxDelegate, $localStorage, $ionicPlatform) {
        const tutoCtrl = this;

        $ionicPlatform.ready(function() {
            $('.pane').css('background-image', 'url(../img/'+$localStorage.bg+'.jpg)');    
        });
    };

    TutoCtrl.$inject = ['$ionicSlideBoxDelegate', '$localStorage', '$ionicPlatform'];

})();
