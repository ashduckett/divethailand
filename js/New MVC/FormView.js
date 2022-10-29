var FormView = function(model) {
    this.model = model;
    this.element = $('.mainContent');
    
    this.saveButtonClicked = new Event(this);
    this.cancelButtonClicked = new Event(this);
    this.formShown = new Event(this);
    this.taskId = null;
    this.mode = null;
    this.itemUnderEdit = null;

    // Technically part of the model:
    this.draftId = -1;
    this.clockRunning = false;

    this.isDiveSite = new SelectField('isDivesiteField', 'Dive Site/Place to Go', ['Dive Site', 'Place to Go'], 'Select whether your place is a dive site or a place to go. This will affect which and how fields are used.');
    this.heading = new TextField('headingField', 'Heading', 'The text entered here will show up as a heading on the thumbnail shown on the home page as well as the main header for the page specific to this place.');
    this.subheading = new TextField('subheadingField', 'Subheading', 'The text entered here will appear below the heading entered above on both the thumbnail and the header for the specific page to this place.');
    this.thumbnail = new FileField('thumbnailField', 'Thumbnail', 'The image set here will be the background image for the thumbnail on the home page as well as the background image for the header for the page specific to this place.');
    
    
    this.rating = new SelectField('ratingField', 'Rating', ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'], 'This rating will show as a star rating on your page.');
    this.ratingCommentField = new TextAreaField('ratingCommentField', 'Rating Comment', 'For places to go, a rating comment is displayed alongside the place\'s rating.');

    this.islandCheckboxField = new CheckboxField('Island(s)', ['Koh Tao', 'Koh Samui', 'Koh Chang'], ['checkboxKohTao', 'checkboxKohSamui', 'checkboxKohChang'], 'Select the islands that your place is associated with. This will be used when searches are performed.');
    this.virtualTourField = new TextField('virtualTourField', 'Virtual Tour', 'Paste here the code given to you by Google in order to display your virtual tour.');
    this.regionCheckboxField = new CheckboxField('Region(s)', ['Central', 'Eastern', 'Northern', 'North Eastern', 'Southern', 'Western'], ['checkboxCentral', 'checkboxEastern', 'checkboxNorthern', 'checkboxNorthEastern', 'checkboxSouthern', 'checkboxWestern'], 'Select the regions that your place is associated with. This will be used when a search is performed.');
    this.archivedField = new SelectField('archivedField', 'Archived', ['No', 'Yes'], 'Not ready to publish just yet? Archive your place for now until you\'re ready to show it to the rest of the world');
    this.sponsoredField = new SelectField('sponsoredField', 'Sponsored', ['No', 'Yes'], 'If your site is a sponsored site, this will be reflected in the images shown on the site.');
    
    
    this.placeTypesField = new CheckboxField('Place Type(s)', ['Historical', 'Religious', 'Culture', 'Nature', 'Natural Wonders', 'Wildlife'], ['checkboxHistorical', 'checkboxReligious', 'checkboxCulture', 'checkboxNature', 'checkboxNaturalWonders', 'checkboxWildlife'], 'Which words would you associated with your place? These will be used when performing a search.');
    this.locationTextTitleField = new TextField('locationTextTitleField', 'Location Text Title', 'Enter a title for the area that describes your place.');
    this.locationTextField = new TextAreaField('locationTextField', 'Location Text', 'Enter some text that describes your place.');
    this.depthField = new TextField('depthField', 'Depth', 'Enter the depth statistic for this dive site.');
    this.visibilityField = new TextField('visibilityField', 'Visibility', 'Enter the visibility statistic for this dive site. This will be shown in the dive stats section.');
    this.diverLevelField = new SelectField('diverLevelField', 'Diver Level', ['1', '2', '3', '4', '5'], 'Enter the diver level statistic of your place.');
    this.diverCurrentField = new SelectField('diverCurrentField', 'Current Strength', ['Calm', 'Weak', 'Average', 'Strong', 'Rough'], 'Enter the current strength statistic of your dive site.');
    this.locationImageOneField = new FileField('locationImageOne', 'Primary Location Image', 'This image will be the most prominent image initally in the picture gallery.');
    this.locationImageTwoField = new FileField('locationImageTwo', 'Secondary Location Image', 'This image will be a selectable image within the gallery.');
    this.locationImageThreeField = new FileField('locationImageThree', 'Secondary Location Image', 'This image will be a selectable image within the gallery.');
    this.locationImageFourField = new FileField('locationImageFour', 'Secondary Location Image', 'This image will be a selectable image within the gallery.');
    this.isPaidField = new SelectField('isPaidField', 'Admission', ['Paid', 'Free Entry'], 'Is your place free to enter, or do you have to pay? This will be used when searching.');
    this.thumbnailSrc = null;
};

FormView.prototype.startClock = function(callback) {
    this.taskId = setInterval(function() {
        if (typeof callback === 'function') {
            callback();
        }
    }, 10000)
};

FormView.prototype.stopClock = function() {
    clearInterval(this.taskId);
};

FormView.prototype.validateUI = function() {
    var errors = [];
    var isDiveSite = this.isDiveSite.getSelectedIndex() == 0 ? true : false;
    
    if (this.heading.isEmpty()) {
        errors.push('Please ensure you enter a value for the heading field.')
    }

    if (this.subheading.isEmpty()) {
        errors.push('Please ensure you enter a value for the sub-heading field.')
    }

    if (!this.thumbnail.hasSelectedFile()) {
        errors.push('Please ensure you select a thumbnail image.')
    }


    if (isDiveSite == false) {
        if (this.locationTextTitleField.isEmpty()) {
            errors.push('Please ensure you enter a value for the location text title field.')
        }
    }

    if (this.locationTextField.isEmpty()) {
        errors.push('Please ensure you enter a value for the location text field.')
    }

    if (this.virtualTourField.isEmpty()) {
        errors.push('Please ensure you enter a value for the virtual tour field.')
    }

    if(isDiveSite == true) {
        if (this.depthField.isEmpty()) {
            errors.push('Please ensure you enter a value for the depth field.')
        } else if (!allNumeric(this.depthField.getText())) {
            errors.push('Please ensure you enter only numeric characters for the depth field.');
        } else if (parseInt(this.depthField.getText()) < 0 || parseInt(this.depthField.getText() > 60)) {
            errors.push('Please ensure you enter a value between 0 and 60 for the depth field.');
        }

        if (this.visibilityField.isEmpty()) {
            errors.push('Please ensure you enter a value for the visibility field.')
        } else if (!allNumeric(this.visibilityField.getText())) {
            errors.push('Please ensure you enter only numeric characters for the visibility field.');
        } else if (parseInt(this.visibilityField.getText()) < 0 || parseInt(this.visibilityField.getText()) > 40) {
            errors.push('Please ensure you enter a value between 0 and 40 for the visibility field.');
        }
    }

    if (this.locationImageOneField.hasSelectedFile() || this.locationImageTwoField.hasSelectedFile() || this.locationImageThreeField.hasSelectedFile() || this.locationImageFourField.hasSelectedFile()) {
        if (!this.locationImageOneField.hasSelectedFile() || !this.locationImageTwoField.hasSelectedFile() || !this.locationImageThreeField.hasSelectedFile() || !this.locationImageFourField.hasSelectedFile()) {
            errors.push('If you have selected one image for your gallery, you must select one for all four.')
        }

    }
        
    
    

    // if (!this.locationImageTwoField.hasSelectedFile()) {
    //     errors.push('Please ensure you select a second location image.')
    // }

    // if (!this.locationImageThreeField.hasSelectedFile()) {
    //     errors.push('Please ensure you select a third location image.')
    // }

    // if (!this.locationImageFourField.hasSelectedFile()) {
    //     errors.push('Please ensure you select a fourth location image.')
    // }

    return errors;
};



FormView.prototype.appendFormDataToObject = function(object) {
    
    var fullPath = this.thumbnail.getSelectedPath();
    var filename = extractFilenameFromPath(fullPath);
    var kohChangChecked = $('#checkboxKohChang').is(":checked");
    var kohTaoChecked = $('#checkboxKohTao').is(":checked");
    var kohSamuiChecked = $('#checkboxKohSamui').is(":checked");
    var islands = [];
    var types = [];
    var historicalChecked = $('#checkboxHistorical').is(":checked");
    var religiousChecked = $('#checkboxReligious').is(":checked");
    var cultureChecked = $('#checkboxCulture').is(":checked");
    var natureChecked = $('#checkboxNature').is(":checked");
    var naturalWondersChecked = $('#checkboxNaturalWonders').is(":checked");
    var wildlifeChecked = $('#checkboxWildlife').is(":checked");

    if (historicalChecked) {
        types.push('Historical');
    }

    if (religiousChecked) {
        types.push('Religious');
    }

    if (cultureChecked) {
        types.push('Culture');
    }

    if (natureChecked) {
        types.push('Nature');
    }

    if (naturalWondersChecked) {
        types.push('Natural Wonders');
    }

    if (wildlifeChecked) {
        types.push('Wildlife');
    }

    if (kohChangChecked) {
        islands.push('Koh Chang');
    }

    if (kohTaoChecked) {
        islands.push('Koh Tao');
    }

    if (kohSamuiChecked) {
        islands.push('Koh Samui');
    }

    var regions = [];
    var centralChecked = $('#checkboxCentral').is(":checked");
    var easternChecked = $('#checkboxEastern').is(":checked");
    var northernChecked = $('#checkboxNorthern').is(":checked");
    var northEasternChecked = $('#checkboxNorthEastern').is(":checked");
    var southernChecked = $('#checkboxSouthern').is(":checked");
    var westernChecked = $('#checkboxWestern').is(":checked");

    if (centralChecked) {
        regions.push('Central');
    }

    if (easternChecked) {
        regions.push('East');
    }

    if (northernChecked) {
        regions.push('North');
    }

    if (northEasternChecked) {
        regions.push('Northeast');
    }

    if (southernChecked) {
        regions.push('South');
    }

    if (westernChecked) {
        regions.push('West');
    }

    var islandsString = JSON.stringify(islands);
    var regionsString = JSON.stringify(regions);
    var typesString = JSON.stringify(types);

    var pathOne = this.locationImageOneField.getSelectedFilename();
    var pathTwo = this.locationImageTwoField.getSelectedFilename();
    var pathThree = this.locationImageThreeField.getSelectedFilename();
    var pathFour = this.locationImageFourField.getSelectedFilename();

    object.isDiveSite = this.isDiveSite.getSelectedIndex() == 0 ? 1 : 0;
    object.heading = this.heading.getText();
    object.subheading = this.subheading.getText();
    object.thumbnailPath = filename;
    object.diverLevel = this.diverLevelField.getSelectedIndex() + 1;
    object.rating = this.rating.getSelectedText();
    object.ratingComment = this.ratingCommentField.getText();
    object.depth = !this.depthField.isEmpty() ? this.depthField.getText() : 0;
    object.visibility = !this.visibilityField.isEmpty() ? this.visibilityField.getText() : '';
    object.current = this.diverCurrentField.getSelectedIndex().toString();
    object.locationText = this.locationTextField.getText();
    object.locationTextTitle = this.locationTextTitleField.getText();
    object.locationImagePaths = '["' + pathOne + '", "' + pathTwo + '", "' + pathThree + '", "' + pathFour + '"]';
    object.islands = islandsString;
    object.virtualTourUrl = this.virtualTourField.getText();
    object.regions = regionsString;
    object.isPaid = this.isPaidField.getSelectedText() == 'Paid' ? 1 : 0;
    object.type = typesString;
    object.thumbnailFile = this.thumbnail.getSelectedFile();
    object.locationImageOne = this.locationImageOneField.getSelectedFile();
    object.locationImageTwo = this.locationImageTwoField.getSelectedFile();
    object.locationImageThree = this.locationImageThreeField.getSelectedFile();
    object.locationImageFour = this.locationImageFourField.getSelectedFile();
};

FormView.prototype.constructFormData = function() {

        // Update this for image values
        
        // This needs updating so that it uses the new values set when nothing is set on the actual file control
        // var fullPath = document.getElementById('previewThumbnailFile').value !== '' ? document.getElementById('previewThumbnailFile').value : ($('.previewThumbnailFileLabel .prompt').text() !== 'Click to Upload' ? $('.previewThumbnailFileLabel .prompt').text() : '');
     // var fullPath = document.getElementById('previewThumbnailFile').value !== '' ? document.getElementById('previewThumbnailFile').value : ($('#previewThumbnailFile').parent().find('.fileState').text() !== 'Click to Upload' ? $('#previewThumbnailFile').parent().find('.fileState').text() : '');
        var fullPath = this.thumbnail.getSelectedPath();
        //console.log('reading a path of ' + this.thumbnail.getSelectedPath());
        var filename = extractFilenameFromPath(fullPath);


        var kohChangChecked = $('#checkboxKohChang').is(":checked");
        var kohTaoChecked = $('#checkboxKohTao').is(":checked");
        var kohSamuiChecked = $('#checkboxKohSamui').is(":checked");
        var islands = [];
        var types = [];
    
    
        var historicalChecked = $('#checkboxHistorical').is(":checked");
        var religiousChecked = $('#checkboxReligious').is(":checked");
        var cultureChecked = $('#checkboxCulture').is(":checked");
        var natureChecked = $('#checkboxNature').is(":checked");
        var naturalWondersChecked = $('#checkboxNaturalWonders').is(":checked");
        var wildlifeChecked = $('#checkboxWildlife').is(":checked");
    
        if (historicalChecked) {
            types.push('Historical');
        }
    
        if (religiousChecked) {
            types.push('Religious');
        }
    
        if (cultureChecked) {
            types.push('Culture');
        }
    
        if (natureChecked) {
            types.push('Nature');
        }
    
        if (naturalWondersChecked) {
            types.push('Natural Wonders');
        }
    
        if (wildlifeChecked) {
            types.push('Wildlife');
        }
    
    
    
        if (kohChangChecked) {
            islands.push('Koh Chang');
        }
    
        if (kohTaoChecked) {
            islands.push('Koh Tao');
        }
    
        if (kohSamuiChecked) {
            islands.push('Koh Samui');
        }
    
        var regions = [];
    
        var centralChecked = $('#checkboxCentral').is(":checked");
        var easternChecked = $('#checkboxEastern').is(":checked");
        var northernChecked = $('#checkboxNorthern').is(":checked");
        var northEasternChecked = $('#checkboxNorthEastern').is(":checked");
        var southernChecked = $('#checkboxSouthern').is(":checked");
        var westernChecked = $('#checkboxWestern').is(":checked");
    
        if (centralChecked) {
            regions.push('Central');
        }
    
        if (easternChecked) {
            regions.push('East');
        }
    
        if (northernChecked) {
            regions.push('North');
        }
    
        if (northEasternChecked) {
            regions.push('Northeast');
        }
    
        if (southernChecked) {
            regions.push('South');
        }
    
        if (westernChecked) {
            regions.push('West');
        }
    
        var islandsString = JSON.stringify(islands);
        var regionsString = JSON.stringify(regions);
        var typesString = JSON.stringify(types);

        pathOne = this.locationImageOneField.getSelectedFilename();
        pathTwo = this.locationImageTwoField.getSelectedFilename();
        pathThree = this.locationImageThreeField.getSelectedFilename();
        pathFour = this.locationImageFourField.getSelectedFilename();

        //console.log('reading a path of ' + pathOne);

        var place = new Place({
        isDiveSite: this.isDiveSite.getSelectedIndex() == 0 ? 1 : 0,
        heading: this.heading.getText(),
        subheading: this.subheading.getText(),
        thumbnailPath: filename,
        diverLevel: this.diverLevelField.getSelectedIndex() + 1,
        rating: this.rating.getSelectedText(),
        ratingComment: this.ratingCommentField.getText(),
        depth: !this.depthField.isEmpty() ? this.depthField.getText() : 0,
        visibility: !this.visibilityField.isEmpty() ? this.visibilityField.getText() : 0,
        current: this.diverCurrentField.getSelectedIndex(),
        locationText:  this.locationTextField.getText(),
        locationTextTitle: this.locationTextTitleField.getText(),
        locationImagePaths: '["' + pathOne + '", "' + pathTwo + '", "' + pathThree + '", "' + pathFour + '"]',
        islands: islandsString,
        virtualTourUrl: this.virtualTourField.getText(),
        regions: regionsString,
        isPaid: this.isPaidField.getSelectedText() == 'Paid' ? 1 : 0,
        type: typesString,
        thumbnailFile: this.thumbnail.getSelectedFile(),
        locationImageOne: this.locationImageOneField.getSelectedFile(),
        locationImageTwo: this.locationImageTwoField.getSelectedFile(),
        locationImageThree: this.locationImageThreeField.getSelectedFile(),
        locationImageFour: this.locationImageFourField.getSelectedFile(),
        isArchived: this.archivedField.getSelectedIndex(),
        isSponsored: this.sponsoredField.getSelectedIndex()
    });

    return place;
};

function showHideFields(index) {
    if (index == 0) {
        $('.diveSpecific').show();
        $('.placesToGoSpecific').hide();
    } else {
        $('.diveSpecific').hide();
        $('.placesToGoSpecific').show();
    }
}

FormView.prototype.populateForm = function() {
    if (this.itemUnderEdit) {

        this.heading.setText(this.itemUnderEdit.heading);
        this.subheading.setText(this.itemUnderEdit.subheading);
        this.isDiveSite.setValue(this.itemUnderEdit.isDiveSite == 1 ? 'Dive Site' : 'Place to Go');
        this.thumbnail.setSelectedPath(this.itemUnderEdit.thumbnailPath == 'null' ? 'Click to Upload' : this.itemUnderEdit.thumbnailPath);
        this.rating.setValue(this.itemUnderEdit.rating);

        if (this.itemUnderEdit.islands.toLowerCase().indexOf('"koh tao"') >= 0) {
            $('#checkboxKohTao').prop('checked', true);
        }

        if (this.itemUnderEdit.islands.toLowerCase().indexOf('"koh samui"') >= 0) {
            $('#checkboxKohSamui').prop('checked', true);
        }

        if (this.itemUnderEdit.islands.toLowerCase().indexOf('"koh chang"') >= 0) {
            $('#checkboxKohChang').prop('checked', true);
        }

        var locationImagePathArray = JSON.parse(this.itemUnderEdit.locationImagePaths);
        
        if (locationImagePathArray) {
            this.locationImageOneField.setSelectedPath(locationImagePathArray[0] == 'null' ? 'Click to Upload' : locationImagePathArray[0]);
            this.locationImageTwoField.setSelectedPath(locationImagePathArray[1] == 'null' ? 'Click to Upload' : locationImagePathArray[1]);
            this.locationImageThreeField.setSelectedPath(locationImagePathArray[2] == 'null' ? 'Click to Upload' : locationImagePathArray[2]);
            this.locationImageFourField.setSelectedPath(locationImagePathArray[3] == 'null' ? 'Click to Upload' : locationImagePathArray[3]);
        }

        this.locationTextTitleField.setText(this.itemUnderEdit.locationTextTitle);
        this.locationTextField.setText(this.itemUnderEdit.locationText);

        
        this.virtualTourField.setText(this.itemUnderEdit.virtualTourUrl);
        
        
        if (this.itemUnderEdit.isDiveSite == 1) {
            this.depthField.setText(this.itemUnderEdit.depth);
            this.visibilityField.setText(this.itemUnderEdit.visibility);
            this.diverLevelField.setValue(this.itemUnderEdit.diverLevel);

            var currentString;
            switch(this.itemUnderEdit.current.toString()) {
                case '0':
                    currentString = 'Calm';
                    break;
                case '1':
                    currentString = 'Weak';
                    break;
                case '2':
                    currentString = 'Average';
                    break;
                case '3':
                    currentString = 'Strong';
                    break;
                case '4':
                    currentString = 'Rough';
                    break;
            }
                        
            this.diverCurrentField.setValue(currentString);
        } else {
            this.ratingCommentField.setText(this.itemUnderEdit.ratingComment);
        }

        if (this.itemUnderEdit.isArchived == 0) {
            this.archivedField.setValue('No');
        } else {
            this.archivedField.setValue('Yes');
        }

        if (this.itemUnderEdit.isSponsored == 0) {
            this.sponsoredField.setValue('No');
        } else {
            this.sponsoredField.setValue('Yes');
        }

        if (this.itemUnderEdit.isPaid == 0) {
            this.isPaidField.setValue('Free Entry');
        } else {
            this.isPaidField.setValue('Paid');
        }


        if (this.itemUnderEdit.regions && this.itemUnderEdit.regions.toLowerCase().indexOf('"central"') >= 0) {
            $('#checkboxCentral').prop('checked', true);
        }

        if (this.itemUnderEdit.regions && this.itemUnderEdit.regions.toLowerCase().indexOf('"north"') >= 0) {
            $('#checkboxNorthern').prop('checked', true);
        }

        if (this.itemUnderEdit.regions && this.itemUnderEdit.regions.toLowerCase().indexOf('"east"') >= 0) {
            $('#checkboxEastern').prop('checked', true);
        }

        if (this.itemUnderEdit.regions && this.itemUnderEdit.regions.toLowerCase().indexOf('"northeast"') >= 0) {
            $('#checkboxNorthEastern').prop('checked', true);
        }

        if (this.itemUnderEdit.regions && this.itemUnderEdit.regions.toLowerCase().indexOf('"south"') >= 0) {
            $('#checkboxSouthern').prop('checked', true);
        }

        if (this.itemUnderEdit.regions && this.itemUnderEdit.regions.toLowerCase().indexOf('"west"') >= 0) {
            $('#checkboxWestern').prop('checked', true);
        }

        if (this.itemUnderEdit.type && this.itemUnderEdit.type.toLowerCase().indexOf('"historical"') >= 0) {
            $('#checkboxHistorical').prop('checked', true);
        }

        if (this.itemUnderEdit.type && this.itemUnderEdit.type.toLowerCase().indexOf('"religious"') >= 0) {
            $('#checkboxReligious').prop('checked', true);
        }

        if (this.itemUnderEdit.type && this.itemUnderEdit.type.toLowerCase().indexOf('"culture"') >= 0) {
            $('#checkboxCulture').prop('checked', true);
        }

        if (this.itemUnderEdit.type && this.itemUnderEdit.type.toLowerCase().indexOf('"nature"') >= 0) {
            $('#checkboxNature').prop('checked', true);
        }

        if (this.itemUnderEdit.type && this.itemUnderEdit.type.toLowerCase().indexOf('"natural wonders"') >= 0) {
            $('#checkboxNaturalWonders').prop('checked', true);
        }

        if (this.itemUnderEdit.type && this.itemUnderEdit.type.toLowerCase().indexOf('"wildlife"') >= 0) {
            $('#checkboxWildlife').prop('checked', true);
        }
    } else {
        

    }
}

FormView.prototype.generateAndDisplayPreview = function() {
    var formData = new FormData();
    formData.append('isDiveSite', this.isDiveSite.getSelectedIndex() == 0 ? 1 : 0);
    formData.append('heading', this.heading.getText());
    formData.append('subheading', this.subheading.getText());
    formData.append('rating', this.rating.getSelectedText());
    formData.append('ratingComment', this.ratingCommentField.getText());
    formData.append('preview', true);
    formData.append('locationText', this.locationTextField.getText());
    formData.append('diverLevel', this.diverLevelField.getSelectedIndex() + 1);
    formData.append('depth', this.depthField.getText());
    formData.append('visibility', this.visibilityField.getText());
    formData.append('current', this.diverCurrentField.getSelectedIndex() + 1);
    formData.append('locationTextTitle', this.locationTextTitleField.getText());
    formData.append('virtualTourUrl', this.virtualTourField.getText());

    this.thumbNailSrc = this.thumbnail.getLabelText() == 'Click to Upload' ? null : 'img/divesites/thumbnails/' + this.thumbnail.getLabelText();
    this.locationImageOneSrc = this.locationImageOneField.getLabelText() == 'Click to Upload' ? null : '/img/divesites/location_images/' + this.locationImageOneField.getLabelText();
    this.locationImageTwoSrc = this.locationImageTwoField.getLabelText() == 'Click to Upload' ? null : '/img/divesites/location_images/' + this.locationImageTwoField.getLabelText();
    this.locationImageThreeSrc = this.locationImageThreeField.getLabelText() == 'Click to Upload' ? null : '/img/divesites/location_images/' + this.locationImageThreeField.getLabelText();
    this.locationImageFourSrc = this.locationImageFourField.getLabelText() == 'Click to Upload' ? null : '/img/divesites/location_images/' + this.locationImageFourField.getLabelText();

    // Set up the images
    formData.append('thumbnail', this.thumbNailSrc);

    formData.append('preview', true);
    var locationImagePaths = '["' + this.locationImageOneSrc + '", "' + this.locationImageTwoSrc + '", "' + this.locationImageThreeSrc + '", "' + this.locationImageFourSrc + '"]';
    formData.append('locationImagePaths', locationImagePaths);

    var w = window.open();

    $.ajax({
        url: '../divesite.php',
        type: 'POST',
        data: formData,
        success: function(data) {
            w.document.write(data);
            w.document.close();
        },
        cache: false,
        contentType: false,
        processData: false
    });
};

FormView.prototype.experimentForm = function(mode) {
    var self = this;
    this.element.html('');
    

    this.thumbNailSrc = null;
    this.locationImageOneSrc = null;
    this.locationImageTwoSrc = null;
    this.locationImageThreeSrc = null;
    this.locationImageFourSrc = null;
    
    var form = document.createElement('form');
    form.classList.add('newPlaceForm');

    form.style.width = '40%';
    form.style.margin = 'auto';
    
    form.append(this.isDiveSite.getElement());
    form.append(this.archivedField.getElement());
    form.append(this.sponsoredField.getElement());
    form.append(this.heading.getElement());
    form.append(this.subheading.getElement());
    form.append(this.thumbnail.getElement());
    form.append(this.rating.getElement());


    this.ratingCommentField.getElement().classList.add('placesToGoSpecific');

    form.append(this.ratingCommentField.getElement());
    form.append(this.islandCheckboxField.getElement());

   // this.locationTextTitleField.getElement().classList.add('placesToGoSpecific');
    
    form.append(this.locationTextTitleField.getElement());
    form.append(this.locationTextField.getElement());
    form.append(this.virtualTourField.getElement());

    var diveSpecificStuff = document.createElement('div');
    diveSpecificStuff.classList.add('diveSpecific');
    diveSpecificStuff.appendChild(this.depthField.getElement());
    diveSpecificStuff.appendChild(this.visibilityField.getElement());
    diveSpecificStuff.appendChild(this.diverLevelField.getElement());
    diveSpecificStuff.appendChild(this.diverCurrentField.getElement());
    form.append(this.locationImageOneField.getElement());
    form.append(this.locationImageTwoField.getElement());
    form.append(this.locationImageThreeField.getElement());
    form.append(this.locationImageFourField.getElement());


    var clearButtonContainer = document.createElement('div');
    clearButtonContainer.classList.add('form-group');
    clearButtonContainer.style.textAlign = 'right';

    var clearButton = document.createElement('a');
    clearButton.classList.add('btn');
    clearButton.classList.add('btn-primary');
    clearButton.classList.add('clearImagesBtn');

    clearButton.style.color = 'white';
    clearButton.style.marginTop = '0px';
    clearButton.style.marginRight = '0px !important';
    clearButton.textContent = 'Clear Images';


    clearButtonContainer.appendChild(clearButton);
    form.append(clearButtonContainer);

    
    $(clearButton).click(function() {
        self.locationImageOneField.clearValue();
        self.locationImageTwoField.clearValue();
        self.locationImageThreeField.clearValue();
        self.locationImageFourField.clearValue();

        self.locationImageOneSrc = null;
        self.locationImageTwoSrc = null;
        self.locationImageThreeSrc = null;
        self.locationImageFourSrc = null;
    });



    

    // What's next?
    form.append(diveSpecificStuff)
    
    form.append(this.regionCheckboxField.getElement());
    
    this.placeTypesField.getElement().classList.add('placesToGoSpecific');
    form.append(this.placeTypesField.getElement());

    this.isPaidField.getElement().classList.add('placesToGoSpecific');
    form.append(this.isPaidField.getElement());


    this.element.append(form);
    

    this.isDiveSite.setValue('Dive Site');
    this.archivedField.setValue('No');
    this.heading.setText('');
    this.subheading.setText('');
    this.thumbnail.clear();
    this.rating.setValue('0');
    this.islandCheckboxField.clear();
    this.locationTextField.setText('');
    this.locationTextTitleField.setText('');
    this.virtualTourField.setText('');
    this.depthField.setText('');
    this.visibilityField.setText('');

    this.locationImageOneField.clear();
    this.locationImageTwoField.clear();
    this.locationImageThreeField.clear();
    this.locationImageFourField.clear();
    this.regionCheckboxField.clear();
    this.diverLevelField.setValue('1');
    this.diverCurrentField.setValue('Calm');



    var formButtonsContainer = document.createElement('div');
    formButtonsContainer.classList.add('form-group');

    var formSaveButton = document.createElement('a');
    formSaveButton.classList.add('btn');
    formSaveButton.classList.add('btn-primary');
    formSaveButton.style.color = 'white';
    formSaveButton.innerHTML = 'Publish';

    var formCancelButton = document.createElement('a');
    formCancelButton.classList.add('btn');
    formCancelButton.classList.add('btn-secondary');
    formCancelButton.style.color = 'white';
    formCancelButton.innerHTML = 'Cancel';

    var formPreviewButton = document.createElement('a');
    formPreviewButton.classList.add('btn');
    formPreviewButton.classList.add('btn-primary');
    formPreviewButton.style.color = 'white';
    formPreviewButton.innerHTML = 'Preview';

    formButtonsContainer.append(formSaveButton);

    formButtonsContainer.append(formPreviewButton);
    formButtonsContainer.append(formCancelButton);

    

    form.append(formButtonsContainer);
    this.element.append(form);

    

    $(this.isDiveSite.getControl()).change(function(evt) {
        var selectedIndex = $(this).find('option:selected').index();
        showHideFields(selectedIndex);
    });


    if (this.itemUnderEdit) {
        this.populateForm();
        showHideFields(this.itemUnderEdit.isDiveSite == 0 ? 1 : 0);
    } else {
        showHideFields(0);
    }

    this.formShown.notify({draft: this.constructFormData()});

    this.thumbNailSrc = null;
    this.locationImageOneSrc = null;
    this.locationImageTwoSrc = null;
    this.locationImageThreeSrc = null;
    this.locationImageFourSrc = null;

    $(this.thumbnail.getFileControl()).on('change', function(event) {

        // This just sets the path on the label
        self.thumbnail.setSelectedPath($(this).val().replace(/^.*[\\\/]/, ''));

        var formData = new FormData();
        formData.append('thumbnailFile', $(this).get(0).files[0]);
        formData.append('diveSiteId', self.draftId);
        
        // Actually upload the file
        $.ajax({
            url: '../utils/dbTransactions.php?method=uploadThumbnail',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        }).done(function(data) {
        });
    });

    
    $(this.locationImageOneField.getFileControl()).on('change', function(event) {
        self.locationImageOneField.setSelectedPath($(this).val().replace(/^.*[\\\/]/, ''));
        var formData = new FormData();

        formData.append('locationImageOneFile', $(this).get(0).files[0]);
        formData.append('diveSiteId', self.draftId);

        $.ajax({
            url: '../utils/dbTransactions.php?method=uploadLocationImageOne',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        }).done(function(data) {
        });

        
    });

    $(this.locationImageTwoField.getFileControl()).on('change', function(event) {
        self.locationImageTwoField.setSelectedPath($(this).val().replace(/^.*[\\\/]/, ''));

        var formData = new FormData();

        formData.append('locationImageTwoFile', $(this).get(0).files[0]);
        formData.append('diveSiteId', self.draftId);

        $.ajax({
            url: '../utils/dbTransactions.php?method=uploadLocationImageTwo',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        }).done(function(data) {
        });
    });

    $(this.locationImageThreeField.getFileControl()).on('change', function(event) {
        //preview_image(event);
        self.locationImageThreeField.setSelectedPath($(this).val().replace(/^.*[\\\/]/, ''));

        var formData = new FormData();

        formData.append('locationImageThreeFile', $(this).get(0).files[0]);
        formData.append('diveSiteId', self.draftId);

        $.ajax({
            url: '../utils/dbTransactions.php?method=uploadLocationImageThree',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        }).done(function(data) {
        });
    });

    $(this.locationImageFourField.getFileControl()).on('change', function(event) {
        //preview_image(event);
        self.locationImageFourField.setSelectedPath($(this).val().replace(/^.*[\\\/]/, ''));

        var formData = new FormData();

        formData.append('locationImageFourFile', $(this).get(0).files[0]);
        formData.append('diveSiteId', self.draftId);

        $.ajax({
            url: '../utils/dbTransactions.php?method=uploadLocationImageFour',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        }).done(function(data) {
        });
    });

    // New save button
    formSaveButton.onclick = function(event) {
        event.preventDefault();
        
        var potentialErrors = self.validateUI();
        var listOfErrors = document.createElement('ul');

        for (var i = 0; i < potentialErrors.length; i++) {
            var errorItem = document.createElement('li');
            $(errorItem).html(potentialErrors[i]);
            listOfErrors.appendChild(errorItem);
        }

        if (potentialErrors.length > 0) {
            showBSModal({
                title: "Please correct the following",
                body: $(listOfErrors).html(),
                actions: [{
                    label: 'Close',
                    cssClass: 'btn-secondary',
                    onClick: function(e){
                        $(e.target).parents('.modal').modal('hide');
                    }
                }]
            });
        } else {
           // console.log('Publish Started');
           // console.log(self.constructFormData());
            
            self.saveButtonClicked.notify({item: self.constructFormData()});
        }
    };

    $(formPreviewButton).click(function(event) {
        event.preventDefault();

        var potentialErrors = self.validateUI();
        var listOfErrors = document.createElement('ul');

        for (var i = 0; i < potentialErrors.length; i++) {
            var errorItem = document.createElement('li');
            $(errorItem).html(potentialErrors[i]);
            listOfErrors.appendChild(errorItem);
        }

        if (potentialErrors.length > 0) {
            showBSModal({
                title: "Please correct the following",
                body: $(listOfErrors).html(),
                actions: [{
                    label: 'Close',
                    cssClass: 'btn-secondary',
                    onClick: function(e){
                        $(e.target).parents('.modal').modal('hide');
                    }
                }]
            });
        } else {
            self.generateAndDisplayPreview();
        }


        
    });

    $(formCancelButton).click(function(event) {
        event.preventDefault();
        self.cancelButtonClicked.notify();
    });
};