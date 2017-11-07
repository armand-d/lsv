(function(){
'use-strict';

    angular
    .module('starter')
    .controller('TutoCtrl', TutoCtrl);

    function TutoCtrl ($ionicSlideBoxDelegate, $localStorage, $ionicPlatform) {
        const tutoCtrl = this;

        $ionicPlatform.ready(function() {
            if ($localStorage.bg)
                $('.pane').css('background-image', 'url(../img/'+$localStorage.bg+'.jpg)');
            else 
                $('.pane').css('background-image', 'url(../img/bg-img-2.jpg)'); 
        });
    };

    TutoCtrl.$inject = ['$ionicSlideBoxDelegate', '$localStorage', '$ionicPlatform'];

})();
