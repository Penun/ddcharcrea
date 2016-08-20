(function(){
	var app = angular.module('ddchar', ['ddchar_characters']);

	app.controller('tabManager', ['$http', '$scope', function($http, $scope){
		$scope.activeTab = 0;
		$scope.loadedTabs = [];

		this.selectTab = function(newTab){
			if ($scope.activeTab != newTab){
				if ($scope.loadedTabs.indexOf(newTab) === -1){
					this.loadTab(newTab);
				} else {
					$scope.activeTab = newTab;
				}
			}
		};
		this.isSelected = function(checkT){
			return $scope.activeTab === checkT;
		};
		this.loadTab = function(tabL){
			switch (tabL) {
				case 1:
					$http.get("/characters").then(function(data){
						if (data.data.success){
							$scope.playchars = data.data.playchars;
							for (var i = 0; i < $scope.playchars.length; i++){
								if ($scope.playchars[i].race_build.sub_race === null){
									$scope.playchars[i].raceRef = $scope.playchars[i].race_build.race.name;
								} else {
									$scope.playchars[i].raceRef = $scope.playchars[i].race_build.sub_race.name;
								}
							}
							$scope.loadedTabs.push(tabL);
							$scope.activeTab = tabL;
						}
					});
					break;
				case 2:
					$scope.loadedTabs.push(tabL);
					$scope.activeTab = tabL;
					break;
				default:
					break;
			}
		}
	}]);
})();