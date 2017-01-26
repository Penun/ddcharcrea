<ul>
	<li ng-repeat="(c_ind, char) in user.playchars">
		<div ng-click="mainCont.RevealDetails(ind, c_ind)">
			<span>
				<h3><b><i>{{"{{char.name}}"}}</b></i></h3>
				<b>Lvl: {{"{{char.level}}"}}</b>
			</span>
		</div>
		<br />
		<div ng-show="char.showDetails">
			<div><b>{{"{{char.class_build.class.name}}"}} <span ng-show="char.level >= 3">({{"{{char.class_build.class_path.name}}"}})</span></b></div>
			<div class="d_list_i"><b>{{"{{char.raceRef}}"}}</b></div>
			<br />
			<div class="d_list_i"><b>HP</b>: {{"{{char.hit_points}}"}}</div>
			<div class="d_list_i"><b>Exp</b>: {{"{{char.exp}}"}}</div>
			<div ng-click="mainCont.RevealInfo(ind, c_ind)">
				<h3>Info</h3>
				<div ng-show="char.showInfo">
					<div class="d_list_i"><b>Sex</b>: {{"{{char.sex}}"}}</div><div class="d_list_i"><b>Age</b>: {{"{{char.race_build.age}}"}}</div><br />
					<div class="d_list_i"><b>Height</b>: {{"{{(char.race_build.height_in - (char.race_build.height_in % 12)) / 12}}' {{char.race_build.height_in % 12}}\""}}</div><div class="d_list_i"><b>Weight</b>: {{"{{char.race_build.weight}}"}}</div><br />
				</div>
			</div>
			<div class="d_list_i"><b>Proficiency Bonus:</b> {{"{{char.profBonus}}"}}</div><br />
			<div class="d_list_i"><b>Str</b>: {{"{{char.b_str}}"}}<span ng-show="char.bo_str > 0"> + {{"{{char.bo_str}}"}} :: {{"{{char.t_str}}"}}</span></div>
			<div class="d_list_i"><b>Dex</b>: {{"{{char.b_dex}}"}}<span ng-show="char.bo_dex > 0"> + {{"{{char.bo_dex}}"}} :: {{"{{char.t_dex}}"}}</span></div>
			<div class="d_list_i"><b>Con</b>: {{"{{char.b_con}}"}}<span ng-show="char.bo_con > 0"> + {{"{{char.bo_con}}"}} :: {{"{{char.t_con}}"}}</span></div>
			<div class="d_list_i"><b>Int</b>: {{"{{char.b_int}}"}}<span ng-show="char.bo_int > 0"> + {{"{{char.bo_int}}"}} :: {{"{{char.t_int}}"}}</span></div>
			<div class="d_list_i"><b>Wis</b>: {{"{{char.b_wis}}"}}<span ng-show="char.bo_wis > 0"> + {{"{{char.bo_wis}}"}} :: {{"{{char.t_wis}}"}}</span></div>
			<div class="d_list_i"><b>Cha</b>: {{"{{char.b_cha}}"}}<span ng-show="char.bo_cha > 0"> + {{"{{char.bo_cha}}"}} :: {{"{{char.t_cha}}"}}</span></div>
			<div id="feat_panel" ng-click="mainCont.RevealFeatures(ind, c_ind)">
				<h2>Features</h2>
				<div ng-show="char.showFeatures">
					<div ng-repeat="feat in char.race_build.race.features">{{"{{feat.feature.name}}"}}</div>
				</div>
			</div>
			<div id="skill_panel" ng-click="mainCont.RevealSkills(ind, c_ind)">
				<h2>Skills</h2>
				<div ng-show="char.showSkills">
					<div><b>Acrobatics</b> <i>(Dex)</i>: {{"{{char.m_dex}}"}}<span ng-show="char.showBonuses.acro"> + {{"{{char.profBonus}} :: {{char.m_dex + char.profBonus}}"}}</span></div>
					<div><b>Animal Handling</b> <i>(Wis)</i>: {{"{{char.m_wis}}"}}<span ng-show="char.showBonuses.anim"> + {{"{{char.profBonus}} :: {{char.m_wis + char.profBonus}}"}}</span></div>
					<div><b>Arcana</b> <i>(Int)</i>: {{"{{char.m_int}}"}}<span ng-show="char.showBonuses.arca"> + {{"{{char.profBonus}} :: {{char.m_int + char.profBonus}}"}}</span></div>
					<div><b>Athletics</b> <i>(Str)</i>: {{"{{char.m_str}}"}}<span ng-show="char.showBonuses.athl"> + {{"{{char.profBonus}} :: {{char.m_str + char.profBonus}}"}}</span></div>
					<div><b>Deception</b> <i>(Cha)</i>: {{"{{char.m_cha}}"}}<span ng-show="char.showBonuses.dece"> + {{"{{char.profBonus}} :: {{char.m_cha + char.profBonus}}"}}</span></div>
					<div><b>History</b> <i>(Int)</i>: {{"{{char.m_int}}"}}<span ng-show="char.showBonuses.hist"> + {{"{{char.profBonus}} :: {{char.m_int + char.profBonus}}"}}</span></div>
					<div><b>Insight</b> <i>(Wis)</i>: {{"{{char.m_wis}}"}}<span ng-show="char.showBonuses.insi"> + {{"{{char.profBonus}} :: {{char.m_wis + char.profBonus}}"}}</span></div>
					<div><b>Intimidation</b> <i>(Cha)</i>: {{"{{char.m_cha}}"}}<span ng-show="char.showBonuses.inti"> + {{"{{char.profBonus}} :: {{char.m_cha + char.profBonus}}"}}</span></div>
					<div><b>Investigation</b> <i>(Int)</i>: {{"{{char.m_int}}"}}<span ng-show="char.showBonuses.inve"> + {{"{{char.profBonus}} :: {{char.m_int + char.profBonus}}"}}</span></div>
					<div><b>Medicine</b> <i>(Wis)</i>: {{"{{char.m_wis}}"}}<span ng-show="char.showBonuses.medi"> + {{"{{char.profBonus}} :: {{char.m_wis + char.profBonus}}"}}</span></div>
					<div><b>Nature</b> <i>(Int)</i>: {{"{{char.m_int}}"}}<span ng-show="char.showBonuses.natu"> + {{"{{char.profBonus}} :: {{char.m_int + char.profBonus}}"}}</span></div>
					<div><b>Perception</b> <i>(Wis)</i>: {{"{{char.m_wis}}"}}<span ng-show="char.showBonuses.perc"> + {{"{{char.profBonus}} :: {{char.m_wis + char.profBonus}}"}}</span></div>
					<div><b>Performance</b> <i>(Cha)</i>: {{"{{char.m_cha}}"}}<span ng-show="char.showBonuses.perf"> + {{"{{char.profBonus}} :: {{char.m_cha + char.profBonus}}"}}</span></div>
					<div><b>Persuasion</b> <i>(Cha)</i>: {{"{{char.m_cha}}"}}<span ng-show="char.showBonuses.pers"> + {{"{{char.profBonus}} :: {{char.m_cha + char.profBonus}}"}}</span></div>
					<div><b>Religion</b> <i>(Int)</i>: {{"{{char.m_int}}"}}<span ng-show="char.showBonuses.reli"> + {{"{{char.profBonus}} :: {{char.m_int + char.profBonus}}"}}</span></div>
					<div><b>Sleight of Hand</b> <i>(Dex)</i>: {{"{{char.m_dex}}"}}<span ng-show="char.showBonuses.sloh"> + {{"{{char.profBonus}} :: {{char.m_dex + char.profBonus}}"}}</span></div>
					<div><b>Stealth</b> <i>(Dex)</i>: {{"{{char.m_dex}}"}}<span ng-show="char.showBonuses.stea"> + {{"{{char.profBonus}} :: {{char.m_dex + char.profBonus}}"}}</span></div>
					<div><b>Survival</b> <i>(Wis)</i>: {{"{{char.m_wis}}"}}<span ng-show="char.showBonuses.surv"> + {{"{{char.profBonus}} :: {{char.m_wis + char.profBonus}}"}}</span></div>
				</div>
			</div>
			<div id="background_panel" ng-click="mainCont.RevealBackground(ind, c_ind)">
				<h2>Background</h2>
				<div ng-show="char.showBackground">
					<h3>{{"{{char.background_build.background.name}}"}}</h3>
					<div>
						<b>Feature</b> - <i>{{"{{char.background_build.background.feature.name}}"}}</i><br />
						<span>{{"{{char.background_build.background.feature.description}}"}}</span>	
					</div>
					<div><b>Trait</b> - <span>{{"{{char.background_build.trait.description}}"}}</span></div>
					<div><b>Ideal</b><span> - {{"{{char.background_build.ideal.description}}"}}</span></div>
					<div><b>Bond</b><span> - {{"{{char.background_build.bond.description}}"}}</span></div>
					<div><b>Flaw</b><span> - {{"{{char.background_build.flaw.description}}"}}</span></div>
				</div>
			</div><br />
		</div>
	</li>
</ul>