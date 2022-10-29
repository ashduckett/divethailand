<footer>
    <div class="footerContent">
        
        <div class="top">
            &copy; Dive Thailand
        </div>
        <div class="bottom">
            Designed and developed by <a href="https://www.conceptai.co.uk/"><img src="img/Conceptai Logo.png"></a>
        </div>
        <!-- <section class="left">
            <div class="top">
                <h2 class="mediumHeader">The Best Dive Sites in Thailand from fully qualified divers</h1>
                <p class="standardSectionText">
                    "Dive Thailand is an organisation fueled by professional divers based
                    within the U.K. We're commited in aiding divers looking at Thailand and its
                    surrounding islands as their next diving destination."
                </p>

     <div class="createdBy">
        <p id="trademark">
            &copy; Dive Thailand Ltd
        </p>
        <p id="createdBy">
            Created by <span id="companyName">Conceptai</span>
        </p>
    <div>
        

            </div>

        </section>
        <section class="right">
            <div class="findOutMore standardSectionHeader">
                <h2 class="mediumHeader">Find out more about us</h1>
                <h3 class="smallHeader emailUs">Email Us</h2>
                <p class="email">info@divethailand.co.uk</p>
                <h3 class="smallHeader followUs">Follow us</h2>
                <div class="icon"><i class="fab fa-facebook-f"></i></div>
                <div class="icon"><i class="fab fa-instagram"></i></div>
                <div class="icon"><i class="fab fa-twitter"></i></div>
                <h3 class="smallHeader signUp">Sign up for news</h2>
                <form>
                    <input id="fullNameField" type="text" placeholder="Full Name">
                    <input id="emailField" type="text" placeholder="Email Address">
                    <a href="#" id="submit">Submit</a>
                </form>
            </div>
        </section>
    </div> -->
   
    
</footer>
<script>
    $(document).ready(function() {
        objectFitImages();
        setupContactFormButtons();
        setupHoverEffect();
        setupSiteClickThrough();
    
        // $('.slickSlider').slick({
        //     //setting-name: setting-value
        //     arrows: true,
        //     // autoplay: true,
        //     adaptiveHeight: false
        // });
        

     



        $('.styledDropdown').selectmenu({
            change: function(event, ui) {
                
                if (ui.item.label == 'Dive Sites' || ui.item.label == 'Categories') {
                    
                    if ($('#emptyIslandsDropdown').length > 0) {
                        // If it's not already there, put islands back
                        var select = createSelect('islandsDropdown', ['Islands', 'Koh Tao', 'Koh Samui', 'Koh Chang'], ['-1', 'koh tao', 'koh samui', 'koh chang']);

                        $('#emptyIslandsDropdown').replaceWith(select);
                        $(select).selectmenu();

                        // Here we will want to replace region with depth again
                        var select = createSelect('depthDropdown', ['Depth', '0 - 15m', '16 - 30m', '31 - 45m', '46 - 60m'], ['-1', '1', '2', '3', '4']);
                        $('#regionDropdown').replaceWith(select);
                        $(select).selectmenu();
                        

                        // We will want to replace entry with current
                        var select = createSelect('currentDropdown', ['Current', 'Weak', 'Normal', 'Average', 'Strong', 'Extra Strong'], ['-1', '1', '2', '3', '4', '5']);
                        $('#entryDropdown').replaceWith(select);
                        $(select).selectmenu();

                        // Replace type with level
                        var select = createSelect('levelDropdown', ['Level', '1', '2', '3', '4', '5'], ['-1', '1', '2', '3', '4', '5']);
                        $('#typeDropdown').replaceWith(select);
                        $(select).selectmenu();
                    }

                } else if (ui.item.label == 'Places to go') {
                    // If we are here, we want to remove the islands select control. I will replace it so we leave
                    // a marker.

                    $('#islandsDropdown-button').replaceWith('<div id="emptyIslandsDropdown"></div>');


                    // If we do select places to go then we will want to replace depth with region.

                    // Create region select control:
                    var select = createSelect('regionDropdown', ['Region', 'Central Thailand', 'Eastern Thailand', 'Northern Thailand', 'Northeastern Thailand', 'Southern Thailand', 'Western Thailand'], ['-1', 'central', 'east', 'north', 'northeastern', 'south', 'west']);
                    
                    // With it replace the depth drop down:
                    $('#depthDropdown').replaceWith(select);
                    $(select).selectmenu();

                    // Next we want to replace current with entry.
                    
                    // Create an entry drop down
                    var select = createSelect('entryDropdown', ['Entry', 'Paid Entry', 'Free Entry'], ['-1', '1', '0']);

                    // Replace current with entry
                    $('#currentDropdown').replaceWith(select);
                    $(select).selectmenu();

                    // Replace level with type
                    var select = createSelect('typeDropdown', ['Type', 'Historical', 'Religious', 'Culture', 'Nature', 'Natural Wonders', 'Wildlife'], ['-1', 'historical', 'religious', 'culture', 'nature', 'natural wonders', 'wildlife']);
                    $('#levelDropdown').replaceWith(select);
                    $(select).selectmenu();

                }

            }
        });

    });        
       

</script>
</body>
</html>