(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charInsertController', ['$http', '$scope', function($http, $scope){
		this.char = {
			"is_partial": true
		};
		this.chosenProfs = {};
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

					this.char.race_build.age = Number(this.char.race_build.age);
					if (this.char.race_build.age > $scope.races[i].max_age){
						this.char.race_build.age = $scope.races[i].max_age;
					} 

					this.char.race_build.weight = Number(this.char.race_build.weight);
					if (this.char.race_build.weight > $scope.races[i].max_weight){
						this.char.race_build.weight = $scope.races[i].max_weight;
					} else if (this.char.race_build.weight < $scope.races[i].min_weight){
						this.char.race_build.weight = $scope.races[i].min_weight;
					}

					this.char.race_build.height_in = (this.chHeFe * 12) + Number(this.chHeIn);
					if (this.char.race_build.height_in > $scope.races[i].max_height_in){
						this.char.race_build.height_in = $scope.races[i].max_height_in;
						this.chHeFe = Math.floor($scope.races[i].max_height_in / 12);
						this.chHeIn = $scope.races[i].max_height_in % 12;
					} else if (this.char.race_build.height_in < $scope.races[i].min_height_in){
						this.char.race_build.height_in = $scope.races[i].min_height_in;
						this.chHeFe = Math.floor($scope.races[i].min_height_in / 12);
						this.chHeIn = $scope.races[i].min_height_in % 12;
					}

					if ($scope.races[i].sub_races != null){
						for (var j = 0; j < $scope.races[i].sub_races.length; j++){
							if ($scope.races[i].sub_races[j].sub_race_id == this.char.race_build.sub_race.sub_race_id){
								this.char.race_build.sub_race.sub_race_id = Number(this.char.race_build.sub_race.sub_race_id);
								allCheck = true;
								break;
							}
						}
					} else {
						delete this.char.race_build.sub_race;
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

				if ($scope.skillProfs == null){
					$http.get("/proficiencies/skills").then(function(data){
						if (data.data.success){
							$scope.skillProfs = data.data.proficiencies;
						}
					});
				}
			} else {
				alert("Oh @#$%#@!! I'm Broken!! YOU STUPID ASS MONKEY!!!");
			}
		};

		this.SubmitClass = function() {
			var allCheck = false;
			if (this.char.level >= 3){
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
							delete this.char.class_build.class_path;
							allCheck = true;
						}
						break;
					}
				}
			} else {
				this.char.class_build.class.class_id = Number(this.char.class_build.class.class_id);
				delete this.char.class_build.class_path;
				allCheck = true;
			}

			if (allCheck){
				if (this.chosenProfs.length	!= this.skillCap){
					allCheck = false;
				}
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

			for (var i = 0; i < this.chosenProfs.length; i++){
				this.chosenProfs[i] = Number(this.chosenProfs[i]);
			}

			var sendData = {
				"playchar": this.char,
				"chosen_profs": this.chosenProfs
			};
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
			this.char = {
				"is_partial": true
			};
		};

		this.UpdateSelRace = function(r_i){
			delete this.char.race_build.race.sub_race;
			this.RevealSubRace(r_i);
			this.HideOtherSubRaces(r_i);
			this.aduAge = $scope.races[r_i].adult_age;
			this.maxAge = $scope.races[r_i].max_age;
			this.minWeight = $scope.races[r_i].min_weight;
			this.maxWeight = $scope.races[r_i].max_weight;

			var finFeet = Math.floor($scope.races[r_i].min_height_in / 12);
			var finInch = $scope.races[r_i].min_height_in % 12;
			this.minHeight = finFeet + "' " + finInch +"\"";
			
			finFeet = Math.floor($scope.races[r_i].max_height_in / 12);
			finInch = $scope.races[r_i].max_height_in % 12;
			this.maxHeight = finFeet + "' " + finInch +"\"";
		}

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
			} else {
				$scope.races[r_i].showSubs = true;
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

		this.UpdateSelClass = function(c_i){
			delete this.char.class_build.class_path;
			this.RevealClassPath(c_i);
			this.HideOtherClassPaths(c_i);
			this.skillCap = $scope.ch_classes[c_i].skill_profs;
			this.curClassIndex = c_i;

			if ($scope.ch_classes[c_i].skillProfs == null){
				var sendData = {
					"c_in": c_i,
					"c_id": $scope.ch_classes[c_i].class_id
				};
				$http.post("/proficiencies/class", sendData).then(function(data){
					if (data.data.success){
						$scope.ch_classes[data.data.c_in].skillProfs = data.data.class_profs;

						$scope.curClassProfs = [];
						for (var i = 0; i < $scope.ch_classes[data.data.c_in].skillProfs.length; i++){
							for (var j = 0; j < $scope.skillProfs.length; j++){
								if ($scope.ch_classes[data.data.c_in].skillProfs[i].proficiency.proficiency_id == $scope.skillProfs[j].proficiency_id){
									var tempClassProf = {
										"class_prof_id": $scope.ch_classes[data.data.c_in].skillProfs[i].class_proficiency_id,
										"name": $scope.skillProfs[j].name
									};
									$scope.curClassProfs.push(tempClassProf);
									break;
								}
							}
						}
					}
				});
			} else {
				$scope.curClassProfs = [];
				for (var i = 0; i < $scope.ch_classes[c_i].skillProfs.length; i++){
					for (var j = 0; j < $scope.skillProfs.length; j++){
						if ($scope.ch_classes[c_i].skillProfs[i].proficiency.proficiency_id == $scope.skillProfs[j].proficiency_id){
							var tempClassProf = {
								"class_prof_id": $scope.ch_classes[c_i].skillProfs[i].class_proficiency_id,
								"name": $scope.skillProfs[j].name
							};
							$scope.curClassProfs.push(tempClassProf);
							break;
						}
					}
				}
			}

		};

		this.RevealClassPath = function(c_i){
			if (this.char.level >= 3){
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
				} else {
					$scope.ch_classes[c_i].showPaths = true;
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

		this.ClassProfsCheck = function(){
			while (this.chosenProfs.length > this.skillCap) {
				this.chosenProfs.shift();
			}
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