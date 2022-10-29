<?php require_once 'utils/functions.php'; ?>
<?php require_once 'partials/header.php'; ?>
<?php require_once 'strings.php'; ?>
<?php  
    $button = new Button('Dive', 'green', 'dive');
    $aboutHeaderSection = new HeaderSection(ABOUT_HEAD_HDR, ABOUT_HEAD_TXT, [$button]);

    // public static function getStandardHeaderWithImage($sections, $imgUrl, $additionalClasses = null, $overlayBackgroundColor = null) {
    echo Utils::getStandardHeaderWithImage([$aboutHeaderSection], 'about_header.jpg', ['articleCentered'], 'linear-gradient(112.5deg, rgba(92, 177, 168, 0.7) 85%, transparent 15%)', 'desktopAbout');
    $learnMoreBtn = new Button('Learn More', 'green', 'islands');
    echo Utils::getStandardCenteredSection(ABOUT_WHO_HDR, ABOUT_WHO_TXT, [$learnMoreBtn], null, null, ['whoAreWeStrip']);
?>

<section class="video">
    <div class="videoContainer">
        <video poster="img/video_poster.png" width="640" height="360" controls>
            <source src="about.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="videoOverlay">
            <div class="videoArrow"><img class="videoImage" src="img/videoBlur.png"></div>
        </div>
    </div>
    
</section>
<?php

?>


<section class="databaseAndExplore">
    <section class="database">
        <section>
            <h2 class="mediumHeader">Search our unique database</h2>
            <p class="standardSectionText">
                Dive Thailand have three core diving island locations that we know and love - each with their own unique qualities. Our
                islands are <a class="sectionLink" href="kohchang">KOH CHANG</a>, <a class="sectionLink" href="kohtao">KOH TAO</a> and <a class="sectionLink" href="kohsamui">KOH SAMUI</a>.
            </p>
            <a class="btn btn-purple" href="/#search">Search</a><a class="btn btn-green learnMoreBtn" href="islands">Learn More</a>
        </section>
    </section>


    <section class="explore">
        <section>
            <h2 class="mediumHeader">Exploring Thailand</h2>
            <p class="standardSectionText">
                We love Thailand, but not just for its beautiful dive spots. We want you to enjoy your dive holiday to its full
                potential, so why not check out what else there is to do?
            </p>
            <a class="btn btn-green" href="/#search">Learn More</a>
        </section>
    </section>
</section>

<?php echo Utils::getIslands(); ?>

<!-- <section class="locations subscribeArea darkBlue"> -->
    <!-- <h2 class="mediumHeader">Subscribe for new locations and diving news</h2>
    <p class="standardSectionText">
        If you want to find out about our new locations, or any news on the diving scene around Thailand, then
        you should subscribe! We post deals and interesting content we’re sure you’d love!
    </p> -->

    <!-- getStandardCenteredSection($header, $text, Array $buttons, $textColour = null, $backgroundColour = null, $extraClasses = null) { -->
    <?php /*echo Utils::getStandardCenteredSection('Subscribe for new locations and diving news', 
                                'If you want to find out about our new locations, or any news on the diving scene around Thailand, then
        you should subscribe! We post deals and interesting content we’re sure you’d love!', [], null, null, ['killPadding']); */?>

    <!-- <div class="subscribeControlsContainer"> 
        <input type="text" placeholder="Email"><a class="btn btn-light-green subscribe killMarginTop" href="#">Subscribe</a>
    </div>
</section> -->


<?php
    $emailBtn = new Button('Email', 'purple', '#', ['getInTouch']);
    echo Utils::getStandardCenteredSection(ABOUT_EMAIL_HDR, ABOUT_EMAIL_TXT, [$emailBtn], null, null, ['emailStandard']);
    require_once 'partials/footer.php'; 
?>


<script>
    $('video').on('play', function() {
        $('.videoOverlay').hide();
    });

    $('video').on('pause', function() {
        $('.videoOverlay').show();
    });

    $('video').on('click', function() {
        this.paused ? this.play() : this.pause();
    });

</script>