var myApp = angular.module('myApp', []);
myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
   
    console.log("Hello World from controller");

    var refresh = function(){
	        $http.get('/contactlist').success(function(response) {
	    	console.log("i got the data i requested");
	    	$scope.contactlist = response;
	    	$scope.contact = "";	    
	    });
    };

    refresh ();

    // var toastr = function(){

    // }

    $scope.addContact = function(){

        var errMessage = ($scope.userForm);
        if (errMessage){
            toastr.error("First name is Invalid", 'Error');
            return false;
        };
    	console.log($scope.contact);
    	$http.post('/contactlist', $scope.contact).success(function(response){
    		console.log(response);
    		refresh();
            toastr.success("Saved Data");
    	});
    };
         //    toastr.options:{
         //                    "debug": false,
         //                    "positionClass": "toast-top-right",
         //                    "onclick": null,
         //                    "fadeIn": 300,
         //                    "fadeOut": 1000,
         //                    "timeOut": 5000,
         //                    "extendedTimeOut": 1000,
         //                    }
         //                    });
         // };

    $scope.remove= function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function (response){
            refresh();
        });
    };

    $scope.edit= function(id) {
        $http.get('/contactlist/' + id).success(function(response){
            $scope.contact = response;
        });
    };

    $scope.update= function(id) {
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
            refresh();
        });
    };
    // $scope.onSave = function(email){
    //     var errMessage = fildValidations($scope.userForm);
    //     if (errMessage){
    //         toaster.error("First name is Invalid", 'Error');
    //         return false;
    //     }
    // }

}])