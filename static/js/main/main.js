(function(){
	var app = angular.module('ddchar_main', []);
	app.controller('mainController', ['$http', '$scope', function($http, $scope){
		
		angular.element(document).ready(function(){
			$http.get("/users").then(function(data){
    			if (data.data.success){
    				$scope.users = data.data.users;
    			}
    		});
		});

		this.RevealDetails = function(u_id, p_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === p_id){
					if ($scope.playchars[i].showDetails == null || !$scope.playchars[i].showDetails){
						this.CalculateAbilityBonuses(i);
						this.CalculateAbilityMods(i);
						$scope.playchars[i].showDetails = true;
						break;
					} else {
						$scope.playchars[i].showDetails = false;
						break;
					}
				}
			}
		};

		this.RevealInfo = function(u_id, p_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === p_id){
					if ($scope.playchars[i].showInfo == null || !$scope.playchars[i].showInfo){
						$scope.playchars[i].showInfo = true;
						break;
					} else {
						$scope.playchars[i].showInfo = false;
						break;
					}
				}
			}
		}; 

		this.RevealSkills = function(u_id, p_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === p_id){
					if ($scope.playchars[i].showDetails && ($scope.playchars[i].showSkills == null || !$scope.playchars[i].showSkills)){
						if ($scope.playchars[i].showSkills == null){
							this.CalculateProficiencyBonus(i);
						}
						$scope.playchars[i].showSkills = true;
						break;
					} else {
						$scope.playchars[i].showSkills = false;
						break;
					}
				}
			} 
		};

		this.RevealBackground = function(u_id, p_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === p_id){
					if ($scope.playchars[i].showBackground == null || !$scope.playchars[i].showBackground){
						$scope.playchars[i].showBackground = true;
						break;
					} else {
						$scope.playchars[i].showBackground = false;
						break;
					}
				}
			}
		};

		this.CalculateAbilityBonuses = function(p_i){
			$scope.playchars[p_i].bo_str = 0;	
			$scope.playchars[p_i].bo_dex = 0;
			$scope.playchars[p_i].bo_con = 0;
			$scope.playchars[p_i].bo_int = 0;
			$scope.playchars[p_i].bo_wis = 0;
			$scope.playchars[p_i].bo_cha = 0;			
			var r_mods = JSON.parse($scope.playchars[p_i].race_build.race.ability_mods);
			var sr_mods = JSON.parse($scope.playchars[p_i].race_build.sub_race.ability_mods);
			this.ApplyAbilityBonus(p_i, r_mods);
			this.ApplyAbilityBonus(p_i, sr_mods);			
			$scope.playchars[p_i].t_str = $scope.playchars[p_i].b_str + $scope.playchars[p_i].bo_str;
			$scope.playchars[p_i].t_dex = $scope.playchars[p_i].b_dex + $scope.playchars[p_i].bo_dex;
			$scope.playchars[p_i].t_con = $scope.playchars[p_i].b_con + $scope.playchars[p_i].bo_con;
			$scope.playchars[p_i].t_int = $scope.playchars[p_i].b_int + $scope.playchars[p_i].bo_int;
			$scope.playchars[p_i].t_wis = $scope.playchars[p_i].b_wis + $scope.playchars[p_i].bo_wis;
			$scope.playchars[p_i].t_cha = $scope.playchars[p_i].b_cha + $scope.playchars[p_i].bo_cha;						
		};

		this.ApplyAbilityBonus = function(p_i, mods){
			for (var i = 0; i < mods.length; i++){
				switch (mods[i].mod){
					case 'str':
						$scope.playchars[p_i].bo_str += mods[i].mod_val;
						break;
					case 'dex':
						$scope.playchars[p_i].bo_dex += mods[i].mod_val;
						break;
					case 'con':
						$scope.playchars[p_i].bo_con += mods[i].mod_val;
						break;
					case 'int':
						$scope.playchars[p_i].bo_int += mods[i].mod_val;
						break;
					case 'wis':
						$scope.playchars[p_i].bo_wis += mods[i].mod_val;
						break;
					case 'cha':
						$scope.playchars[p_i].bo_cha += mods[i].mod_val;
						break;					
				}
			}
		};

		this.CalculateAbilityMods = function(p_i){
			var m_str = 0;
			var m_dex = 0;
			var m_int = 0;
			var m_wis = 0;
			var m_cha = 0;
			if ($scope.playchars[p_i].b_str < 10){
				m_str = ($scope.playchars[p_i].t_str - 11) / 2;								
			} else {
				m_str = ($scope.playchars[p_i].t_str - 10) / 2;
			}
			if ($scope.playchars[p_i].b_dex < 10){
				m_dex = ($scope.playchars[p_i].t_dex - 11) / 2;								
			} else {
				m_dex = ($scope.playchars[p_i].t_dex - 10) / 2;
			}
			if ($scope.playchars[p_i].b_int < 10){
				m_int = ($scope.playchars[p_i].t_int - 11) / 2;								
			} else {
				m_int = ($scope.playchars[p_i].t_int - 10) / 2;
			}
			if ($scope.playchars[p_i].b_wis < 10){
				m_wis = ($scope.playchars[p_i].t_wis - 11) / 2;								
			} else {
				m_wis = ($scope.playchars[p_i].t_wis - 10) / 2;
			}
			if ($scope.playchars[p_i].b_cha < 10){
				m_cha = ($scope.playchars[p_i].t_cha - 11) / 2;								
			} else {
				m_cha = ($scope.playchars[p_i].t_cha - 10) / 2;
			}
			$scope.playchars[p_i].m_str = Math.floor(m_str);
			$scope.playchars[p_i].m_dex = Math.floor(m_dex);
			$scope.playchars[p_i].m_int = Math.floor(m_int);
			$scope.playchars[p_i].m_wis = Math.floor(m_wis);
			$scope.playchars[p_i].m_cha = Math.floor(m_cha);							
		};

		this.CalculateProficiencyBonus = function(p_i){
			if ($scope.playchars[p_i].showBonuses == null){
				$scope.playchars[p_i].showBonuses = {
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
					"class_build_id": $scope.playchars[p_i].class_build.class_build_id
				};
				$http.post("/classes/chosenprof", sendData).then(function(data){
					if (data.data.success){
						var t_cp = data.data.cb_chosen_proficiencies;
						var t_sb = Object.keys($scope.playchars[data.data.p_in].showBonuses);
						for (var i = 0; i < t_sb.length; i++){
							for (var j = 0; j < t_cp.length; j++){
								if (t_sb[i] == t_cp[j].class_proficiency.proficiency.s_code){
									var n_stat = t_sb[i];
									$scope.playchars[data.data.p_in].showBonuses[n_stat] = true;
									break;
								}
							}
						}
					}
				});
				sendData = {
					"p_in": p_i,
					"background_id": $scope.playchars[p_i].background_build.background.background_id
				};
				$http.post("/backgrounds/proficiencies/skills", sendData).then(function(data){
					if (data.data.success){
						var t_bs = data.data.background_proficiencies;
						var t_sb = Object.keys($scope.playchars[data.data.p_in].showBonuses);
						for (var i = 0; i < t_sb.length; i++){
							for (var j = 0; j < t_bs.length; j++){
								if (t_sb[i] == t_bs[j].proficiency.s_code){
									var n_stat = t_sb[i];
									$scope.playchars[data.data.p_in].showBonuses[n_stat] = true;
									break;
								}
							}
						}
					}
				});
			}

			var t_lvl = $scope.playchars[p_i].level;
			if (t_lvl <= 4){
				$scope.playchars[p_i].profBonus = 2;
			} else if (t_lvl > 4 && t_lvl <= 8){
				$scope.playchars[p_i].profBonus = 3;
			} else if (t_lvl > 8 && t_lvl <= 12){
				$scope.playchars[p_i].profBonus = 4;
			} else if (t_lvl > 12 && t_lvl <= 16){
				$scope.playchars[p_i].profBonus = 5;
			} else if (t_lvl > 16 && t_lvl <= 20){
				$scope.playchars[p_i].profBonus = 6;
			} 
		};

		this.RevealCharacters = function(user_id){

		};
	}]);
})();