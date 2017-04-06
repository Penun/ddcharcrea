<div ng-show="mainCont.CurOverScreen(3)" class="sixty_he">
	<div class="left_page_col">
	</div>
	<div ng-controller="charDeleteController as chDelCont" class="right_page fade_in">
		<h1>Delete</h1>
		Are you certain you wish to delete {{"{{delChar.name}}"}}?
		<div class="back_butt button" ng-click="chDelCont.DeleteChar()"><span class="button_text">Delete Character</span></div>
		<div ng-click="chDelCont.Cancel()" class="next_butt button"><span class="button_text">Cancel</span></div>
	</div>
</div>
