<h1>Racial Characteristics:</h1>
<form id="insRaceInfo" name="insRaceInfo" ng-submit="insRaceInfo.$valid && chInCont.SubmitRaceInfo()" novalidate>
	<div ng-show="addChar.race_build.race.race_id">
		<p class="underline_center">
			<span><label for="charAge">Character Age:</label></span>
			<span><i>(Adult Age: {{"{{chInCont.aduAge}}"}} - Max Age: {{"{{chInCont.maxAge}}"}})</i></span>
			<span><input type="text" name="charAge" id="charAge" ng-model="addChar.race_build.age" maxlength="3" size="3" pattern="^[0-9]+$" required/></span>
		</p>
		<p class="underline_center">
			<span><label for="charHeight">Character Height:</label></span>
			<span><i>(Min: {{"{{chInCont.minHeight}}"}} - Max: {{"{{chInCont.maxHeight}}"}})</i></span>
			<span><input type="text" name="charHFeet" id="charHFeet" ng-model="chInCont.chHeFe" maxlength="2" size="2" pattern="^[0-9]+$" required/>' <input type="text" name="charHInch" id="charHInch" ng-model="chInCont.chHeIn" maxlength="2" size="2" pattern="^[0-9]+$" required/>"</span>
		</p>
		<p class="underline_center">
			<span><label for="charWeight">Character Weight:</label></span>
			<span><i>(Min: {{"{{chInCont.minWeight}}"}} - Max: {{"{{chInCont.maxWeight}}"}})</i></span>
			<span><input type="text" name="charWeight" id="charWeight" ng-model="addChar.race_build.weight" maxlength="3" size="3" pattern="^[0-9]+$" required/></span>
		</p>
	</div>
	<div ng-show="addChar.race_build.race.race_id == 7">
		<p><span><label for="halfElfAbil">Select (2):</label></span><span>
		<select name="halfElfAbil" id="halfElfAbil" size="5" ng-model="chInCont.halfElfAbil" multiple>
			<option value="str">Strength</option>
			<option value="dex">Dexterity</option>
			<option value="con">Constitution</option>
			<option value="int">Intelligence</option>
			<option value="wis">Wisdom</option>
		</select></span></p>
	</div>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()" class="back_butt">Back</button> --- <button type="submit" name="submit" ng-show="insRaceInfo.$valid" class="next_butt">Next</button></p>
</form>