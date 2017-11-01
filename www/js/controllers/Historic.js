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

        historicCtrl.closeModal = function() {
            historicCtrl.modal.hide();
        }

        historicCtrl.share = function () {
            // $cordovaSocialSharing.share('This is my message', 'Subject string', null, 'http://www.mylink.com');
            $cordovaSocialSharing
                .share('This is my message', 'Subject string', null, 'http://www.mylink.com') // Share via native share sheet
                .then(function(result) {
                  // Success!
                }, function(err) {
                  // An error occured. Show a message to the user
                });
        }

    };

    HistoricCtrl.$inject = ['$scope', '$localStorage', '$location', '$ionicModal', '$cordovaSocialSharing'];

})();
