(function(){
	var app = angular.module('ddchar', []);

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
						var charTab = document.getElementById("charTab");
						charTab.innerHTML = data.data;
						$scope.loadedTabs.push(tabL);
						$scope.activeTab = tabL;
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