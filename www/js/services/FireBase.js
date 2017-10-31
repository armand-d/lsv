angular.module('starter')
  .factory('FireBase', function($firebaseArray, $firebaseObject, $q, $rootScope){
    var ref = firebase.database().ref('qcm');
    var qcm = $firebaseObject(ref);

    var Qcm = {
    	ref: ref,
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