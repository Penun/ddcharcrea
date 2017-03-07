(function(){
	var app = angular.module('ddchar_campaigns', []);
	app.controller('mainCampController', ['$http', '$scope', function($http, $scope){
        $scope.$on('tab2_go', function(){

        });

        this.RevealRegions = function(ind){

        };

        this.RevealEncounters = function(ind){

        };

        this.RevealDetails = function(ind){

        };

        this.ShowCampaigns = function(){
            return true;
        };

        this.ShowRegions = function(){
            return false;
        };

        this.ShowEncounters = function(){
            return false;
        };

        this.AddElement = function(){
            
        };
    }]);
})();
