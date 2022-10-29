    <?php require_once 'partials/header.php'; ?>
    <?php require_once 'database/DiveSite.php'; ?>
    <?php require_once 'strings.php'; ?>

    <header>
        <div class="menuGradient"></div>
        <div class="doubleViewHeading heading">
            <div class="headerImages">
                <div class=" content navContainer">
                    <?php echo Utils::getNav('desktopHome'); ?>
                </div>
                <div class="hoverImageContainer leftBox">
                    <img class="headerImage" src="img/header_left.jpg">
                    <article>
                        <div class="clickThrough">
                            <h1 class="largeHeader">Dive with Us</h1>
                            <p class="standardSectionText">Let us show you the best diving spots in Thailand.</p>
                            <a class="btn btn-green" href="dive">Dive</a>
                        </div>
                    </article>
                </div>
                <div class="hoverImageContainer rightBox">
                    <img class="headerImage" src="img/places_hub - 2.jpg">
                    <article>
                        <div class="clickThrough">
                            <h1 class="largeHeader">Where to go</h1>
                            <p class="standardSectionText">Discover Thailand for the places you and your diving buddies will love.</p>
                            <a class="btn btn-purple" href="places">Explore</a>
                        </div>
                    </article>
                </div>
            </div>
        </div>

        <div class="singleViewHeading heading">
            <div class="headerImages">
                <div class="content navContainer">
                    <?php echo Utils::getNav('desktopHome'); ?>
                </div>
                <div class="hoverImageContainer ignoreHover leftBox" style="width:100%;">
                    <img class="headerImage" src="img/single_header.jpg">
                    <div class="stackedHeaderImages">
                        <article class="homepageTopArticle">
                            <div class="clickThrough">
                                <h1 class="largeHeader">Dive with Us</h1>
                                <p class="standardSectionText">Let us show you the best diving spots in Thailand.</p>
                                <a class="btn btn-green" href="dive">Dive</a>
                            </div>
                        </article>
                        <article class="homepageBottomArticle">
                            <div class="clickThrough">
                                <h1 class="largeHeader">Where to go</h1>
                                <p class="standardSectionText">Discover Thailand for the places you and your diving buddies will love.</p>
                                <a class="btn btn-purple" href="places">Explore</a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    <?php
        // public static function getStandardCenteredSection($header, $text, Array $buttons, $textColour = null, $backgroundColour = null, $extraClasses = null) {

        // YOu want @include('standardCenteredSection', ['header' => 'myHeader'])
        
        echo Utils::getStandardCenteredSection(HOME_BEST_SPOTS_HDR, HOME_BEST_SPOTS_TXT, [], null, null, ['bestDiveSpotsStrip']);
    ?>

    <div class="locationsMapContainer">
        <div class="locationsMapInlineContainer">
            <img id="locationsMap" src="img/map.png">
            <img class="mapDot" src="img/Level 1 On.png">
            <img class="mapDot" src="img/Level 1 On.png">
            <img class="mapDot" src="img/Level 1 On.png">
            <img class="mapDot" src="img/Level 1 On.png">
            <img class="mapDot" src="img/Level 1 On.png">
        </div>
    </div>

    <?php
        // Now get search and learn more buttons
        $searchBtn = new Button('Search', 'purple', '#', ['searchAnchor']);
        $learnMoreBtn = new Button('Learn More', 'green', 'about');
        echo Utils::getStandardCenteredSection(HOME_GREAT_LOCATIONS_HDR, HOME_GREAT_LOCATIONS_TXT, [$searchBtn, $learnMoreBtn], 'White', 'DarkBlue', ['greatLocations']);
    
    
    ?>

    <?php Utils::getOverallSearchComponent('Search our database for your perfect dive in Thailand', 'Dive Thailand’s database will give you the chance to 
        get the low down on finding your next diving destination, with insights into visibility, depth and most enticing features.', 'White', 'White'); ?>
    <?php require_once 'partials/footer.php'; ?>

<script>
    $.get('/divethailand/utils/getFilteredPlaces.php', {
    }).done(function(data) {
        var container = $('#divesitesAndPlaces');
        container.html(data);
        setupContactFormButtons();
        setupHoverEffect();
        setupSiteClickThrough();
    });

    // Keep track of the last dot that animated
    var oldDotIndex = null;
    var randomIndex = null;
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

    // Set the dots off
    setInterval(function() {
        var dots = document.querySelectorAll('.mapDot');

        do {
            randomIndex = randomIntFromInterval(0, 4);
        } while (oldDotIndex == randomIndex);

        oldDotIndex = randomIndex;

        for (var i = 0; i < dots.length; i++) {
                dots[i].classList.remove('grow');
        }

        dots[randomIndex].classList.add('grow');
    }, 1500);


  


     
    
    
</script>