<?php
    require_once '../database/DiveSite.php';

    function ensureHasValue($getRequestKey) {
        if (isset($_GET[$getRequestKey])) {
         //   echo 'checking ' . $getRequestKey . ' which is ' . $_GET[$getRequestKey];

            return $_GET[$getRequestKey] == -1 ? null : $_GET[$getRequestKey];
        } else {
            return null;
        }
    }
    
    $searchTerm = ensureHasValue('searchTerm');
    $depthLower = ensureHasValue('depthLower');
    $depthUpper = ensureHasValue('depthUpper');
    $current = ensureHasValue('current'); 
    $island = ensureHasValue('island');
    $isPaid = ensureHasValue('isPaid');    
    $region = ensureHasValue('region');
    $level = ensureHasValue('level');
    $type = ensureHasValue('type');
    $diveSite = ensureHasValue('category');

    $filteredDivesites = DiveSite::getFiltered($searchTerm, $island, $diveSite, $depthLower, $depthUpper, $current, $level, $region, $isPaid, $type);

    if (count($filteredDivesites) > 0) {
        echo '
            <section class="diveSites">';

            foreach ($filteredDivesites as $diveSite) {

                $colourClass = $diveSite->getValue('isDiveSite') == 1 ? 'btn-green' : 'btn-purple';
                $buttonText = $diveSite->getValue('isDiveSite') == 1 ? 'Dive' : 'Explore';

                echo '
                    <div class="site">
                        <div class="paddingTrick"></div>
                        <img class="islandImage" src="img/divesites/thumbnails/' . $diveSite->getValue('thumbnailPath') . '">
                        <div class="darkeningOverlay"></div>'
                        . ($diveSite->getValue('isSponsored') == true ? '<div class="sponsoredOverlay"><img class="sponsoredImage" src="img/sponsored.png"></div>' : '') .                   
                        '<div class="siteTextOverlay">
                            <h1 class="largeHeader">' . $diveSite->getValue('heading') . '</h1>
                            <p class="standardSectionText">' . $diveSite->getValue('subheading') . '</p>
                            <a href="place/' . $diveSite->getValue('id') . '" class="btn ' . $colourClass . '">' . $buttonText . '</a>
                        </div>
                    </div>'
                    ;
            }
    }

