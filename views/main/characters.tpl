<div ng-show="mainCont.ShowCharDetails()" class="right_page">
	<div><b>{{"{{chara.class_build.class.name}}"}} <span ng-show="chara.level >= 3">({{"{{chara.class_build.class_path.name}}"}})</span></b></div>
	<br />
	<div class="d_list_i"><b>{{"{{chara.raceRef}}"}}</b></div>
	<br />
	<div class="d_list_i"><b>HP</b>: {{"{{chara.hit_points}}"}}</div>
	<div class="d_list_i"><b>Exp</b>: {{"{{chara.exp}}"}}</div>
	<div ng-click="mainCont.RevealInfo()">
		<h3>Info</h3>
		<div ng-show="chara.showInfo">
			<div class="d_list_i"><b>Sex</b>: {{"{{chara.sex}}"}}</div><div class="d_list_i"><b>Age</b>: {{"{{chara.race_build.age}}"}}</div><br />
			<div class="d_list_i"><b>Height</b>: {{"{{(chara.race_build.height_in - (chara.race_build.height_in % 12)) / 12}}' {{chara.race_build.height_in % 12}}\""}}</div><div class="d_list_i"><b>Weight</b>: {{"{{chara.race_build.weight}}"}}</div><br />
		</div>
	</div>
	<div class="d_list_i"><b>Proficiency Bonus:</b> {{"{{chara.profBonus}}"}}</div><br />
	<div class="d_list_i"><b>Str</b>: {{"{{chara.b_str}}"}}<span ng-show="chara.bo_str > 0"> + {{"{{chara.bo_str}}"}} :: {{"{{chara.t_str}}"}}</span></div>
	<div class="d_list_i"><b>Dex</b>: {{"{{chara.b_dex}}"}}<span ng-show="chara.bo_dex > 0"> + {{"{{chara.bo_dex}}"}} :: {{"{{chara.t_dex}}"}}</span></div>
	<div class="d_list_i"><b>Con</b>: {{"{{chara.b_con}}"}}<span ng-show="chara.bo_con > 0"> + {{"{{chara.bo_con}}"}} :: {{"{{chara.t_con}}"}}</span></div>
	<div class="d_list_i"><b>Int</b>: {{"{{chara.b_int}}"}}<span ng-show="chara.bo_int > 0"> + {{"{{chara.bo_int}}"}} :: {{"{{chara.t_int}}"}}</span></div>
	<div class="d_list_i"><b>Wis</b>: {{"{{chara.b_wis}}"}}<span ng-show="chara.bo_wis > 0"> + {{"{{chara.bo_wis}}"}} :: {{"{{chara.t_wis}}"}}</span></div>
	<div class="d_list_i"><b>Cha</b>: {{"{{chara.b_cha}}"}}<span ng-show="chara.bo_cha > 0"> + {{"{{chara.bo_cha}}"}} :: {{"{{chara.t_cha}}"}}</span></div>
	<div id="feat_panel" ng-click="mainCont.RevealFeatures()">
		<h3>Features</h3>
		<div ng-show="chara.showFeatures">
			<div ng-repeat="feat in chara.race_build.race.features">{{"{{feat.feature.name}}"}}</div>
		</div>
	</div>
	<div id="skill_panel" ng-click="mainCont.RevealSkills()">
		<h3>Skills</h3>
		<div ng-show="chara.showSkills">
			<div><b>Acrobatics</b> <i>(Dex)</i>: {{"{{chara.m_dex}}"}}<span ng-show="chara.showBonuses.acro"> + {{"{{chara.profBonus}} :: {{chara.m_dex + chara.profBonus}}"}}</span></div>
			<div><b>Animal Handling</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span ng-show="chara.showBonuses.anim"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Arcana</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span ng-show="chara.showBonuses.arca"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Athletics</b> <i>(Str)</i>: {{"{{chara.m_str}}"}}<span ng-show="chara.showBonuses.athl"> + {{"{{chara.profBonus}} :: {{chara.m_str + chara.profBonus}}"}}</span></div>
			<div><b>Deception</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span ng-show="chara.showBonuses.dece"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>History</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span ng-show="chara.showBonuses.hist"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Insight</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span ng-show="chara.showBonuses.insi"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Intimidation</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span ng-show="chara.showBonuses.inti"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>Investigation</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span ng-show="chara.showBonuses.inve"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Medicine</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span ng-show="chara.showBonuses.medi"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Nature</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span ng-show="chara.showBonuses.natu"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Perception</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span ng-show="chara.showBonuses.perc"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Performance</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span ng-show="chara.showBonuses.perf"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>Persuasion</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span ng-show="chara.showBonuses.pers"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>Religion</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span ng-show="chara.showBonuses.reli"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Sleight of Hand</b> <i>(Dex)</i>: {{"{{chara.m_dex}}"}}<span ng-show="chara.showBonuses.sloh"> + {{"{{chara.profBonus}} :: {{chara.m_dex + chara.profBonus}}"}}</span></div>
			<div><b>Stealth</b> <i>(Dex)</i>: {{"{{chara.m_dex}}"}}<span ng-show="chara.showBonuses.stea"> + {{"{{chara.profBonus}} :: {{chara.m_dex + chara.profBonus}}"}}</span></div>
			<div><b>Survival</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span ng-show="chara.showBonuses.surv"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
		</div>
	</div>
	<div id="background_panel" ng-click="mainCont.RevealBackground()">
		<h3>Background</h3>
		<div ng-show="chara.showBackground">
			<h3>{{"{{chara.background_build.background.name}}"}}</h3>
			<div>
				<b>Feature</b> - <i>{{"{{chara.background_build.background.feature.name}}"}}</i><br />
				<span>{{"{{chara.background_build.background.feature.description}}"}}</span>	
			</div>
			<div><b>Trait</b> - <span>{{"{{chara.background_build.trait.description}}"}}</span></div>
			<div><b>Ideal</b><span> - {{"{{chara.background_build.ideal.description}}"}}</span></div>
			<div><b>Bond</b><span> - {{"{{chara.background_build.bond.description}}"}}</span></div>
			<div><b>Flaw</b><span> - {{"{{chara.background_build.flaw.description}}"}}</span></div>
		</div>
	</div><br />
</div>