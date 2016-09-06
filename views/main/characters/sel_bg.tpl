<h3>Select Background:</h3>
<form id="insCharBG" name="insCharBG" ng-submit="insCharBG.$valid && chInCont.SubmitBG()" novalidate>
	<div ng-repeat="(b_i, BG) in BGs">
		<div ng-click="chInCont.RevealBGDet(b_i)"><span><input type="radio" name="BGSel" value="{{"{{BG.background_id}}"}}" ng-model="chInCont.char.background_build.background.background_id" required/>{{"{{BG.name}}"}}</span></div>
		<div ng-show="chInCont.CheckBGDet(b_i)">
			<span><b>Feature</b>: <i>{{"{{BG.feature.name}}"}}</i></span>
		</div>
	</div>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()">Back</button> --- <button type="submit" name="submit">Next</button></p>
</form>