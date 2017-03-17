(function(){
	var app = angular.module('ddchar_campaigns', []);
	app.controller('mainCampController', ['$http', '$scope', function($http, $scope){
		$scope.showCamps = false;
		$scope.showRegs = false;

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
            return false;
        };

        this.AddElement = function(){

        };
    }]);
})();
