(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charInsertController', ['$http', '$scope', function($http, $scope){
		this.char = {};
		$scope.InsStep = 1;

		this.CurStep = function(cuSt){
			return $scope.InsStep === cuSt;
		};

		this.SubmitBasic = function(){
			if (this.char.level > 20){
				this.char.level = "20"
			}
			if (this.char.b_str > 30){
				this.char.b_str = "30";
			}
			if (this.char.b_dex > 30){
				this.char.b_dex = "30";
			}
			if (this.char.b_con > 30){
				this.char.b_con = "30";
			}
			if (this.char.b_int > 30){
				this.char.b_int = "30";
			}
			if (this.char.b_wis > 30){
				this.char.b_wis = "30";
			}
			if (this.char.b_cha > 30){
				this.char.b_cha = "30";
			}

			if ($scope.races == null){
				var sendData = this.char;
				$http.get("/races/list").then(function(data){
					if (data.data.success){
						$scope.races = data.data.races;
						$scope.InsStep = 2;
					}
				});
			}
		};

//			$http.post("/characters/insert/details", sendData).then(function(data){
//				if (data.data.success){
//					for (var i = 0; i < $scope.users.length; i++){
//						if ($scope.users[i].isCur){
//							if ($scope.users[i].playchars != null){
//								$scope.users[i].playchars.push(data.data.playchar)
//							} else {
//								$scope.users[i].playchars = [data.data.playchar];
//							}
//							break;
//						}
//					}
//				}
//			});

		this.RevealSubRace = function(r_i){
			if (this.char.level >= 3){
				if ($scope.races[r_i].showSubs == null){
					var sendData = {
						"r_id": $scope.races[r_i].race_id
					};
					$http.post("/races/subs", sendData).then(function(data){
						if (data.data.success && data.data.sub_races.length > 0){
							for (var i = 0; i < $scope.races.length; i++){
								if ($scope.races[i].race_id == data.data.r_id){
									$scope.races[i].sub_races = data.data.sub_races;
									$scope.races[i].showSubs = true;
									break;
								}
							}
						}
					});
					this.HideOtherSubRaces(r_i);
				} else if ($scope.races[r_i].showSubs) {
					$scope.races[r_i].showSubs = false;
				} else {
					$scope.races[r_i].showSubs = true;
					this.HideOtherSubRaces(r_i);
				}
			}
		};

		this.HideOtherSubRaces = function(r_i){
			for (var i = 0; i < $scope.races.length; i++){
				if (i != r_i){
					if ($scope.races[i].showSubs != null){
						$scope.races[i].showSubs = false;
					}
				}
			}
		};

		this.CheckSubRace = function(r_i){
			return $scope.races[r_i].showSubs;
		};
	}]);
})();