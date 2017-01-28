<div class="left_page_col">
	<div class="left_page_col">
		<h2>Players</h2>
		<hr>
		<ul>
			<li ng-repeat="(ind, user) in users">
				<span ng-click="mainCont.RevealCharacters(ind)"><h3>{{"{{user.UserName}}"}}</h3></span>
				<!-- <div>
					<button ng-show="user.isCur" ng-click="mainCont.AddChar()">--><!--</button>
					
				</div> -->
			</li>
		</ul>
		<div ng-show="mainCont.CurOverScreen(2)">
			{{template "main/characters/add.tpl"}}
		</div>
	</div>
	<div class="right_page_col">
		<h2>Characters</h2>
		<hr>
		<ul ng-show="mainCont.ShowChars()">
			<li ng-repeat="(c_ind, char) in curChars">
				<span ng-click="mainCont.RevealDetails(c_ind)">
					<span>
						<h3><b><i>{{"{{char.name}}"}}</b></i></h3>
						<b>Lvl: {{"{{char.level}}"}}</b>
					</span>
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