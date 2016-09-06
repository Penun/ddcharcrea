<h3>Select Race:</h3>
<form id="insCharRace" name="insCharRace" ng-submit="insCharRace.$valid && chInCont.SubmitRace()" novalidate>
	<div ng-repeat="(r_i, race) in races">
		<div ng-click="chInCont.RevealSubRace(r_i)"><span><input type="radio" name="raceSel" value="{{"{{race.race_id}}"}}" ng-model="chInCont.char.race_build.race.race_id" required/>{{"{{race.name}}"}}</span></div>
		<div ng-show="chInCont.CheckSubRace(r_i)">
			<div ng-repeat="sub_race in race.sub_races"><span><input type="radio" name="subRaceSel" value="{{"{{sub_race.sub_race_id}}"}}" ng-model="chInCont.char.race_build.sub_race.sub_race_id" />{{"{{sub_race.name}}"}}</span></div>
		</div>
	</div>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()">Back</button> --- <button type="submit" name="submit">Next</button></p>
</form>