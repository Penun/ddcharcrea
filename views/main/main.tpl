{{template "includes/main/header.tpl"}}
<body ng-controller="locManager as locM">
	<div class="mainDiv" id="forwardMain">
		<button type="button" ng-click="locM.Logout()">Logout</button>
		<div id="charTab" ng-show="locM.isSelected(1)" ng-controller="mainController as mainCont">
			{{template "main/users.tpl"}}
			<div ng-show="mainCont.CurOverScreen(2)">
				{{template "main/characters/add.tpl"}}
			</div>
		</div>
	</div>
</body>
</html>