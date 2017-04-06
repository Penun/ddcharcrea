<div class="sixty_he">
	<div class="left_page_col left_page fade_in">
		<div class="left_page_col" id="campaign_col">
			<h2>Campaigns</h2>
			<img src="static/img/pencil_underline.png" class="p_underline" />
			<ul class="left_page_colr_in">
				<li ng-repeat="(ind, campaign) in campaigns">
					<span ng-click="campCont.RevealRegions(ind)" class="clickable">
						{{"{{campaign.name}}"}}
					</span>
				</li>
			</ul>
		</div>
		<div class="left_page_colr fade_nu" id="region_col" ng-style="{'right': regionColRight}">
			<h2 style="float: left;">Regions</h2>
			<img src="static/img/pencil_underline.png" class="p_underline" />
			<ul class="left_page_colr_in">
				<li ng-repeat="(r_ind, region) in curRegions">
					<span ng-click="campCont.RevealEncounters(r_ind)" class="clickable">
						{{"{{region.name}}"}}
					</span>
				</li>
			</ul>
		</div>
        <div class="left_page_colr fade_nu" id="encounter_col"> <!-- ng-show="campCont.ShowEncounters()"> -->
			<h2 style="float: left;">Encounters</h2>
			<img src="static/img/pencil_underline.png" class="p_underline" />
			<ul class="left_page_colr_in">
				<li ng-repeat="(e_ind, encounter) in curEncounters">
					<span ng-click="campCont.RevealDetails(e_ind)" class="clickable">
						{{"{{encounter.name}}"}}
					</span>
				</li>
			</ul>
		</div>
		<div class="button char_add_butt" ng-click="campCont.AddElement()"><span class="button_text">+</span></div>
	</div>
	<div class="right_page">

	</div>
</div>
