(function(){
'use-strict';

    angular
    .module('starter')
    .controller('AddqCtrl', AddqCtrl);

    function AddqCtrl ($ionicPopup, FireBase) {
        const addqCtrl = this;

        addqCtrl.content = '';
        addqCtrl.R1 = '';
        addqCtrl.R2 = '';
        addqCtrl.R3 = '';
        addqCtrl.solution = '';
    
        addqCtrl.submit = _ => {
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

                    $ionicPopup.alert({
                        title: 'LSV',
                        template: 'Merci !'
                    });
                });

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'LSV',
                    template: 'Vous devez saisir tous les champs'
                });
            }
        }
    };

    AddqCtrl.$inject = ['$ionicPopup', 'FireBase'];

})();