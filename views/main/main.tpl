{{template "includes/main/header.tpl"}}
<body ng-controller="locManager as locM">
	<div class="headDiv" id="headDiv">
		<button type="button" ng-click="locM.Logout()" class="fright">Logout</button>
	</div>
	<div class="mainDiv" id="forwardMain">
		<div id="charTab" ng-show="locM.isSelected(1)" ng-controller="mainController as mainCont">
			{{template "main/users.tpl"}}
		</div>
	</div>
</body>
</html>