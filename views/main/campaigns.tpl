<div class="sixty_he">
	<div class="left_page_col left_page">
		<div class="left_page_col" id="campaign_col" ng-show="campCont.ShowCampaigns()">
			<h2>Campaigns</h2>
			<img src="static/img/pencil_underline.png" class="p_underline" />
			<ul>
				<li ng-repeat="(ind, campaign) in campaigns">
					<span ng-click="campCont.RevealRegions(ind)" class="clickable">
						{{"{{campaign.name}}"}}
					</span>
				</li>
			</ul>
		</div>
		<div class="left_page_colr" id="region_col">
			<h2 style="float: left;">Regions</h2>
			<img src="static/img/pencil_underline.png" class="p_underline" />
			<ul ng-show="campCont.ShowRegions()" class="left_page_colr_in">
				<li ng-repeat="(r_ind, region) in curRegions">
					<span ng-click="campCont.RevealEncounters(r_ind)" class="clickable">
						{{"{{region.name}}"}}
					</span>
				</li>
			</ul>
		</div>
        <div class="left_page_colr" ng-show="campCont.ShowEncounters()" id="encounter_col">
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
