<div ng-repeat="(ind, user) in users">
	<span ng-click="mainCont.RevealCharacters(ind)"><h2>{{"{{user.UserName}}"}}</h2></span>
	<div ng-show="user.showChars">
		<button ng-show="user.isCur" ng-click="mainCont.AddChar()">--></button>
		{{template "main/characters.tpl"}}
	</div>
</div>