(function(){
	var app = angular.module('ddchar', ['ddchar_characters', 'ddchar_races']);

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
									var pl_race = $scope.playchars[i].race_build.race.race_id;
									for (var j = 0; j < preRaces.length; j++){
										if (preRaces[j].Race_id === pl_race){
											$scope.playchars[i].raceRef = preRaces[j].Name;
											break;
										}
									}
								} else {
									var pl_subRace = $scope.playchars[i].race_build.sub_race.sub_race_id;
									for (var j = 0; j < preSubRaces.length; j++){
										if (preSubRaces[j].SubRace_id === pl_subRace){
											$scope.playchars[i].raceRef = preSubRaces[j].Name;
											break;
										}
									}
								}
								var pl_class = $scope.playchars[i].class_build.class.class_id;
								for (var j = 0; j < preClasses.length; j++){
									if (preClasses[j].class_id === pl_class){
										$scope.playchars[i].refClass = preClasses[j].name;
										break;
									}
								}
								if ($scope.playchars[i].level >= 3){
									pl_classPath = $scope.playchars[i].class_build.class_path.class_path_id;
									for (var j = 0; j < preClassPaths.length; j++){
										if (preClassPaths[j].class_path_id === pl_classPath){
											$scope.playchars[i].refClass += " (" + preClassPaths[j].name + ")";
											break;
										}
									}
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