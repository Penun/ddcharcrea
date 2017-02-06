<h1>Select Race:</h1>
<div class="right_page_in">
	<form id="insCharRace" name="insCharRace" novalidate>
		<div ng-repeat="(r_i, race) in races">
			<div class="radIO"><input type="radio" name="raceSel" id="raceSel{{"{{race.race_id}}"}}" value="{{"{{race.race_id}}"}}" ng-model="addChar.race_build.race.race_id" ng-change="chInCont.UpdateSelRace(r_i)" required/><label for="raceSel{{"{{race.race_id}}"}}">{{"{{race.name}}"}}</label><div class="check"></div></div>
			<div ng-show="chInCont.CheckSubRace(r_i)">
				<h2>Select Sub Race:</h2>
				<div ng-repeat="sub_race in race.sub_races" class="subOption"><div class="radIO"><input type="radio" name="subRaceSel" id="subRaceSel{{"{{sub_race.sub_race_id}}"}}" value="{{"{{sub_race.sub_race_id}}"}}" ng-model="addChar.race_build.sub_race.sub_race_id" /><label for="subRaceSel{{"{{sub_race.sub_race_id}}"}}">{{"{{sub_race.name}}"}}</label><div class="check"></div></div></div>
			</div>
		</div>
		<p><div ng-click="chInCont.BackStep()" class="back_butt button"><span class="button_text">Back</span></div> --- <div ng-show="insCharRace.$valid" ng-click="chInCont.SubmitRace()" class="next_butt button"><span class="button_text">Next</span></div></p>
	</form>
</div>