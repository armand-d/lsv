(function(){
'use-strict';

    angular
    .module('starter')
    .controller('MainCtrl', MainCtrl);

    function MainCtrl ($scope, $localStorage, $location, FireBase, $ionicLoading, $cordovaSocialSharing, $ionicPopup, $cordovaVibration, $cordovaLocalNotification, $ionicPlatform, $ionicModal, $ionicSideMenuDelegate, $rootScope) {
        const mainCtrl = this;
        
        $rootScope.shareApp = _ => {
            $cordovaSocialSharing
            .share('Rendez vous sur LSV et découvrez jusqu\'à 5 nouvelles connaissances par jour !', 'Le Saviez Vous', null, null)
            .then(function(result) {
                var alertPopup = $ionicPopup.alert({
                    title: 'LSV',
                    template: 'Merci !'
                });

            }, function(err) {
              $ionicPopup.alert({
                 template: 'Erreur'
               });
            });
        }

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        // Initialisation des variables
        mainCtrl.stepIsFull = false;
        mainCtrl.showResponse = false;
        mainCtrl.showNext = false;
        mainCtrl.isLoad = false;
        mainCtrl.selectedChoose = false;

        // Création de la date au bon format
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var newdate =  year + "-" + month + "-" + day;

        // Vérification de l'existance de l'utilisateur
        if (!$localStorage.clientExist) {
            $localStorage.level = 1;
            $localStorage.currDay = newdate;
            $localStorage.step = 1;
            $localStorage.historic = [];
            $localStorage.favorite = [];
            $localStorage.clientExist = true;
            $location.path('/tuto');
        }

        mainCtrl.level = $localStorage.level;
        mainCtrl.currDay = $localStorage.currDay;
        mainCtrl.step = $localStorage.step;

        // Timer
        setInterval(function(){ 
            $('.timer').html(mainCtrl.getTimeRest());
            mainCtrl.checkStatus();
        }, 1000);

        // modal
        $ionicModal.fromTemplateUrl('templates/main.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            mainCtrl.modal = modal;
        });

        // --------- FONCTIONS ---------
        
        // initialise les questions
        mainCtrl.init = _ => {

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            mainCtrl.checkStatus();
            mainCtrl.checkStep();
    
            mainCtrl.dataQcm = {};
            FireBase.getAll().then(function(res){
                var i = 0;
                $.each(res, function(index, value ) {
                    i++;
                    if (i == mainCtrl.level) {
                        mainCtrl.dataQcm = value;
                    }
                });

                mainCtrl.isLoad = true;

                $localStorage.data = mainCtrl.dataQcm;                
                mainCtrl.data = $localStorage.data;
                                
                if (!mainCtrl.stepIsFull) {
                    mainCtrl.run();
                    $ionicLoading.hide();
                }
            });

            if (mainCtrl.step > 5) {
                $ionicLoading.hide();
            }

        }

        // retourne le temps restant avant la fin de la journée courrente
        mainCtrl.getTimeRest = _ => {
            var dateObj = new Date();
            var hour = dateObj.getHours();
            var mnt = dateObj.getMinutes();
            var scd = dateObj.getSeconds();

            var mntRest = 60 - mnt;
            if (mntRest.toString().length == 1) {
                mntRest = '0' + (60 - mnt).toString();
            }

            var scdRest = 60 - scd;
            if (scdRest.toString().length == 1) {
                scdRest = '0' + (60 - scd).toString();
            }

            if (scdRest == 60) { scdRest = '00';}
            return (24 - hour) +'h'+ mntRest+':'+ scdRest;
        }

        // Vérification du l'avancement et update du "niveau" si besoin
        mainCtrl.checkStatus = _ => {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            var nextdate =  year + "-" + month + "-" + day;

            if ($localStorage.currDay != nextdate && $localStorage.step >= 5) {
                $localStorage.level = $localStorage.level + 1;
                $localStorage.currDay = nextdate;
                $localStorage.step = 1;
            }
        }
        
        // Gestion du choix de réponse sélectionné 
        mainCtrl.selected = (value, key) => {
            if (!mainCtrl.selectedChoose) {
                mainCtrl.selectedChoose = true;
                var elmt = document.getElementById(key);
                
                $('.item-response').attr('disabled', true);

                if (key == mainCtrl.currStep.S) {
                    mainCtrl.res = {'level': mainCtrl.level, 'res' : {'step': mainCtrl.step, 'status': '1'}, 'date': newdate, 'Q' : mainCtrl.currStep.Q, 'R' : mainCtrl.currResponse, 'E' : mainCtrl.currStep.E};
                    elmt.style.backgroundColor = "#2ecc71";
                    
                } else {
                    $cordovaVibration.vibrate(100);
                    mainCtrl.res = {'level': mainCtrl.level, 'res' : {'step': mainCtrl.step, 'status': '0'}, 'date': newdate, 'Q' : mainCtrl.currStep.Q, 'R' : mainCtrl.currResponse, 'E' : mainCtrl.currStep.E};
                    elmt.style.backgroundColor = "#c0392b";
                    mainCtrl.showResponse = true;
                }

                $localStorage.historic.push(mainCtrl.res);

                mainCtrl.showNext = true;
            }
        }

        // Gestion du bouton "suivant"
        mainCtrl.nextQ = _ => {
            mainCtrl.showNext = false;
            mainCtrl.selectedChoose = false;

            mainCtrl.checkStep();
            mainCtrl.updateStep();
            mainCtrl.run();
        }

        // mise à jour de l'étape (x/5)
        mainCtrl.updateStep = _ => {
            $localStorage.step = mainCtrl.step + 1;
            mainCtrl.step = $localStorage.step;
        }

        // Lancement d'une nouvelle question
        mainCtrl.run = _ => {
            var elmts = document.getElementsByClassName('item-response');
            mainCtrl.changeColor(elmts, "#e67e22");

            mainCtrl.showResponse = false;
            mainCtrl.currLevel = mainCtrl.level;
            mainCtrl.currStep = mainCtrl.data[mainCtrl.step]
            mainCtrl.currResponse = mainCtrl.currStep.R[mainCtrl.currStep.S];
        }

        // Vérification de l'avancé des étapes x/5
        mainCtrl.checkStep = _ => {
            if (mainCtrl.currDay == newdate && mainCtrl.step >= 5) {
                mainCtrl.stepIsFull = true;
            } else {
                mainCtrl.stepIsFull = false;
            }
        }

        // changement des couleurs des items pour les remettre en orange (couleur par defaut)
        mainCtrl.changeColor = (coll, color) => {
            for(var i = 0, len = coll.length; i < len; i++)
            {
                coll[i].style["background-color"] = color;
            }
        }

        // fonction de partage de l'application
        mainCtrl.share = _ => {
            $cordovaSocialSharing
                .share('Rendez vous sur LSV et découvrez jusqu\'à 5 nouvelles connaissances par jour !', 'Le Saviez Vous', null, null)
                .then(function(result) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'LSV',
                        template: 'Merci ! vous pouvez désormais accéder à 5 nouvelles connaissances'
                    });

                    alertPopup.then(function(res) {
                        $localStorage.level = $localStorage.level + 1;
                        $localStorage.step = 1;
                
                        mainCtrl.level = $localStorage.level;
                        mainCtrl.step = $localStorage.step;

                        mainCtrl.init();
                    });

                }, function(err) {
                  $ionicPopup.alert({
                     template: 'Erreur'
                   });
                });
        }

        // Affichage de la modal de l'explication de la réponse à la question
        mainCtrl.showE = _ => {
            mainCtrl.modal.show();
        }

        // fermeture de la modal
        mainCtrl.closeModal = _ => {
            mainCtrl.modal.hide();
        }

        // ajout des favoris
        mainCtrl.addFavorite = _ => {
            mainCtrl.dataFavorite = mainCtrl.res;
            mainCtrl.favoriteExiste = false;

            $.each($localStorage.favorite, function(index, value ) {
                if (mainCtrl.dataFavorite == value) {
                    mainCtrl.favoriteExiste = true;
                }
            });

            if (!mainCtrl.favoriteExiste) {
                $localStorage.favorite.push(mainCtrl.dataFavorite);
                $ionicPopup.alert({
                    title: 'LSV',
                    template: 'Ajouté au favoris !'
                });
            } else {
                $ionicPopup.alert({
                    title: 'LSV',
                    template: 'Déjà dans vos favoris.'
                });
                
            }
        }
    };

    MainCtrl.$inject = ['$scope', '$localStorage', '$location', 'FireBase', '$ionicLoading', '$cordovaSocialSharing', '$ionicPopup', '$cordovaVibration', '$cordovaLocalNotification', '$ionicPlatform', '$ionicModal', '$ionicSideMenuDelegate', '$rootScope'];

})();
