<div ng-controller="charInsertController as chInCont">
	<div ng-show="chInCont.CurStep(1)">
		{{template "main/characters/playchar_in.tpl"}}
	</div>
	<div ng-show="chInCont.CurStep(2)">
		{{template "main/characters/sel_race.tpl"}}
	</div>
	<div ng-show="chInCont.CurStep(3)">
		{{template "main/characters/sel_class.tpl"}}
	</div>
	<div ng-show="chInCont.CurStep(4)">
		{{template "main/characters/sel_bg.tpl"}}
	</div>
	<div ng-show="chInCont.CurStep(5)">
		{{template "main/characters/rev_ins.tpl"}}
	</div>
</div>
<button type="button" name="cancel" ng-click="mainCont.CloseOverScreen()">X</button>