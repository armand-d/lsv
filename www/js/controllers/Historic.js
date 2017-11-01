(function(){
'use-strict';

    angular
    .module('starter')
    .controller('HistoricCtrl', HistoricCtrl);

    function HistoricCtrl ($scope, $localStorage, $location, $ionicModal, $cordovaSocialSharing) {
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

        historicCtrl.closeModal = _=> {
            historicCtrl.modal.hide();
        }

        historicCtrl.share = (Q,R) => {
            $cordovaSocialSharing
                .share(Q+' ?'+'\n\n\n'+'Réponse : '+R, 'Le Saviez Vous', null, null)
                .then(function(result) {
                  // success
                }, function(err) {
                  // erro
                });
        }

    };

    HistoricCtrl.$inject = ['$scope', '$localStorage', '$location', '$ionicModal', '$cordovaSocialSharing'];

})();
