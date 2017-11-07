(function(){
'use-strict';

    angular
    .module('starter')
    .controller('FavoriteCtrl', FavoriteCtrl);

    function FavoriteCtrl ($ionicSideMenuDelegate, $scope, $localStorage, $ionicModal, $cordovaSocialSharing, $ionicPlatform) {
        const favoriteCtrl = this;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $ionicPlatform.ready(function() {
            $('.pane').css('background-image', 'url(img/'+$localStorage.bg+'.jpg)');
            $('.btn-shar-app').css('background-image', 'url(img/'+$localStorage.bg+'.jpg)');  
        });

        // Initialisation des variables
        favoriteCtrl.dataModal = '';
        favoriteCtrl.noData = '';
        favoriteCtrl.data = false;

        // Gestion des données des favoris
        favoriteCtrl.init = _ => {
            favoriteCtrl.noData = '';
            favoriteCtrl.data = false;

            if($localStorage.favorite.length == 0) {
                favoriteCtrl.noData = 'Pas de favoris pour l\'instant...';     
            } else {
                favoriteCtrl.data = $localStorage.favorite;
            }
        }

        // Modal
        $ionicModal.fromTemplateUrl('templates/favorite.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            favoriteCtrl.modal = modal;
          });

        // gestion du clique sur une des question (ouverture de la modal)
        favoriteCtrl.selected = value => {
            favoriteCtrl.dataModal = value;
            favoriteCtrl.modal.show();
        }

        // Fermeture de la modal
        favoriteCtrl.closeModal = _=> {
            favoriteCtrl.modal.hide();
        }

        // Gestion du bouton de partage dans la modal
        favoriteCtrl.share = (Q, R, E) => {
            $cordovaSocialSharing
                .share(Q+' ?'+'\n\n\n'+'Réponse : '+R+'\n\n\n'+'Explication : '+E, 'Le Saviez Vous', null, null)
                .then(function(result) {
                  // success
                }, function(err) {
                  // erro
                });
        }

        favoriteCtrl.delete = value => {
            favoriteCtrl.dataFavorite = value;

            $.each($localStorage.favorite, function(index, value ) {
                if (favoriteCtrl.dataFavorite == value) {
                    $localStorage.favorite.splice(index,1);
                    favoriteCtrl.closeModal();
                }
            });
            
            favoriteCtrl.init();
        }

    };

    FavoriteCtrl.$inject = ['$ionicSideMenuDelegate', '$scope', '$localStorage', '$ionicModal', '$cordovaSocialSharing', '$ionicPlatform'];

})();
