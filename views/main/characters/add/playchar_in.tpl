<h1>Character Info</h1>
<form id="insCharDet" name="insCharDet" novalidate>
<p class="underline"><span class="left_label"><label for="charName">Name</label> :</span><span class="right_input"><input type="text" name="charName" id="charName" ng-model="addChar.name" required/><span></p>
<p class="underline"><span class="left_label"><label for="charLevel">Level</label> :</span><span class="right_input"><input type="text" name="charLevel" id="charLevel" ng-model="addChar.level" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charHP">Hit Points</label> :</span><span class="right_input"><input type="text" name="charHP" id="charHP" ng-model="addChar.hit_points" maxlength="4" size="4" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charExp">Experience</label> :</span><span class="right_input"><input type="text" name="charExp" id="charExp" ng-model="addChar.exp" maxlength="9" size="" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charStr">Str</label> :</span><span class="right_input"><input type="text" name="charStr" id="charStr" ng-model="addChar.b_str" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charDex">Dex</label> :</span><span class="right_input"><input type="text" name="charDex" id="charDex" ng-model="addChar.b_dex" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charCon">Con</label> :</span><span class="right_input"><input type="text" name="charCon" id="charCon" ng-model="addChar.b_con" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charInt">Int</label> :</span><span class="right_input"><input type="text" name="charInt" id="charInt" ng-model="addChar.b_int" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charWis">Wis</label> :</span><span class="right_input"><input type="text" name="charWis" id="charWis" ng-model="addChar.b_wis" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p class="underline"><span class="left_label"><label for="charCha">Cha</label> :</span><span class="right_input"><input type="text" name="charCha" id="charCha" ng-model="addChar.b_cha" maxlength="2" size="2" pattern="^[0-9]+$" required/><span></p>
<p><span class="left_label"><label for="charSex">Sex</label> :</span><span class="right_input"><select name="charSex" id="charSex" ng-model="addChar.sex">
	<option value="m" selected>M</option>
	<option value="f">F</option>
</select></span>
</p>
<div ng-show="insCharDet.$valid" ng-click="chInCont.SubmitBasic()" class="next_butt button"><span class="button_text">Next</span></div>
</form>