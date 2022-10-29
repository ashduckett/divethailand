<?php 

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once "database/DiveSite.php";
    require_once "utils/functions.php";
    
    
    $preview = isset($_POST['preview']) && $_POST['preview'] == true ? true : false;
    
    if(!$preview) {
        $id = $_GET['id'];
        $diveSite = DiveSite::findById($id);
        $rating = $diveSite->getValue('rating');
        $diverLevel = $diveSite->getValue('diverLevel');
        $depth = $diveSite->getValue('depth');
        $visibility = $diveSite->getValue('visibility');
        $locationText = $diveSite->getValue('locationText');
        $isDiveSite = $diveSite->getValue('isDiveSite') == 1 ? true : false;
        $imagePaths = json_decode( $diveSite->getValue('locationImagePaths'));
        $locationHeader = $diveSite->getValue('locationTextTitle');
        $ratingComment = $diveSite->getValue('ratingComment');
        $current = (int)$diveSite->getValue('current') + 1;
        $currentLevels = ['Calm', 'Weak', 'Average', 'Strong', 'Rough'];
        $depthPercentage = (intval($depth) / 60 * 100) . "%";
        $visibilityPercentage = (intval($visibility) / 60 * 100) . "%";
        $visibilityPercentage = (int)($visibility / 40 * 100) . '%';
    } else {
        $data = array(
            'heading' => $_POST['heading'],
            'subheading' => $_POST['subheading'],
            'thumbnailPath' => $_POST['thumbnail'],
            'locationImagePaths' => $_POST['locationImagePaths'],
            'locationTextTitle' => $_POST['locationTextTitle'],
            'rating' => $_POST['rating'],
            'locationText' => $_POST['locationText'],
            'diverLevel' => $_POST['diverLevel'],
            'depth' => $_POST['depth'],
            'visibility' => $_POST['visibility'],
            'current' => $_POST['current'],
            'virtualTourUrl' => $_POST['virtualTourUrl'],
            'ratingComment' => $_POST['ratingComment'],
        );

        $diveSite = new DiveSite($data);
        $diveSite->setValue('isDiveSite', $_POST['isDiveSite']);
        $rating = $diveSite->getValue('rating');
        $isDiveSite = $diveSite->getValue('isDiveSite');
        $imagePaths = json_decode( $diveSite->getValue('locationImagePaths'));
        $locationText = $diveSite->getValue('locationText');
        $diverLevel = $diveSite->getValue('diverLevel');
        $depth = $diveSite->getValue('depth');
        $visibility = $diveSite->getValue('visibility');
        $current = $diveSite->getValue('current');
        $virtualTourUrl = $diveSite->getValue('virtualTourUrl');
        $ratingComment = $diveSite->getValue('ratingComment');
        $locationHeader = $diveSite->getValue('locationTextTitle');
    }

    $lightOnPaths = [];
    $lightOffPaths = [];

    for ($index = 1; $index <= 5; $index++) {
        $lightOnPaths[] = 'img/Level ' . $index . ' On.png';
        $lightOffPaths[] = 'img/Level ' . $index . ' Off.png';
    }

    require_once 'partials/header.php';


    if ($isDiveSite === true) {
        $background = 'linear-gradient(112.5deg, rgba(16, 70, 48, 0.7) 85%, transparent 15%)';
    } else {
        $background = 'linear-gradient(112.5deg, rgba(23, 18, 62, 0.7) 85%, transparent 15%)';
    }

    if ($imagePaths && ($imagePaths[0] !== 'null' && $imagePaths[1] !== 'null' && $imagePaths[2] !== 'null' && $imagePaths[3] !== 'null' )) {
        $hasImages = true;
    } else {
        $hasImages = false;
    }

?>
    <?php if ($isDiveSite && !$hasImages) { ?>
        <div class="hasImagesHack">
    <?php } ?>

    <?php echo Utils::getStandardDivesiteHeader($diveSite, $background, $preview); ?>
    
    <?php 
        if ($isDiveSite && $hasImages) {
            Utils::getGallery($locationHeader, $locationText, $imagePaths, $preview);  
        }  
    ?>
    

        <?php if ($isDiveSite) { 
            echo '<div class="sliderStoppingPoint' . (!$hasImages ? ' standardMarginBottom' : '') . '">';
                Utils::printDiverStatisticsHTML($diverLevel, $depth, $visibility, $current);
            echo '</div>';
        ?>
    
    <?php } ?>
            
                <div class="location sliderStoppingPoint standardMarginTop">
                    <?php if (!$hasImages && $isDiveSite || !$isDiveSite) { ?>
                        <h1 class="locationTextHeader largeHeader"><?php echo $locationHeader; ?></h1>
                        <p class="standardSectionText locationText"><?php echo $locationText ?></p>
                    <?php } ?>
                    <div class="virtualTourContainer">
                        <div class="streetViewOverlay"></div>
                        <?php echo $diveSite->getValue('virtualTourUrl'); ?>
                    </div>

                    <?php if (!$isDiveSite) { ?>
                    <div class="ourRating">
                        <h1 class="largeHeader">Our Rating</h1>
                        <div class="stars">
                            <?php
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
                        <div class="ratingComment">
                            <p class="standardSectionText"><?php echo $ratingComment; ?></p>
                            <a href="#" class="getInTouch btn btn-light-red">Get In Touch</a>
                        </div>
                    </div>
                        
                </div>
                <?php 
                    if (!$isDiveSite && $hasImages) {
                        Utils::getGallery('', '', $imagePaths, $preview);  
                    } 
                ?>
            </div>
            
    <?php } ?>
    </div>
    
    

    <?php echo Utils::getIslands(); ?>


    <?php if ($isDiveSite) { ?>
    
        <section class="databaseAndExplore">
            <section class="database">
                <section>
                    <h2 class="mediumHeader checkout">Check out our other destinations</h2>
                    <p class="standardSectionText">
                        Dive Thailand is an organisation fueled by professional divers based within the
                        U.K. We’re commited in aiding divers looking at Thailand and its surrounding
                        islands as thier next diving destination. Helping divers know where to go where to
                        dive and where to stay.
                    </p>
                    <a class="btn btn-green" href="/#search">Search</a>
                </section>
            </section>
            <section class="explore">
                <section>
                    <h2 class="mediumHeader like">Like this dive site?</h2>
                    <p class="standardSectionText">
                        Dive Thailand is an organisation fueled by professional divers based within the
                        U.K. We’re commited in aiding divers looking at Thailand and its surrounding
                        islands as thier next diving destination. Helping divers know where to go where to
                        dive and where to stay.
                    </p>
                    <a class="btn btn-light-red getInTouch" href="#">Enquire</a>
                </section>
            </section>
        </section>
    <?php } ?>

<script>
    $('.smallImage .thumbnailSmall').click(function(evt) {
        evt.preventDefault();
        var thisSrc = $(this).attr('src');
        var mainImgSrc = $('.mainImage').attr('src');
        $('.mainImage').attr('src', thisSrc);
        $(this).attr('src', mainImgSrc);
    });

    
    $(document).ready(function() {

        // Ugly
        var isDiveSite = <?php echo ($isDiveSite == false ? '0' : '1'); ?>;
        var hasImages = <?php echo ($hasImages == false ? 'false' : 'true'); ?>;
        // THis will need to be initialised differently for a place to go.
        if (isDiveSite) {
            if (hasImages) {
                $('body').screenSlider(['white', 'black', 'white', 'black', 'white']);
            } else {
                $('body').screenSlider(['white', 'white', 'black', 'white']);
            }
            
        } else {
            if (hasImages) {
                $('body').screenSlider(['white', 'black', 'black', 'white']);
            } else {
                $('body').screenSlider(['white', 'black', 'white']);
            }
        }
        

        $('.streetViewOverlay').click(function(evt) {
            $(this).addClass('streetViewOverlayClicked');
        });
      
        $('.virtualTourContainer').mouseleave(function(evt) {
            $('.streetViewOverlay').removeClass('streetViewOverlayClicked');
        });
    });

    </script>

<?php require_once 'partials/footer.php' ?>