var PlaceCollection = function() {
    this.places = [];
};

PlaceCollection.prototype.initFromDatabase = function(onReady) {
    // Send a get request as a post. Return JSON to parse and populate this.places.
    var self = this;

    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.itemReplaced = new Event(this);

    $.ajax({
        type: 'POST',
        url: '../../utils/dbTransactions.php?method=getAll',
        success: function(data) {

            for (var i = 0; i < data.length; i++) {
                 var place = new Place(data[i]);
                 self.places.push(place);
            }

            if (typeof onReady === 'function') {
                onReady();
            }
        },
        dataType: 'json',
        error: function(data) {
            console.log('There was an error initialising places.');
        }
      });
};

PlaceCollection.prototype.getDraftCount = function() {
    return this.places.filter(function(place) {
        return place.getIsDraft() == true;
    }).length;
};

PlaceCollection.prototype.getNonDraftCount = function() {
    return this.places.filter(function(place) {
        return place.getIsDraft() == false;
    }).length;
};

PlaceCollection.prototype.getAll = function() {
    return this.places;
};

PlaceCollection.prototype.getAllWithoutRevisions = function() {
    var results = [];

    for (var i = 0; i < this.places.length; i++) {
        if (this.places[i].associatedPlaceID == null) {
            results.push(this.places[i]);
        }
    }

    return results;
}

PlaceCollection.prototype.addPlace = function(place) {
    this.places.push(place);
    this.itemAdded.notify({item: place});
};

// I'd rather a method like this was on the place model, but it needs access to all of them.
// Maybe a static method?
PlaceCollection.prototype.isPlaceOriginalThatHasBeenEdited = function(id) {
    for (var i = 0; i < this.places.length; i++) {
        if (this.places[i].associatedPlaceID == id) {
            return true;
        }
    }

    return false;

};

PlaceCollection.prototype.getPlaceById = function(id) {
    for (var i = 0; i < this.places.length; i++) {
        if(this.places[i].id == id) {
            return this.places[i];
        }
    }
    return null;
};



PlaceCollection.prototype.removePlaceWithId = function(id) {
    // Find the place to remove's index
    var placeIndex;

    for (var i = 0; i < this.places.length; i++) {
        if (this.places[i].id == id) {
            placeIndex = i;
            break;
        }
    }

    this.places.splice(i, 1);
};

PlaceCollection.prototype.removePlaceWithIndex = function(index) {

};

PlaceCollection.prototype.incrementAllPresentationLocations = function() {
    for (var i = 0; i < this.places.length; i++) {
        this.places[i].presentationOrder++;
    }
};

PlaceCollection.prototype.decrementAllPresentationOrdersAbove = function(presentationOrder) {
    for(var i = 0; i < this.places.length; i++) {
        if (this.places[i].presentationOrder > presentationOrder) {
            this.places[i].presentationOrder--;
            this.places[i].update();
        }
    }
};

PlaceCollection.prototype.getRevisedVersion = function(id) {
    for (var i = 0; i < this.places.length; i++) {
        if (parseInt(id) == parseInt(this.places[i].associatedPlaceID)) {
            return this.places[i];
        }
    }
    return null;
};

PlaceCollection.prototype.replacePlaceById = function(id, place) {
    for (var i = 0; i < this.places.length; i++) {
        if (this.places[i].id == id) {
            this.places[i] = place;
        //    this.itemReplaced.notify();
            return true;
        }
    }
    return false;
};

PlaceCollection.prototype.swapPlaces = function(indexOne, indexTwo) {
    var places = this.getAll();

    var a = places[indexOne];
    places[indexOne] = places[indexTwo];
    places[indexTwo] = a;

    places[indexOne].setPresentationOrder(indexOne);
    places[indexTwo].setPresentationOrder(indexTwo);

    // These changes also need to go into the database
    places[indexOne].update();
    places[indexTwo].update();
};

PlaceCollection.prototype.moveItem = function(sourcePosition, destPosition, movedItem) {
    var self = this;
    
    var places = [];


    // If it has an associated id it is a revision so we want it.
    // We want to add everything apart from things with revisions associated with them...so
    for (var i = 0; i < self.places.length; i++) {
        if (!self.isPlaceOriginalThatHasBeenEdited(self.places[i].id)) {
            places.push(self.places[i]);
        }
    }

    places.sort(function(a, b) {
        return parseInt(a.presentationOrder) - parseInt(b.presentationOrder);
    });

    if (sourcePosition < destPosition) {
        for(var i = sourcePosition + 1; i <= destPosition; i++) {
            if (movedItem.id !== places[i].id) {
                places[i].setPresentationOrder(parseInt(places[i].getPresentationOrder()) - 1);
                places[i].update();
            
                if (places[i].associatedPlaceID !== null) {
                    // Update original

                    var original = this.getPlaceById(places[i].associatedPlaceID);
                    original.setPresentationOrder(parseInt(places[i].getPresentationOrder()));
                    original.update();
                }
            
            
            }
        }
    } else {

        for(var i = destPosition; i <= sourcePosition - 1; i++) {
                places[i].setPresentationOrder(parseInt(places[i].getPresentationOrder()) + 1);
                
                if (places[i].associatedPlaceID !== null) {
                    // Update original

                    var original = this.getPlaceById(places[i].associatedPlaceID);
                    original.setPresentationOrder(parseInt(places[i].getPresentationOrder()));
                    original.update();
                }
                
                
                
                
                
                places[i].update();
    
        }
    }

    movedItem.setPresentationOrder(destPosition);

    if (movedItem.associatedPlaceID !== null) {
        movedItem.setPresentationOrder(destPosition);
        movedItem.update();

        // You also need to update the original
        var original = this.getPlaceById(movedItem.associatedPlaceID);
        original.setPresentationOrder(destPosition);
        original.update();

        places.sort(function(a, b) {
            return parseInt(a.presentationOrder) - parseInt(b.presentationOrder);
        });
    } else {

    }
    movedItem.update();

    // Is this necessary here? I don't know. No I don't think it is.
    this.places.sort(function(a, b) {
        return parseInt(a.presentationOrder) - parseInt(b.presentationOrder);
   });

    places.sort(function(a, b) {
       return parseInt(a.presentationOrder) - parseInt(b.presentationOrder);
    });
    



};