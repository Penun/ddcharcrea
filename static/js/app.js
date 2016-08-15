(function(){
	var app = angular.module('ddcharL', []);
	app.controller('loginController', ['$http', '$window', function($http, $window){
		var logCont = this;
		this.login = {};
		this.loginFailed = false;
		this.tryLogin = function(){
			$http.post('/', this.login).success(function(data){
				if (data.success){
					$window.location.href = '/main';
				} else {
					console.log(data.error);
					logCont.loginFailed = true;
				}
			});
			this.login = {};
		};
	}]);
})();