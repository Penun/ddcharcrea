<div ng-show="mainCont.CurOverScreen(1)" class="sixty_he">
	<div class="left_page_col left_page">
		<div class="left_page_col">
			<h2>Players</h2>
			<img src="static/img/pencil_underline.png" class="p_underline" />
			<ul>
				<li ng-repeat="(ind, user) in users">
					<span ng-click="mainCont.RevealCharacters(ind)" class="clickable">
						{{"{{user.UserName}}"}}
					</span>
				</li>
			</ul>
		</div>
		<div class="left_page_colr">
			<h2 style="float: left;">Characters</h2>
			<img src="static/img/pencil_underline.png" class="p_underline" />		
			<ul ng-show="mainCont.ShowChars()" class="left_page_colr_in">
				<li ng-repeat="(c_ind, char) in curChars">
					<span ng-click="mainCont.RevealDetails(c_ind)" class="clickable">
						{{"{{char.name}}"}}
					</span>
				</li>
			</ul>
		</div>
		<div class="button char_add_butt" ng-click="mainCont.AddChar()"><span class="button_text">+</span></div>
	</div>
	<div class="right_page">
		<h2>Character Details</h2>
		<img src="static/img/pencil_underline.png" class="p_underline_f" />
		{{template "main/characters.tpl"}}
	</div>
</div>