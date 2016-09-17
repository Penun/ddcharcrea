<h3>Select Race:</h3>
<form id="insCharRace" name="insCharRace" ng-submit="insCharRace.$valid && chInCont.SubmitRace()" novalidate>
	<div ng-repeat="(r_i, race) in races">
		<div><span><input type="radio" name="raceSel" value="{{"{{race.race_id}}"}}" ng-model="chInCont.char.race_build.race.race_id" ng-change="chInCont.UpdateSelRace(r_i)" required/>{{"{{race.name}}"}}</span></div>
		<div ng-show="chInCont.CheckSubRace(r_i)">
			<div ng-repeat="sub_race in race.sub_races"><span><input type="radio" name="subRaceSel" value="{{"{{sub_race.sub_race_id}}"}}" ng-model="chInCont.char.race_build.sub_race.sub_race_id" />{{"{{sub_race.name}}"}}</span></div>
		</div>
	</div>
	<div ng-show="chInCont.char.race_build.race.race_id">
		<p><label for="charAge">Character Age:</label><input type="text" name="charAge" id="charAge" ng-model="chInCont.char.race_build.age" maxlength="3" size="3" pattern="^[0-9]+$" required/> <i>(Adult Age: {{"{{chInCont.aduAge}}"}} - Max Age: {{"{{chInCont.maxAge}}"}})</i></p>
		<p><label for="charHeight">Character Height:</label><input type="text" name="charHFeet" id="charHFeet" ng-model="chInCont.chHeFe" maxlength="2" size="2" pattern="^[0-9]+$" required/>' <input type="text" name="charHInch" id="charHInch" ng-model="chInCont.chHeIn" maxlength="2" size="2" pattern="^[0-9]+$" required/>" <i>(Min: {{"{{chInCont.minHeight}}"}} - Max:{{"{{chInCont.maxHeight}}"}})</i></p>
		<p><label for="charWeight">Character Weight:</label><input type="text" name="charWeight" id="charWeight" ng-model="chInCont.char.race_build.weight" maxlength="3" size="3" pattern="^[0-9]+$" required/> <i>(Min: {{"{{chInCont.minWeight}}"}} - Max: {{"{{chInCont.maxWeight}}"}})</i></p>
	</div>
	<div ng-show="chInCont.char.race_build.race.race_id == 7">
		<p><label for="halfElfAbil">Select (2):</label>
		<select name="halfElfAbil" id="halfElfAbil" ng-model="chInCont.halfElfAbil" multiple>
			<option value="str">Strength</option>
			<option value="dex">Dexterity</option>
			<option value="con">Constitution</option>
			<option value="int">Intelligence</option>
			<option value="wis">Wisdom</option>
		</select></p>
	</div>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()">Back</button> --- <button type="submit" name="submit">Next</button></p>
</form>