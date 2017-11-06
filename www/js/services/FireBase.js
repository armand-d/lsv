angular.module('starter')
  .factory('FireBase', function($firebaseArray, $firebaseObject, $q, $rootScope){
   
    var ref = firebase.database().ref('qcm');
    var refSuggestions = firebase.database().ref('suggestions');

    var qcm = $firebaseObject(ref);

    var Qcm = {
    	ref: ref,
    	refSuggestions: refSuggestions,
	  	all: qcm,
	  	getAll: function (){
	  		var defer = $q.defer();
	  		ref.on("value", function(snapshot) {
			  defer.resolve(snapshot.val());
			});
			return defer.promise;
	  	}
	};

    return Qcm;
  });