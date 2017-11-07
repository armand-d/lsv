(function(){
'use-strict';

    angular
    .module('starter')
    .controller('AboutCtrl', AboutCtrl);

    function AboutCtrl ($ionicSideMenuDelegate, $scope, $localStorage) {
        const aboutCtrl = this;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $(document).ready(function() {
            $('.pane').css('background-image', 'url(../img/'+$localStorage.bg+'.jpg)');    
        });

    };

    AboutCtrl.$inject = ['$ionicSideMenuDelegate', '$scope', '$localStorage'];

})();
