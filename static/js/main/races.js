(function(){
	var app = angular.module('ddchar_races', []);
	app.controller('raceController', ['$scope', function($scope){
		$scope.races = preRaces;
		$scope.subRaces = preSubRaces;
	}]);
})();