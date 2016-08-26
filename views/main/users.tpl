<div ng-repeat="user in users">
	<div ng-click="mainCont.RevealCharacters(user.User_id)">
	<h2>{{"{{user.UserName}}"}}</h2>
	<div ng-show="user.showChars">
		{{template "main/characters.tpl"}}
	</div>
</div>