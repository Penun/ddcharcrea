<div ng-show="mainCont.CurOverScreen(3)" class="sixty_he">
	<div class="left_page_col">
	</div>
	<div ng-controller="charDeleteController as chDelCont" class="right_page">
		<h1>Delete</h1>
		Are you certain you wish to delete {{"{{delChar.name}}"}}?
		<button type="button" name="deleteButton" class="back_butt" ng-click="chDelCont.DeleteChar()">Delete Character</button>
		<button type="button" name="cancelButton" ng-click="chDelCont.Cancel()" class="next_butt">Cancel</button>
	</div>
</div>