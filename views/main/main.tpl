{{template "includes/main/header.tpl"}}
<body ng-controller="locManager as locM">
	<div class="headDiv" id="headDiv">

	</div>
	<div class="mainDiv" id="forwardMain" ng-mousemove="locM.MoveBook($event)" ng-style="{'transform': 'rotateX('+locM.rotateDeg+'deg)', '-moz-transform': 'rotateX('+locM.rotateDeg+'deg)', '-webkit-transform': 'rotateX('+locM.rotateDeg+'deg)'}">
		<div ng-click="locM.Logout()" class="fright button"><span class="button_text">Logout</span></div>
		<div id="nav_panel">
			<ul>
				<li ng-click="locM.selectLoc(1)">Characters</li>
				<li ng-click="locM.selectLoc(2)">Campaigns</li>
			</ul>
		</div>
		<div id="charTab" class="page" ng-show="locM.isSelected(1)" ng-controller="mainCharController as mainCont">
			{{template "main/users.tpl"}}
			{{template "main/characters/add.tpl"}}
			{{template "main/characters/delete.tpl"}}
		</div>
		<div id="campTab" class="page" ng-show="locM.isSelected(2)" ng-controller="mainCampController as campCont">
			
		</div>
	</div>
</body>
</html>
