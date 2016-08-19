(function(){
	var app = angular.module('ddchar_characters', []);
	app.controller('charController', ['$scope', function($scope){
		this.RevealDetails = function(playchar_id){
			for (var i = 0; i < $scope.playchars.length; i++){
				if ($scope.playchars[i].playchar_id === playchar_id){
					if ($scope.playchars[i].showDetails == null || !$scope.playchars[i].showDetails) {
						$scope.playchars[i].showDetails = true;
						break;
					} else {
						$scope.playchars[i].showDetails = false;
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
		}
	}]);
})();