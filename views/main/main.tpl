{{template "includes/main/header.tpl"}}
<body ng-controller="tabManager as tabM">
	<div class="mainDiv" id="forwardMain">
		<button type="button" ng-click="tabM.Logout()">Logout</button>
		<div class="headNav">
			<ul>
				<li ng-click="tabM.selectTab(1)"><h1>Users</h1></li>
				<li ng-click="tabM.selectTab(2)"><h1>Races</h1></li>
			</ul>
		</div>
		<div id="charTab" ng-show="tabM.isSelected(1)" ng-controller="mainController as mainCont">
			{{template "main/users.tpl"}}
		</div>
		<div ng-show="tabM.isSelected(2)">
			<h1>Races</h1>
		</div>
	</div>
</body>
</html>