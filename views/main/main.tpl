{{template "includes/main/header.tpl"}}
<body ng-controller="locManager as locM">
	<div class="headDiv" id="headDiv">
		<button type="button" ng-click="locM.Logout()" class="fright">Logout</button>
	</div>
	<div class="mainDiv" id="forwardMain">
		<div id="charTab" class="page" ng-show="locM.isSelected(1)" ng-controller="mainController as mainCont">
			{{template "main/users.tpl"}}
			{{template "main/characters/add.tpl"}}
		</div>
	</div>
</body>
</html>