<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once 'database/DiveSite.php';
    require_once 'utils/functions.php';
    require_once 'partials/header.php'; 
    require_once 'strings.php'; 

    $koTaoHeaderSection = new HeaderSection('Koh Samui', '', []);
    echo Utils::getStandardHeaderWithImage([$koTaoHeaderSection], 'Koh Samui.jpg', ['articleCentered'], 'linear-gradient(112.5deg, rgba(92, 177, 168, 0.7) 85%, transparent 15%)', 'islandsDropdown');


    // public static function getStandardCenteredSection($header, $text, Array $buttons, $textColour = null, $backgroundColour = null, $extraClasses = null) {
    echo Utils::getStandardCenteredSection(PLTG_HUB_GREAT_PLACES_HDR, PLTG_HUB_GREAT_PLACES_TXT, [], null, null, ['greatPlacesSection']);
    echo Utils::getStandardCenteredSection(PLTG_HUB_FULL_EXP_HDR, PLTG_HUB_FULL_EXP_TXT, [], null, null, ['fullExperienceSection']);
    echo Utils::getPlacesToGoSlider();
    Utils::getOverallSearchComponent('Search our database for your perfect dive in Thailand', 'Dive Thailand’s database will give you the chance to 
        get the low down on finding your next diving destination, with insights into visibility, depth and most enticing features.', 'White', 'White', ['islandSearch']);
    ?>



<!-- <div class="islandArticle">
    <div class="articleImage">
        <img src="img/IslandBoats.jpg">
    </div>
    <div class="articleText">
        <p>
            If you need help with information on any other resorts in and around Thailand, or want to ask usany questions
            about what you’ve read, check our constantly updating information or send us an email by clicking the
            link below. If you need help with information on any other resorts in and around Thailand, or want to ask
            usany questions about what you’ve read, check our constantly updating information or send us an email by
            clicking the link below. If you need help with information on any other resorts in and around Thailand, or
            want to ask usany questions about what you’ve read, check our constantly updating information or send us
            an email by clicking the link below. If you need help with information on any other resorts in and around
            Thailand, or want to ask usany questions about what you’ve read, check our constantly updating information
            or send us an email by clicking the link below.
        </p>

        <p>
            If you need help with information on any other resorts in and around Thailand, or want to ask usany questions
            about what you’ve read, check our constantly updating information or send us an email by clicking the
            link below. If you need help with information on any other resorts in and around Thailand, or want to ask
            usany questions about what you’ve read, check our constantly updating information or send us an email by
            clicking the link below. If you need help with information on any other resorts in and around Thailand, or
            want to ask usany questions about what you’ve read, check our constantly updating information or send us
            an email by clicking the link below. If you need help with information on any other resorts in and around
            Thailand, or want to ask usany questions about what you’ve read, check our constantly updating information
            or send us an email by clicking the link below.
        </p>
    </div>
</div> -->
    

    <?php require_once 'partials/footer.php'; 

