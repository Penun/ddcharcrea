(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charInsertController', ['$http', '$scope', function($http, $scope){
		this.chosenProfs = [];
		this.halfElfAbil = {};
		$scope.InsStep = 1;
		this.submitText = "Next";
		this.pages = {};
		this.pages.insCharDet = {};

		this.CurStep = function(cuSt){
			return $scope.InsStep === cuSt;
		};

		this.SubmitBasic = function(){
			if ($scope.$parent.addChar.level > 20){
				$scope.$parent.addChar.level = 20
			} else {
				$scope.$parent.addChar.level = Number($scope.$parent.addChar.level);
			}
			$scope.$parent.addChar.hit_points = Number($scope.$parent.addChar.hit_points);
			$scope.$parent.addChar.exp = Number($scope.$parent.addChar.exp);
			if ($scope.$parent.addChar.b_str > 30){
				$scope.$parent.addChar.b_str = 30;
			} else {
				$scope.$parent.addChar.b_str = Number($scope.$parent.addChar.b_str);
			}
			if ($scope.$parent.addChar.b_dex > 30){
				$scope.$parent.addChar.b_dex = 30;
			} else {
				$scope.$parent.addChar.b_dex = Number($scope.$parent.addChar.b_dex);
			}
			if ($scope.$parent.addChar.b_con > 30){
				$scope.$parent.addChar.b_con = 30;
			} else {
				$scope.$parent.addChar.b_con = Number($scope.$parent.addChar.b_con);
			}
			if ($scope.$parent.addChar.b_int > 30){
				$scope.$parent.addChar.b_int = 30;
			} else {
				$scope.$parent.addChar.b_int = Number($scope.$parent.addChar.b_int);
			}
			if ($scope.$parent.addChar.b_wis > 30){
				$scope.$parent.addChar.b_wis = 30;
			} else {
				$scope.$parent.addChar.b_wis = Number($scope.$parent.addChar.b_wis);
			}
			if ($scope.$parent.addChar.b_cha > 30){
				$scope.$parent.addChar.b_cha = 30;
			} else {
				$scope.$parent.addChar.b_cha = Number($scope.$parent.addChar.b_cha);
			}

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
		};

		this.SubmitRace = function(){
			var allCheck = false;
			$scope.$parent.addChar.race_build.race.race_id = Number($scope.$parent.addChar.race_build.race.race_id);

			if (!$scope.$parent.addChar.is_partial && (this.curRaceIndex == null || typeof(this.curRaceIndex) == 'undefined')){
				for (var i = 0; i < $scope.races.length; i++){
					if ($scope.races[i].race_id == $scope.$parent.addChar.race_build.race.race_id){
						this.UpdateSelRace(i);
						this.chHeFe = Math.floor($scope.$parent.addChar.race_build.height_in / 12);
						this.chHeIn = $scope.$parent.addChar.race_build.height_in % 12;
						break;
					}
				}
			}

			if ($scope.races[this.curRaceIndex].sub_races != null){
				for (var j = 0; j < $scope.races[this.curRaceIndex].sub_races.length; j++){
					if ($scope.races[this.curRaceIndex].sub_races[j].sub_race_id == $scope.$parent.addChar.race_build.sub_race.sub_race_id){
						$scope.$parent.addChar.race_build.sub_race.sub_race_id = Number($scope.$parent.addChar.race_build.sub_race.sub_race_id);
						allCheck = true;
						break;
					}
				}
			} else {
				delete $scope.$parent.addChar.race_build.sub_race;
				allCheck = true;
			}

			if (allCheck){
				if ($scope.skillProfs == null){
					$http.get("/proficiencies/skills").then(function(data){
						if (data.data.success){
							$scope.skillProfs = data.data.proficiencies;
						}
					});
				}

				if ($scope.races[this.curRaceIndex].features == null){
					var sendData = {
						"r_in": this.curRaceIndex,
						"r_id": $scope.races[this.curRaceIndex].race_id
					};
					$http.post("/races/features", sendData).then(function(data){
						if (data.data.success){
							$scope.races[data.data.r_in].features = data.data.race_features;
							for (var i = 0; i < $scope.races[data.data.r_in].features.length; i++){
								$scope.races[data.data.r_in].features[i].feature.options = JSON.parse($scope.races[data.data.r_in].features[i].feature.options);
							}
						}
					});
				}

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

		this.SubmitRaceInfo = function(){
			var allCheck = true;
			$scope.$parent.addChar.race_build.age = Number($scope.$parent.addChar.race_build.age);
			if ($scope.$parent.addChar.race_build.age > $scope.races[this.curRaceIndex].max_age){
				$scope.$parent.addChar.race_build.age = $scope.races[this.curRaceIndex].max_age;
			} 

			$scope.$parent.addChar.race_build.weight = Number($scope.$parent.addChar.race_build.weight);
			if ($scope.$parent.addChar.race_build.weight > $scope.races[this.curRaceIndex].max_weight){
				$scope.$parent.addChar.race_build.weight = $scope.races[this.curRaceIndex].max_weight;
			} else if ($scope.$parent.addChar.race_build.weight < $scope.races[this.curRaceIndex].min_weight){
				$scope.$parent.addChar.race_build.weight = $scope.races[this.curRaceIndex].min_weight;
			}

			$scope.$parent.addChar.race_build.height_in = (this.chHeFe * 12) + Number(this.chHeIn);
			if ($scope.$parent.addChar.race_build.height_in > $scope.races[this.curRaceIndex].max_height_in){
				$scope.$parent.addChar.race_build.height_in = $scope.races[this.curRaceIndex].max_height_in;
				this.chHeFe = Math.floor($scope.races[this.curRaceIndex].max_height_in / 12);
				this.chHeIn = $scope.races[this.curRaceIndex].max_height_in % 12;
			} else if ($scope.$parent.addChar.race_build.height_in < $scope.races[this.curRaceIndex].min_height_in){
				$scope.$parent.addChar.race_build.height_in = $scope.races[this.curRaceIndex].min_height_in;
				this.chHeFe = Math.floor($scope.races[this.curRaceIndex].min_height_in / 12);
				this.chHeIn = $scope.races[this.curRaceIndex].min_height_in % 12;
			}

			if (allCheck){
				if ($scope.$parent.addChar.race_build.race.race_id == 7){
					if (this.halfElfAbil.length != 2){
						allCheck = false;
					} else {
						var options = [];

						for (var i = 0; i < this.halfElfAbil.length; i++){
							var abil_mod = {
								"type": "ability_mod",
								"option": {
									"mod": this.halfElfAbil[i],
									"mod_val": 1
								}
							};
							options.push(abil_mod);
						}

						$scope.$parent.addChar.race_build.options = JSON.stringify(options);
					}
				} else {
					delete $scope.$parent.addChar.race_build.options;
				}

				if (!$scope.$parent.addChar.is_partial){
					for (var i = 0; i < $scope.ch_classes.length; i++){
						if ($scope.ch_classes[i].class_id == $scope.$parent.addChar.class_build.class.class_id){
							this.RevealClassPath(i);
							this.HideOtherClassPaths(i);
							this.curClassIndex = i;
							break;
						}
					}
				}

				if (allCheck){
					$scope.InsStep++;
				}
			}
		};

		this.SubmitClass = function(){
			var allCheck = false;
			$scope.$parent.addChar.class_build.class.class_id = Number($scope.$parent.addChar.class_build.class.class_id);
			
			if ($scope.$parent.addChar.level >= 3){	
				if ($scope.ch_classes[this.curClassIndex].class_paths != null){
					for (var j = 0; j < $scope.ch_classes[this.curClassIndex].class_paths.length; j++){
						if ($scope.ch_classes[this.curClassIndex].class_paths[j].class_path_id == $scope.$parent.addChar.class_build.class_path.class_path_id){
							$scope.$parent.addChar.class_build.class_path.class_path_id = Number($scope.$parent.addChar.class_build.class_path.class_path_id);
							allCheck = true;
							break;
						}
					}
				} else {
					delete $scope.$parent.addChar.class_build.class_path;
					allCheck = true;
				}
			} else {
				delete $scope.$parent.addChar.class_build.class_path;
				allCheck = true;
			}

			if (allCheck){
				this.skillCap = $scope.ch_classes[this.curClassIndex].skill_profs;

				if ($scope.ch_classes[this.curClassIndex].skillProfs == null){
					var sendData = {
						"c_in": this.curClassIndex,
						"c_id": $scope.ch_classes[this.curClassIndex].class_id
					};
					$http.post("/proficiencies/class", sendData).then(function(data){
						if (data.data.success){
							$scope.ch_classes[data.data.c_in].skillProfs = data.data.class_profs;
						}
					});
				}

				if (!$scope.$parent.addChar.is_partial){
					for (var i = 0; i < $scope.BGs.length; i++){
						if ($scope.BGs[i].background_id == $scope.$parent.addChar.background_build.background.background_id){
							this.UpdateSelBG(i);
							break;
						}
					}
				}

				$scope.InsStep++;
			} else {
				alert("Oh @#$%#@!! I'm Broken!! YOU STUPID ASS MONKEY!!!");
			}
		};

		this.SubmitBG = function(){
			$scope.$parent.addChar.background_build.background.background_id = Number($scope.$parent.addChar.background_build.background.background_id);
			this.GenerateCurClassProfs();
			if (!$scope.$parent.addChar.is_partial){
				var tempProf = [];
				for (var i = 0; i < $scope.$parent.addChar.cb_chosen.length; i++){
					this.chosenProfs.push({
						"class_prof_id": $scope.$parent.addChar.cb_chosen[i].class_proficiency.class_proficiency_id,
						"name": $scope.$parent.addChar.cb_chosen[i].class_proficiency.proficiency.name
					});
				}
			}
			$scope.InsStep++;
		};

		this.SaveChar = function(){
			var allCheck = true;

			for (var i = 0; i < this.chosenProfs.length; i++){
				this.chosenProfs[i] = Number(this.chosenProfs[i].class_prof_id);
			}

			if (allCheck){
				if (this.chosenProfs.length	!= this.skillCap){
					allCheck = false;
				}
			}

			if (allCheck){
				var sendData = {
					"playchar": $scope.$parent.addChar
				};
				if ($scope.$parent.addChar.is_partial){
					sendData.chosen_profs = this.chosenProfs;
					$http.post("/characters/insert", sendData).then(function(data){
						if (data.data.success){
							if ($scope.users[$scope.curUs_in].playchars != null){
								$scope.users[$scope.curUs_in].playchars.push(data.data.playchar);
							} else {
								$scope.users[$scope.curUs_in].playchars = [data.data.playchar];
							}
							$scope.chara = data.data.playchar;
						}
					});
					$scope.$parent.addChar.is_partial = false;
				} else {
					var cb_chosen = $scope.$parent.addChar.cb_chosen;
					delete $scope.$parent.addChar.cb_chosen;

					sendData.update_chosen = [];
					var lo_coun = 0;

					if (cb_chosen.length >= this.chosenProfs.length){
						lo_coun = cb_chosen.length;
					} else {
						lo_coun = this.chosenProfs.length;
					}

					for (var i = 0; i < lo_coun; i++){
						var up_chos = {};

						if (cb_chosen[i] != null && typeof(cb_chosen[i]) != 'undefined'){
							up_chos.cb_chosen_proficiency_id = cb_chosen[i].cb_chosen_proficiency_id;
						} else {
							up_chos.cb_chosen_proficiency_id = 0;
						}

						if (this.chosenProfs[i] != null && typeof(this.chosenProfs[i])){
							up_chos.class_proficiency_id = this.chosenProfs[i];
						} else {
							up_chos.class_proficiency_id = 0;
						}

						sendData.update_chosen.push(up_chos);
					}

					$http.post("/characters/update", sendData).then(function(data){
						if (data.data.success){
							for (var i = 0; i < $scope.users[$scope.curUs_in].playchars.length; i++){
								if ($scope.users[$scope.curUs_in].playchars[i].playchar_id == data.data.playchar.playchar_id){
									$scope.users[$scope.curUs_in].playchars[i] = data.data.playchar;
								}
								break;
							}
							$scope.chara = data.data.playchar;
						}
					});
				}
				$scope.$parent.overScreen = 1;
				$scope.$parent.addChar = {
					"is_partial": true
				};
				$scope.InsStep = 1;
				this.chHeIn = "";
				this.chHeFe = "";

			} else {
				alert("Oh @#$%#@!! I'm Broken!! YOU STUPID ASS MONKEY!!!");
			}
		};

		this.UpdateSelRace = function(r_i){
			delete $scope.$parent.addChar.race_build.race.sub_race;
			this.RevealSubRace(r_i);
			this.HideOtherSubRaces(r_i);
			this.aduAge = $scope.races[r_i].adult_age;
			this.maxAge = $scope.races[r_i].max_age;
			this.minWeight = $scope.races[r_i].min_weight;
			this.maxWeight = $scope.races[r_i].max_weight;
			this.curRaceIndex = r_i;

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
				if ($scope.races[r_i].sub_races != null && $scope.races[r_i].sub_races.length > 0){
					$scope.races[r_i].showSubs = true;
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

		this.UpdateSelClass = function(c_i){
			delete $scope.$parent.addChar.class_build.class_path;
			this.RevealClassPath(c_i);
			this.HideOtherClassPaths(c_i);
			this.curClassIndex = c_i;
		};

		this.RevealClassPath = function(c_i){
			if ($scope.$parent.addChar.level >= 3){
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

		this.UpdateSelBG = function(b_i){
			this.RevealBGDet(b_i);
			this.HideOtherBGDets(b_i);
			this.curBGIndex = b_i;
			if ($scope.BGs[b_i].proficiencies == null){
				var sendData ={
					"p_in": b_i,
					"background_id": $scope.BGs[b_i].background_id
				};
				$http.post("/proficiencies/background", sendData).then(function(data){
					if (data.data.success){
						$scope.BGs[data.data.p_in].proficiencies = data.data.background_proficiencies;
					}
				});
			}
		};

		this.BackStep = function(){
			$scope.InsStep--;
		};

		this.GenerateCurClassProfs = function(){
			var raceProfs = [];
			for (var i = 0; i < $scope.races[this.curRaceIndex].features.length; i++){
				for (var j = 0; j < $scope.races[this.curRaceIndex].features[i].feature.options.length; j++){
					if ($scope.races[this.curRaceIndex].features[i].feature.options[j].type == "skill_prof"){
						raceProfs.push($scope.races[this.curRaceIndex].features[i].feature.options[j]);
						for (var k = 0; k < $scope.BGs[this.curBGIndex].proficiencies.length; k++){
							if ($scope.races[this.curRaceIndex].features[i].feature.options[j].option.prof == $scope.BGs[this.curBGIndex].proficiencies[k].proficiency.s_code){
								this.skillCap++;
								break;
							}
						}
					}
				}
			}

			$scope.curClassProfs = [];
			for (var i = 0; i < $scope.ch_classes[this.curClassIndex].skillProfs.length; i++){
				var addIt = true;

				for (var j = 0; j < $scope.BGs[this.curBGIndex].proficiencies.length; j++){
					if ($scope.ch_classes[this.curClassIndex].skillProfs[i].proficiency.proficiency_id == $scope.BGs[this.curBGIndex].proficiencies[j].proficiency.proficiency_id){
						addIt = false;
						break;
					}
				}

				for (var j = 0; j < raceProfs.length; j++){
					if ($scope.ch_classes[this.curClassIndex].skillProfs[i].proficiency.s_code == raceProfs[j].option.prof){
						addIt = false;
						break;
					}
				}

				if (addIt){
					for (var j = 0; j < $scope.skillProfs.length; j++){
						if ($scope.ch_classes[this.curClassIndex].skillProfs[i].proficiency.proficiency_id == $scope.skillProfs[j].proficiency_id){
							var tempClassProf = {
								"class_prof_id": $scope.ch_classes[this.curClassIndex].skillProfs[i].class_proficiency_id,
								"name": $scope.skillProfs[j].name
							};
							$scope.curClassProfs.push(tempClassProf);
							break;
						}
					}
				}
			}
		};

		this.Cancel = function(){
			$scope.$parent.overScreen = 1;
			$scope.$parent.addChar = {};
			this.chHeIn = "";
			this.chHeFe = "";
			$scope.InsStep = 1;
		};
	}]);

	app.controller('charDeleteController', ['$http', '$scope', function($http, $scope){
		this.DeleteChar = function(){
			var sendData = {
				"playchar_id": $scope.$parent.delChar.playchar_id,
				"u_i": $scope.$parent.delCharUIn,
				"p_i": $scope.$parent.delCharIn
			};
			$http.post("/characters/delete", sendData).then(function(data){
				if (data.data.success){
					$scope.users[data.data.u_i].playchars.splice(data.data.p_i, 1);
					$scope.$parent.showDetails = false;
				}
			});
			$scope.$parent.delCharIn = -1;
			$scope.$parent.delCharUIn = -1;
			$scope.$parent.delChar = {};
			$scope.$parent.overScreen = 1;
		};

		this.Cancel = function(){
			$scope.$parent.delCharIn = -1;
			$scope.$parent.delCharUIn = -1;
			$scope.$parent.delChar = {};
			$scope.$parent.overScreen = 1;
		};
	}]);
})();