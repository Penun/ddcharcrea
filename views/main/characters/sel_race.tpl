<h1>Select Race:</h1>
<form id="insCharRace" name="insCharRace" ng-submit="insCharRace.$valid && chInCont.SubmitRace()" novalidate>
	<div ng-repeat="(r_i, race) in races">
		<div class="radIO"><input type="radio" name="raceSel" id="raceSel{{"{{race.race_id}}"}}" value="{{"{{race.race_id}}"}}" ng-model="chInCont.char.race_build.race.race_id" ng-change="chInCont.UpdateSelRace(r_i)" required/><label for="raceSel{{"{{race.race_id}}"}}">{{"{{race.name}}"}}</label><div class="check"></div></div>
		<div ng-show="chInCont.CheckSubRace(r_i)">
			<h2>Select Sub Race:</h2>
			<div ng-repeat="sub_race in race.sub_races" class="subOption"><div class="radIO"><input type="radio" name="subRaceSel" id="subRaceSel{{"{{sub_race.sub_race_id}}"}}" value="{{"{{sub_race.sub_race_id}}"}}" ng-model="chInCont.char.race_build.sub_race.sub_race_id" /><label for="subRaceSel{{"{{sub_race.sub_race_id}}"}}">{{"{{sub_race.name}}"}}</label><div class="check"></div></div></div>
		</div>
	</div>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()" class="back_butt">Back</button> --- <button type="submit" name="submit" ng-show="insCharRace.$valid" class="next_butt">Next</button></p>
</form>