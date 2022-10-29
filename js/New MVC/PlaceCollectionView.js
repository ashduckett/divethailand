var PlaceCollectionView = function(model) {
    this.model = model;
    this.element = $('.mainContent');
    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);

    this.editButtonClicked = new Event(this);

    this.itemsReordered = new Event(this);
    location.hash = '#list';

    var self = this;
    this.model.itemAdded.attach(function(sender, args) {
        self.rebuildList();
        window.location.hash = '#list';

    });
};

PlaceCollectionView.prototype.show = function() {
    this.rebuildList();
};

PlaceCollectionView.prototype.rebuildList = function() {
    
    $('#usersMenuItem').removeClass('active');
    $('#placesMenuItem').addClass('active');
    $('a#newButton').html('New Place');

    
    this.model.places.sort(function(a, b) {
        return parseInt(a.presentationOrder) - parseInt(b.presentationOrder);
    });
    
    
    var self = this;
    
    this.element.html('');
    location.hash = '#list';

    // A list view needs a container
    var listContainer = document.createElement('ul');
    listContainer.classList.add('placesViewContainer');
    listContainer.id = 'listViewContainer';

    for (var i = 0; i < this.model.places.length; i++) {
        // Add each list item here
        
        // The idea here is that we are hiding anything that has a revised version.
        if (this.model.isPlaceOriginalThatHasBeenEdited(this.model.places[i].id)) {
            continue;
        }
        
        var listItem = document.createElement('li');
        listItem.classList.add('placeListItem');


        listItemStatusLabel = document.createElement('div');
        listItemStatusLabel.classList.add('listItemStatus');
        listItemStatusLabel.style.width = '7em';

        var handle = document.createElement('div');
        handle.style.height = '100%';
        handle.style.width = '50px';
        handle.style.backgroundColor = 'rgb(223, 223, 223)';
        handle.classList.add('handle');
        listItem.append(handle);
        listItem.append(listItemStatusLabel);

        if (this.model.places[i].getIsDraft() == true) {
            listItem.classList.add('draft');
            listItemStatusLabel.innerHTML = 'DRAFT';
        }
        
        if (this.model.places[i].getIsDraft() == true && this.model.places[i].associatedPlaceID !== null) {
             listItem.classList.add('revision');
             listItemStatusLabel.innerHTML = 'REVISION';
        }

        if (this.model.places[i].getIsDraft() == false && this.model.places[i].associatedPlaceID == null) {
            listItem.classList.add('revision');
            listItemStatusLabel.innerHTML = 'CURRENT';
       }

        var listItemHeading = document.createElement('h1');
        listItemHeading.innerHTML = this.model.places[i].heading;
        
        var subheading = document.createElement('p');
        subheading.innerHTML = this.model.places[i].subheading;

        var thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('thumbnailContainer');

        var thumbnail = document.createElement('img');
        thumbnail.src = this.model.places[i].thumbnailPath == null || this.model.places[i].thumbnailPath == 'null' ? 'img/nothumbnailcross.png' : 'img/divesites/thumbnails/' + this.model.places[i].thumbnailPath;
        thumbnailContainer.appendChild(thumbnail);

        var editButton = document.createElement('a')
        editButton.id = 'editButton';
        editButton.href = '#';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';

        $(editButton).click(function(i) {
            return function(e) {
                e.preventDefault();
                self.editButtonClicked.notify({place: self.model.places[i]});
            }
        }(i));


        // var delButton = document.createElement('button');
        // delButton.classList.add('btn');
        // delButton.classList.add('btn-danger');
        // delButton.innerText = 'Delete';

        var delButton = document.createElement('a');
        delButton.innerHTML = '<i class="fas fa-times"></i>';
        delButton.href = '#';
        delButton.id = 'delButton';

        $(delButton).click(function(i) {
            return function(e) {
                e.preventDefault();
                self.delButtonClicked.notify({id: self.model.places[i].id});

             }
        }(i));
        
        listItem.appendChild(listItemHeading);
        listItem.appendChild(subheading);
        listItem.appendChild(thumbnailContainer);


        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');
        buttonContainer.appendChild(editButton)
        buttonContainer.appendChild(delButton)


       

        

        // listItem.appendChild(editButton);
        // listItem.appendChild(delButton);

        listItem.appendChild(buttonContainer)
        var self = this;


        

        $(listItem).mousedown(function() {
            self.lastSourcePosition = $(this).index();
        });



        listContainer.appendChild(listItem);
    }

    $(listContainer).sortable({
        handle: '.handle'
    });

    var listPromptContainer = document.createElement('div');
    listPromptContainer.classList.add('listPromptContainer');

    var listPrompt = document.createElement('p');
    listPrompt.innerText = 'Below are all of the places in your database. You can re-order their appearance in regular grids as well as search grids by using the handle on the left and dragging and dropping them. You can also edit and delete your places using the icons to the right of each item. Note that if you delete a revision, the original will be displayed again. Drafts and revisions will not be shown on the live site.'; 
    listPromptContainer.appendChild(listPrompt);

    this.element.append(listPromptContainer);

    this.element.append(listContainer);




    $(listContainer).on('sortupdate', function(event, ui) {
        // The moved item is correct

        // First remove anything with a revised version since this won't be in the displayed list

        var places = [];


        // If it has an associated id it is a revision so we want it.
        // We want to add everything apart from things with revisions associated with them...so
        for (var i = 0; i < self.model.places.length; i++) {
            if (!self.model.isPlaceOriginalThatHasBeenEdited(self.model.places[i].id)) {
                places.push(self.model.places[i]);
            }
        }


        places.sort(function(a, b) {
            return parseInt(a.presentationOrder) - parseInt(b.presentationOrder);
        });

        
        var movedItem = places[self.lastSourcePosition];

        self.itemsReordered.notify({lastSourcePosition: self.lastSourcePosition, lastDestPosition: ui.item.index(), movedItem: movedItem});
    });
};