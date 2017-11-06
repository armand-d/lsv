(function(){
'use-strict';

    angular
    .module('starter')
    .controller('AboutCtrl', AboutCtrl);

    function AboutCtrl ($ionicSideMenuDelegate, $scope) {
        const aboutCtrl = this;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

    };

    AboutCtrl.$inject = ['$ionicSideMenuDelegate', '$scope'];

})();
