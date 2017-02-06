<h1>Select Background:</h1>
<div class="right_page_in">
	<form id="insCharBG" name="insCharBG" novalidate>
		<div ng-repeat="(b_i, BG) in BGs">
			<div class="radIO"><input type="radio" name="BGSel" id="BGSel{{"{{BG.background_id}}"}}" value="{{"{{BG.background_id}}"}}" ng-model="addChar.background_build.background.background_id" ng-change="chInCont.UpdateSelBG(b_i)"required/><label for="BGSel{{"{{BG.background_id}}"}}">{{"{{BG.name}}"}}</label><div class="check"></div></div>
			<div ng-show="chInCont.CheckBGDet(b_i)">
				<span class="top_pad"><b>Feature</b>: <i>{{"{{BG.feature.name}}"}}</i></span>
			</div>
		</div>
		<p><div ng-click="chInCont.BackStep()" class="back_butt button"><span class="button_text">Back</span></div> --- <div ng-show="insCharBG.$valid" ng-click="chInCont.SubmitBG()" class="next_butt button"><span class="button_text">Next</span></div></p>
	</form>
</div>