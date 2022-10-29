<?php 
    require_once 'utils/functions.php';
    require_once 'partials/header.php';
    require_once 'strings.php';

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $rating = 3;
    $diverLevel = 2;
    $depth = 17;
    $visibility = 22;
    $current = 4;
    $currentLevels = ['Weak', 'Normal', 'Average', 'Strong', 'Extra Strong'];
    $depthPercentage = (intval($depth) / 60 * 100) . "%";
    $visibilityPercentage = (intval($visibility) / 60 * 100) . "%";
    $visibilityPercentage = (int)($visibility / 40 * 100) . '%';
    $lightOnPaths = [];
    $lightOffPaths = [];

    for ($index = 1; $index <= 5; $index++) {
        $lightOnPaths[] = 'img/Level ' . $index . ' On.png';
        $lightOffPaths[] = 'img/Level ' . $index . ' Off.png';
    }

    $button = new Button('Search', 'green', '/#search');

    $diveHubHeaderSection = new HeaderSection('Dive Thailand', 'We\'ll share with you the best dive spots in Thailand.', [$button]);
    
    echo Utils::getStandardHeaderWithImage([$diveHubHeaderSection], 'dive_hub_header.jpg', ['articleCentered'], 'linear-gradient(112.5deg, rgba(16, 70, 48, 0.7) 85%, transparent 15%)');


    echo Utils::getStandardCenteredSection('Why Dive Thailand?', 'Why Dive Thailand? Because no one loves Thailand more than us. With such a diverse culture, how could we not? Our divers
    have the eperience and knowledge that you need to have an amazing time!', [], null, null, ['whyDiveThailandText']);


    
    echo Utils::getStandardCenteredSection('Fully Qualified', 'Run by fully qualified professionals, Dive Thailand uses dedicated professionals so you have the best dive eperience possible. Beginner
    to Advanced, we have everything you need, no matter your level. With the different dive sites available, we will find the right place for you.', [], null, null, ['fullyQualifiedText']);

    Utils::printDiverStatisticsHTML(2, 30, 30, 4, true);

    // public static function getStandardCenteredSection($header, $text, Array $buttons, $textColour = null, $backgroundColour = null, $extraClasses = null) {
    echo Utils::getStandardCenteredSection('Professional Diver Star Ratings', 'We classify our dive sites with a 5 star rating and all of our sites are rated by our professional divers. We take into account how good the dive site is for that level so you will always enjoy what you pick. None of our sites go under a rating of 3.5 stars, so we can guarantee that you will love the site!', [], null, null, ['headerWithStars']);

?>
    <div class="stars">
        <?php
            $rating = 4;
            for ($index = 0; $index < 5; $index++) {
                if ($index < $rating) {
                    if ($rating - $index < 1) {
                        echo '<img class="star" style="width: 28px;" src="img/' . 'halfStar.png' . '">';    
                    } else {
                        echo '<img class="star" style="width: 28px;" src="img/' . 'fullStar.png' . '">';
                    }
                } else {
                    echo '<img class="star" style="width: 28px;" src="img/' . 'emptyStar.png' . '">';
                }
            }
        ?>
    </div>


<!-- //public static function getOverallSearchComponent($title, $prompt, $headerColor = null, $textColor = null, $additionalClasses = null) { -->
    <?php 
       Utils::getOverallSearchComponent('Search our database for your perfect dive in Thailand', 'We have created the perfect database so that you can search for the dive site that suits you. Search through the 
       different levels, currents, islands and more. We are always adding dive sites to the database so don’t worry if you do not see one on there!', 'White', 'White', ['diveHubSearch']);
    ?>



<style>
    .statCol1 {
        display: flex;
        flex-direction: column;
        width: 35%;
        margin-left: 4em;
        margin-right: 4em;
    }

    .diverStatsHeader {
        padding: 4.5em;
    }

    .lightLevel {
        display: inline-block;
        font-family: Quicksand;
        text-transform: uppercase;
        font-size: 0.7em;
        width: 20%;
        white-space: nowrap;
    }

    .lightLevelLight {
        text-align: center;
        margin-top: 1em;
     
    }

    .lightLevels {
        display: flex;
        justify-content: space-around;
        /* width: 80%; */
        margin: auto;
    }

    .lightLabel {
        text-align: center;
    }

    .statHeader {
        padding: 0;
        margin: 0;
        
        text-align: center;
    }

    .headerRow1 {
        display: flex;
        flex-wrap: wrap;
        color: white;
        background-color: rgba(23, 18, 62, 1); /* dark blue */
        justify-content: center;
        padding-bottom: 4.5em;
    }

    .lightLevelContainer, .depthMeter, .visibilityMeter {
        height: 4em;
    }

    img.meter.lightenedMeter {
        display: block;
        margin-top: -13px;
    }

    .statisticDescription {
        text-align: center;
        margin-top: 1em;
    }

    .statHeader {
        margin-top: 1.8em !important;
        margin-bottom: 1.8em !important;
    }
</style>

<script>
$.get('/divethailand/utils/getFilteredPlaces.php', { 
    }).done(function(data) {
        var container = $('#divesitesAndPlaces');
        container.html(data);
        setupContactFormButtons();
        setupHoverEffect();
        setupSiteClickThrough();
    });

    $('#searchButton').click(function(evt) {
        evt.preventDefault();

        var searchTerm = $.trim($('#searchTerm').val());
        searchTerm = searchTerm == '' ? null : searchTerm;
        
        var island = $('#islandsDropdown').find(":selected").text();
        island = island == 'Islands' ? null : island;

        var category = $('#categoryDropdown').find(":selected").text();
        category = category == 'Categories' ? null : category;
        
        var depthUpper = null;
        var depthLower = null;
        var depthIndex = $('#depthDropdown').find(":selected").index();
        
        switch(depthIndex) {
            case 1:
                depthLower = 0;
                depthUpper = 15;
                break;
            case 2:
                depthLower = 16;
                depthUpper = 30;
                break;
            case 3:
                depthLower = 31;
                depthUpper = 45;
                break;
            case 4:
                depthLower = 46;
                depthUpper = 60;
                break;
            default:
                depthLower = null;
                depthUpper = null;
                break;

        }

        var current = $('#currentDropdown').find(":selected").index();
        current = current == 0 ? null : current;

        var level = $('#levelDropdown').find(":selected").text();
        level = level == 'Level' ? null : level;


        $.get('/divethailand/utils/getFilteredPlaces.php', { 
            searchTerm: searchTerm, 
            island: island,
            category: category,
            depthLower: depthLower,
            depthUpper: depthUpper,
            current: current,
            level: level
        }).done(function(data) {
            var container = $('#divesitesAndPlaces');
            container.html(data);
            setupContactFormButtons();
            setupHoverEffect();
            setupSiteClickThrough();
        });
    });



    </script>





    <?php require_once 'partials/footer.php'; ?>