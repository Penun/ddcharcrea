(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charController', ['$http', '$scope', function($http, $scope){
		this.RevealDetails = function(playchar_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === playchar_id){
					if ($scope.playchars[i].showDetails == null || !$scope.playchars[i].showDetails){
						this.CalculateProficiencyBonus(i);
						$scope.playchars[i].showDetails = true;
						break;
					} else {
						$scope.playchars[i].showDetails = false;
						break;
					}
				}
			}
		};

		this.RevealInfo = function(playchar_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === playchar_id){
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

		this.RevealSkills = function(playchar_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === playchar_id){
					if ($scope.playchars[i].showDetails && ($scope.playchars[i].showSkills == null || !$scope.playchars[i].showSkills)){
						if ($scope.playchars[i].showSkills == null){
							this.CalculateSkills(i);
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

		this.RevealBackground = function(playchar_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === playchar_id){
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

		this.CalculateSkills = function(playchar_i){
			var m_str = 0;
			var m_dex = 0;
			var m_int = 0;
			var m_wis = 0;
			var m_cha = 0;
			if ($scope.playchars[playchar_i].b_str < 10){
				m_str = ($scope.playchars[playchar_i].b_str - 11) / 2;								
			} else {
				m_str = ($scope.playchars[playchar_i].b_str - 10) / 2;
			}
			if ($scope.playchars[playchar_i].b_dex < 10){
				m_dex = ($scope.playchars[playchar_i].b_dex - 11) / 2;								
			} else {
				m_dex = ($scope.playchars[playchar_i].b_dex - 10) / 2;
			}
			if ($scope.playchars[playchar_i].b_int < 10){
				m_int = ($scope.playchars[playchar_i].b_int - 11) / 2;								
			} else {
				m_int = ($scope.playchars[playchar_i].b_int - 10) / 2;
			}
			if ($scope.playchars[playchar_i].b_wis < 10){
				m_wis = ($scope.playchars[playchar_i].b_wis - 11) / 2;								
			} else {
				m_wis = ($scope.playchars[playchar_i].b_wis - 10) / 2;
			}
			if ($scope.playchars[playchar_i].b_cha < 10){
				m_cha = ($scope.playchars[playchar_i].b_cha - 11) / 2;								
			} else {
				m_cha = ($scope.playchars[playchar_i].b_cha - 10) / 2;
			}
			m_str = Math.floor(m_str);
			m_dex = Math.floor(m_dex);
			m_int = Math.floor(m_int);
			m_wis = Math.floor(m_wis);
			m_cha = Math.floor(m_cha);							
			$scope.playchars[playchar_i].acro = m_dex;
			$scope.playchars[playchar_i].anim = m_wis;
			$scope.playchars[playchar_i].arca = m_int;
			$scope.playchars[playchar_i].athl = m_str;
			$scope.playchars[playchar_i].dece = m_cha;
			$scope.playchars[playchar_i].hist = m_int;
			$scope.playchars[playchar_i].insi = m_wis;
			$scope.playchars[playchar_i].inti = m_cha;
			$scope.playchars[playchar_i].inve = m_int;
			$scope.playchars[playchar_i].medi = m_wis;
			$scope.playchars[playchar_i].natu = m_int;
			$scope.playchars[playchar_i].perc = m_wis;
			$scope.playchars[playchar_i].perf = m_cha;
			$scope.playchars[playchar_i].pers = m_cha;
			$scope.playchars[playchar_i].reli = m_int;
			$scope.playchars[playchar_i].sloh = m_dex;
			$scope.playchars[playchar_i].stea = m_dex;
			$scope.playchars[playchar_i].surv = m_wis;
		};

		this.CalculateProficiencyBonus = function(playchar_i){
			if ($scope.playchars[playchar_i].showBonuses == null){
				$scope.playchars[playchar_i].showBonuses = {
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
					"playchar_in": playchar_i,
					"class_build_id": $scope.playchars[playchar_i].class_build.class_build_id
				};
				$http.post("/classes/chosenprof", sendData).then(function(data){
					if (data.data.success){
						var t_cp = data.data.cb_chosen_proficiencies;
						var t_sb = Object.keys($scope.playchars[data.data.playchar_in].showBonuses);
						for (var i = 0; i < t_sb.length; i++){
							for (var j = 0; j < t_cp.length; j++){
								if (t_sb[i] == t_cp[j].class_proficiency.proficiency.s_code){
									var n_stat = t_sb[i];
									$scope.playchars[data.data.playchar_in].showBonuses[n_stat] = true;
									break;
								}
							}
						}
					}
				});
			}

			var t_lvl = $scope.playchars[playchar_i].level;
			if (t_lvl <= 4){
				$scope.playchars[playchar_i].profBonus = 2;
			} else if (t_lvl > 4 && t_lvl <= 8){
				$scope.playchars[playchar_i].profBonus = 3;
			} else if (t_lvl > 8 && t_lvl <= 12){
				$scope.playchars[playchar_i].profBonus = 4;
			} else if (t_lvl > 12 && t_lvl <= 16){
				$scope.playchars[playchar_i].profBonus = 5;
			} else if (t_lvl > 16 && t_lvl <= 20){
				$scope.playchars[playchar_i].profBonus = 6;
			} 
		};
	}]);
})();