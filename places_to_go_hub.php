<?php
    require_once 'utils/functions.php';
    require_once 'partials/header.php'; 
    require_once 'database/DiveSite.php';
    require_once 'strings.php'; 

    echo Utils::getStandardHeaderWithImage([new HeaderSection(PLTG_HUB_HEAD_HDR, PLTG_HUB_HEAD_TXT, [new Button('Search', 'green', '/#search')])], 'places_hub.jpg', ['articleCentered'], 'linear-gradient(112.5deg, rgba(23, 18, 62, 0.7) 85%, transparent 15%)');
    echo Utils::getStandardCenteredSection(PLTG_HUB_GREAT_PLACES_HDR, PLTG_HUB_GREAT_PLACES_TXT, [], null, null, ['greatPlacesSection']);
    echo Utils::getStandardCenteredSection(PLTG_HUB_FULL_EXP_HDR, PLTG_HUB_FULL_EXP_TXT, [], null, null, ['fullExperienceSection']);
    echo Utils::getPlacesToGoSlider();
    echo Utils::getIslands();
    // echo Utils::getStandardCenteredSection(PLTG_HUB_CONTACT_HDR, PLTG_HUB_CONTACT_TXT, [new Button('Get in touch', 'red', '#')]);
    // echo Utils::getOverallSearchComponent('Search our database for things to do in Thailand', 'Dive Thailand is an organisation fuelled by professional divers based within the U.K. We’re committed in aiding divers
    // looking at Thailand and its surrounding islands as their next diving destination. Helping divers know where to go where to dive and where to stay.', 'White', 'White');
    require_once 'partials/footer.php';
?>

    
    <script>

       


$.get('/utils/getFilteredPlaces.php', { 

}).done(function(data) {
    var container = $('#divesitesAndPlaces');
    container.html(data);
    setupContactFormButtons();
    setupHoverEffect();

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


$.get('/utils/getFilteredPlaces.php', { 
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
});


});



</script>
