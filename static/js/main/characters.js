(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charInsertController', ['$http', '$scope', function($http, $scope){
		this.char = {};
		$scope.InsStep = 1;

		this.CurStep = function(cuSt){
			return $scope.InsStep === cuSt;
		};

		this.SubmitBasic = function(){
			var sendData = this.char;
			if (sendData.level > 20){
				sendData.level = "20"
			}
			if (sendData.b_str > 30){
				sendData.b_str = "30";
			}
			if (sendData.b_dex > 30){
				sendData.b_dex = "30";
			}
			if (sendData.b_con > 30){
				sendData.b_con = "30";
			}
			if (sendData.b_int > 30){
				sendData.b_int = "30";
			}
			if (sendData.b_wis > 30){
				sendData.b_wis = "30";
			}
			if (sendData.b_cha > 30){
				sendData.b_cha = "30";
			}
			$http.post("/characters/insert/details", sendData).then(function(data){
				if (data.data.success){
					for (var i = 0; i < $scope.users.length; i++){
						if ($scope.users[i].isCur){
							if ($scope.users[i].playchars != null){
								$scope.users[i].playchars.push(data.data.playchar)
							} else {
								$scope.users[i].playchars = [data.data.playchar];
							}
							break;
						}
					}
					if ($scope.races == null){
						$http.get("/races/list").then(function(data){
							if (data.data.success){
								$scope.races = data.data.races;
							}
						});
					}
					$scope.InsStep = 2;
				}
			});
		};
	}]);
})();