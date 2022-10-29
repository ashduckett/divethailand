jQuery.fn.customSlickSlider = function(images) {
    // Somewhere to stash preview images so they can be changed later
    var dynamicPreviewImages = [];

    var customSlider = document.createElement('div');
    customSlider.classList.add('customSlider');
    
    var mainContent = document.createElement('div');
    mainContent.classList.add('mainContent');

    var mainImage = document.createElement('div');
    mainImage.classList.add('mainImage');

    var slickSliderContainer = document.createElement('div');
    slickSliderContainer.classList.add('slickSliderContainer');

    for (var image = 0; image < images.length; image++) {
        var containingDiv = document.createElement('div');

        var imageImg = document.createElement('img');
        imageImg.src = 'img/divesites/scroller/' + images[image];

        containingDiv.append(imageImg);
        slickSliderContainer.append(containingDiv);
    }

    mainImage.append(slickSliderContainer);
    mainContent.append(mainImage);

    var imagePreviews = document.createElement('div');
    imagePreviews.classList.add('imagePreviews');
    
    if (images.length <= 3) {
        $(imagePreviews).css('justify-content', 'space-evenly');
    }

    mainContent.append(imagePreviews);
    customSlider.append(mainContent);
    
    this.append(customSlider);

    var dotsContainer = document.createElement('div');
    $(dotsContainer).addClass('dotsContainer');
    $(dotsContainer).addClass('dotstyle');
    $(dotsContainer).addClass('dotstyle-fillup');
    
    var unorderedList = document.createElement('ul');
    $(dotsContainer).append(unorderedList);
    
    $('.slickSliderContainer').slick({
        arrows: false,
        adaptiveHeight: false
    });

    for (var i = 1; i < images.length; i++) {
      

        if (i < 4) {
            // Get the images centering when there are less than three
            var previewImage = document.createElement('div');
            previewImage.classList.add('previewImage');

            var previewImageImg = document.createElement('img');
            previewImageImg.src = 'img/divesites/scroller/' + images[i];
            previewImage.append(previewImageImg);

            imagePreviews.append(previewImage);

            dynamicPreviewImages.push(previewImageImg);


            previewImageImg.onclick = function(i) {
                return function() {
                    $('.slickSliderContainer').slick('slickGoTo', i, false);
                    $('.dotsContainer .current').removeClass('current');
                    $('.dotsContainer li:nth-child(' + (i + 1) + ')').addClass('current');
                }
            }(i);
        }
    }

    $('.slickSliderContainer').on('afterChange', function(event, slick, currentSlide) {
        var imageEventHandlersToUpdate = getIndexesBasedOnIndex(currentSlide);
        
        for (var pi = 0; pi < imageEventHandlersToUpdate.length; pi++) {
            dynamicPreviewImages[pi].src = 'img/divesites/scroller/' + images[imageEventHandlersToUpdate[pi]];
        
            dynamicPreviewImages[pi].onclick = function(pi) {
                return function() {
                    $('.slickSliderContainer').slick('slickGoTo', imageEventHandlersToUpdate[pi], false);
                    $('.dotsContainer .current').removeClass('current');
                    $('.dotsContainer li:nth-child(' + (imageEventHandlersToUpdate[pi] + 1) + ')').addClass('current');
                }
            }(pi);
        }
    });

    var dotCount = images.length;

    for (var i = 0; i < dotCount; i++) {
        var newItem = document.createElement('li');
        var newItemLink = document.createElement('a');

        newItemLink.href = '#';
        newItemLink.addEventListener('click', function(evt) {
            evt.preventDefault();
        });
        newItem.appendChild(newItemLink);
        unorderedList.appendChild(newItem);
    }

    unorderedList.firstChild.classList.add('current');

    $('.customSlider').append($(dotsContainer));

    var item = document.querySelectorAll('.dotstyle-fillup li');

    function getIndexesBasedOnIndex(index) {
        var itemCount = images.length - 1;

        // Where are we? This is zero-based, remember
        var currentIndex = index;
        var indexesToNextImage = [];
        var imageCountToShow = 0;

        if (itemCount > 3) {
            imageCountToShow = 3;
        } else {
            imageCountToShow = itemCount
        }
        
        for (var something = 0; something < imageCountToShow; something++) {
            if (currentIndex !== itemCount) {
                indexesToNextImage.push(++currentIndex);
            } else {
                currentIndex = 0;
                indexesToNextImage.push(currentIndex);
            }
        }

        return indexesToNextImage;
    }

    for (var i = 0; i < item.length; i++) {
        item[i].addEventListener('click', function(i) {

            return function() {
                var itemCount = images.length - 1;
                var currentIndex = i;
                var indexesToNextImage = getIndexesBasedOnIndex(currentIndex);

                for (var pi = 0; pi < indexesToNextImage.length; pi++) {
                    dynamicPreviewImages[pi].src = 'img/divesites/scroller/' + images[indexesToNextImage[pi]];
                }
            
                for (var k = 0; k < item.length; k++) {
                    item[k].classList.remove('current');
                }

                this.classList.add('current');

                // Now I think you'll need an index
                $('.slickSliderContainer').slick('slickGoTo', i, false);
            }
        }(i));
    }
}




