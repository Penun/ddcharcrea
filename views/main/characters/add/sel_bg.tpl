<h1>Select Background:</h1>
<div class="right_page_in">
	<form id="insCharBG" name="insCharBG" ng-submit="insCharBG.$valid && chInCont.SubmitBG()" novalidate>
		<div ng-repeat="(b_i, BG) in BGs">
			<div class="radIO"><input type="radio" name="BGSel" id="BGSel{{"{{BG.background_id}}"}}" value="{{"{{BG.background_id}}"}}" ng-model="chInCont.char.background_build.background.background_id" ng-change="chInCont.UpdateSelBG(b_i)"required/><label for="BGSel{{"{{BG.background_id}}"}}">{{"{{BG.name}}"}}</label><div class="check"></div></div>
			<div ng-show="chInCont.CheckBGDet(b_i)">
				<span class="top_pad"><b>Feature</b>: <i>{{"{{BG.feature.name}}"}}</i></span>
			</div>
		</div>
		<p><button type="button" name="backButton" ng-click="chInCont.BackStep()" class="back_butt">Back</button> --- <button type="submit" name="submit" ng-show="insCharBG.$valid" class="next_butt">Next</button></p>
	</form>
</div>