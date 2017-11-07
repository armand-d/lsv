(function(){
'use-strict';

    angular
    .module('starter')
    .controller('AddqCtrl', AddqCtrl);

    function AddqCtrl ($ionicPopup, FireBase, $ionicLoading, $ionicSideMenuDelegate, $scope, $localStorage, $ionicPlatform) {
        const addqCtrl = this;
        
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $ionicPlatform.ready(function() {
            $('.pane').css('background-image', 'url(img/'+$localStorage.bg+'.jpg)');
            $('.btn-shar-app').css('background-image', 'url(img/'+$localStorage.bg+'.jpg)');  
        });

        addqCtrl.content = '';
        addqCtrl.R1 = '';
        addqCtrl.R2 = '';
        addqCtrl.R3 = '';
        addqCtrl.solution = '';
    
        addqCtrl.submit = _ => {

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            if (addqCtrl.content && addqCtrl.R1 && addqCtrl.R2 && addqCtrl.R3 && addqCtrl.solution) {

                addqCtrl.data = {
                    'Q': addqCtrl.content,
                    'R': {'R1': addqCtrl.R1, 'R2': addqCtrl.R2, 'R3': addqCtrl.R3},
                    'S': addqCtrl.solution
                };

                FireBase.refSuggestions.push(addqCtrl.data).then(function(res){

                    addqCtrl.content = '';
                    addqCtrl.R1 = '';
                    addqCtrl.R2 = '';
                    addqCtrl.R3 = '';
                    addqCtrl.solution = '';

                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: 'LSV',
                        template: 'Merci !'
                    });
                });

            } else {

                $ionicLoading.hide();

                var alertPopup = $ionicPopup.alert({
                    title: 'LSV',
                    template: 'Vous devez saisir tous les champs'
                });
            }
        }
    };

    AddqCtrl.$inject = ['$ionicPopup', 'FireBase', '$ionicLoading', '$ionicSideMenuDelegate', '$scope', '$localStorage', '$ionicPlatform'];

})();