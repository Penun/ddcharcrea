<form name="savChar" id="savChar" ng-submit="chInCont.SaveChar()" novalidate>
	<p><label for="classProfs">Select ({{"{{chInCont.skillCap}}"}}) Class Skill Proficiencies: </label><br />
		<select name="classProfs" id="classProfs" ng-model="chInCont.chosenProfs" ng-change="chInCont.ClassProfsCheck()" multiple required>
			<option ng-repeat="clasSkill in curClassProfs" value="{{"{{clasSkill.class_prof_id}}"}}">{{"{{clasSkill.name}}"}}</option>
		</select>
	</p>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()">Back</button> --- <button type="submit" name="submit">Save Character</button></p>
</form>