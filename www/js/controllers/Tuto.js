(function(){
'use-strict';

    angular
    .module('starter')
    .controller('TutoCtrl', TutoCtrl);

    function TutoCtrl ($ionicSlideBoxDelegate) {
        const tutoCtrl = this;
    };

    TutoCtrl.$inject = ['$ionicSlideBoxDelegate'];

})();
