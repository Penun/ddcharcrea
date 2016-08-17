{{template "includes/main/header.tpl"}}
<body ng-controller="tabManager as tabM">
	<script type="text/javascript">
	(function(){
		preRaces = {{.races}};
		preSubRaces = {{.subRaces}};
		preClasses = {{.classes}};
		preClassPaths = {{.classPaths}};
	})();
	</script>
	<div class="mainDiv" id="forwardMain">
		<div class="headNav">
			<ul>
				<li ng-click="tabM.selectTab(1)"><h1>Characters</h1></li>
				<li ng-click="tabM.selectTab(2)"><h1>Races</h1></li>
			</ul>
		</div>
		<div id="charTab" ng-show="tabM.isSelected(1)" ng-controller="charController as charCont">
			{{template "main/characters.tpl"}}
		</div>
		<div ng-show="tabM.isSelected(2)" ng-controller="raceController as raceCont">
			<h1>Races</h1>
		</div>
	</div>
</body>
</html>