(function(){
'use-strict';

    angular
    .module('starter')
    .controller('TutoCtrl', TutoCtrl);

    function TutoCtrl ($ionicSlideBoxDelegate) {
        const tutoCtrl = this;

		tutoCtrl.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
    };

    TutoCtrl.$inject = ['$ionicSlideBoxDelegate'];

})();
