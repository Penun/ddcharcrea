<h1>Remaing Proficiencies</h1>
<form name="savChar" id="savChar" ng-submit="chInCont.SaveChar()" novalidate>
	<p><label for="classProfs">Select ({{"{{chInCont.skillCap}}"}}) Class Skill Proficiencies: </label><br /><br />
		<select name="classProfs" id="classProfs" ng-model="chInCont.chosenProfs" data-ng-attr-size="{{"{{curClassProfs.length}}"}}" ng-change="chInCont.ClassProfsCheck()" ng-options="clasSkill.name for clasSkill in curClassProfs track by clasSkill.class_prof_id" multiple required>
		</select>
	</p>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()" class="back_butt">Back</button> --- <button type="submit" name="submit" class="next_butt">Save Character</button></p>
</form>