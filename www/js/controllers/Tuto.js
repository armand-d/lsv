(function(){
'use-strict';

    angular
    .module('starter')
    .controller('TutoCtrl', TutoCtrl);

    function TutoCtrl ($ionicSlideBoxDelegate, $localStorage) {
        const tutoCtrl = this;

        $(document).ready(function() {
            $('.pane').css('background-image', 'url(../img/'+$localStorage.bg+'.jpg)');    
        });
    };

    TutoCtrl.$inject = ['$ionicSlideBoxDelegate', '$localStorage'];

})();
