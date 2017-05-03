var app = angular.module('errandify', ['ngMaterial','ngRoute','ngCookies','ng-fusioncharts']);

app.config(['$routeProvider',
	  function ($routeProvider) {
	        $routeProvider.
	        when('/login', {
	            title: 'Login',
	            templateUrl: 'view/login/login.html',
	           controller: 'LoginCtrl'
	        })
	            .when('/logout', {
	                title: 'Logout',
	                templateUrl: 'view/login/login.html',
	               controller: 'logoutCtrl'
	            })
	            .when('/dashboard', {
	                title: 'Dashboard',
	                templateUrl: 'view/functionality/project.html',
	              //  controller: 'task2'
	            })
	            .when('/signup', {
	                title: 'Signup',
	                templateUrl: 'view/login/signup.html',
	                controller: 'RegistrationCtrl'
	            })
	            
	            .when('/home', {
	                title: 'Login',
	                templateUrl: 'view/login/login.html',
	               controller: 'LoginCtrl',
	                role: '0'
	            })
	            .when('/portfolio', {
	                title: 'Portfolio',
	                templateUrl: 'view/homefunctions/Portfolio.html',
	             //  controller: 'logoutCtrl'
	            })
	            .when('/about', {
	                title: 'About',
	                templateUrl: 'view/homefunctions/About.html',
	             //  controller: 'logoutCtrl'
	            })
	            .when('/contact', {
	                title: 'Contact',
	                templateUrl: 'view/homefunctions/Contact.html',
	             //  controller: 'logoutCtrl'
	            })
	            .otherwise({
	                redirectTo: '/login'
	            });
	  }])
	  .run(function ($rootScope) {
        $rootScope.$on("$routeChangeStart", function ($scope, $rootScope) {
        	$rootScope.view=false;
        	$rootScope.portfolio=false;
        	$rootScope.about=false;
        	$rootScope.contact=false;
        	$rootScope.errandify=false;
        	$rootScope.header=false;
        	$rootScope.uid="";
        	
        });
    });