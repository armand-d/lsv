(function(){
'use-strict';

    angular
    .module('starter')
    .controller('FavoriteCtrl', FavoriteCtrl);

    function FavoriteCtrl ($ionicSideMenuDelegate, $scope) {
        const favoriteCtrl = this;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

    };

    FavoriteCtrl.$inject = ['$ionicSideMenuDelegate', '$scope'];

})();
