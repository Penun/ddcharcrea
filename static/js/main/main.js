(function(){
	var app = angular.module('ddchar_main', ['ddchar_characters']);
	app.controller('mainController', ['$http', '$scope', function($http, $scope){
		$scope.overScreen = 1;
		$scope.races = null;
		$scope.showChars = false;
		$scope.showDetails = false;
		$scope.chara = null;

		// Both are actually indexes not ids
		this.set_u_id = -1;
		this.set_p_id = -1;

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
		});

		this.RevealDetails = function(p_i){
			if ($scope.users[this.set_u_id].playchars[p_i].fetchDetails == null){
				sendData = {
					"playchar_id": $scope.users[this.set_u_id].playchars[p_i].playchar_id,
					"u_i": this.set_u_id,
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
						$scope.chara = $scope.users[data.data.u_i].playchars[data.data.p_i];
					}
				});
			} else if ($scope.showDetails) {
				if ($scope.chara.playchar_id == $scope.users[this.set_u_id].playchars[p_i].playchar_id){
					$scope.showDetails = false;
				} else {
					$scope.chara = $scope.users[this.set_u_id].playchars[p_i];
				}
			} else {
				$scope.showDetails = true;
				$scope.chara = $scope.users[this.set_u_id].playchars[p_i];
			}
			this.set_p_id = p_i;
		};

		this.RevealInfo = function(){
			if ($scope.users[this.set_u_id].playchars[this.set_p_id].showInfo == null || !$scope.users[this.set_u_id].playchars[this.set_p_id].showInfo){
				$scope.users[this.set_u_id].playchars[this.set_p_id].showInfo = true;
			} else {
				$scope.users[this.set_u_id].playchars[this.set_p_id].showInfo = false;
			}
		}; 

		this.RevealSkills = function(){
			if ($scope.showDetails && ($scope.users[this.set_u_id].playchars[this.set_p_id].showSkills == null || !$scope.users[this.set_u_id].playchars[this.set_p_id].showSkills)){
				if ($scope.users[this.set_u_id].playchars[this.set_p_id].showSkills == null){
					this.ApplySkillBonuses(this.set_u_id, this.set_p_id);
				}
				$scope.users[this.set_u_id].playchars[this.set_p_id].showSkills = true;
				$scope.users[this.set_u_id].playchars[this.set_p_id].showFeatures = false;
				$scope.users[this.set_u_id].playchars[this.set_p_id].showBackground = false;
			} else {
				$scope.users[this.set_u_id].playchars[this.set_p_id].showSkills = false;
			}
		};

		this.RevealFeatures = function(){
			if ($scope.users[this.set_u_id].playchars[this.set_p_id].showFeatures == null || !$scope.users[this.set_u_id].playchars[this.set_p_id].showFeatures){
				$scope.users[this.set_u_id].playchars[this.set_p_id].showFeatures = true;
				$scope.users[this.set_u_id].playchars[this.set_p_id].showBackground = false;
				if ($scope.users[this.set_u_id].playchars[this.set_p_id].showSkills != null){
					$scope.users[this.set_u_id].playchars[this.set_p_id].showSkills = false;
				}
			} else {
				$scope.users[this.set_u_id].playchars[this.set_p_id].showFeatures = false;
			}
		};

		this.RevealBackground = function(){
			if ($scope.users[this.set_u_id].playchars[this.set_p_id].showBackground == null || !$scope.users[this.set_u_id].playchars[this.set_p_id].showBackground){
				$scope.users[this.set_u_id].playchars[this.set_p_id].showBackground = true;
				$scope.users[this.set_u_id].playchars[this.set_p_id].showFeatures = false;
				if ($scope.users[this.set_u_id].playchars[this.set_p_id].showSkills != null){
					$scope.users[this.set_u_id].playchars[this.set_p_id].showSkills = false;
				}
			} else {
				$scope.users[this.set_u_id].playchars[this.set_p_id].showBackground = false;
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
			if ($scope.users[u_i].playchars[p_i].b_str < 10){
				m_str = ($scope.users[u_i].playchars[p_i].t_str - 11) / 2;								
				$scope.users[u_i].playchars[p_i].m_str = Math.ceil(m_str);
			} else {
				m_str = ($scope.users[u_i].playchars[p_i].t_str - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_str = Math.floor(m_str);
			}
			if ($scope.users[u_i].playchars[p_i].b_dex < 10){
				m_dex = ($scope.users[u_i].playchars[p_i].t_dex - 11) / 2;								
				$scope.users[u_i].playchars[p_i].m_dex = Math.ceil(m_dex);
			} else {
				m_dex = ($scope.users[u_i].playchars[p_i].t_dex - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_dex = Math.floor(m_dex);
			}
			if ($scope.users[u_i].playchars[p_i].b_int < 10){
				m_int = ($scope.users[u_i].playchars[p_i].t_int - 11) / 2;								
				$scope.users[u_i].playchars[p_i].m_int = Math.ceil(m_int);
			} else {
				m_int = ($scope.users[u_i].playchars[p_i].t_int - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_int = Math.floor(m_int);
			}
			if ($scope.users[u_i].playchars[p_i].b_wis < 10){
				m_wis = ($scope.users[u_i].playchars[p_i].t_wis - 11) / 2;								
				$scope.users[u_i].playchars[p_i].m_wis = Math.ceil(m_wis);
			} else {
				m_wis = ($scope.users[u_i].playchars[p_i].t_wis - 10) / 2;
				$scope.users[u_i].playchars[p_i].m_wis = Math.floor(m_wis);
			}
			if ($scope.users[u_i].playchars[p_i].b_cha < 10){
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
					"u_in": u_i,
					"class_build_id": $scope.users[u_i].playchars[p_i].class_build.class_build_id
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
					"p_in": p_i,
					"u_in": u_i,
					"background_id": $scope.users[u_i].playchars[p_i].background_build.background.background_id
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
				if ($scope.users[u_i].playchars[p_i].race_build.race.features != null) {
					for (var i = 0; i < $scope.users[u_i].playchars[p_i].race_build.race.features.length; i++){
						var feat = $scope.users[u_i].playchars[p_i].race_build.race.features[i];
						if (feat.feature.options != null || feat.feature.options != ""){
							var opts = JSON.parse(feat.feature.options);
							for (var j = 0; j < opts.length; j++){
								if (opts[j].type == "skill_prof"){
									$scope.users[u_i].playchars[p_i].showBonuses[opts[j].option.prof] = true;
								}
							}
						}
					}
				}
			}
		};

		this.RevealCharacters = function(u_i){
			$scope.showDetails = false;
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
								break;
							}
						}
					}
				});
			} else if ($scope.showChars) {
				if (this.set_u_id == u_i){
					$scope.showChars = false;
				} else {
					$scope.curChars = $scope.users[u_i].playchars;
				}
			} else {
				$scope.showChars = true;
				$scope.curChars = $scope.users[u_i].playchars;
			}
			this.set_u_id = u_i;
		};

		this.ShowChars = function(){
			return $scope.showChars;
		};

		this.ShowCharDetails = function(){
			return $scope.showDetails;
		};

		this.AddChar = function(){
			$scope.overScreen = 2;
		};

		this.DeleteChar = function(){
			$scope.delCharIn = this.set_p_id;
			$scope.delCharUIn = this.set_u_id;
			$scope.delChar = $scope.users[this.set_u_id].playchars[this.set_p_id];
			$scope.overScreen = 3;
		};

		this.DeletableChar = function(us_id){
			if ($scope.users != null && typeof($scope.users) != 'undefined'){
				return $scope.users[$scope.curUs_in].User_id == us_id;
			} else {
				return false;
			}
		}

		this.CloseOverScreen = function(){
			$scope.overScreen = 1;
		};

		this.CurOverScreen = function(ovSc){
			return $scope.overScreen === ovSc;
		};
	}]);
})();