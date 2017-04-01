(function(){
	var app = angular.module('ddchar_campaigns', []);
	app.controller('mainCampController', ['$http', '$scope', function($http, $scope){
		$scope.showCamps = false;
		$scope.showRegs = false;
		$scope.showEncs = false;

		$scope.$on('tab2_go', function(){
			$http.get("/campaigns").then(function(result){
				if (result.data.success){
					$scope.campaigns = result.data.campaigns;
					$scope.showCamps = true;
				}
			});
        });

        this.RevealRegions = function(ind){
			if ($scope.campaigns[ind].fetched == null){
				var sendData = {
					"c_id": $scope.campaigns[ind].campaign_id,
					"c_ind": ind
				};
				$http.post("/regions", sendData).then(function(data){
					if (data.data.success){
						$scope.campaigns[data.data.c_ind].fetched = true;
						$scope.campaigns[data.data.c_ind].regions = $scope.curRegions = data.data.regions;
						$scope.curRegions.campaign_id = $scope.campaigns[data.data.c_ind].campaign_id;
						$scope.showRegs = true;
					}
				});
			} else if ($scope.showRegs){
				if ($scope.curRegions.campaign_id == $scope.campaigns[ind].campaign_id){
					$scope.showRegs = false;
				} else {
					$scope.curRegions = $scope.campaigns[ind].regions;
				}
			} else {
				$scope.showRegs = true;
				$scope.curRegions = $scope.campaigns[ind].regions;
			}
        };

        this.RevealEncounters = function(ind){
			var c_ind = null;
			for (var i = 0; i < $scope.campaigns.length; i++){
				if ($scope.campaigns[i].campaign_id == $scope.curRegions.campaign_id){
					c_ind = i;
					break;
				}
			}
			if (c_ind != null){
				if ($scope.campaigns[c_ind].regions[ind].fetched == null){
					var sendData = {
						"r_id": $scope.curRegions[ind].region_id,
						"r_ind": ind,
						"c_ind": c_ind
					};
					$http.post("/encounters", sendData).then(function(data){
						if (data.data.success){
							$scope.campaigns[data.data.c_ind].regions[data.data.r_ind].fetched = true;
							$scope.campaigns[data.data.c_ind].regions[data.data.r_ind].encounters = $scope.curEncounters = data.data.encounters;
							$scope.curEncounters.region_id = $scope.campaigns[data.data.c_ind].regions[data.data.r_ind].region_id;
							$scope.showEncs = true;
						}
					});
				} else if ($scope.showEncs){
					if ($scope.curEncounters.region_id == $scope.campaigns[c_ind].regions[ind].region_id){
						$scope.showEncs = false;
					} else {
						$scope.curEncounters = $scope.campaigns[c_ind].regions[ind].encounters;
					}
				} else {
					$scope.showEncs = true;
					$scope.curEncounters = $scope.campaigns[c_ind].regions[ind].encounters;
				}
			}
        };

        this.RevealDetails = function(ind){

        };

        this.ShowCampaigns = function(){
            return $scope.showCamps;
        };

        this.ShowRegions = function(){
            return $scope.showRegs;
        };

        this.ShowEncounters = function(){
            return $scope.showEncs;
        };

        this.AddElement = function(){
			var sendData = {
				"level": Math.floor(Math.random() * 20 + 1)
			};
			$http.post("/characters/random", sendData).then(function(data){
				if (data.data.success){

				}
			});
        };
    }]);
})();
