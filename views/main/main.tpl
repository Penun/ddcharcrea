{{template "includes/main/header.tpl"}}
<body ng-controller="tabManager as tabM">
	<div class="mainDiv" id="forwardMain">
		<div class="headNav">
			<ul>
				<li ng-click="tabM.selectTab(1)"><h1>Characters</h1></li>
				<li ng-click="tabM.selectTab(2)"><h1>Other</h1></li>
			</ul>
		</div>
		<div id="charTab" ng-show="tabM.isSelected(1)">
			
		</div>
		<div ng-show="tabM.isSelected(2)">
			<h1>The Other</h1>
		</div>
	</div>
</body>
</html>