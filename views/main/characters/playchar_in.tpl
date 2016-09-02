<div>
	<form id="insCharDet" name="insCharDet" ng-submit="insCharDet.$valid && chInCont.SubmitBasic()" novalidate>
		<p><label for="charName">Name</label> : <input type="text" name="charName" id="charName" ng-model="chInCont.char.name" required/></p>
		<p><label for="charLevel">Level</label> : <input type="text" name="charLevel" id="charLevel" ng-model="chInCont.char.level" maxlength="2" size="2" pattern="^[0-9]+$" required/></p>
		<p><label for="charHP">Hit Points</label> : <input type="text" name="charHP" id="charHP" ng-model="chInCont.char.hit_points" maxlength="4" size="4" pattern="^[0-9]+$" required/></p>
		<p><label for="charExp">Experience</label> : <input type="text" name="charExp" id="charExp" ng-model="chInCont.char.exp" maxlength="9" size="" pattern="^[0-9]+$" required/></p>
		<p><label for="charStr">Str</label> : <input type="text" name="charStr" id="charStr" ng-model="chInCont.char.b_str" maxlength="2" size="2" pattern="^[0-9]+$" required/></p>
		<p><label for="charDex">Dex</label> : <input type="text" name="charDex" id="charDex" ng-model="chInCont.char.b_dex" maxlength="2" size="2" pattern="^[0-9]+$" required/></p>
		<p><label for="charCon">Con</label> : <input type="text" name="charCon" id="charCon" ng-model="chInCont.char.b_con" maxlength="2" size="2" pattern="^[0-9]+$" required/></p>
		<p><label for="charInt">Int</label> : <input type="text" name="charInt" id="charInt" ng-model="chInCont.char.b_int" maxlength="2" size="2" pattern="^[0-9]+$" required/></p>
		<p><label for="charWis">Wis</label> : <input type="text" name="charWis" id="charWis" ng-model="chInCont.char.b_wis" maxlength="2" size="2" pattern="^[0-9]+$" required/></p>
		<p><label for="charCha">Cha</label> : <input type="text" name="charCha" id="charCha" ng-model="chInCont.char.b_cha" maxlength="2" size="2" pattern="^[0-9]+$" required/></p>
		<p><label for="charSex">Sex</label> : <select name="charSex" id="charSex" ng-model="chInCont.char.sex">
			<option value="m">M</option>
			<option value="f">F</option>
		</select>
		</p>
		<p><button type="submit" name="submit">Next</button><p>
	</form>
</div>