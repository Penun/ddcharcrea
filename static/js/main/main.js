(function(){
	var app = angular.module('ddchar_main', ['ddchar_characters']);
	app.controller('mainController', ['$http', '$scope', function($http, $scope){
		this.overScreen = 0;
		$scope.races = null;

		angular.element(document).ready(function(){
			$http.get("/users").then(function(data){
    			if (data.data.success){
    				$scope.users = data.data.users;
    				for (var i = 0; i < $scope.users.length; i++){
    					if ($scope.users[i].User_id == data.data.cur_us){
    						$scope.users[i].isCur = true;
    					} else {
    						$scope.users[i].isCur = false;
    					}
    				}
    			}
    		});
		});

		this.RevealDetails = function(u_i, p_i){
			if ($scope.users[u_i].playchars[p_i].showDetails == null){
				sendData = {
					"playchar_id": $scope.users[u_i].playchars[p_i].playchar_id,
					"u_i": u_i,
					"p_i": p_i
				};
				$http.post("/characters/details", sendData).then(function(data){
					if (data.data.success){
						$scope.users[data.data.u_i].playchars[data.data.p_i] = data.data.playchar;
						if (data.data.playchar.race_build.sub_race != null){
							$scope.users[data.data.u_i].playchars[data.data.p_i].raceRef = data.data.playchar.race_build.sub_race.name;
						} else {
							$scope.users[data.data.u_i].playchars[data.data.p_i].raceRef = data.data.playchar.race_build.race.name;
						}
						$scope.users[u_i].playchars[p_i].showDetails = true;
						$scope.CalculateAbilityBonuses(data.data.u_i, data.data.p_i);
						$scope.CalculateAbilityMods(data.data.u_i, data.data.p_i);
						$scope.CalculateProficiencyBonus(u_i, p_i);

					}
				});
			} else  if ($scope.users[u_i].playchars[p_i].showDetails) {
				$scope.users[u_i].playchars[p_i].showDetails = false;
			} else {
				$scope.users[u_i].playchars[p_i].showDetails = true;				
			}
		};

		this.RevealInfo = function(u_i, p_i){
			if ($scope.users[u_i].playchars[p_i].showInfo == null || !$scope.users[u_i].playchars[p_i].showInfo){
				$scope.users[u_i].playchars[p_i].showInfo = true;
			} else {
				$scope.users[u_i].playchars[p_i].showInfo = false;
			}
		}; 

		this.RevealSkills = function(u_i, p_i){
			if ($scope.users[u_i].playchars[p_i].showDetails && ($scope.users[u_i].playchars[p_i].showSkills == null || !$scope.users[u_i].playchars[p_i].showSkills)){
				if ($scope.users[u_i].playchars[p_i].showSkills == null){
					this.ApplySkillBonuses(u_i, p_i);
				}
				$scope.users[u_i].playchars[p_i].showSkills = true;
			} else {
				$scope.users[u_i].playchars[p_i].showSkills = false;
			}
		};

		this.RevealBackground = function(u_i, p_i){
			if ($scope.users[u_i].playchars[p_i].showBackground == null || !$scope.users[u_i].playchars[p_i].showBackground){
				$scope.users[u_i].playchars[p_i].showBackground = true;
			} else {
				$scope.users[u_i].playchars[p_i].showBackground = false;
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
			$scope.ApplyAbilityBonus(u_i, p_i, r_mods);
			if ($scope.users[u_i].playchars[p_i].race_build.sub_race != null){
				var sr_mods = JSON.parse($scope.users[u_i].playchars[p_i].race_build.sub_race.ability_mods);
				$scope.ApplyAbilityBonus(u_i, p_i, sr_mods);			
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
			if ($scope.users[u_i].playchars[p_i].b_str < 10){
				m_str = ($scope.users[u_i].playchars[p_i].t_str - 11) / 2;								
			} else {
				m_str = ($scope.users[u_i].playchars[p_i].t_str - 10) / 2;
			}
			if ($scope.users[u_i].playchars[p_i].b_dex < 10){
				m_dex = ($scope.users[u_i].playchars[p_i].t_dex - 11) / 2;								
			} else {
				m_dex = ($scope.users[u_i].playchars[p_i].t_dex - 10) / 2;
			}
			if ($scope.users[u_i].playchars[p_i].b_int < 10){
				m_int = ($scope.users[u_i].playchars[p_i].t_int - 11) / 2;								
			} else {
				m_int = ($scope.users[u_i].playchars[p_i].t_int - 10) / 2;
			}
			if ($scope.users[u_i].playchars[p_i].b_wis < 10){
				m_wis = ($scope.users[u_i].playchars[p_i].t_wis - 11) / 2;								
			} else {
				m_wis = ($scope.users[u_i].playchars[p_i].t_wis - 10) / 2;
			}
			if ($scope.users[u_i].playchars[p_i].b_cha < 10){
				m_cha = ($scope.users[u_i].playchars[p_i].t_cha - 11) / 2;								
			} else {
				m_cha = ($scope.users[u_i].playchars[p_i].t_cha - 10) / 2;
			}
			$scope.users[u_i].playchars[p_i].m_str = Math.floor(m_str);
			$scope.users[u_i].playchars[p_i].m_dex = Math.floor(m_dex);
			$scope.users[u_i].playchars[p_i].m_int = Math.floor(m_int);
			$scope.users[u_i].playchars[p_i].m_wis = Math.floor(m_wis);
			$scope.users[u_i].playchars[p_i].m_cha = Math.floor(m_cha);							
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

		this.ApplySkillBonuses = function(u_i, p_i){
			if ($scope.users[u_i].playchars[p_i].showBonuses == null){
				$scope.users[u_i].playchars[p_i].showBonuses = {
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
					"p_in": p_i,
					"class_build_id": $scope.users[u_i].playchars[p_i].class_build.class_build_id
				};
				$http.post("/classes/chosenprof", sendData).then(function(data){
					if (data.data.success){
						var t_cp = data.data.cb_chosen_proficiencies;
						var t_sb = Object.keys($scope.users[u_i].playchars[data.data.p_in].showBonuses);
						for (var i = 0; i < t_sb.length; i++){
							for (var j = 0; j < t_cp.length; j++){
								if (t_sb[i] == t_cp[j].class_proficiency.proficiency.s_code){
									var n_stat = t_sb[i];
									$scope.users[u_i].playchars[data.data.p_in].showBonuses[n_stat] = true;
									break;
								}
							}
						}
					}
				});
				sendData = {
					"p_in": p_i,
					"background_id": $scope.users[u_i].playchars[p_i].background_build.background.background_id
				};
				$http.post("/backgrounds/proficiencies/skills", sendData).then(function(data){
					if (data.data.success){
						var t_bs = data.data.background_proficiencies;
						var t_sb = Object.keys($scope.users[u_i].playchars[data.data.p_in].showBonuses);
						for (var i = 0; i < t_sb.length; i++){
							for (var j = 0; j < t_bs.length; j++){
								if (t_sb[i] == t_bs[j].proficiency.s_code){
									var n_stat = t_sb[i];
									$scope.users[u_i].playchars[data.data.p_in].showBonuses[n_stat] = true;
									break;
								}
							}
						}
					}
				});
			}
		};

		this.RevealCharacters = function(u_i){
			if ($scope.users[u_i].showChars == null){
				sendData = {
					"user_id": $scope.users[u_i].User_id
				}
				$http.post("/characters", sendData).then(function(data){
					if (data.data.success){
						for (var i = 0; i < $scope.users.length; i++){
							if ($scope.users[i].User_id == data.data.user_id){
								$scope.users[i].playchars = data.data.playchars;
								$scope.users[i].showChars = true;
								break;
							}
						}
					}
				});
			} else if ($scope.users[u_i].showChars) {
				$scope.users[u_i].showChars = false;
			} else {
				$scope.users[u_i].showChars = true;
			}
		};

		this.AddChar = function(){
			this.overScreen = 1;
		};

		this.CurOverScreen = function(ovSc){
			return this.overScreen === ovSc;
		};
	}]);
})();