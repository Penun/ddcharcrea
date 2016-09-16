<h3>Select Class:</h3>
<form id="insCharClass" name="insCharClass" ng-submit="insCharClass.$valid && chInCont.SubmitClass()" novalidate>
	<div ng-repeat="(c_i, ch_class) in ch_classes">
		<div><span><input type="radio" name="classSel" value="{{"{{ch_class.class_id}}"}}" ng-model="chInCont.char.class_build.class.class_id" ng-change="chInCont.UpdateSelClass(c_i)" required/>{{"{{ch_class.name}}"}}</span></div>
		<div ng-show="chInCont.CheckClassPath(c_i)">
			<div ng-repeat="class_path in ch_class.class_paths"><span><input type="radio" name="classPathSel" value="{{"{{class_path.class_path_id}}"}}" ng-model="chInCont.char.class_build.class_path.class_path_id" />{{"{{class_path.name}}"}}</span></div>
		</div>
	</div>
	<div ng-show="chInCont.char.class_build.class.class_id">
		<p><label for="classProfs">Select ({{"{{chInCont.skillCap}}"}}): </label>
			<select name="classProfs" id="classProfs" ng-model="chInCont.chosenProfs" ng-change="chInCont.ClassProfsCheck()" multiple required>
				<option ng-repeat="clasSkill in curClassProfs" value="{{"{{clasSkill.class_prof_id}}"}}">{{"{{clasSkill.name}}"}}</option>
			</select>
		</p>
	</div>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()">Back</button> --- <button type="submit" name="submit">Next</button></p>
</form>