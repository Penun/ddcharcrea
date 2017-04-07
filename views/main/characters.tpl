<div class="right_page_in">
	<div><b>{{"{{chara.name}}"}}</b> <span class="char_right reset"><b>Level</b>: <b>{{"{{chara.level}}"}}</b></span></div>
	<br />
	<div><b>Race</b>: <b>{{"{{chara.raceRef}}"}}</b><span class="char_right reset"><b>Class</b>: <b>{{"{{chara.class_build.class.name}}"}} <span class="reset" ng-show="chara.level >= 3">({{"{{chara.class_build.class_path.name}}"}})</span></b></span></div>
	<br />
	<div><b>HP</b>: {{"{{chara.hit_points}}"}}<span class="char_right reset"><b>Exp</b>: {{"{{chara.exp}}"}}</span></div>
	<br />
	<div><b>Proficiency Bonus:</b> {{"{{chara.profBonus}}"}}</div><br />
	<div><b>Str</b>: {{"{{chara.b_str}}"}}<span class="reset" ng-show="chara.bo_str > 0"> + {{"{{chara.bo_str}}"}} :: {{"{{chara.t_str}}"}}</span><span class="reset char_right"><b>Int</b>: {{"{{chara.b_int}}"}}<span class="reset" ng-show="chara.bo_int > 0"> + {{"{{chara.bo_int}}"}} :: {{"{{chara.t_int}}"}}</span></span></div>
	<div><b>Dex</b>: {{"{{chara.b_dex}}"}}<span class="reset" ng-show="chara.bo_dex > 0"> + {{"{{chara.bo_dex}}"}} :: {{"{{chara.t_dex}}"}}</span><span class="reset char_right"><b>Wis</b>: {{"{{chara.b_wis}}"}}<span class="reset" ng-show="chara.bo_wis > 0"> + {{"{{chara.bo_wis}}"}} :: {{"{{chara.t_wis}}"}}</span></span></div>
	<div><b>Con</b>: {{"{{chara.b_con}}"}}<span class="reset" ng-show="chara.bo_con > 0"> + {{"{{chara.bo_con}}"}} :: {{"{{chara.t_con}}"}}</span><span class="reset char_right"><b>Cha</b>: {{"{{chara.b_cha}}"}}<span class="reset" ng-show="chara.bo_cha > 0"> + {{"{{chara.bo_cha}}"}} :: {{"{{chara.t_cha}}"}}</span></span></div>
	<div ng-click="mainCont.RevealInfo()" class="clickable_det">
		<br />
		<span class="clickable_d_head">Info</span>
		<div ng-show="chara.showInfo" class="clickable_d_in">
			<div><b>Sex</b>: {{"{{chara.sex}}"}}</div><div><b>Age</b>: {{"{{chara.race_build.age}}"}}</div><br />
			<div><b>Height</b>: {{"{{(chara.race_build.height_in - (chara.race_build.height_in % 12)) / 12}}' {{chara.race_build.height_in % 12}}\""}}</div><div><b>Weight</b>: {{"{{chara.race_build.weight}}"}}</div><br />
		</div>
	</div>
	<div id="skill_panel" ng-click="mainCont.RevealSkills()" class="clickable_det">
		<br />
		<span class="clickable_d_head">Skills</span>
		<div ng-show="chara.showSkills" class="clickable_d_in">
			<div><b>Acrobatics</b> <i>(Dex)</i>: {{"{{chara.m_dex}}"}}<span class="reset" ng-show="chara.showBonuses.acro"> + {{"{{chara.profBonus}} :: {{chara.m_dex + chara.profBonus}}"}}</span></div>
			<div><b>Animal Handling</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span class="reset" ng-show="chara.showBonuses.anim"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Arcana</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span class="reset" ng-show="chara.showBonuses.arca"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Athletics</b> <i>(Str)</i>: {{"{{chara.m_str}}"}}<span class="reset" ng-show="chara.showBonuses.athl"> + {{"{{chara.profBonus}} :: {{chara.m_str + chara.profBonus}}"}}</span></div>
			<div><b>Deception</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span class="reset" ng-show="chara.showBonuses.dece"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>History</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span class="reset" ng-show="chara.showBonuses.hist"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Insight</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span class="reset" ng-show="chara.showBonuses.insi"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Intimidation</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span class="reset" ng-show="chara.showBonuses.inti"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>Investigation</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span class="reset" ng-show="chara.showBonuses.inve"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Medicine</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span class="reset" ng-show="chara.showBonuses.medi"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Nature</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span class="reset" ng-show="chara.showBonuses.natu"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Perception</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span class="reset" ng-show="chara.showBonuses.perc"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
			<div><b>Performance</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span class="reset" ng-show="chara.showBonuses.perf"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>Persuasion</b> <i>(Cha)</i>: {{"{{chara.m_cha}}"}}<span class="reset" ng-show="chara.showBonuses.pers"> + {{"{{chara.profBonus}} :: {{chara.m_cha + chara.profBonus}}"}}</span></div>
			<div><b>Religion</b> <i>(Int)</i>: {{"{{chara.m_int}}"}}<span class="reset" ng-show="chara.showBonuses.reli"> + {{"{{chara.profBonus}} :: {{chara.m_int + chara.profBonus}}"}}</span></div>
			<div><b>Sleight of Hand</b> <i>(Dex)</i>: {{"{{chara.m_dex}}"}}<span class="reset" ng-show="chara.showBonuses.sloh"> + {{"{{chara.profBonus}} :: {{chara.m_dex + chara.profBonus}}"}}</span></div>
			<div><b>Stealth</b> <i>(Dex)</i>: {{"{{chara.m_dex}}"}}<span class="reset" ng-show="chara.showBonuses.stea"> + {{"{{chara.profBonus}} :: {{chara.m_dex + chara.profBonus}}"}}</span></div>
			<div><b>Survival</b> <i>(Wis)</i>: {{"{{chara.m_wis}}"}}<span class="reset" ng-show="chara.showBonuses.surv"> + {{"{{chara.profBonus}} :: {{chara.m_wis + chara.profBonus}}"}}</span></div>
		</div>
	</div>
	<div id="feat_panel" ng-click="mainCont.RevealFeatures()" class="clickable_det">
		<br />
		<span class="clickable_d_head">Features</span>
		<div ng-show="chara.showFeatures" class="clickable_d_in">
			<div ng-repeat="feat in chara.race_build.race.features">{{"{{feat.feature.name}}"}}</div>
		</div>
	</div>
	<div id="background_panel" ng-click="mainCont.RevealBackground()" class="clickable_det">
		<br />
		<span class="clickable_d_head">Background</span>
		<div ng-show="chara.showBackground" class="clickable_d_in">
			<h3>{{"{{chara.background_build.background.name}}"}}</h3>
			<div>
				<b>Feature</b> - <i>{{"{{chara.background_build.background.feature.name}}"}}</i><br />
				<span class="reset">{{"{{chara.background_build.background.feature.description}}"}}</span>
			</div>
			<!-- <div><b>Trait</b> - <span class="reset">{{"{{chara.background_build.trait.description}}"}}</span></div>
			<div><b>Ideal</b><span class="reset"> - {{"{{chara.background_build.ideal.description}}"}}</span></div>
			<div><b>Bond</b><span class="reset"> - {{"{{chara.background_build.bond.description}}"}}</span></div>
			<div><b>Flaw</b><span class="reset"> - {{"{{chara.background_build.flaw.description}}"}}</span></div> -->
		</div>
	</div><br />
	<div ng-click="mainCont.EditChar()" ng-show="mainCont.DeletableChar(chara.user.user_id)" class="back_butt button"><span class="button_text">Edit Character</span></div>
	<div ng-click="mainCont.DeleteChar()" ng-show="mainCont.DeletableChar(chara.user.user_id)" class="next_butt button"><span class="button_text">Delete Character</span></div>
</div>
