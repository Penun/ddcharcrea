<h1>Character Info</h1>
<form id="insCharDet" name="insCharDet" ng-submit="insCharDet.$valid && chInCont.SubmitBasic()" novalidate>
<p class="underline"><span class="left_label"><label for="charName">Name</label> :</span><span class="right_input"><input type="text" name="charName" id="charName" ng-model="chInCont.char.name" required/><span></p>
<p class="underline"><span class="left_label"><label for="charLevel">Level</label> :</span><span class="right_input"><input type="text" name="charLevel" id="charLevel" ng-model="chInCont.char.level" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charHP">Hit Points</label> :</span><span class="right_input"><input type="text" name="charHP" id="charHP" ng-model="chInCont.char.hit_points" maxlength="4" size="4" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charExp">Experience</label> :</span><span class="right_input"><input type="text" name="charExp" id="charExp" ng-model="chInCont.char.exp" maxlength="9" size="" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charStr">Str</label> :</span><span class="right_input"><input type="text" name="charStr" id="charStr" ng-model="chInCont.char.b_str" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charDex">Dex</label> :</span><span class="right_input"><input type="text" name="charDex" id="charDex" ng-model="chInCont.char.b_dex" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charCon">Con</label> :</span><span class="right_input"><input type="text" name="charCon" id="charCon" ng-model="chInCont.char.b_con" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charInt">Int</label> :</span><span class="right_input"><input type="text" name="charInt" id="charInt" ng-model="chInCont.char.b_int" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charWis">Wis</label> :</span><span class="right_input"><input type="text" name="charWis" id="charWis" ng-model="chInCont.char.b_wis" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charCha">Cha</label> :</span><span class="right_input"><input type="text" name="charCha" id="charCha" ng-model="chInCont.char.b_cha" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p><span class="left_label"><label for="charSex">Sex</label> :</span><span class="right_input"><select name="charSex" id="charSex" ng-model="chInCont.char.sex">
	<option value="m" selected>M</option>
	<option value="f">F</option>
</select></span>
</p>
<button type="submit" name="submit" ng-show="insCharDet.$valid" class="next_butt">Next</button>
</form>