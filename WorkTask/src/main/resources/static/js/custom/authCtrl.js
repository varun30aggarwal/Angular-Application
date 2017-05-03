app.controller('RegistrationCtrl',function($scope,$http,$location,$rootScope ){
	console.log("Registration function");

    $scope.signUp = function (customer) {
    	
    	 dataObj=JSON.stringify(customer);

   		var res = $http.post('http://35.161.33.203:8080/RegisterUser', dataObj);
   	//	var res = $http.post('http://localhost:8080/RegisterUser', dataObj);
   		res.success(function(data, status, headers, config) {
   			$scope.message = data;
   			
   			swal({
   			  title: "Congratulations",
   			  text: "Your profile has been created. Login to get started!!",
   			//  timer:20000,
   			 imageUrl: "images/homepage/Minion.gif"
   			});
   			
   		});
   		res.error(function(data, status, headers, config) {
   			alert( "failure message: " + JSON.stringify({data: data}));
   		});	
    };
	
	
	
})
//for login
app.controller('LoginCtrl',function($scope,$http,$location,$rootScope ,$window){
	console.log("Login function");
	 $window.sessionStorage["uid"]=null;
	 $window.sessionStorage["email"]=null;
	//$scope.login = {email:'',password:''};
    $scope.doLogin = function (customer) {
    	
    	 dataObj=JSON.stringify(customer);

   		var res = $http.post('http://35.161.33.203:8080/LoginUser', dataObj);
   	//	var res = $http.post('http://localhost:8080/LoginUser', dataObj);
   		res.success(function(data, status, headers, config) {
   		
   			if(data > 0){
   				/*swal({
	   			  title: "Welcome!",
	   			  text: "Get your work done!!!!.",
	   			//  timer:20000,
	   			 imageUrl: "images/login/happyminion.jpg"
	   			});*/
   				$scope.message = data;
   	   			$rootScope.portfolio=true;
   	        	$rootScope.about=true;
   	        	$rootScope.contact=true;
   	        	$rootScope.errandify=true;
   	        	$rootScope.view=true;
	   			$location.path('dashboard');
	   			
	   			//stores information in local storage
	   		
	   		 $window.sessionStorage.setItem("uid",data);
	   		 $window.sessionStorage.setItem("email",customer.email);
   			}
   			else{
   				swal({
   	   			  title: "Invalid Credentials!",
   	   			  text: "Looks like you have forgotton your credentials!!!!.",
   	   			//  timer:20000,
   	   			 imageUrl: "images/login/sadminion.jpg"
   	   			});
   	   			  	   		
   	   		delete $window.sessionStorage.session;
   			}
   		});
   		res.error(function(data, status, headers, config) {
   			alert( "failure message: " + JSON.stringify({data: data}));
   		});	
    };
	
	
	
})

//directive to check if passwords match
app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});
