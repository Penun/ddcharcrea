(function(){
	var app = angular.module('ddchar_campaigns', []);
	app.controller('mainCampController', ['$http', '$scope', function($http, $scope){
		$scope.showRegs = false;
		$scope.showEncs = false;
		$scope.regionColRight = "0%";

		$scope.$on('tab2_go', function(){
			$http.get("/campaigns").then(function(result){
				if (result.data.success){
					$scope.campaigns = result.data.campaigns;
				}
			});

			var encCol = document.querySelector("#encounter_col");
			encCol.addEventListener('webkitAnimationEnd', function(event){
		        var encCol = angular.element(event.target);
				if (encCol.hasClass("fade_out")) {
					encCol.addClass("fade_nu");
					encCol.removeClass("fade_out");
				}
			}, true);
			encCol.addEventListener('animationend', function(event) {
        		var encCol = angular.element(event.target);
				if (encCol.hasClass("fade_out")) {
					encCol.addClass("fade_nu");
					encCol.removeClass("fade_out");
				}
			}, true);
			var campCol = document.querySelector("#campaign_col");
			campCol.addEventListener('webkitAnimationEnd', function(event){
				var campCol = angular.element(event.target);
				if (campCol.hasClass("fade_out")) {
					campCol.addClass("fade_nu");
					campCol.removeClass("fade_out");
				}
			}, true);
			campCol.addEventListener('animationend', function(event){
				var campCol = angular.element(event.target);
				if (campCol.hasClass("fade_out")) {
					campCol.addClass("fade_nu");
					campCol.removeClass("fade_out");
				}
			}, true);
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
							$scope.regionColRight = "47%";
							var encCol = angular.element(document.querySelector("#encounter_col"));
							encCol.removeClass("fade_nu");
							encCol.addClass("fade_in");
							var campCol = angular.element(document.querySelector("#campaign_col"));
							campCol.addClass("fade_out");
						}
					});
				} else if ($scope.showEncs){
					if ($scope.curEncounters.region_id == $scope.campaigns[c_ind].regions[ind].region_id){
						$scope.showEncs = false;
						$scope.regionColRight = "0%";
						var encCol = angular.element(document.querySelector("#encounter_col"));
						encCol.removeClass("fade_in");
						encCol.addClass("fade_out");
						var campCol = angular.element(document.querySelector("#campaign_col"));
						campCol.removeClass("fade_nu");
						campCol.addClass("fade_in");
					} else {
						$scope.curEncounters = $scope.campaigns[c_ind].regions[ind].encounters;
					}
				} else {
					$scope.showEncs = true;
					$scope.regionColRight = "47%";
					var encCol = angular.element(document.querySelector("#encounter_col"));
					encCol.removeClass("fade_nu");
					encCol.addClass("fade_in");
					var campCol = angular.element(document.querySelector("#campaign_col"));
					campCol.removeClass("fade_in");
					campCol.addClass("fade_out");
					$scope.curEncounters = $scope.campaigns[c_ind].regions[ind].encounters;
				}
			}
        };

        this.RevealDetails = function(ind){

        };

        this.ShowRegions = function(){
            return $scope.showRegs;
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
