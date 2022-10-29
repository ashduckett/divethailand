<?php
    class Button {
        private $text;
        private $colour;
        private $link;

        function __construct($text, $colour, $link, $additionalClasses = null) {
            $this->text = $text;
            $this->colour = $colour;
            $this->link = $link;
            $this->additionalClasses = $additionalClasses;
        }

        function getHTML() {
            $classes = 'btn';

            switch($this->colour) {
                case 'green':
                    $classes .= ' btn-green';
                    break;
                case 'lightGreen':
                    $classes .= ' btn-light-green';
                    break;
                case 'purple':
                    $classes .= ' btn-purple';
                    break;
                case 'red':
                    $classes .= ' btn-light-red';
                    break;
            }

            if ($this->additionalClasses != null) {
                foreach ($this->additionalClasses as $additionalClass) {
                    $classes .= ' ' . $additionalClass;
                }
            }

            $html = '<a href="' . $this->link . '" class="' . $classes . '">' . $this->text . '</a>';
            return $html;
        }
    }

    class HeaderSection {
        private $header;
        private $subHeader;
        private $buttons;

        function __construct($header, $subHeader, Array $buttons) {
            $this->header = $header;
            $this->subHeader = $subHeader;
            $this->buttons = $buttons;
        }

        function getButtonsHTML() {
            $buttonsHTML = '';
            foreach($this->buttons as $button) {
                $buttonsHTML .= $button->getHTML();
            }
            return $buttonsHTML;
        }


        function getOutput() {
            $output = '
                <article>
                    <div class="clickThrough">
                        <h1 class="largeHeader">' . $this->header . '</h1>
                        <p class="standardSectionText">' . $this->subHeader . '</p>' . $this->getButtonsHTML() . '
                    </div>
                </article>
            ';

            return $output;
        }
    }
    
    class Utils {

        public static function generateNewString() {
            $token = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $token = str_shuffle($token);
            $token = substr($token, 0, 10);

            return $token;
        }

        public static function redirectToLoginPage() {
            header('Location: login.php');
            exit();
        }


        public static function getOverallSearchComponent($title, $prompt, $headerColor = null, $textColor = null, $additionalClasses = []) {
            $headerColor = $headerColor == null ? '' : 'textColor' . $headerColor;
            $textColor = $textColor == null ? '' : 'textColor' . $textColor;
            
            $extraClasses = '';

            foreach($additionalClasses as $additionalClass) {
                $extraClasses .= ' ' . $additionalClass;
            }


            $output = '
                <section id="search" class="searchPrompt ' . $extraClasses .  '">
                    <h2 class="mediumHeader ' . $headerColor . '">' . $title . '</h2>
                    <p class="standardSectionText ' . $textColor . '">' . $prompt . '</p>
                </section>
                <section class="searchControls">
                    <form class="searchForm">
                        <div class="controlsContainer">
                            <div class="tabletPair">
                                <input id="searchTerm" placeholder="Search" type="text">
                                <select id="categoryDropdown" class="styledDropdown">
                                    <option value="-1">Categories</option>
                                    <option value="1">Dive Sites</option>
                                    <option value="0">Places to go</option>
                                </select>
                            </div>
                            <div class="tabletPair">
                                <select id="islandsDropdown" class="styledDropdown">
                                    <option value="-1">Islands</option>
                                    <option value="koh tao">Koh Tao</option>
                                    <option value="koh samui">Koh Samui</option>
                                    <option value="koh chang">Koh Chang</option>
                                </select>
                                <select id="depthDropdown" class="styledDropdown">
                                    <option value="-1">Depth</option>
                                    <option value="1">0 - 15m</option>
                                    <option value="2">16 - 30m</option>
                                    <option value="3">31 - 45m</option>
                                    <option value="4">46 - 60m</option>
                                </select>
                            </div>
                            <div class="tabletPair">
                                <select id="currentDropdown" class="styledDropdown">
                                    <option value="-1">Current</option>
                                    <option value="1">Weak</option>
                                    <option value="2">Normal</option>
                                    <option value="3">Average</option>
                                    <option value="4">Strong</option>
                                    <option value="5">Extra Strong</option>
                                </select>                 
                                <select id="levelDropdown" class="styledDropdown" autocomplete="foo">
                                    <option value="-1">Level</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="tabletPair">
                     
                                    <a href="#" id="searchButton" class="btn btn-light-green">Explore</a>
                     
                            </div>
                        </div>
                    </form>
                </section>
                <div id="divesitesAndPlaces"></div>';
                echo $output;
        }




        public static function getStandardCenteredSection($header, $text, Array $buttons, $textColour = null, $backgroundColour = null, $extraClasses = null) {
            $output = '';

            $buttonsHTML = '';
            foreach($buttons as $button) {
                $buttonsHTML .= $button->getHTML();
            }


            $additionalClasses = '';

            if ($extraClasses != null) {
                foreach($extraClasses as $extraClass) {
                    $additionalClasses .= ' ' . $extraClass;
                }
            }

            $additionalClasses .= $textColour == null ? '' : ' textColor' . $textColour;
            $additionalClasses .= $backgroundColour == null ? '' : ' backgroundColor' . $backgroundColour;

            $output .= '
                <section class="standardCenteredSection' . $additionalClasses .'">        
                    <h2 class="mediumHeader">' . $header . '</h2>
                    <p class="standardSectionText">' . $text . '</p>        
                    <div class="buttonContainer">' . $buttonsHTML . '</div>
                </section>';
            return $output;
        }
        
        public static function getNav($activeMenuItemId = null) {
        
            $isHomeActive = false;
            $isAboutActive = false;
            $isIslandsDropdownActive = false;

            if ($activeMenuItemId == 'desktopHome') {
                $isHomeActive = true;
            } else if ($activeMenuItemId == 'desktopAbout') {
                $isAboutActive = true;
            } else if ($activeMenuItemId == 'islandsDropdown') {
                $isIslandsDropdownActive = true;
            }
        
            return '
                <nav class="mainNav">
                <div class="menuGradient nonHomePageMenuGradient"></div>
                    <div class="branding">
                        <a href="/"><img src="img/logo.png" class="logo"></a>
                    </div>
                    <ul class="menu">
                        <li><a id="desktopHome" href="/" class="' . ($isHomeActive == true ? 'active' : '') . '">Home</a></li>
                        <li><a id="desktopAbout"href="about" class="' . ($isAboutActive == true ? 'active' : '') . '">About</a></li>
                        <li class="islandsDropdownParent"><a id="islandsDropdown"  class="' . ($isIslandsDropdownActive == true ? ' active ' : '') . '" href="islands">Islands<span id="menuCarat"><i class="fas fa-angle-down"></i></span></a>
                            <ul>
                                <li><a href="kohtao">Koh Tao</a></li>
                                <li><a href="kohsamui">Koh Samui</a></li>
                                <li><a href="kohchang">Koh Chang</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="hamburger">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </div>
                    <div class="mobileNavContainer">
                        <ul class="mobile-menu centered">
                            <li><a href="/" class="homeMobileLink">Home</a></li>
                            <li><a href="about" class="aboutMobileLink">About</a></li>
                            <li><a id="mobileIslandsLink" href="#">Islands</a>
                                <ul class="mobile-menu-submenu">
                                    <li class="mobile-submenu-item"><a href="kohtao">Koh Tao</a></li>
                                    <li class="mobile-submenu-item"><a href="kohsamui">Koh Samui</a></li>
                                    <li class="mobile-submenu-item"><a href="kohchang">Koh Chang</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            
            ';
        }

        public static function getStars($rating) {
            $output = '<div class="stars">';
            for ($index = 0; $index < 5; $index++) {
                if ($index < $rating) {
                    if ($rating - $index < 1) {
                        $output .= '<img class="star" style="width: 28px;" src="img/' . 'halfStar.png' . '">';    
                    } else {
                        $output .= '<img class="star" style="width: 28px;" src="img/' . 'fullStar.png' . '">';
                    }
                } else {
                    $output .= '<img class="star" style="width: 28px;" src="img/' . 'emptyStar.png' . '">';
                }
            }
            $output .= '</div>';
            return $output;
        }

        public static function getStandardHeaderWithImage($sections, $imgUrl, $additionalClasses = null, $overlayBackgroundColor = null, $activeMenuItemId = null) {
            $sectionsHTML = '';

            foreach($sections as $section) {
                $sectionsHTML .= $section->getOutput();
            }
            
            $classes = '';

            if ($additionalClasses) {
                foreach ($additionalClasses as $additionalClass) {
                    $classes .= ' ' . $additionalClass;
                }
            }

            $overlayBackgroundColor = $overlayBackgroundColor !== null ? 'style="background:' . $overlayBackgroundColor . '"' : '';

            $output = '';
            $output .= '
                <div class="standardHeaderContainer' . $classes . '">
                    <div ' . $overlayBackgroundColor . 'class="standardHeaderOverlay"></div>
                    <header>
                        <div class="heading sliderStoppingPoint">
                            <div class="imagePlaceholder">
                                <img src="img/' . $imgUrl . '">
                            </div>
                            <div class="pageHeadingContent content">' . 
                                Utils::getNav($activeMenuItemId) . '
                                <div class="articles">' .
                                    $sectionsHTML . '
                                </div>
                            </div>
                    </header>
                </div>';


                
            return $output;
        }


        public static function getStandardDivesiteHeader($diveSite, $overlayBackground = null, $isPreview = false) {

            $rating = $diveSite->getValue('rating');
            $isDiveSite = $diveSite->getValue('isDiveSite') == 1 ? true : false;
            
            $overlayBackground = $overlayBackground == null ? '' : 'style="background:' . $overlayBackground . '"';

            $output = '';
            $output .= '
                <header>
                    <div ' . $overlayBackground . 'class="standardHeaderOverlay"></div>
                    <div class="heading sliderStoppingPoint articleCentered" style="margin-bottom: 3em;">
                        
                        <div class="imagePlaceholder">
                            <img src="./' . ($isPreview ? $diveSite->getValue('thumbnailPath') : 'img/divesites/thumbnails/' . $diveSite->getValue('thumbnailPath')) . '">
                        </div>
                        <div class="diveSiteHeading content">' . 
                            Utils::getNav() . '
                            <div class="articles">
                                <article>
                                    <div class="clickThrough">
                                        <h1 class="largeHeader">' . $diveSite->getValue('heading') . '</h1>
                                        <p class="standardSectionText">' . $diveSite->getValue('subheading') . '</p>
                                    </div>';
                                    if ($isDiveSite) {
                                        
                                        $output .= '<div class="stars">';
                                        for ($index = 0; $index < 5; $index++) {
                                            
                                            if ($index < $rating) {
                                                if ($rating - $index < 1) {
                                                    $output .= '<img class="star" style="width: 28px;" src="img/' . 'halfStar.png' . '">';
                                                } else {
                                                    $output .= '<img class="star" style="width: 28px;" src="img/' . 'fullStar.png' . '">';
                                                }
                                            } else {
                                                $output .= '<img class="star" style="width: 28px;" src="img/' . 'emptyStar.png' . '">';
                                            }
                                        }
                                        $output .= '</div>';
                                    }
                                    $output .= '<a class="btn btn-light-red getInTouch" href="#">Get in touch</a>';
                                $output .= '</article>';
                    $output .= '</div>';
            $output .= '</header>';
            return $output;
        }


        public static function getPlacesToGoSlider() {
            // Gonna need the dive sites to do this
            $allPlacesToGo = DiveSite::getFiltered(null, null, false, null, null, null, null, null, null, null);
            
            // Put them all in a div that's 100% width and n ems down
            // Object-cover



            $output = '';

            $output = '
                <div class="slickSlider">';
                    foreach($allPlacesToGo as $place) {
                        
                        $brokenDownLocationText = strlen($place->getValue('locationText')) > 100 ? substr($place->getValue('locationText'), 0, 100) . '...' : $place->getValue('locationText');

                        $newPlace = '';
                        $newPlace .= '
                            <div class="slideContainer">
                                

                                <div class="imageContainer">
                                    <img src="img/divesites/thumbnails/' . $place->getValue('thumbnailPath') . '">
                                    <div class="imageTextOverlay">' . Utils::getStandardCenteredSection($place->getValue('locationTextTitle'), $place->getValue('locationText'), [], 'White') . '</div>
                                    <div class="leftArrow">
                                        <img src="img/arrow_left.png">
                                    </div>
                                    <div class="rightArrow">
                                        <img src="img/arrow_right.png">
                                    </div>
                                </div>

                                <div class="slideDetails">
                                    <h1 class="largeHeader">' . $place->getValue('heading') . '</h1>' . Utils::getStars($place->getValue('rating')) . '
                                    <div>
                                        <a href="place/' . $place->getValue('id') . '" class="btn btn-green">View</a>
                                        <a href="#" class="getInTouch btn btn-light-red">Get in touch</a>
                                    </div>
                                </div>
                                <div class="slideContainerOverlay">' . Utils::getStandardCenteredSection($place->getValue('locationTextTitle'), $brokenDownLocationText, [], 'White') . '
                                </div>
                            
                            
                            
                            </div>        
                                ';
                    $output .= $newPlace;
                    }
                $output .= '</div>';


            

            return $output;
        }



        public static function getIslands() {
            $output = '';
            
            $output = '
                <section class="diveSites sliderStoppingPoint islands">
                    <div class="site">
                        <div class="paddingTrick"></div>
                        <img class="islandImage" src="img/Koh Tao.jpg">
                        <div class="darkeningOverlay"></div>
                        <div class="siteTextOverlay">
                            <h1 class="largeHeader">Koh Tao</h1>
                            <p class="standardSectionText">"Turtle island" with white sandy beaches and steep hills...</p>
                            <a href="kohtao" class="btn btn-purple">View</a>
                        </div>
                    </div>
                    <div class="site">
                        <div class="paddingTrick"></div>
                        <img class="islandImage" src="img/Koh Samui.jpg">
                        <div class="darkeningOverlay"></div>
                        <div class="siteTextOverlay">
                            <h1 class="largeHeader">Koh Samui</h1>
                            <p class="standardSectionText">Think coconut gorves, plush rainforests and palm fringed beaches</p>
                            <a href="kohsamui" class="btn btn-purple">View</a>
                        </div>
                    </div>
                    <div class="site">
                        <div class="paddingTrick"></div>
                        <img class="islandImage" src="img/Koh Chang.jpg">
                        <div class="darkeningOverlay"></div>
                        <div class="siteTextOverlay">
                            <h1 class="largeHeader">Koh Chang</h1>
                            <p class="standardSectionText">Jungle hiking, relaxing sandy beaches and a haven for wildlife</p>
                            <a href="kohchang" class="btn btn-purple">View</a>
                        </div>
                    </div>
                    <div class="site comingSoon">
                        <div class="paddingTrick"></div>
                        <img class="islandImage" src="img/comingsoondive.jpg">
                        <div class="siteTextOverlay">
                        <h1 class="largeHeader">Coming Soon</h1>
                        <p class="standardSectionText">Want us to add a location? Why not get in touch to add your perfect dive site or location?</p>
                        <a id="getInTouch" href="#" class="btn btn-light-red hams getInTouch">Get in touch</a>
                    </div>
                </div>
            </section>';
                return $output;
        }

        function sortFunction($diveSiteA, $diveSiteB) {
            return $diveSiteA->presentationOrder - $diveSiteB->presentationOrder;
        }


        public static function getSite($diveSite) {
            $output = '';

            echo '
            <div class="site">
                <div class="paddingTrick"></div>
                <img class="islandImage" src="img/divesites/thumbnails/' . $diveSite->getValue('thumbnailPath') . '">
                <div class="darkeningOverlay"></div>
                <div class="siteTextOverlay">
                    <h1 class="largeHeader">' . $diveSite->getValue('heading') . '</h1>
                    <p class="standardSectionText">' . $diveSite->getValue('subheading') . '</p>
                    <a href="divesite.php?id=' . $diveSite->getValue('id') . '" class="btn ' . $colourClass . '">' . $buttonText . '</a>
                </div>
            </div>';

        }

        public static function getDiveSitesAndPlaces() {
            
            
            $output = '';

            echo '<section class="diveSites">';
                $diveSites = DiveSite::getAll();

                foreach ($diveSites as $diveSite) {
                    $colourClass = $diveSite->getValue('isDiveSite') == 1 ? 'btn-green' : 'btn-purple';
                    $buttonText = $diveSite->getValue('isDiveSite') == 1 ? 'Dive' : 'Explore';
                    echo getSite($diveSite);
                }
            
                echo '
                    <div class="site comingSoon">
                        <div class="paddingTrick"></div>
                        <div class="siteTextOverlay">
                        <h1 class="largeHeader">Coming Soon</h1>
                        <p class="standardSectionText">Want us to add a location? Why not get in touch to add your perfect dive site or location?</p>
                        <a id="getInTouch" href="#" class="btn btn-light-red hams getInTouch">Get in touch</a>
                    </div>
                </div>
            </section>';
        }

        public static function getGallery($locationHeader, $locationText, $imagePaths, $isPreview) {
            $output = '';
            $output .= '<div class="location sliderStoppingPoint standardMarginTop">
                            <h1 class="locationTextHeader largeHeader">' . $locationHeader . '</h1>
                            <p class="standardSectionText locationText">' . $locationText . '</p>';

            // loop this
            $imagePaths[0] = $isPreview ? $imagePaths[0] : 'img/divesites/location_images/' . $imagePaths[0];
            $imagePaths[1] = $isPreview ? $imagePaths[1] : 'img/divesites/location_images/' . $imagePaths[1];
            $imagePaths[2] = $isPreview ? $imagePaths[2] : 'img/divesites/location_images/' . $imagePaths[2];
            $imagePaths[3] = $isPreview ? $imagePaths[3] : 'img/divesites/location_images/' . $imagePaths[3];        

            $output .= '<div class="mainImageContainer">
                            <img style="width: 100%;" class="mainImage" src="' . $imagePaths[0] . '">
                        </div>
                        <div class="smallImages">                         
                            <div class="smallImage"><div class="hiddenPlus"><img class="hiddenPlusImage" src="img/plus.png"></div><img class="thumbnailSmall" src="' . $imagePaths[1] . '"><div class="smallImagePadding"></div></div>
                            <div class="smallImage"><div class="hiddenPlus"><img class="hiddenPlusImage" src="img/plus.png"></div><img class="thumbnailSmall" src="' . $imagePaths[2] . '"><div class="smallImagePadding"></div></div>
                            <div class="smallImage"><div class="hiddenPlus"><img class="hiddenPlusImage" src="img/plus.png"></div><img class="thumbnailSmall" src="' . $imagePaths[3] . '"><div class="smallImagePadding"></div></div>
                        </div>
                    </div>';

            echo $output;

        }




        // public static function getStandardCenteredSection($header, $text, Array $buttons, $textColour = null, $backgroundColour = null, $extraClasses = null) {
        public static function printDiverStatisticsHTML($diverLevel, $depth, $visibility, $current, $showText = false) {
            $lightOnPaths = [];
            $lightOffPaths = [];
            $depthPercentage = (intval($depth) / 60 * 100) . "%";
            $visibilityPercentage = (intval($visibility) / 40 * 100) . "%";
            $currentLevels = ['Calm', 'Weak', 'Average', 'Strong', 'Rough'];

            for ($index = 1; $index <= 5; $index++) {
                $lightOnPaths[] = 'img/Level ' . $index . ' On.png';
                $lightOffPaths[] = 'img/Level ' . $index . ' Off.png';
            }

            if ($showText) {
                echo Utils::getStandardCenteredSection('Our Diver System', 'We have created our own diver system so that you can find out all of the information that you need.
                Take a look to see how we have classified our levels so you can get diving at Dive Thailand.', [], 'White', 'DarkBlue', ['diverStatsHeader']);
            } else {
                echo Utils::getStandardCenteredSection('Diver Rating', '', [], 'White', 'DarkBlue', ['diverStatsHeader', 'actualDiverStats']);

            }

            $output = '
                <div class="headerRow1">
                    <div class="statCol1">
                        <h1 class="statHeader largeHeader">Diver Level</h1>
                        <div class="lightLevelContainer">
                            <div class="lightLevels">';
                        
                            for ($index = 0; $index <= 4; $index++) {
                                $lightPath = ($index + 1 <= $diverLevel ? $lightOnPaths[$index] : $lightOffPaths[$index]);
                                $active = ($index + 1 <= $diverLevel) ? 'active' : '';
                                
                                $output .= '                 
                                
                                <div class="lightLevel">
                                    <div class="lightLabel">Level ' . ($index + 1) . '</div>
                                    <div class="lightLevelLight">
                                        <img class="' . $active . ' light light-' . ($index + 1) . '" src="' . $lightPath . '">
                                    </div>
                                </div>
                                ';
                            }
                            $output .= '
                        </div>
                    </div>';
                    if ($showText) {
                        $output .= '
                            <p class="statisticDescription standardSectionText">
                                What type of diver are you? First time divers should look at our level 1 sites whilst an eperience diver may want to tackle the level 5 dive sites!
                            </p>';
                    }
                    $output .= '
                </div>
                <div class="statCol1">
                    <h1 class="statHeader largeHeader">Depth</h1>
                    <div class="depthMeter">
                        <div class="depthValues">
                            <div>0m</div>
                            <div>15m</div>
                            <div>30m</div>
                            <div>45m</div>
                            <div>60m</div>
                        </div> <!--Row 1 -->
                        <div class="depthDisplay">
                            <img class="meter darkenedMeter" src="img/Depth Darkened.png">
                            <img data-width-to-be="' . $depthPercentage . '" class="meter lightenedMeter" src="img/Depth Lightened.png">
                        </div> <!--Row 2 -->
                    </div>';
                    if ($showText) {
                        $output .= '
                            <p class="statisticDescription standardSectionText">
                                Our dive sites go up to a depth of 50 meters. If you are an experienced diver then you may want to go the deepest depths of the ocean but beginners may be better with something different.
                            </p>';
                    }
                    $output .= '
                </div>
                <div class="statCol1">
                    <h1 class="statHeader largeHeader">Visibility</h1>
                    <div class="visibilityMeter">
                        <div class="visibilityValues">
                            <div>0m</div>
                            <div>10m</div>
                            <div>20m</div>
                            <div>30m</div>
                            <div>40m</div>
                        </div> <!--Row 1 -->
                    <div class="visibilityDisplay">
                        <img class="meter darkenedMeter" src="img/Visibility Dark.png">
                       <!-- <img data-width-to-be="' . $visibilityPercentage . '" style="width: ' . $visibilityPercentage . '" class="meter lightenedMeter" src="img/Visibility Light.png"> -->
                       <img data-width-to-be="' . $visibilityPercentage . '" class="meter lightenedMeter" src="img/Visibility Light.png">
                    </div>
                </div>';

                if ($showText) {
                    $output .= '
                        <p class="statisticDescription standardSectionText">
                            Sometimes these dive sites can have some poor visibility. If you are a beginner, it may be best to go for a site with better visibility, or
                            maybe you want to take in the view!
                        </p>';
                }
                $output .= '
            </div>
            <div class="statCol1">
                <h1 class="statHeader largeHeader">Current</h1>
                <div class="lightLevelContainer">
                    <div class="lightLevels">';
                
                    for ($index = 0; $index <= 4; $index++) {
                        $lightPath = ($index + 1 <= $current ? $lightOnPaths[$index] : $lightOffPaths[$index]);
                        $active = ($index + 1 <= $current) ? 'active' : '';
                        $output .= '                 
                            <div class="lightLevel">
                                <div class="lightLabel">' . $currentLevels[$index] . '</div>
                                <div class="lightLevelLight">
                                    <img class="' . $active . ' light light-' . ($index + 1) . '" src="' . $lightPath . '">
                                </div>
                            </div>';
                    }
                    $output .= '
                    </div>
                </div>';

                if ($showText) {
                    $output .= '
                        <p class="statisticDescription standardSectionText">
                            The current can sometimes pick up, so beginners should try to stick with the calm and weak currents, however, our advanced divers may enjoy the strong currents and rough seas!
                        </p>';
                }
                $output .= '
            </div>
        </div>';

        if (!$showText) {
            $output .= '
            <div class="backgroundColorDarkBlue textColorWhite statsPrompt">
                <p class="standardSectionText">If you need any help using our diver ratings, head on over to our dive page.</p>
                <div class="buttonContainer">
                    <a href="dive" class="btn btn-green">Dive</a>
                </div>
            </div>';
        
        
        }

        echo $output;

        }

        public static function checkLogin() {
            session_start();

            if (!$_SESSION['user'] OR !$_SESSION['user'] = User::findById($_SESSION['user']->getValue('id'))) {
                $_SESSION['user'] = '';

                header('Location: login');
                exit;
            } else {

            }
        }


    }