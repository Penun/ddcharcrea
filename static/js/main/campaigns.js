(function(){
	var app = angular.module('ddchar_campaigns', []);
	app.controller('mainCampController', ['$http', '$scope', function($http, $scope){
        $scope.$on('tab2_go', function(){
            alert("Again!");
        });
    }]);
})();
