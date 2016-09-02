(function(){
	var app = angular.module('ddchar', ['ddchar_main']);

	app.controller('locManager', ['$http', '$scope', '$window', function($http, $scope, $window){
		$scope.activeLoc = 1;
		$scope.loadedTabs = [1, 2];

		this.selectLoc = function(newLoc){
			if ($scope.activeLoc != newLoc){
				if ($scope.loadedTabs.indexOf(newLoc) === -1){
					this.loadTab(newLoc);
				} else {
					$scope.activeLoc = newLoc;
				}
			}
		};

		this.isSelected = function(checkL){
			return $scope.activeLoc === checkL;
		};

		this.loadTab = function(loc){
			switch (loc) {
				case 1:
					$scope.loadedTabs.push(loc);
					$scope.activeLoc = loc;
					break;
				case 2:
					$scope.loadedTabs.push(loc);
					$scope.activeLoc = loc;
					break;
				default:
					break;
			}
		};

		this.Logout = function(){
			$http.get("/main/logout").then(function(data){
				$window.location.href = '/';
			});
		};
	}]);
})();