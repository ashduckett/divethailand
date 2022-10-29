var Place = function(place) {
    this.id = place.id;
    this.heading = place.heading;
    this.subheading = place.subheading;
    this.thumbnailPath = place.thumbnailPath;
    this.diverLevel = place.diverLevel;
    this.rating = place.rating;
    this.ratingComment = place.ratingComment;
    this.depth = place.depth;
    this.visibility = place.visibility;
    this.current = place.current;
    this.locationText = place.locationText;
    this.locationTextTitle = place.locationTextTitle;
    this.locationImagePaths = place.locationImagePaths;
    this.islands = place.islands;
    this.virtualTourUrl = place.virtualTourUrl;
    this.isDiveSite = place.isDiveSite;
    this.presentationOrder = place.presentationOrder;
    this.regions = place.regions;
    this.isPaid = place.isPaid;
    this.isDraft = place.isDraft;
    this.type = place.type;
    this.associatedPlaceID = place.associatedPlaceID;

    this.thumbnailFile = place.thumbnailFile;
    this.locationImageOne = place.locationImageOne;
    this.locationImageTwo = place.locationImageTwo;
    this.locationImageThree = place.locationImageThree;
    this.locationImageFour = place.locationImageFour;
    this.isArchived = place.isArchived;
    this.isSponsored = place.isSponsored;
};


Place.prototype.getFormData = function() {
    var formData = new FormData();
    formData.append('associatedPlaceID', this.associatedPlaceID);
    formData.append('diverLevel', this.diverLevel);
    formData.append('heading', this.heading);
    formData.append('subheading', this.subheading);
    formData.append('thumbnailPath', this.thumbnailPath);
    formData.append('rating', this.rating);
    formData.append('ratingComment', this.ratingComment);
    formData.append('depth', this.depth);
    formData.append('visibility', this.visibility);
    formData.append('current', this.current);
    formData.append('locationText', this.locationText);
    formData.append('locationTextTitle', this.locationTextTitle);
    formData.append('locationImagePaths', this.locationImagePaths);
    formData.append('islands', this.islands);
    formData.append('virtualTourUrl', this.virtualTourUrl);
    formData.append('isDiveSite', this.isDiveSite);
    formData.append('regions', this.regions);
    formData.append('isPaid', this.isPaid);
    formData.append('isDraft', this.isDraft);
    formData.append('type', this.type);    
    formData.append('thumbnailFile', this.thumbnailFile);
    formData.append('locationImageOne', this.locationImageOne);
    formData.append('locationImageTwo', this.locationImageTwo);
    formData.append('locationImageThree', this.locationImageThree);
    formData.append('locationImageFour', this.locationImageFour);
    formData.append('isArchived', this.isArchived);
    formData.append('presentationOrder', this.presentationOrder);
    formData.append('isSponsored', this.isSponsored);

    return formData;
};


// Setters
Place.prototype.setId = function(id) {
    this.id = id;
};

Place.prototype.setHeading = function(heading) {
    this.heading = heading;
};

Place.prototype.setSubheading = function(subheading) {
    this.subheading = subheading;
};

Place.prototype.setThumbnailPath = function(thumbnailPath) {
    this.thumbnailPath = this.thumbnailPath;
};

Place.prototype.setDiverLevel = function(diverLevel) {
    this.diverLevel = diverLevel;
};

Place.prototype.setRating = function(rating) {
    this.rating = rating;
};

Place.prototype.setRatingComment = function(ratingComment) {
    this.ratingComment = ratingComment;
};

Place.prototype.setDepth = function(depth) {
    this.depth = depth;
};

Place.prototype.setVisibility = function(visibility) {
    this.visibility = visibility;
};

Place.prototype.setCurrent = function(current) {
    this.current = current;
};

Place.prototype.setLocationText = function(locationText) {
    this.locationText = locationText;
};

Place.prototype.setLocationTextTitle = function(locationTextTitle) {
    this.locationTextTitle = locationTextTitle;
};

Place.prototype.setLocationImagePaths = function(locationImagePaths) {
    this.locationImagePaths = locationImagePaths;
};

Place.prototype.setIslands = function(islands) {
    this.islands = islands;
};

Place.prototype.setVirtualTourUrl = function(virtualTourUrl) {
    this.virtualTourUrl = virtualTourUrl;
};

Place.prototype.setIsDiveSite = function(isDiveSite) {
    this.isDiveSite = isDiveSite;
};

Place.prototype.setPresentationOrder = function(presentationOrder) {
    this.presentationOrder = presentationOrder;
};

Place.prototype.setRegions = function(regions) {
    this.regions = regions;
};

Place.prototype.setIsPaid = function(isPaid) {
    this.isPaid = isPaid;
};

Place.prototype.setIsDraft = function(isDraft) {
    this.isDraft = isDraft == true ? 1 : 0;
};

Place.prototype.setTypes = function(types) {
    this.type = types;
};

Place.prototype.setAssociatedPlaceID = function(associatedPlaceID) {
    this.associatedPlaceID = associatedPlaceID;
};

// Getters
Place.prototype.getId = function() {
    return this.id;
};

Place.prototype.getHeading = function() {
    return this.heading;
};

Place.prototype.getSubheading = function() {
    return this.subheading;
};

Place.prototype.getThumbnailPath = function() {
    return this.thumbnailPath;
};

Place.prototype.getDiverLevel = function() {
    return this.diverLevel;
};

Place.prototype.getRating = function() {
    return this.rating;
};

Place.prototype.getRatingComment = function() {
    return this.ratingComment;
};

Place.prototype.getDepth = function() {
    return this.depth;
};

Place.prototype.getVisibility = function() {
    return this.visibility;
};

Place.prototype.getCurrent = function() {
    return this.current;
};

Place.prototype.getLocationText = function() {
    return this.locationText;
};

Place.prototype.getLocationTextTitle = function() {
    return this.locationTextTitle;
};

Place.prototype.getLocationImagePaths = function() {
    return this.locationImagePaths;
};

Place.prototype.getIslands = function() {
    return this.islands;
};

Place.prototype.getVirtualTourUrl = function() {
    return this.virtualTourUrl;
};

Place.prototype.getIsDiveSite = function() {
    return this.isDiveSite;
};

Place.prototype.getPresentationOrder = function() {
    return this.presentationOrder;
};

Place.prototype.getRegions = function() {
    return this.regions;
};

Place.prototype.getIsPaid = function() {
    return this.isPaid;
};

Place.prototype.getIsDraft = function() {
    return this.isDraft == 1 ? true : false;
};

Place.prototype.getTypes = function() {
    return this.type;
};

Place.prototype.getAssociatedPlaceId = function() {
    return this.associatedPlaceId;
};

Place.prototype.isArchived = function() {
    return this.isArchived == 1 ? true : 0;
};

// Database:

Place.prototype.save = function(onFinish) {
    
    var self = this;

    var formData = this.getFormData();

    // This could actually be done from within getFormData().
    formData.append('isDraft', this.getIsDraft() == true ? 1 : 0);
    // console.log(this.presentationOrder);
    


    $.ajax({
        type: 'POST',
        url: '../../utils/dbTransactions.php?method=save',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            self.id = parseInt(data);


            if (typeof onFinish === 'function') {
                onFinish(data);
            }
        },
        error: function(data) {
            console.log('There was a network error. Please check your internet connection.');
        }
      });
};

Place.prototype.delete = function(onFinish) {
    var self = this;

    // Code to delete a single place
    $.ajax({
        type: 'POST',
        url: '../../utils/dbTransactions.php?method=delete',
        data: {id: self.id},
        
        success: function(data) {

            if (typeof onFinish === 'function') {
                onFinish(data);
            }
        },
        error: function(data) {
            console.log('There was a network error. Please check your internet connection.');
        }
      });



};

Place.prototype.update = function(updateDone) {
    var self = this;
    $.ajax({
        type: 'POST',
        url: '../../utils/dbTransactions.php?method=update',
        data: {item: JSON.stringify(self)},
        success: function(data) {
            if (typeof updateDone == 'function') {
                updateDone();
            }
        },
        error: function(data) {
            console.log('There was a network error. Please check your internet connection.');
        }
      });
};