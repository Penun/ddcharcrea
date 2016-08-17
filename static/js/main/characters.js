(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charController', ['$scope', function($scope){
		this.RevealDetails = function(ch_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].ch_id == ch_id){
					if ($scope.playchars[i].showDetails == null || !$scope.playchars[i].showDetails) {
						$scope.playchars[i].showDetails = true;
						break;
					} else {
						$scope.playchars[i].showDetails = false;
					}
				}
			}
		};
	}]);
})();