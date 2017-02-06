<div ng-show="mainCont.CurOverScreen(2)" class="sixty_he">
	<div class="left_page_col">
	</div>
	<div ng-controller="charInsertController as chInCont">
		<div ng-show="chInCont.CurStep(1)" class="right_page">
			{{template "main/characters/add/playchar_in.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(2)" class="right_page">
			{{template "main/characters/add/sel_race.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(3)" class="right_page">
			{{template "main/characters/add/race_in.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(4)" class="right_page">
			{{template "main/characters/add/sel_class.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(5)" class="right_page">
			{{template "main/characters/add/sel_bg.tpl"}}
		</div>
		<div ng-show="chInCont.CurStep(6)" class="right_page">
			{{template "main/characters/add/rev_ins.tpl"}}
		</div>
		<div ng-click="chInCont.Cancel()" class="cancel_butt button"><span class="button_text">X</span></div>
	</div>
</div>