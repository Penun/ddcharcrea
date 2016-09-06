(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charInsertController', ['$http', '$scope', function($http, $scope){
		this.char = {
			"is_partial": true
		};
		$scope.InsStep = 1;

		this.CurStep = function(cuSt){
			return $scope.InsStep === cuSt;
		};

		this.SubmitBasic = function(){
			if (this.char.level > 20){
				this.char.level = 20
			} else {
				this.char.level = Number(this.char.level);
			}
			this.char.hit_points = Number(this.char.hit_points);
			this.char.exp = Number(this.char.exp);
			if (this.char.b_str > 30){
				this.char.b_str = 30;
			} else {
				this.char.b_str = Number(this.char.b_str);
			}
			if (this.char.b_dex > 30){
				this.char.b_dex = 30;
			} else {
				this.char.b_dex = Number(this.char.b_dex);
			}
			if (this.char.b_con > 30){
				this.char.b_con = 30;
			} else {
				this.char.b_con = Number(this.char.b_con);
			}
			if (this.char.b_int > 30){
				this.char.b_int = 30;
			} else {
				this.char.b_int = Number(this.char.b_int);
			}
			if (this.char.b_wis > 30){
				this.char.b_wis = 30;
			} else {
				this.char.b_wis = Number(this.char.b_wis);
			}
			if (this.char.b_cha > 30){
				this.char.b_cha = 30;
			} else {
				this.char.b_cha = Number(this.char.b_cha);
			}

			if ($scope.races == null){
				$http.get("/races/list").then(function(data){
					if (data.data.success){
						$scope.races = data.data.races;
						$scope.InsStep++;
					}
				});
			} else {
				$scope.InsStep++;
			}
		};

		this.SubmitRace = function(){
			var allCheck = false;
			for (var i = 0; i < $scope.races.length; i++){
				if ($scope.races[i].race_id == this.char.race_build.race.race_id){
					this.char.race_build.race.race_id = Number(this.char.race_build.race.race_id);
					if ($scope.races[i].sub_races != null){
						for (var j = 0; j < $scope.races[i].sub_races.length; j++){
							if ($scope.races[i].sub_races[j].sub_race_id == this.char.race_build.sub_race.sub_race_id){
								this.char.race_build.sub_race.sub_race_id = Number(this.char.race_build.sub_race.sub_race_id);
								allCheck = true;
								break;
							}
						}
					} else {
						this.char.race_build.sub_race = null;
						allCheck = true;
					}
					break;
				}
			}

			if (allCheck){
				if ($scope.ch_classes == null){
					$http.get("/classes/list").then(function(data){
						if (data.data.success){
							$scope.ch_classes = data.data.classes;
							$scope.InsStep++;
						}
					});
				} else {
					$scope.InsStep++;
				}
			} else {
				alert("Oh @#$%#@!! I'm Broken!! YOU STUPID ASS MONKEY!!!");
			}
		};

		this.SubmitClass = function() {
			var allCheck = false;
			if (this.char.level > 3){
				for (var i = 0; i < $scope.ch_classes.length; i++){
					if ($scope.ch_classes[i].class_id == this.char.class_build.class.class_id){
						this.char.class_build.class.class_id = Number(this.char.class_build.class.class_id);
						if ($scope.ch_classes[i].class_paths != null){
							for (var j = 0; j < $scope.ch_classes[i].class_paths.length; j++){
								if ($scope.ch_classes[i].class_paths[j].class_path_id == this.char.class_build.class_path.class_path_id){
									this.char.class_build.class_path.class_path_id = Number(this.char.class_build.class_path.class_path_id);
									allCheck = true;
									break;
								}
							}
						} else {
							this.char.class_build.class_path = null;
							allCheck = true;
						}
						break;
					}
				}
			} else {
				this.char.class_build.class.class_id = Number(this.char.class_build.class.class_id);
				allCheck = true;
			}

			if (allCheck){
				if ($scope.BGs == null){
					$http.get("/backgrounds/list").then(function(data){
						if (data.data.success){
							$scope.BGs = data.data.backgrounds;
							$scope.InsStep++;
						}
					});
				} else {
					$scope.InsStep++;
				}
			} else {
				alert("Oh @#$%#@!! I'm Broken!! YOU STUPID ASS MONKEY!!!");
			}
		};

		this.SubmitBG = function(){
			this.char.background_build.background.background_id = Number(this.char.background_build.background.background_id);
			$scope.InsStep++;
		};

		this.SaveChar = function(step){
			if (step == 5){
				this.char.is_partial = false;
			}
			var sendData = this.char;
			$http.post("/characters/insert", sendData).then(function(data){
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
				}
			});
		};

		this.RevealSubRace = function(r_i){
			if ($scope.races[r_i].showSubs == null){
				var sendData = {
					"r_id": $scope.races[r_i].race_id
				};
				$http.post("/races/subs", sendData).then(function(data){
					if (data.data.success){
						for (var i = 0; i < $scope.races.length; i++){
							if ($scope.races[i].race_id == data.data.r_id){
								if (data.data.sub_races.length > 0){
									$scope.races[i].sub_races = data.data.sub_races;
									$scope.races[i].showSubs = true;
								} else {
									$scope.races[i].sub_races = null;
									$scope.races[i].showSubs = false;								
								}
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

		this.RevealClassPath = function(c_i){
			if (this.char.level > 3){
				if ($scope.ch_classes[c_i].showPaths == null){
					var sendData = {
						"c_id": $scope.ch_classes[c_i].class_id
					};
					$http.post("/classes/paths", sendData).then(function(data){
						if (data.data.success){
							for (var i = 0; i < $scope.ch_classes.length; i++){
								if ($scope.ch_classes[i].class_id == data.data.c_id){
									if (data.data.class_paths.length > 0){
										$scope.ch_classes[i].class_paths = data.data.class_paths;
										$scope.ch_classes[i].showPaths = true;
									} else {
										$scope.ch_classes[i].class_paths = null;
										$scope.ch_classes[i].showPaths = false;								
									}
									break;
								}
							}
						}
					});
					this.HideOtherClassPaths(c_i);
				} else if ($scope.ch_classes[c_i].showPaths) {
					$scope.ch_classes[c_i].showPaths = false;
				} else {
					$scope.ch_classes[c_i].showPaths = true;
					this.HideOtherClassPaths(c_i);
				}
			}
		};

		this.HideOtherClassPaths = function(c_i){
			for (var i = 0; i < $scope.ch_classes.length; i++){
				if (i != c_i){
					if ($scope.ch_classes[i].showPaths != null){
						$scope.ch_classes[i].showPaths = false;
					}
				}
			}
		};

		this.CheckClassPath = function(c_i){
			return $scope.ch_classes[c_i].showPaths;
		};

		this.RevealBGDet = function(b_i){
			if ($scope.BGs[b_i].showDets == null || !$scope.BGs[b_i].showDets){
				$scope.BGs[b_i].showDets = true;
				this.HideOtherBGDets(b_i);
			} else {
				$scope.BGs[b_i].showDets = false;
			}
		};

		this.HideOtherBGDets = function(b_i){
			for (var i = 0; i < $scope.BGs.length; i++){
				if (i != b_i){
					if ($scope.BGs[i].showDets != null){
						$scope.BGs[i].showDets = false;
					}
				}
			}
		};

		this.CheckBGDet = function(b_i){
			return $scope.BGs[b_i].showDets;
		};

		this.BackStep = function() {
			$scope.InsStep--;
		};
	}]);
})();