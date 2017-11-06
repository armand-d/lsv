(function(){
'use-strict';

    angular
    .module('starter')
    .controller('HistoricCtrl', HistoricCtrl);

    function HistoricCtrl ($scope, $localStorage, $ionicModal, $cordovaSocialSharing, $ionicSideMenuDelegate) {
        const historicCtrl = this;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        // Initialisation des variables
        historicCtrl.dataModal = '';
        historicCtrl.noData = '';
        historicCtrl.data = false;

        // Gestion des données de l'historique
        if($localStorage.historic.length == 0) {
            historicCtrl.noData = 'Pas d\'historique pour l\'instant...';     
        } else {
            historicCtrl.data = $localStorage.historic;
        }

        // Modal
        $ionicModal.fromTemplateUrl('templates/historic.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            historicCtrl.modal = modal;
          });

        // gestion du clique sur une des question (ouverture de la modal)
        historicCtrl.selected = value => {
            historicCtrl.dataModal = value;
            historicCtrl.modal.show();
        }

        // Fermeture de la modal
        historicCtrl.closeModal = _=> {
            historicCtrl.modal.hide();
        }

        // Gestion du bouton de partage dans la modal
        historicCtrl.share = (Q, R, E) => {
            $cordovaSocialSharing
                .share(Q+' ?'+'\n\n\n'+'Réponse : '+R+'\n\n\n'+'Explication : '+E, 'Le Saviez Vous', null, null)
                .then(function(result) {
                  // success
                }, function(err) {
                  // erro
                });
        }

    };

    HistoricCtrl.$inject = ['$scope', '$localStorage', '$ionicModal', '$cordovaSocialSharing', '$ionicSideMenuDelegate'];

})();
