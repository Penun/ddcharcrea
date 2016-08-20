<div ng-repeat="char in playchars">
	<div class="d_list">
		<div ng-click="charCont.RevealDetails(char.playchar_id)">
			<div class="d_list_i"><b><i>{{"{{char.name}}"}}</i></b></div><div class="d_list_i"><b>{{"{{char.class_build.class.name}}"}} <span ng-show="char.level >= 3">({{"{{char.class_build.class_path.name}}"}})</span></b></div><div class="d_list_i"><b>{{"{{char.raceRef}}"}}</b></div><div class="d_list_i"><b>Lvl {{"{{char.level}}"}}</b></div><br />
		</div>
		<div ng-show="char.showDetails">
			<div class="d_list_i"><b>HP</b>: {{"{{char.hit_points}}"}}</div><div class="d_list_i"><b>Exp</b>: {{"{{char.exp}}"}}</div><div class="d_list_i"><b>Sex</b>: {{"{{char.sex}}"}}</div><br />
			<div class="d_list_i"><b>Height</b>: {{"{{char.race_build.height_ft}}' {{char.race_build.height_in}}\""}}</div><div class="d_list_i"><b>Weight</b>: {{"{{char.race_build.weight}}"}}</div><div class="d_list_i"><b>Age</b>: {{"{{char.race_build.age}}"}}</div><br /><br />
			<div class="d_list_i"><b>Str</b>: {{"{{char.b_str}}"}}</div><div class="d_list_i"><b>Dex</b>: {{"{{char.b_dex}}"}}</div><div class="d_list_i"><b>Con</b>: {{"{{char.b_con}}"}}</div><br />
			<div class="d_list_i"><b>Int</b>: {{"{{char.b_int}}"}}</div><div class="d_list_i"><b>Wis</b>: {{"{{char.b_wis}}"}}</div><div class="d_list_i"><b>Cha</b>: {{"{{char.b_cha}}"}}</div><br />
			<div id="skill_panel" ng-click="charCont.RevealSkills(char.playchar_id)">
				<h2>Skills</h2>
				<div ng-show="char.showSkills">
					<div><b>Acrobatics</b> <i>(Dex)</i>: {{"{{char.acro}}"}}<span ng-show="char.showBonuses.acro"> + {{"{{char.profBonus}} :: {{char.acro + char.profBonus}}"}}</span></div>
					<div><b>Animal Handling</b> <i>(Wis)</i>: {{"{{char.anim}}"}}<span ng-show="char.showBonuses.anim"> + {{"{{char.profBonus}} :: {{char.anim + char.profBonus}}"}}</span></div>
					<div><b>Arcana</b> <i>(Int)</i>: {{"{{char.arca}}"}}<span ng-show="char.showBonuses.arca"> + {{"{{char.profBonus}} :: {{char.arca + char.profBonus}}"}}</span></div>
					<div><b>Athletics</b> <i>(Str)</i>: {{"{{char.athl}}"}}<span ng-show="char.showBonuses.athl"> + {{"{{char.profBonus}} :: {{char.athl + char.profBonus}}"}}</span></div>
					<div><b>Deception</b> <i>(Cha)</i>: {{"{{char.dece}}"}}<span ng-show="char.showBonuses.dece"> + {{"{{char.profBonus}} :: {{char.dece + char.profBonus}}"}}</span></div>
					<div><b>History</b> <i>(Int)</i>: {{"{{char.hist}}"}}<span ng-show="char.showBonuses.hist"> + {{"{{char.profBonus}} :: {{char.hist + char.profBonus}}"}}</span></div>
					<div><b>Insight</b> <i>(Wis)</i>: {{"{{char.insi}}"}}<span ng-show="char.showBonuses.insi"> + {{"{{char.profBonus}} :: {{char.insi + char.profBonus}}"}}</span></div>
					<div><b>Intimidation</b> <i>(Cha)</i>: {{"{{char.inti}}"}}<span ng-show="char.showBonuses.inti"> + {{"{{char.profBonus}} :: {{char.inti + char.profBonus}}"}}</span></div>
					<div><b>Investigation</b> <i>(Int)</i>: {{"{{char.inve}}"}}<span ng-show="char.showBonuses.inve"> + {{"{{char.profBonus}} :: {{char.inve + char.profBonus}}"}}</span></div>
					<div><b>Medicine</b> <i>(Wis)</i>: {{"{{char.medi}}"}}<span ng-show="char.showBonuses.medi"> + {{"{{char.profBonus}} :: {{char.medi + char.profBonus}}"}}</span></div>
					<div><b>Nature</b> <i>(Int)</i>: {{"{{char.natu}}"}}<span ng-show="char.showBonuses.natu"> + {{"{{char.profBonus}} :: {{char.natu + char.profBonus}}"}}</span></div>
					<div><b>Perception</b> <i>(Wis)</i>: {{"{{char.perc}}"}}<span ng-show="char.showBonuses.perc"> + {{"{{char.profBonus}} :: {{char.perc + char.profBonus}}"}}</span></div>
					<div><b>Performance</b> <i>(Cha)</i>: {{"{{char.perf}}"}}<span ng-show="char.showBonuses.perf"> + {{"{{char.profBonus}} :: {{char.perf + char.profBonus}}"}}</span></div>
					<div><b>Persuasion</b> <i>(Cha)</i>: {{"{{char.pers}}"}}<span ng-show="char.showBonuses.pers"> + {{"{{char.profBonus}} :: {{char.pers + char.profBonus}}"}}</span></div>
					<div><b>Religion</b> <i>(Int)</i>: {{"{{char.reli}}"}}<span ng-show="char.showBonuses.reli"> + {{"{{char.profBonus}} :: {{char.reli + char.profBonus}}"}}</span></div>
					<div><b>Sleight of Hand</b> <i>(Dex)</i>: {{"{{char.sloh}}"}}<span ng-show="char.showBonuses.sloh"> + {{"{{char.profBonus}} :: {{char.sloh + char.profBonus}}"}}</span></div>
					<div><b>Stealth</b> <i>(Dex)</i>: {{"{{char.stea}}"}}<span ng-show="char.showBonuses.stea"> + {{"{{char.profBonus}} :: {{char.stea + char.profBonus}}"}}</span></div>
					<div><b>Survival</b> <i>(Wis)</i>: {{"{{char.surv}}"}}<span ng-show="char.showBonuses.surv"> + {{"{{char.profBonus}} :: {{char.surv + char.profBonus}}"}}</span></div>
				</div>
			</div>
		</div>
	</div>
</div>