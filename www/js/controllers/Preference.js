(function(){
'use-strict';

    angular
    .module('starter')
    .controller('PreferenceCtrl', PreferenceCtrl);

    function PreferenceCtrl ($ionicSideMenuDelegate, $scope, $localStorage, $ionicPlatform) {
        const preferenceCtrl = this;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $ionicPlatform.ready(function() {
            $('.pane').css('background-image', 'url(img/'+$localStorage.bg+'.jpg)');
            $('.btn-shar-app').css('background-image', 'url(img/'+$localStorage.bg+'.jpg)');  
        });

        preferenceCtrl.changeColor = value => {
            $('.pane').css('background-image', 'url(img/'+value+'.jpg)');
        	$('.btn-shar-app').css('background-image', 'url(img/'+value+'.jpg)');
        	$localStorage.bg = value;
        }
    };

    PreferenceCtrl.$inject = ['$ionicSideMenuDelegate', '$scope', '$localStorage', '$ionicPlatform'];

})();