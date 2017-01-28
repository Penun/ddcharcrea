<div ng-show="mainCont.CurOverScreen(1)" class="sixty_he">
	<div class="left_page_col">
		<div class="left_page_col">
			<h2>Players</h2>
			<hr>
			<ul>
				<li ng-repeat="(ind, user) in users">
					<span ng-click="mainCont.RevealCharacters(ind)"><h3>{{"{{user.UserName}}"}}</h3><hr></span>
				</li>
			</ul>
		</div>
		<div class="right_page_col">
			<h2 style="float: left;">Characters</h2>
			<button class="char_add_butt" ng-click="mainCont.AddChar()">+</button>
			<hr>
			<ul ng-show="mainCont.ShowChars()">
				<li ng-repeat="(c_ind, char) in curChars">
					<span ng-click="mainCont.RevealDetails(c_ind)">
						<span>
							<h3><b><i>{{"{{char.name}}"}}</b></i></h3>
							<b>Lvl: {{"{{char.level}}"}}</b>
						</span>
					<hr>
					</span>
				</li>
			<ul>
		</div>
	</div>
	<div class="right_page_col">
		<h2>Character Details</h2>
		<hr>
		{{template "main/characters.tpl"}}
	</div>
</div>