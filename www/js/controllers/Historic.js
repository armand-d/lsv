(function(){
'use-strict';

    angular
    .module('starter')
    .controller('HistoricCtrl', HistoricCtrl);

    function HistoricCtrl ($scope, $localStorage, $location, $ionicModal) {
        const historicCtrl = this;
        historicCtrl.dataModal = '';
        historicCtrl.noData = '';
        historicCtrl.data = false;

        if($localStorage.historic.length == 0) {
            historicCtrl.noData = 'Pas d\'historique pour l\'instant...';     
        } else {
            historicCtrl.data = $localStorage.historic;
        }

        $ionicModal.fromTemplateUrl('templates/historic.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            historicCtrl.modal = modal;
          });

        historicCtrl.selected = value => {
            historicCtrl.dataModal = value;
            historicCtrl.modal.show();
        }

        historicCtrl.closeModal = function() {
            historicCtrl.modal.hide();
        }
    };

    HistoricCtrl.$inject = ['$scope', '$localStorage', '$location', '$ionicModal'];

})();
