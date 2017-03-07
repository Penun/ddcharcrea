(function(){
	var app = angular.module('ddchar', ['ddchar_characters', 'ddchar_campaigns']);

	app.controller('locManager', ['$http', '$scope', '$window', function($http, $scope, $window){
		$scope.activeLoc = 1;
		$scope.loadedTabs = [1];
		this.rotateDeg = 20;

		this.selectLoc = function(newLoc){
			if ($scope.activeLoc != newLoc){
				if ($scope.loadedTabs.indexOf(newLoc) === -1){
					this.loadTab(newLoc);
				} else {
					$scope.activeLoc = newLoc;
				}
			}
		};

		this.isSelected = function(checkL){
			return $scope.activeLoc === checkL;
		};

		this.loadTab = function(loc){
			switch (loc) {
				case 1:
					$scope.loadedTabs.push(loc);
					$scope.activeLoc = loc;
					break;
				case 2:
					$scope.loadedTabs.push(loc);
					$scope.$broadcast('tab2_go');
					$scope.activeLoc = loc;
					break;
				default:
					break;
			}
		};

		this.MoveBook = function(mouseEvent){
			var resY = 0;

		 	if (!mouseEvent){
		   		mouseEvent = window.event;
		 	}

		 	if (mouseEvent.pageY){
		   		resY = mouseEvent.pageY;
		 	} else if (mouseEvent.clientY){
		   		resY = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		 	}

		 	if (mouseEvent.target){
				this.rotateDeg = ((resY - 100) * 10 / mouseEvent.currentTarget.scrollHeight) + 20;
	 		}
		};

		this.Logout = function(){
			$http.get("/main/logout").then(function(data){
				$window.location.href = '/';
			});
		};
	}]);
})();
