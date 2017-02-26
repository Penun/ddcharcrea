{{template "includes/main/header.tpl"}}
<body ng-controller="locManager as locM">
	<div class="headDiv" id="headDiv">

	</div>
	<div class="mainDiv" id="forwardMain" ng-mousemove="locM.MoveBook($event)" ng-style="{'transform': 'rotateX('+locM.rotateDeg+'deg)', '-moz-transform': 'rotateX('+locM.rotateDeg+'deg)', '-webkit-transform': 'rotateX('+locM.rotateDeg+'deg)'}">
		<div ng-click="locM.Logout()" class="fright button"><span class="button_text">Logout</span></div>
		<div id="charTab" class="page" ng-show="locM.isSelected(1)" ng-controller="mainController as mainCont">
			{{template "main/users.tpl"}}
			{{template "main/characters/add.tpl"}}
			{{template "main/characters/delete.tpl"}}
		</div>
	</div>
	Mouse Y : {{"{{locM.mouseY}}"}}
</body>
</html>
