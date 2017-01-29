<div ng-show="mainCont.CurOverScreen(2)" class="sixty_he">
	<div class="left_page_col">
	</div>
	<div ng-controller="charInsertController as chInCont" class="right_page_col">
		<div ng-show="chInCont.CurStep(1)" class="right_page">
			{{template "main/characters/playchar_in.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(2)" class="right_page">
			{{template "main/characters/sel_race.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(3)" class="right_page">
			{{template "main/characters/race_in.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(4)" class="right_page">
			{{template "main/characters/sel_class.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(5)" class="right_page">
			{{template "main/characters/sel_bg.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(6)" class="right_page">
			{{template "main/characters/rev_ins.tpl"}}
		</div>
	</div>
<button type="button" name="cancel" ng-click="mainCont.CloseOverScreen()" class="cancel_butt">X</button>
</div>