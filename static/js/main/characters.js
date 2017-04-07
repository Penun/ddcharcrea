(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('mainCharController', ['$http', '$scope', '$rootScope', function($http, $scope, $rootScope){
		$scope.overScreen = 1;
		$scope.races = null;
		$scope.showChars = false;
		$scope.showDetails = false;
		$scope.chara = null;
		$scope.addChar = {
			"is_partial": true,
			"is_npc": false
		};

		this.set_u_in = -1;
		this.set_p_in = -1;

		angular.element(document).ready(function(){
			$http.get("/users").then(function(data){
    			if (data.data.success){
    				$scope.users = data.data.users;
    				for (var i = 0; i < $scope.users.length; i++){
    					if ($scope.users[i].User_id == data.data.cur_us){
    						$scope.curUs_in = i;
    						break;
    					}
    				}
    			}
    		});

			var charCol = document.querySelector("#character_col");
			charCol.addEventListener('webkitAnimationEnd', function(event){
				var charCol = angular.element(event.target);
				if (charCol.hasClass("fade_out")){
					charCol.removeClass("fade_out");
					charCol.removeClass("fade_in");
					charCol.addClass("fade_nu");
				}
			}, true);
			charCol.addEventListener('animationend', function(event){
				var charCol = angular.element(event.target);
				if (charCol.hasClass("fade_out")){
					charCol.removeClass("fade_out");
					charCol.removeClass("fade_in");
					charCol.addClass("fade_nu");
				}
			}, true);
			var detCol = document.querySelector("#detail_col");
			detCol.addEventListener("webkitAnimationEnd", function(event){
				var detCol = angular.element(event.target);
				if (detCol.hasClass("fade_out")){
					detCol.removeClass("fade_out");
					detCol.removeClass("fade_in");
					detCol.addClass("fade_nu");
				}
			}, true);
			detCol.addEventListener("webkitAnimationEnd", function(event){
				var detCol = angular.element(event.target);
				if (detCol.hasClass("fade_out")){
					detCol.removeClass("fade_out");
					detCol.removeClass("fade_in");
					detCol.addClass("fade_nu");
				}
			}, true);
		});

		this.RevealDetails = function(p_i){
			if ($scope.users[this.set_u_in].playchars[p_i].fetchDetails == null){
				sendData = {
					"playchar_id": $scope.users[this.set_u_in].playchars[p_i].playchar_id,
					"u_i": this.set_u_in,
					"p_i": p_i
				};
				$http.post("/characters/details", sendData).then(function(data){
					if (data.data.success){
						$scope.users[data.data.u_i].playchars[data.data.p_i] = data.data.resp_obj.playchar;
						if (data.data.resp_obj.playchar.race_build != null && data.data.resp_obj.playchar.race_build.sub_race != null){
							$scope.users[data.data.u_i].playchars[data.data.p_i].raceRef = data.data.resp_obj.playchar.race_build.sub_race.name;
						} else {
							$scope.users[data.data.u_i].playchars[data.data.p_i].raceRef = data.data.resp_obj.playchar.race_build.race.name;
						}
						$scope.users[data.data.u_i].playchars[data.data.p_i].race_build.race.features = data.data.resp_obj.race_features;
						$scope.users[data.data.u_i].playchars[data.data.p_i].fetchDetails = true;
						$scope.CalculateAbilityBonuses(data.data.u_i, data.data.p_i);
						$scope.CalculateAbilityMods(data.data.u_i, data.data.p_i);
						$scope.CalculateProficiencyBonus(data.data.u_i, data.data.p_i);
						$scope.showDetails = true;
						var detCol = angular.element(document.querySelector("#detail_col"));
						detCol.removeClass("fade_nu");
						detCol.removeClass("fade_out");
						detCol.addClass("fade_in");
						$scope.chara = $scope.users[data.data.u_i].playchars[data.data.p_i];
					}
				});
			} else if ($scope.showDetails) {
				if ($scope.chara.playchar_id == $scope.users[this.set_u_in].playchars[p_i].playchar_id){
					$scope.showDetails = false;
					var detCol = angular.element(document.querySelector("#detail_col"));
					detCol.removeClass("fade_nu");
					detCol.removeClass("fade_in");
					detCol.addClass("fade_out");
				} else {
					$scope.chara = $scope.users[this.set_u_in].playchars[p_i];
				}
			} else {
				$scope.showDetails = true;
				var detCol = angular.element(document.querySelector("#detail_col"));
				detCol.removeClass("fade_nu");
				detCol.removeClass("fade_out");
				detCol.addClass("fade_in");
				$scope.chara = $scope.users[this.set_u_in].playchars[p_i];
			}
			this.set_p_in = p_i;
		};

		this.RevealInfo = function(){
			if ($scope.users[this.set_u_in].playchars[this.set_p_in].showInfo == null || !$scope.users[this.set_u_in].playchars[this.set_p_in].showInfo){
				$scope.users[this.set_u_in].playchars[this.set_p_in].showInfo = true;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showFeatures = false;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showBackground = false;
				if ($scope.users[this.set_u_in].playchars[this.set_p_in].showSkills != null){
					$scope.users[this.set_u_in].playchars[this.set_p_in].showSkills = false;
				}
			} else {
				$scope.users[this.set_u_in].playchars[this.set_p_in].showInfo = false;
			}
		};

		this.RevealSkills = function(){
			if ($scope.showDetails && ($scope.users[this.set_u_in].playchars[this.set_p_in].showSkills == null || !$scope.users[this.set_u_in].playchars[this.set_p_in].showSkills)){
				if ($scope.users[this.set_u_in].playchars[this.set_p_in].showSkills == null){
					this.ApplySkillBonuses();
				}
				$scope.users[this.set_u_in].playchars[this.set_p_in].showSkills = true;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showFeatures = false;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showBackground = false;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showInfo = false;
			} else {
				$scope.users[this.set_u_in].playchars[this.set_p_in].showSkills = false;
			}
		};

		this.RevealFeatures = function(){
			if ($scope.users[this.set_u_in].playchars[this.set_p_in].showFeatures == null || !$scope.users[this.set_u_in].playchars[this.set_p_in].showFeatures){
				$scope.users[this.set_u_in].playchars[this.set_p_in].showFeatures = true;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showBackground = false;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showInfo = false;
				if ($scope.users[this.set_u_in].playchars[this.set_p_in].showSkills != null){
					$scope.users[this.set_u_in].playchars[this.set_p_in].showSkills = false;
				}
			} else {
				$scope.users[this.set_u_in].playchars[this.set_p_in].showFeatures = false;
			}
		};

		this.RevealBackground = function(){
			if ($scope.users[this.set_u_in].playchars[this.set_p_in].showBackground == null || !$scope.users[this.set_u_in].playchars[this.set_p_in].showBackground){
				$scope.users[this.set_u_in].playchars[this.set_p_in].showBackground = true;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showFeatures = false;
				$scope.users[this.set_u_in].playchars[this.set_p_in].showInfo = false;
				if ($scope.users[this.set_u_in].playchars[this.set_p_in].showSkills != null){
					$scope.users[this.set_u_in].playchars[this.set_p_in].showSkills = false;
				}
			} else {
				$scope.users[this.set_u_in].playchars[this.set_p_in].showBackground = false;
			}
		};

		$scope.CalculateAbilityBonuses = function(u_i, p_i){
			$scope.users[u_i].playchars[p_i].bo_str = 0;
			$scope.users[u_i].playchars[p_i].bo_dex = 0;
			$scope.users[u_i].playchars[p_i].bo_con = 0;
			$scope.users[u_i].playchars[p_i].bo_int = 0;
			$scope.users[u_i].playchars[p_i].bo_wis = 0;
			$scope.users[u_i].playchars[p_i].bo_cha = 0;
			var r_mods = JSON.parse($scope.users[u_i].playchars[p_i].race_build.race.ability_mods);
			$scope.ApplyAbilityBonus(u_i, p_i, r_mods.abil_mods);
			if ($scope.users[u_i].playchars[p_i].race_build.sub_race != null){
				var sr_mods = JSON.parse($scope.users[u_i].playchars[p_i].race_build.sub_race.ability_mods);
				$scope.ApplyAbilityBonus(u_i, p_i, sr_mods.abil_mods);
			}
			if ($scope.users[u_i].playchars[p_i].race_build.options != null && $scope.users[u_i].playchars[p_i].race_build.options != ""){
				var op_mods = [];
				var tempOpts = JSON.parse($scope.users[u_i].playchars[p_i].race_build.options);
				for (var i = 0; i < tempOpts.length; i++){
					if (tempOpts[i].type == "ability_mod"){
						op_mods.push(tempOpts[i].option);
					}
				}
				$scope.ApplyAbilityBonus(u_i, p_i, op_mods);
			}
			$scope.users[u_i].playchars[p_i].t_str = $scope.users[u_i].playchars[p_i].b_str + $scope.users[u_i].playchars[p_i].bo_str;
			$scope.users[u_i].playchars[p_i].t_dex = $scope.users[u_i].playchars[p_i].b_dex + $scope.users[u_i].playchars[p_i].bo_dex;
			$scope.users[u_i].playchars[p_i].t_con = $scope.users[u_i].playchars[p_i].b_con + $scope.users[u_i].playchars[p_i].bo_con;
			$scope.users[u_i].playchars[p_i].t_int = $scope.users[u_i].playchars[p_i].b_int + $scope.users[u_i].playchars[p_i].bo_int;
			$scope.users[u_i].playchars[p_i].t_wis = $scope.users[u_i].playchars[p_i].b_wis + $scope.users[u_i].playchars[p_i].bo_wis;
			$scope.users[u_i].playchars[p_i].t_cha = $scope.users[u_i].playchars[p_i].b_cha + $scope.users[u_i].playchars[p_i].bo_cha;
		};

		$scope.ApplyAbilityBonus = function(u_i, p_i, mods){
			for (var i = 0; i < mods.length; i++){
				switch (mods[i].mod){
					case 'str':
						$scope.users[u_i].playchars[p_i].bo_str += mods[i].mod_val;
						break;
					case 'dex':
						$scope.users[u_i].playchars[p_i].bo_dex += mods[i].mod_val;
						break;
					case 'con':
						$scope.users[u_i].playchars[p_i].bo_con += mods[i].mod_val;
						break;
					case 'int':
						$scope.users[u_i].playchars[p_i].bo_int += mods[i].mod_val;
						break;
					case 'wis':
						$scope.users[u_i].playchars[p_i].bo_wis += mods[i].mod_val;
						break;
					case 'cha':
						$scope.users[u_i].playchars[p_i].bo_cha += mods[i].mod_val;
						break;
				}
			}
		};

		$scope.CalculateAbilityMods = function(u_i, p_i){
			var m_str = 0;
			var m_dex = 0;
			var m_int = 0;
			var m_wis = 0;
			var m_cha = 0;
			if ($scope.users[u_i].playchars[p_i].t_str < 10){
				m_str = ($scope.users[u_i].playchars[p_i].t_str - 11) / 2;
				$scope.users[u_i].playchars[p_i].m_str = Math.ceil(m_str);
			} else {
				m_str = ($scope.users[u_i].playchars[p_i].t_str - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_str = Math.floor(m_str);
			}
			if ($scope.users[u_i].playchars[p_i].t_dex < 10){
				m_dex = ($scope.users[u_i].playchars[p_i].t_dex - 11) / 2;
				$scope.users[u_i].playchars[p_i].m_dex = Math.ceil(m_dex);
			} else {
				m_dex = ($scope.users[u_i].playchars[p_i].t_dex - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_dex = Math.floor(m_dex);
			}
			if ($scope.users[u_i].playchars[p_i].t_int < 10){
				m_int = ($scope.users[u_i].playchars[p_i].t_int - 11) / 2;
				$scope.users[u_i].playchars[p_i].m_int = Math.ceil(m_int);
			} else {
				m_int = ($scope.users[u_i].playchars[p_i].t_int - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_int = Math.floor(m_int);
			}
			if ($scope.users[u_i].playchars[p_i].t_wis < 10){
				m_wis = ($scope.users[u_i].playchars[p_i].t_wis - 11) / 2;
				$scope.users[u_i].playchars[p_i].m_wis = Math.ceil(m_wis);
			} else {
				m_wis = ($scope.users[u_i].playchars[p_i].t_wis - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_wis = Math.floor(m_wis);
			}
			if ($scope.users[u_i].playchars[p_i].t_cha < 10){
				m_cha = ($scope.users[u_i].playchars[p_i].t_cha - 11) / 2;
				$scope.users[u_i].playchars[p_i].m_cha = Math.ceil(m_cha);
			} else {
				m_cha = ($scope.users[u_i].playchars[p_i].t_cha - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_cha = Math.floor(m_cha);
			}
		};

		$scope.CalculateProficiencyBonus = function(u_i, p_i){
			var t_lvl = $scope.users[u_i].playchars[p_i].level;
			if (t_lvl <= 4){
				$scope.users[u_i].playchars[p_i].profBonus = 2;
			} else if (t_lvl > 4 && t_lvl <= 8){
				$scope.users[u_i].playchars[p_i].profBonus = 3;
			} else if (t_lvl > 8 && t_lvl <= 12){
				$scope.users[u_i].playchars[p_i].profBonus = 4;
			} else if (t_lvl > 12 && t_lvl <= 16){
				$scope.users[u_i].playchars[p_i].profBonus = 5;
			} else if (t_lvl > 16 && t_lvl <= 20){
				$scope.users[u_i].playchars[p_i].profBonus = 6;
			}
		};

		this.ApplySkillBonuses = function(){
			if ($scope.users[this.set_u_in].playchars[this.set_p_in].showBonuses == null){
				$scope.users[this.set_u_in].playchars[this.set_p_in].showBonuses = {
					"acro" : false,
					"anim" : false,
					"arca" : false,
					"athl" : false,
					"dece" : false,
					"hist" : false,
					"insi" : false,
					"inti" : false,
					"inve" : false,
					"medi" : false,
					"natu" : false,
					"perc" : false,
					"perf" : false,
					"pers" : false,
					"reli" : false,
					"sloh" : false,
					"stea" : false,
					"surv" : false
				};
				var sendData = {
					"p_in": this.set_p_in,
					"u_in": this.set_u_in,
					"class_build_id": $scope.users[this.set_u_in].playchars[this.set_p_in].class_build.class_build_id
				};
				$http.post("/proficiencies/chosen", sendData).then(function(data){
					if (data.data.success){
						var t_cp = data.data.cb_chosen_proficiencies;
						var t_sb = Object.keys($scope.users[data.data.u_in].playchars[data.data.p_in].showBonuses);
						for (var i = 0; i < t_cp.length; i++){
							for (var j = 0; j < t_sb.length; j++){
								if (t_sb[j] == t_cp[i].class_proficiency.proficiency.s_code){
									var n_stat = t_sb[j];
									$scope.users[data.data.u_in].playchars[data.data.p_in].showBonuses[n_stat] = true;
									break;
								}
							}
						}
					}
				});
				sendData = {
					"p_in": this.set_p_in,
					"u_in": this.set_u_in,
					"background_id": $scope.users[this.set_u_in].playchars[this.set_p_in].background_build.background.background_id
				};
				$http.post("/proficiencies/background", sendData).then(function(data){
					if (data.data.success){
						var t_bs = data.data.background_proficiencies;
						var t_sb = Object.keys($scope.users[data.data.u_in].playchars[data.data.p_in].showBonuses);
						for (var i = 0; i < t_bs.length; i++){
							for (var j = 0; j < t_sb.length; j++){
								if (t_sb[j] == t_bs[i].proficiency.s_code){
									var n_stat = t_sb[j];
									$scope.users[data.data.u_in].playchars[data.data.p_in].showBonuses[n_stat] = true;
									break;
								}
							}
						}
					}
				});
				if ($scope.users[this.set_u_in].playchars[this.set_p_in].race_build.race.features != null) {
					for (var i = 0; i < $scope.users[this.set_u_in].playchars[this.set_p_in].race_build.race.features.length; i++){
						var feat = $scope.users[this.set_u_in].playchars[this.set_p_in].race_build.race.features[i];
						if (feat.feature.options != null || feat.feature.options != ""){
							var opts = JSON.parse(feat.feature.options);
							for (var j = 0; j < opts.length; j++){
								if (opts[j].type == "skill_prof"){
									$scope.users[this.set_u_in].playchars[this.set_p_in].showBonuses[opts[j].option.prof] = true;
								}
							}			$scope.curChars = $scope.users[$scope.curUs_in].playchars;

						}
					}
				}
			}
		};

		this.RevealCharacters = function(u_i){
			$scope.showDetails = false;
			var detCol = angular.element(document.querySelector("#detail_col"));
			if (detCol.hasClass("fade_in")){
				detCol.removeClass("fade_nu");
				detCol.removeClass("fade_in");
				detCol.addClass("fade_out");
			}
			if ($scope.users[u_i].fetched == null){
				sendData = {
					"user_id": $scope.users[u_i].User_id
				}
				$http.post("/characters", sendData).then(function(data){
					if (data.data.success){
						for (var i = 0; i < $scope.users.length; i++){
							if ($scope.users[i].User_id == data.data.user_id){
								$scope.curChars = $scope.users[i].playchars = data.data.playchars;
								$scope.users[i].fetched = true;
								$scope.showChars = true;
								var charCol = angular.element(document.querySelector("#character_col"));
								charCol.removeClass("fade_nu");
								charCol.removeClass("fade_out");
								charCol.addClass("fade_in");
								break;
							}
						}
					}
				});
			} else if ($scope.showChars) {
				if (this.set_u_in == u_i){
					$scope.showChars = false;
					var charCol = angular.element(document.querySelector("#character_col"));
					charCol.removeClass("fade_nu");
					charCol.removeClass("fade_in");
					charCol.addClass("fade_out");
				} else {
					$scope.curChars = $scope.users[u_i].playchars;
				}
			} else {
				$scope.showChars = true;
				var charCol = angular.element(document.querySelector("#character_col"));
				charCol.removeClass("fade_nu");
				charCol.removeClass("fade_out");
				charCol.addClass("fade_in");
				$scope.curChars = $scope.users[u_i].playchars;
			}
			this.set_u_in = u_i;
		};

		this.AddChar = function(){
			$scope.overScreen = 2;
			$scope.chara = {};
			var detCol = angular.element(document.querySelector("#detail_col"));
			detCol.removeClass("fade_nu");
			detCol.removeClass("fade_in");
			detCol.addClass("fade_out");
			$scope.addChar = {
				"is_partial": true
			};
			this.CheckRaces();
		};

		this.EditChar = function(){
			$scope.addChar = JSON.parse(JSON.stringify($scope.users[this.set_u_in].playchars[this.set_p_in]));
			$scope.addChar.is_partial = false;
			$scope.overScreen = 2;
			var sendData = {
				"p_in": this.set_p_in,
				"u_in": this.set_u_in,
				"class_build_id": $scope.users[this.set_u_in].playchars[this.set_p_in].class_build.class_build_id
			};
			$http.post("/proficiencies/chosen", sendData).then(function(data){
				if (data.data.success){
					$scope.addChar.cb_chosen = data.data.cb_chosen_proficiencies;
				}
			});
			this.CheckRaces();
		};

		this.DeleteChar = function(){
			$scope.delCharIn = this.set_p_in;
			$scope.delCharUIn = this.set_u_in;
			$scope.delChar = $scope.users[this.set_u_in].playchars[this.set_p_in];
			$scope.overScreen = 3;
		};

		this.DeletableChar = function(us_id){
			if ($scope.users != null && typeof($scope.users) != 'undefined'){
				return $scope.users[$scope.curUs_in].User_id == us_id;
			} else {
				return false;
			}
		}

		this.CheckRaces = function(){
			if ($scope.races == null){
				$http.get("/races/list").then(function(data){
					if (data.data.success){
						$scope.races = data.data.races;
						if (!$scope.addChar.is_partial){
							var sendData = {
								"r_id": $scope.addChar.race_build.race.race_id
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
						}
					}
				});
			}
		};

		this.CurOverScreen = function(ovSc){
			return $scope.overScreen === ovSc;
		};
	}]);

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

					sendData.u_i =

					$http.post("/characters/update", sendData).then(function(data){
						if (data.data.success){
							var p_i = -1;
							for (var i = 0; i < $scope.users[$scope.curUs_in].playchars.length; i++){
								if ($scope.users[$scope.curUs_in].playchars[i].playchar_id == data.data.playchar.playchar_id){
									$scope.users[$scope.curUs_in].playchars[i] = data.data.playchar;
									p_i = i;
									break;
								}
							}
							$scope.$parent.chara = data.data.playchar;
							$scope.CalculateAbilityBonuses($scope.curUs_in, p_i);
							$scope.CalculateAbilityMods($scope.curUs_in, p_i);
							$scope.CalculateProficiencyBonus($scope.curUs_in, p_i);
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

//	app.controller('charBuildController', ['$http', '$scope', function($http, $scope){

//	}]);

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
					var detCol = angular.element(document.querySelector("#detail_col"));
					detCol.removeClass("fade_nu");
					detCol.removeClass("fade_in");
					detCol.addClass("fade_out");
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
