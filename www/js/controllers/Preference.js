(function(){
'use-strict';

    angular
    .module('starter')
    .controller('PreferenceCtrl', PreferenceCtrl);

    function PreferenceCtrl ($ionicSideMenuDelegate, $scope, $localStorage) {
        const preferenceCtrl = this;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $(document).ready(function() {
            $('.pane').css('background-image', 'url(../img/'+$localStorage.bg+'.jpg)');    
        });

        preferenceCtrl.changeColor = value => {
        	// $('.pane').css('background-image', 'url(../img/'+value+'.jpg)');
            document.getElementsByClassName("pane").style.backgroundImage = "url(../img/"+value+".jpg)";
        	$localStorage.bg = value;
        }
    };

    PreferenceCtrl.$inject = ['$ionicSideMenuDelegate', '$scope', '$localStorage'];

})();