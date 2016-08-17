<div ng-repeat="char in playchars">
	<div class="d_list">
		<div ng-click="charCont.RevealDetails(char.ch_id)">
			<div class="d_list_i"><b><i>{{"{{char.name}}"}}</i></b></div><div class="d_list_i"><b>{{"{{char.refClass}}"}}</b></div><div class="d_list_i"><b>{{"{{char.raceRef}}"}}</b></div><div class="d_list_i"><b>Lvl {{"{{char.level}}"}}</b></div><br />
		</div>
		<div ng-show="char.showDetails">
			<div class="d_list_i"><b>HP {{"{{char.hit_points}}"}}</b></div><div class="d_list_i"><b>Exp {{"{{char.exp}}"}}</b></div><div class="d_list_i"><b>Sex {{"{{char.sex}}"}}</b></div><br />
			<div class="d_list_i"><b>Str {{"{{char.b_str}}"}}</b></div><div class="d_list_i"><b>Dex {{"{{char.b_dex}}"}}</b></div><div class="d_list_i"><b>Con {{"{{char.b_con}}"}}</b></div><br />
			<div class="d_list_i"><b>Int {{"{{char.b_int}}"}}</b></div><div class="d_list_i"><b>Wis {{"{{char.b_wis}}"}}</b></div><div class="d_list_i"><b>Cha {{"{{char.b_cha}}"}}</b></div><br />
		</div>
	</div>
</div>