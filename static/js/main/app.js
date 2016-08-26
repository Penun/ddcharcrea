(function(){
	var app = angular.module('ddchar', ['ddchar_main']);

	app.controller('tabManager', ['$http', '$scope', function($http, $scope){
		$scope.activeTab = 1;
		$scope.loadedTabs = [1];

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
					$scope.loadedTabs.push(tabL);
					$scope.activeTab = tabL;
					break;
				case 2:
					$scope.loadedTabs.push(tabL);
					$scope.activeTab = tabL;
					break;
				default:
					break;
			}
		};
	}]);
})();