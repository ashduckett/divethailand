<?php 
    require_once 'database/DiveSite.php';
    require_once 'utils/functions.php';
    require_once 'partials/header.php'; 

    $islandHubHeaderSection = new HeaderSection('The Islands', '', []);
    
    echo Utils::getStandardHeaderWithImage([$islandHubHeaderSection], 'Islands Hub.jpg', ['articleCentered'], 'linear-gradient(112.5deg, rgba(92, 177, 168, 0.7) 85%, transparent 15%)', 'islandsDropdown');
    echo Utils::getIslands();
    echo Utils::getPlacesToGoSlider();
    
    require_once 'partials/footer.php';
?>