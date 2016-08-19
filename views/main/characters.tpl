<div ng-repeat="char in playchars">
	<div class="d_list">
		<div ng-click="charCont.RevealDetails(char.playchar_id)">
			<div class="d_list_i"><b><i>{{"{{char.name}}"}}</i></b></div><div class="d_list_i"><b>{{"{{char.refClass}}"}}</b></div><div class="d_list_i"><b>{{"{{char.raceRef}}"}}</b></div><div class="d_list_i"><b>Lvl {{"{{char.level}}"}}</b></div><br />
		</div>
		<div ng-show="char.showDetails">
			<div class="d_list_i"><b>HP</b>: {{"{{char.hit_points}}"}}</div><div class="d_list_i"><b>Exp</b>: {{"{{char.exp}}"}}</div><div class="d_list_i"><b>Sex</b>: {{"{{char.sex}}"}}</div><br />
			<div class="d_list_i"><b>Str</b>: {{"{{char.b_str}}"}}</div><div class="d_list_i"><b>Dex</b>: {{"{{char.b_dex}}"}}</div><div class="d_list_i"><b>Con</b>: {{"{{char.b_con}}"}}</div><br />
			<div class="d_list_i"><b>Int</b>: {{"{{char.b_int}}"}}</div><div class="d_list_i"><b>Wis</b>: {{"{{char.b_wis}}"}}</div><div class="d_list_i"><b>Cha</b>: {{"{{char.b_cha}}"}}</div><br />
			<div id="skill_panel" ng-click="charCont.RevealSkills(char.playchar_id)">
				<h2>Skills</h2>
				<div ng-show="char.showSkills">
					<div><b>Acrobatics</b> <i>(Dex)</i>: {{"{{char.acro}}"}}</div>		
					<div><b>Animal Handling</b> <i>(Wis)</i>: {{"{{char.anim}}"}}</div>		
					<div><b>Arcana</b> <i>(Int)</i>: {{"{{char.arca}}"}}</div>		
					<div><b>Athletics</b> <i>(Str)</i>: {{"{{char.athl}}"}}</div>		
					<div><b>Deception</b> <i>(Cha)</i>: {{"{{char.dece}}"}}</div>		
					<div><b>History</b> <i>(Int)</i>: {{"{{char.hist}}"}}</div>		
					<div><b>Insight</b> <i>(Wis)</i>: {{"{{char.insi}}"}}</div>		
					<div><b>Intimidation</b> <i>(Cha)</i>: {{"{{char.inti}}"}}</div>		
					<div><b>Investigation</b> <i>(Int)</i>: {{"{{char.inve}}"}}</div>		
					<div><b>Medicine</b> <i>(Wis)</i>: {{"{{char.medi}}"}}</div>		
					<div><b>Nature</b> <i>(Int)</i>: {{"{{char.natu}}"}}</div>		
					<div><b>Perception</b> <i>(Wis)</i>: {{"{{char.perc}}"}}</div>		
					<div><b>Performance</b> <i>(Cha)</i>: {{"{{char.perf}}"}}</div>		
					<div><b>Persuasion</b> <i>(Cha)</i>: {{"{{char.pers}}"}}</div>		
					<div><b>Religion</b> <i>(Int)</i>: {{"{{char.reli}}"}}</div>		
					<div><b>Sleight of Hand</b> <i>(Dex)</i>: {{"{{char.sloh}}"}}</div>		
					<div><b>Stealth</b> <i>(Dex)</i>: {{"{{char.stea}}"}}</div>		
					<div><b>Survival</b> <i>(Wis)</i>: {{"{{char.surv}}"}}</div>		
				</div>
			</div>
		</div>
	</div>
</div>