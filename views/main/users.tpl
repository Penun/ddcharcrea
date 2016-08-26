<div ng-repeat="(ind, user) in users">
	<h2 ng-click="mainCont.RevealCharacters(ind)">{{"{{user.UserName}}"}}</h2>
	<div ng-show="user.showChars">
		{{template "main/characters.tpl"}}
	</div>
</div>