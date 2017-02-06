<h1>Select Class:</h1>
<div class="right_page_in">
	<form id="insCharClass" name="insCharClass" novalidate>
		<div ng-repeat="(c_i, ch_class) in ch_classes">
			<div class="radIO"><input type="radio" name="classSel" id="classSel{{"{{ch_class.class_id}}"}}" value="{{"{{ch_class.class_id}}"}}" ng-model="addChar.class_build.class.class_id" ng-change="chInCont.UpdateSelClass(c_i)" required/><label for="classSel{{"{{ch_class.class_id}}"}}">{{"{{ch_class.name}}"}}</label><div class="check"></div></div>
			<div ng-show="chInCont.CheckClassPath(c_i)">
				<h2>Select Class Path:</h2>
				<div ng-repeat="class_path in ch_class.class_paths" class="subOption"><div class="radIO"><input type="radio" name="classPathSel" id="classPathSel{{"{{class_path.class_path_id}}"}}" value="{{"{{class_path.class_path_id}}"}}" ng-model="addChar.class_build.class_path.class_path_id" /><label for="classPathSel{{"{{class_path.class_path_id}}"}}">{{"{{class_path.name}}"}}</label><div class="check"></div></div></div>
			</div>
		</div>
		<p><div ng-click="chInCont.BackStep()" class="back_butt button"><span class="button_text">Back</span></div> --- <div ng-show="insCharClass.$valid" ng-click="chInCont.SubmitClass()" class="next_butt button"><span class="button_text">Next</span></div></p>
	</form>
</div>