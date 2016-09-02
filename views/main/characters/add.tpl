<div ng-controller="charInsertController as chInCont">
	<div ng-show="chInCont.CurStep(1)">
		{{template "main/characters/playchar_in.tpl"}}
	</div>
	<div ng-show="chInCont.CurStep(2)">
		{{template "main/characters/sel_race.tpl"}}
	</div>
</div>