<h3>Select Class:</h3>
<form id="insCharClass" name="insCharClass" ng-submit="insCharClass.$valid && chInCont.SubmitClass()" novalidate>
	<div ng-repeat="(c_i, ch_class) in ch_classes">
		<div><span><input type="radio" name="classSel" value="{{"{{ch_class.class_id}}"}}" ng-model="chInCont.char.class_build.class.class_id" ng-change="chInCont.UpdateSelClass(c_i)" required/>{{"{{ch_class.name}}"}}</span></div>
		<div ng-show="chInCont.CheckClassPath(c_i)">
			<div ng-repeat="class_path in ch_class.class_paths"><span><input type="radio" name="classPathSel" value="{{"{{class_path.class_path_id}}"}}" ng-model="chInCont.char.class_build.class_path.class_path_id" />{{"{{class_path.name}}"}}</span></div>
		</div>
	</div>
	<p><button type="button" name="backButton" ng-click="chInCont.BackStep()">Back</button> --- <button type="submit" name="submit" ng-show="insCharClass.$valid">Next</button></p>
</form>