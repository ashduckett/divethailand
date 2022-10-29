function allNumeric(input) {
    return /^-{0,1}\d+$/.test(input);
}

function addComingSoonSlides() {
    var noOfSites = $('.site').not('.comingSoon').length;
    var noOfComingSoonSquares = $('.comingSoon').length;
    var noOfComingSoons = null;
    var width = window.innerWidth;
        

        if (width > 1024) {
            var remainderOfThree = noOfSites % 3;
            
            if (noOfSites !== 0) {
                if (remainderOfThree == 0) {
                    noOfComingSoons = 3;
                } else if (remainderOfThree == 1) {
                    noOfComingSoons = 2;
                } else if (remainderOfThree == 2) {
                    noOfComingSoons = 1;
                }
            } else {
                noOfComingSoons = 3;
            }
        } else if(width > 700) {
            if (noOfSites !== 0) {
                var remainderOfTwo = noOfSites % 2;

                if (remainderOfTwo == 0) {
                    noOfComingSoons = 2;
                } else if (remainderOfTwo == 1) {
                    noOfComingSoons = 1;
                }
            } else {
                noOfComingSoons = 2;
            }
        } else {
            noOfComingSoons = 1;
        }

        var paths = ['img/comingsoondive.jpg', 'img/comingsoonplaces.jpg', 'img/comingsoondive2.jpg']
        
      if ($('#divesitesAndPlaces section.diveSites').length == 0) {
            $('#divesitesAndPlaces').append('<section class="diveSites"></section>');
        }
        


        if (noOfComingSoonSquares !== noOfComingSoons) {
            $('#divesitesAndPlaces .comingSoon').remove();

            



            for (var i = 0; i < noOfComingSoons; i++) {
                var comingSoonSite = '<div class="site comingSoon">';
                comingSoonSite += '<div class="paddingTrick"></div>';
                comingSoonSite += '<img class="islandImage" src="' + paths[i] + '">';
                comingSoonSite += '<div class="darkeningOverlay"></div>';
                comingSoonSite += '<div class="siteTextOverlay">';
                comingSoonSite += '<h1 class="largeHeader">Coming Soon</h1>';
                comingSoonSite += '<p class="standardSectionText">Want us to add a location? Why not get in touch to add your perfect dive site or location?</p>';
                comingSoonSite += '<a id="getInTouch" href="#" class="btn btn-light-red getInTouch">Get in touch</a>';
                comingSoonSite += '</div>';
                comingSoonSite += '</div>';
        
        
        
                $('#divesitesAndPlaces .diveSites').append(comingSoonSite);
            }
        }
}

function createSelect(id, options, values) {
    var select = document.createElement('select');
    select.id = id;
    select.classList.add('styledDropdown');
    
    for(var i = 0; i < options.length; i++) {
        var option = document.createElement('option');
        option.innerText = options[i];
        option.value = values[i];
        
        select.appendChild(option);
    }
    
    return select;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function extractFilenameFromPath(path) {
    if (path) {
        var startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'));
        filename = path.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        return filename;
    } else {
        return null;
    }
}

function setupHoverEffect() {
    $('.site').mouseenter(function() {
        $(this).find('.darkeningOverlay').addClass('darkeningOverlayDarker');
    });

    $('.site').mouseleave(function() {
        $(this).find('.darkeningOverlay').removeClass('darkeningOverlayDarker');
    });
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}



function setupContactFormButtons() {
    $('.getInTouch').click(function(evt) {
        evt.preventDefault();
        var contactFormOverlay = document.querySelector('.contactFormOverlay');
        contactFormOverlay.style.display = 'block';
    
    
    
        // Add class here: leftSideForMac
        var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
        
        if (mac) {
            document.getElementById('close').classList.add("left");
            $('.closeButton').addClass('leftSideForMac');
        }
    
    
    });

    var contactFormOverlay = document.querySelector('.contactFormOverlay');
    if (contactFormOverlay !== null) {
        contactFormOverlay.addEventListener('click', function(evt) {
            this.style.display = 'none';
        });

        $('.closeButton, .thankYouCloseBtn').click(function() {
            contactFormOverlay.style.display = 'none';
        });
    




        var formDiv = document.querySelector('.formDiv');
        formDiv.addEventListener('click', function(evt) {
            evt.stopPropagation();
        });
    }
}

function createSelectBox(selectId, options, labelText) {
    var div = document.createElement('div');
    div.classList.add('form-group');
    
    var label = document.createElement('label');
    label.classList.add('selectBoxLabelContainer');
    label.innerHTML = labelText;

    var select = document.createElement('select');
    select.classList.add('customSelectBox');
    select.id = selectId;
    select.classList.add('adminDropdown');
    select.classList.add('form-control');


    for (var i = 0; i < options.length; i++) {
        var option = document.createElement('option');  
        option.value = options[i];  
        option.innerText = options[i];
        select.appendChild(option);
    }

    div.appendChild(label);
    div.appendChild(select);
    return div;
}


function setHeaderSize() {
    var width = $('.site').width();
    if(width < 400) {
        $('.site').find('h1').css('font-size', '1.5em');
    } else if(width < 500) {
        $('.site').find('h1').css('font-size', '2.5em');
    } else {
        $('.site').find('h1').css('font-size', '3em');
    }
}

function setupSiteClickThrough() {
    $('.site').click(function() {
        if (!$(this).hasClass('comingSoon')) {
            window.location = $(this).find("a").not('.comingSoon').attr("href");
            return false;
        }
    });
}

$(document).ready(function() {
    setupContactFormButtons();

    $('.mobile-menu #mobileIslandsLink').click(function(evt) {
        evt.preventDefault();

       $('.mobile-menu').toggleClass('centered');
       $('.homeMobileLink, .aboutMobileLink').toggleClass('fade');

        if ($('.mobile-menu-submenu').css('display') === 'none') {
            $('.mobile-menu-submenu').slideDown('fast');
                  

        } else {
            $('.mobile-menu-submenu').slideUp('fast');
        }

       
    });


    $('.searchAnchor').click(function(evt) {
        evt.preventDefault();

        $('html').animate({
            scrollTop: $('.searchPrompt').offset().top
        }, 1000, function() {
            
        });
    });

        


    // $(document).tooltip();

    
    $(document).tooltip({
        items: ":hover"
    });

    window.createTextField = function(textFieldId, labelText) {
        var textFieldContainer = document.createElement('div');

        // var textFieldContainer = document.createElement('div');
        // textFieldContainer.classList.add('fieldRow');
        textFieldContainer.classList.add('form-group');
        
        var textField = document.createElement('input');
        textField.classList.add('form-control');
        textField.type = 'text';
        textField.id = textFieldId;
    
        var textFieldLabel = document.createElement('label');
        // textFieldLabel.classList.add('fieldLabel');
        textFieldLabel.innerHTML = labelText;
    
        textFieldContainer.appendChild(textFieldLabel);
        textFieldContainer.appendChild(textField);
        return textFieldContainer;
    };
    
    window.createFileField = function(fileFieldId, labelText) {
        var fileFieldContainer = document.createElement('div');
        fileFieldContainer.classList.add('fieldRow');
        fileFieldContainer.classList.add('custom-file');
        fileFieldContainer.classList.add('form-group');

        var fileField = document.createElement('input');
        fileField.type = 'file';
        fileField.id = fileFieldId;
        fileField.classList.add('custom-file-input');

        var fileFieldLabel = document.createElement('label');
        fileFieldLabel.classList.add('fieldLabel');
        fileFieldLabel.classList.add('custom-file-label');
        fileFieldLabel.innerHTML = '<span class="fileState">Click to Upload</span>';

        var controlLabel = document.createElement('label');
        controlLabel.innerHTML = labelText;

        fileFieldLabel.append(fileField);

        fileFieldContainer.appendChild(controlLabel);
        fileFieldContainer.appendChild(fileFieldLabel);
        //fileFieldContainer.appendChild(fileField);

        
        
        // var styleLabel = document.createElement('label');
        // styleLabel.appendChild(fileField);
        // styleLabel.classList.add('styleLabel')
        // styleLabel.classList.add(fileFieldId + 'Label')
        // styleLabel.innerHTML = '<span class="prompt">Click to Upload</span>';
        // styleLabel.appendChild(fileField);
    
    
        //fileFieldContainer.appendChild(styleLabel);
        return fileFieldContainer;
    }
    
    // window.createSelectField = function(selectFieldId, labelText, values) {
    //     var selectFieldContainer = document.createElement('div');
    //     selectFieldContainer.classList.add('fieldRow');
    //     selectFieldContainer.classList.add('form-group');

    //     var selectFieldLabel = document.createElement('label');
    //     selectFieldLabel.classList.add('fieldLabel');
    //     selectFieldLabel.innerHTML = labelText;
        
    //     var dropdown = createSelectBox(selectFieldId, values);
        
    //     selectFieldContainer.appendChild(selectFieldLabel);
    //     selectFieldContainer.appendChild(dropdown);
    //     return selectFieldContainer;
    // }
    
    // window.createTextAreaField = function(textAreaId, labelText) {
    //     var textAreaContainer = document.createElement('div');
    //     textAreaContainer.classList.add('form-group');

    //     var textAreaLabel = document.createElement('label');
    //     textAreaLabel.innerHTML = labelText;


    //     var textArea = document.createElement('textarea');
    //     textArea.id = textAreaId;

    //     textArea.classList.add('form-control');

    //     textAreaContainer.appendChild(textAreaLabel);
    //     textAreaContainer.appendChild(textArea);
    
    //     return textAreaContainer;
    // }
    
    window.createSingleCheckbox = function(text, id, value) {
        var checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox');

        var checkboxLabelContainer = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.value = value;

        checkboxLabelContainer.appendChild(checkbox);
        checkboxLabelContainer.appendChild(document.createTextNode(' ' + text));
        checkboxContainer.appendChild(checkboxLabelContainer);
        return checkboxContainer;
    };
    
    window.createCheckboxField = function(overallLabel, labels, ids) {
        var checkboxFieldContainer = document.createElement('div');
        checkboxFieldContainer.classList.add('form-group');

        var mainLabel = this.document.createElement('label');
        mainLabel.innerHTML = overallLabel;
        checkboxFieldContainer.appendChild(mainLabel);

        for (var i = 0; i < labels.length; i++) {
            var checkbox = createSingleCheckbox(labels[i], ids[i]);
            checkboxFieldContainer.appendChild(checkbox);
        }
        return checkboxFieldContainer;
    }

    window.showBSModal = function self(options) {

        var options = $.extend({
                title : '',
                body : '',
                remote : false,
                backdrop : 'static',
                size : false,
                onShow : false,
                onHide : false,
                actions : false
            }, options);
    
        self.onShow = typeof options.onShow == 'function' ? options.onShow : function () {};
        self.onHide = typeof options.onHide == 'function' ? options.onHide : function () {};
    
        if (self.$modal == undefined) {
            self.$modal = $('<div class="modal fade" role="dialog" aria-hidden="true"><div role="document" class="modal-dialog"><div class="modal-content"></div></div></div>').appendTo('body');
            self.$modal.on('shown.bs.modal', function (e) {
                self.onShow.call(this, e);
            });
            self.$modal.on('hidden.bs.modal', function (e) {
                self.onHide.call(this, e);
            });
        }
    
        var modalClass = {
            small : "modal-sm",
            large : "modal-lg"
        };
    
        self.$modal.data('bs.modal', false);
        self.$modal.find('.modal-dialog').removeClass().addClass('modal-dialog ' + (modalClass[options.size] || ''));
        self.$modal.find('.modal-content').html('<div class="modal-header"><h4 class="modal-title">${title}</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">${body}</div><div class="modal-footer"></div>'.replace('${title}', options.title).replace('${body}', options.body));
    
        var footer = self.$modal.find('.modal-footer');
        if (Object.prototype.toString.call(options.actions) == "[object Array]") {
            for (var i = 0, l = options.actions.length; i < l; i++) {
                options.actions[i].onClick = typeof options.actions[i].onClick == 'function' ? options.actions[i].onClick : function () {};
                $('<button type="button" class="btn ' + (options.actions[i].cssClass || '') + '">' + (options.actions[i].label || '{Label Missing!}') + '</button>').appendTo(footer).on('click', options.actions[i].onClick);
            }
        } else {
            $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>').appendTo(footer);
        }
    
        self.$modal.modal(options);
    };







    $('#contactUsEmail').click(function() {
        // name, email, phone, location, message

        var name = $('#contactUsName').val();
        var email = $('#emailField').val();
        var phone = $('#phoneField').val();
        var location = $('#contactUsLocation').val();
        var message = $('#contactUsMessage').val();

        if ($.trim(name) == '' || $.trim(email) == '' || $.trim(phone) == '' || $.trim(location) == '' || $.trim(message) == '') {
            $('.formBottomError').html('Please ensure all fields have a value');
        } else if (!validateEmail($.trim(email))) {
            $('.formBottomError').html('Please ensure you enter a valid email address.');
        } else {
            var obj = {
                name: $('#contactUsName').val(),
                email: $('#emailField').val(),
                phone: $('#phoneField').val(),
                location: $('#contactUsLocation').val(),
                message: $('#contactUsMessage').val()
            }
        
            $.post('../contact_us.php', obj, function(data) {
                $('.formBottomError').html('Thank you.');

                $('#thankYouMsg').css('display', 'block');
            });
        }
    });

    $('.slickSlider').slick({
        arrows: true,
        autoplay: true,
        adaptiveHeight: false,
        autoplaySpeed: 10000,
        prevArrow: ".leftArrow",
        nextArrow: ".rightArrow",
        dots: true,
        fade: true
    });

    

 
    $.get('/divethailand/utils/getFilteredPlaces.php', {
    }).done(function(data) {
        var container = $('#divesitesAndPlaces');
        container.html(data);
        addComingSoonSlides();
        setupContactFormButtons();
        setupHoverEffect();
        setupSiteClickThrough();
        addComingSoonSlides();
    });





    $("form").submit(function() {
        // This should be in a function
        var searchTerm = $.trim($('#searchTerm').val());
        searchTerm = searchTerm == '' ? null : searchTerm;
        
        var islandValue = $('select#islandsDropdown').val();
        var categoryValue = $('#categoryDropdown').val();

        var region = $('#regionDropdown').val();
        var entry = $('#entryDropdown').val();
        var type = $('#typeDropdown').val();
        var region = $('#regionDropdown').val();
        var depthUpper = null;
        var depthLower = null;
        var depthIndex = parseInt($('#depthDropdown').val());

        if (depthIndex) {
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
                case -1:
                    depthLower = -1;
                    depthUpper = -1;
                    break;

                default:
                    depthLower = null;
                    depthUpper = null;
                    break;

            }
        } else {
            depthLower = -1;
            depthUpper = -1;
        }

        var current = $('#currentDropdown').val();
        var level = $('#levelDropdown').val();

        $.get('/divethailand/utils/getFilteredPlaces.php', { 
            searchTerm: searchTerm, 
            island: islandValue,
            category: categoryValue,
            depthLower: depthLower,
            depthUpper: depthUpper,
            current: current,
            level: level,
            region: region,
            isPaid: entry,
            type: type
        }).done(function(data) {
            var container = $('#divesitesAndPlaces');
            container.html(data);
            addComingSoonSlides();
            setupContactFormButtons();
            setupHoverEffect();
            setupSiteClickThrough();
            
        });
        return false;
    });

    $('#searchButton').click(function(evt) {
        evt.preventDefault();

        var searchTerm = $.trim($('#searchTerm').val());
        searchTerm = searchTerm == '' ? null : searchTerm;
        
        var islandValue = $('select#islandsDropdown').val();
        var categoryValue = $('#categoryDropdown').val();

        var region = $('#regionDropdown').val();
        var entry = $('#entryDropdown').val();
        var type = $('#typeDropdown').val();
        var region = $('#regionDropdown').val();
        var depthUpper = null;
        var depthLower = null;
        var depthIndex = parseInt($('#depthDropdown').val());

        if (depthIndex) {
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
                case -1:
                    depthLower = -1;
                    depthUpper = -1;
                    break;

                default:
                    depthLower = null;
                    depthUpper = null;
                    break;

            }
        } else {
            depthLower = -1;
            depthUpper = -1;
        }

        var current = $('#currentDropdown').val();
        var level = $('#levelDropdown').val();

        $.get('/divethailand/utils/getFilteredPlaces.php', { 
            searchTerm: searchTerm, 
            island: islandValue,
            category: categoryValue,
            depthLower: depthLower,
            depthUpper: depthUpper,
            current: current,
            level: level,
            region: region,
            isPaid: entry,
            type: type
        }).done(function(data) {
            var container = $('#divesitesAndPlaces');
            container.html(data);
            setupContactFormButtons();
            setupHoverEffect();
            setupSiteClickThrough();

            addComingSoonSlides();
        });
    });





    $('#islandsDropdown').hover(function() {

        $('#islandsDropdown+ul').fadeIn('fast');
        $('#menuCarat').css('opacity', '1');
        $('#islandsDropdown').css('opacity', '0.75');
    });

    $('.menu').hover(function() {}, function() {
        $('#islandsDropdown+ul').fadeOut('fast');
        //$('#menuCarat').fadeOut('fast');
        $('#menuCarat').css('opacity', '0');
        $('#islandsDropdown').css('opacity', '1');
    });
    
    $('#desktopHome, #desktopAbout').hover(function() {
        $('#islandsDropdown+ul').fadeOut('fast');
        //$('#menuCarat').fadeOut('fast');
        $('#menuCarat').css('opacity', '0');
        $('#islandsDropdown').css('opacity', '1');


    }, function() {
        
    });
    
    //$("ul").slideDown("slow");
    setHeaderSize();

    $('.hamburger').click(function() {
        $(this).toggleClass('is-active');
        $('.mobile-menu').toggleClass('fullOpacity');
        $('.mobileNavContainer').toggleClass('fullOpacity');
        $('nav').toggleClass('mobile-menu-open');
    });

    $('#categoryDropdown').change(function() {
        var index = $("#categoryDropdown option:selected").index()


        if (index == 1) {
        
            $('.depthSelect').html('');
            var newSelectControl = createSelectBox('depthDropdown', ['Depth', '0 - 15m', '16 - 30m', '31 - 45m', '46 - 60m']);
            $('.depthSelect').append(newSelectControl);

            $('.currentSelect').html('');
            var newSelectControl = createSelectBox('currentDropdown', ['Current', 'Weak', 'Normal', 'Average', 'Strong', 'Extra Strong']);
            $('.currentSelect').append(newSelectControl);

            // Level
            $('.levelSelect').html('');
            var newSelectControl = createSelectBox('levelDropdown', ['Level', '1', '2', '3', '4', '5']);
            $('.levelSelect').append(newSelectControl);

            // Rebuild islands drop down
           // var newSelectControl = createSelectBox('islandsDropdown', ['Islands', 'Koh Tao', 'Koh Samui', 'Koh Chang']);

           $('.islandsSelect').show();

        } else if (index == 2) {
            $('.depthSelect').html('');
            var newSelectControl = createSelectBox('regionDropdown', ['Region', 'Central Thailand', 'Eastern Thailand', 'Northern Thailand', 'Northeastern Thailand', 'Southern Thailand', 'Western Thailand']);
            $('.depthSelect').append(newSelectControl);

            $('.currentSelect').html('');
            var newSelectControl = createSelectBox('entryDropdown', ['Entry', 'Free Entry', 'Paid']);
            $('.currentSelect').append(newSelectControl);
            // What else needs removing and replacing?

            // Level
            $('.levelSelect').html('');
            var newSelectControl = createSelectBox('typeDropdown', ['Type', 'Historical', 'Religious', 'Culture', 'Nature', 'Natural Wonders', 'Wildlife']);
            $('.levelSelect').append(newSelectControl);

            $('.islandsSelect').hide();
            



        }

        
    });
});

window.addEventListener('resize', function() {
    setHeaderSize();
    addComingSoonSlides();
});



window.addEventListener('scroll', function() {
    



   // Once we get to around 400, change to have a fuller background
    if ($(window).scrollTop() > 650) {
       // $('nav').css('position', 'fixed');

        $('nav').addClass('navFixed');

        $('.menuGradient').addClass('fullerBackgroundGradient');
    } else {
       // $('nav').css('position', 'relative');
        $('nav').removeClass('navFixed');
        $('.menuGradient').removeClass('fullerBackgroundGradient');
    }


    // Change width of bars!

    var meters = $('img.meter.lightenedMeter');

    var metersWithScrolledStatus = [];

    



    for (var i = 0; i < meters.length; i++) {
        if(isScrolledIntoView(meters[i])) {
            if(!meters[i].hasBeenScrolled) {
                var widthToBe = $(meters[i]).attr("data-width-to-be");
                $(meters[i]).css('width', widthToBe);
                meters[i].hasBeenScrolled = true;
            }
        }
    }

    // Now for the lights
    
    // Grab the containers
    


    function animate(lights) {
        var currentIndex = 0;
        var noOfLights = lights.length - 1;
        
        var timerId = setInterval(function() { 
            $(lights).removeClass('grow');
            if ($(lights[currentIndex]).hasClass('active')) {
                $(lights[currentIndex]).addClass('grow');
            }
            
            currentIndex++;

            if (currentIndex > noOfLights) {
                currentIndex = 0;
                clearInterval(timerId);
            }
        }, 
        1000);
    }
    var lightContainers = $('.lightLevelContainer');

        lightContainers.each(function(item) {
            if(isScrolledIntoView($(this))) {
                if(!lightContainers[item].hasBeenScrolled) {
                    lightContainers[item].hasBeenScrolled = true;

                    // What about only passing in the active
                    animate($(this).find('img.light.active'));

                    // Calculate an interval based on the number of lights:
                    var interval = ($(this).find('img.light.active').length + 2) * 1000;
                       
                    var self = $(this);
                        setInterval(function() {
                        self.find('img.light').removeClass('grow');
                        animate(self.find('img.light.active'));
                    }, interval);
                }
            }


        });
});


