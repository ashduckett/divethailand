jQuery.fn.screenSlider = function(coloursArray) {

    // Ensure there are slider stopping points for
    // * Dive site with location images     CHECK
    // * Dive site without location images
    
    // Is there a way to work out if we have location images or not at the point the Js function is
    // * Places to go with location images  FAIL
    // * Places to go without location images
    var elements = document.querySelectorAll('.sliderStoppingPoint');

    var dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dotsContainer');

    $(dotsContainer).addClass('dotsContainer');
    $(dotsContainer).addClass('dotstyle');
    $(dotsContainer).addClass('dotstyle-fillup');
    
    var unorderedList = document.createElement('ul');
    
    $(dotsContainer).append(unorderedList);
    var dotCount = 5;

    for (var i = 0; i < elements.length; i++) {

        var newItem = document.createElement('li');
        var newItemLink = document.createElement('a');

        newItemLink.href = '#';

        newItemLink.addEventListener('click', function(i) {
            return function(evt) {
                // $('.dotsContainer li').removeClass('currentDot');
                // $(this).parent('li').addClass('currentDot');

                var self = this;

                // Scroll
                $('html').animate({
                    scrollTop: $(elements[i]).offset().top
                }, 1000, function() {
                    
                });
                evt.preventDefault();
            };

        }(i));

        newItem.appendChild(newItemLink);
        unorderedList.appendChild(newItem);
    }
    unorderedList.firstChild.classList.add('currentDot');

    this.append(dotsContainer);


    // Pass in an array of elements where the first will be the starting element.
    // The dots should initially be rendered in the center of that starting element

 //   window.addEventListener('load', function() {
         // Get hold of the top of the dots box
         var dotsTop = $('.dotsContainer').offset().top;

         for (var i = 0; i < elements.length; i++) {
             var elementTop = $(elements[i]).offset().top;
             var elementHeight = $(elements[i]).height();
 
             if (dotsTop > elementTop && dotsTop < (elementTop + elementHeight)) {
                 $('.dotsContainer li').removeClass('currentDot');
                 $('.dotsContainer li:nth-child(' + (i + 1) + ')').addClass('currentDot');
                 $('.dotsContainer a').css('box-shadow', 'inset 0 0 0 2px ' + coloursArray[i]);
             
                 if (coloursArray[i] == 'white') {
                     $('.dotstyle-fillup').addClass('backgroundWhite');
                     $('.dotstyle-fillup').removeClass('backgroundBlack');
                 } else {
                     $('.dotstyle-fillup').addClass('backgroundBlack');
                     $('.dotstyle-fillup').removeClass('backgroundWhite');
                 }
             } else {
                 $('.dotstyle-fillup li a').css('background-color', 'rgba(0, 0, 0, 0');
             }
         }
 //   });




      window.addEventListener('scroll', function(evt) {

        // Get hold of the top of the dots box
        var dotsTop = $('.dotsContainer').offset().top;

        for (var i = 0; i < elements.length; i++) {
            var elementTop = $(elements[i]).offset().top;
            var elementHeight = $(elements[i]).height();

            if (dotsTop > elementTop && dotsTop < (elementTop + elementHeight)) {
                $('.dotsContainer li').removeClass('currentDot');
                $('.dotsContainer li:nth-child(' + (i + 1) + ')').addClass('currentDot');
                $('.dotsContainer a').css('box-shadow', 'inset 0 0 0 2px ' + coloursArray[i]);
            
                if (coloursArray[i] == 'white') {
                    $('.dotstyle-fillup').addClass('backgroundWhite');
                    $('.dotstyle-fillup').removeClass('backgroundBlack');
                } else {
                    $('.dotstyle-fillup').addClass('backgroundBlack');
                    $('.dotstyle-fillup').removeClass('backgroundWhite');
                }
            } else {
                $('.dotstyle-fillup li a').css('background-color', 'rgba(0, 0, 0, 0');
            }
        }

    });

};




