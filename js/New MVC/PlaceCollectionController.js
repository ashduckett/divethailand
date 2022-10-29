var PlaceCollectionController = function(model, view, formView) {
    this.model = model;
    this.view = view;
    this.formView = formView;
    var self = this;
    var newButton = $('a#newButton');
    this.itemUnderEdit = null;
    this.snapshot = null;


    var users = new UserCollection();

   

    

    newButton.click(function(e) {
        e.preventDefault();
        
        if ($(this).html() == 'New Place') {
            location.hash = '#newPlace';
        } else {
            var body = '<form>';
            body += '<div class="form-group">';
            body += '<label for="email">Email</label>';
            body += '<input type="email" class="form-control" id="email" placeholder="Email..."></div>';
            body += '<div class="form-group">';
            body += '<label for="password1">Password</label>';
            body += '<input type="password" class="form-control" id="password1" placeholder="Password...">';
            body += '</div>';
            body += '<div class="form-group">';
            body += '<label for="password2">Confirm Password</label>';
            body += '<input type="password" class="form-control" id="password2" placeholder="Confirm Password...">';
            body += '</div>';
            body += '<div class="form-group">';
            body += '<p class="error"></p>'
            body += '</div>';

            body += '</form>';
            body += '</div>';

            showBSModal({
                title:'Register a New User',
                body: body,
                actions: [{
                    label: 'Cancel',
                    cssClass: 'btn-success',
                    onClick: function(e){
                        $(e.target).parents('.modal').modal('hide');
                    }
                },{
                    label: 'Confirm',
                    cssClass: 'btn-danger',
                    onClick: function(e){
                        //proceed to log out
                        var email = $('#email').val();
                        var password1 = $('#password1').val();
                        var password2 = $('#password2').val();


                        var moreDataNeeded = email.trim() == '' || password1.trim() == '' || password2.trim() == '';


                        if (moreDataNeeded == true) {
                            $('.error').html('Please ensure you have filled in all fields.').css('color', 'red');
                        } else if (!validateEmail(email.trim())) {
                            $('.error').html('Please ensure you have entered a valid email address.').css('color', 'red');
                        } else if (password1 !== password2) {
                            $('.error').html('Passwords do not match.').css('color', 'red');
                        } else {
                            var user = new User(email, password1);
                            user.insert(function(data) {
                                var parsedData = JSON.parse(data);
                                if (parsedData.status == 1) {
                                    users.addUser(user);
                                    self.usersView.render();
                                    $(e.target).parents('.modal').modal('hide');
                                } else {

                                    $('.error').html('A user with that email address already exists.').css('color', 'red');
                                }
                            });
                        }
                        
                        
                         
            
                    }
                }]
                
            });

        }
    });

    this.model.itemReplaced.attach(function(sender, args) {
    //    self.view.rebuildList();
    });

    this.view.itemsReordered.attach(function(sender, args) {
        self.model.moveItem(args.lastSourcePosition, args.lastDestPosition, args.movedItem);
    });

    this.view.editButtonClicked.attach(function(sender, args) {
        self.itemUnderEdit = args.place;
        location.hash = '#editPlace';

        formView.itemUnderEdit = self.itemUnderEdit;
        
        //formView.buildForm('edit', args.place);

        formView.experimentForm();

    });

    this.view.delButtonClicked.attach(function(sender, args) {
        var initialAction = null;
        showBSModal({
            title: 'Confirm',
            body: 'Are you sure you want to delete this site?',
            onHide: function(e){
                if (initialAction === 'Delete') {
                    showBSModal({
                        title: 'Confirm',
                        body: 'This is final. Are you absolutely sure you want to delete this site?',
                        size: "small",
                        actions: [{
                            label: 'Cancel',
                            cssClass: 'btn-success',
                            onClick: function(e){
                                $(e.target).parents('.modal').modal('hide');
                            }
                        }, 
                        {
                            label: 'Delete',
                            cssClass: 'btn-danger',
                            onClick: function(e) {
                                $('.modal').modal('hide');

                                var place = self.model.getPlaceById(args.id);

                                if (place.associatedPlaceID == null) {
                                    self.model.decrementAllPresentationOrdersAbove(parseInt(place.presentationOrder));
                                }

                                place.delete();



                                self.model.removePlaceWithId(args.id);
                                self.view.rebuildList();
                                $(e.target).parents('.modal').modal('hide');
                            }
                        }]
                    })
                }
            },
            actions: [{
                label: 'Cancel',
                cssClass: 'btn-success',
                onClick: function(e) {
                    initialAction = 'Cancel';
                    $(e.target).parents('.modal').modal('hide');
                }
            },
            {
                label: 'Delete',
                cssClass: 'btn-danger',
                onClick: function(e) {
                    initialAction = 'Delete';
                    $(e.target).parents('.modal').modal('hide');
                }
            }]
        });
});


    // This is kind of the view, but lives on the global object so could stay here?
    window.addEventListener('hashchange', function() {
        
        if (location.hash == '#newPlace') {
            //formView.buildForm('new');
            formView.stopClock();
            formView.itemUnderEdit = null;
            formView.experimentForm();
        } else if (location.hash == '#list') {
            $('.peopleMenuOption').removeClass('active');
            $('.placesMenuOption').addClass('active');

            self.formView.itemUnderEdit = null;
            self.formView.stopClock();
            

            self.view.rebuildList();    
        } else if (location.hash == '#editPlace') {
        //    formView.buildForm();
        } else if (location.hash == '#users') {
            $('.peopleMenuOption').addClass('active');
            $('.placesMenuOption').removeClass('active');
            self.formView.stopClock();
            // Switch the activatedness of the tabs TODO

            
            users.initFromDatabase(function() {

                self.usersView = new UsersView(users);
                self.usersView.render();

                self.usersView.delButtonClicked.attach(function(sender, args) {
                    // This code works. Stick in a modal.
                    var initialAction = null;
                    showBSModal({
                        title: 'Confirm',
                        body: 'Are you sure you want to delete this user?',
                        onHide: function(e){
                            if (initialAction === 'Delete') {
                                showBSModal({
                                    title: 'Confirm',
                                    body: 'This is final. Are you absolutely sure you want to delete this user?',
                                    size: "small",
                                    actions: [{
                                        label: 'Cancel',
                                        cssClass: 'btn-success',
                                        onClick: function(e){
                                            $(e.target).parents('.modal').modal('hide');
                                        }
                                    }, 
                                    {
                                        label: 'Delete',
                                        cssClass: 'btn-danger',
                                        onClick: function(e) {
                                            $('.modal').modal('hide');
                                            var userToDelete = User.createFromObject({id: args.id, email: "", password: ""});
                                            userToDelete.delete(function(data) {
                                                var response = JSON.parse(data);

                                                if (response.status == 0) {
                                                    
                                                    showBSModal({
                                                        title: 'Error',
                                                        body: 'You cannot delete the administrator.',
                                                        actions: [{
                                                            label: 'OK',
                                                            cssClass: 'btn-success',
                                                            onClick: function(e) {
                                                                $(e.target).parents('.modal').modal('hide');
                                                            }
                                                        }]
                                                    });
                                                } else {
                                                    // Now remove from model.
                                                    users.removeUserWithId(args.id);
                                                    self.usersView.render();
                                                    $(e.target).parents('.modal').modal('hide');
                                                }
                                            });                                            
                                            
                                            
                                        }
                                    }]
                                })
                            }
                        },
                        actions: [{
                            label: 'Cancel',
                            cssClass: 'btn-success',
                            onClick: function(e) {
                                initialAction = 'Cancel';
                                $(e.target).parents('.modal').modal('hide');
                            }
                        },
                        {
                            label: 'Delete',
                            cssClass: 'btn-danger',
                            onClick: function(e) {
                                initialAction = 'Delete';
                                $(e.target).parents('.modal').modal('hide');
                            }
                        }]
                    });
                });
            });
            
        }
    });


    this.formView.cancelButtonClicked.attach(function(sender, args) {

         // Stop the clock
         self.formView.stopClock();

         if (self.formView.itemUnderEdit == null) { 
            // Only do this for new creations. I think.
            var draftId = parseInt(self.formView.draftId);
            var draft = self.model.getPlaceById(draftId);
            
            draft.delete(function() {
                self.model.removePlaceWithId(draftId);
                self.view.rebuildList();
            });
            
         } else {

            // Cancel of original place edit, not a draft, not a revision.
            if (self.formView.itemUnderEdit.associatedPlaceID == null && self.formView.itemUnderEdit.getIsDraft() == false) {
                // Get hold of the id of the draft
                var revision = self.model.getPlaceById(parseInt(self.formView.draftId));
                revision.delete(function() {
                    self.model.removePlaceWithId(self.formView.draftId);
                    self.view.rebuildList();
                });
                
            } else if (self.formView.itemUnderEdit.associatedPlaceID !== null && self.formView.itemUnderEdit.getIsDraft() == true) {
                // itemUnderEdit is not in the database or the model, but it already has the id and the data I want so I can just call update on it.
                self.itemUnderEdit.update(function() {
                    self.model.replacePlaceById(parseInt(self.itemUnderEdit.id), new Place(self.itemUnderEdit));
                    self.view.rebuildList();
                });

                

            } else if (self.formView.itemUnderEdit.associatedPlaceID == null && self.formView.itemUnderEdit.getIsDraft() == true) {
                // We have a draft!

                self.itemUnderEdit.update(function() {
                    self.model.replacePlaceById(parseInt(self.itemUnderEdit.id), new Place(self.itemUnderEdit));
                    self.view.rebuildList();
                });

                

            }
        }
     
     });

    this.formView.saveButtonClicked.attach(function(sender, args) {
        // Stop the clock
        self.formView.stopClock();

        if (self.formView.itemUnderEdit == null) {
            // Update the form data we have

            args.item.id = parseInt(self.formView.draftId);
            args.item.presentationOrder = 0;
            args.item.setIsDraft(false);
            args.item.setAssociatedPlaceID(null);
            
            // Keep the model and database up to date
            self.model.replacePlaceById(self.formView.draftId, args.item);


            var window = open("", "_blank");

            // After this update happens we should easily be taken back to the list page
            args.item.update(function() {
                self.view.rebuildList();

                window.location = location.origin + '/place/' + args.item.id;
            });

        } else if (self.formView.itemUnderEdit !== null) {
            // Edit of original place, not a draft, not a revision.
            if (self.formView.itemUnderEdit.associatedPlaceID == null && self.formView.itemUnderEdit.getIsDraft() == false) {
                // If we are saving a revision to an original

                // Update the current revision form data we have
                args.item.id = parseInt(self.formView.draftId);
                //console.log('setting id to ' + self.formView.draftId);

                args.item.setIsDraft(false);
                args.item.associatedPlaceID = null;
                args.item.presentationOrder = self.formView.itemUnderEdit.presentationOrder;

                // Now delete the original
                self.itemUnderEdit.delete();
                // Remove original from model
                
                // Remove it from the model
                self.model.removePlaceWithId(parseInt(self.itemUnderEdit.id));

                self.model.replacePlaceById(parseInt(self.formView.draftId), args.item);

                var window = open("", "_blank");
                // That should cover it
                args.item.update(function() {
                    self.view.rebuildList();
                    window.location = location.origin + '/place/' + args.item.id;
                });




            }  else if (self.formView.itemUnderEdit.associatedPlaceID !== null && self.formView.itemUnderEdit.getIsDraft() == true) {
                // This is a revision edit save
                // Delete the original version, as obtained by the associatedPlaceID
                
                //console.log(self.itemUnderEdit);

                var originalPlace = self.model.getPlaceById(parseInt(self.itemUnderEdit.associatedPlaceID));
                
                
                originalPlace.delete();
                self.model.removePlaceWithId(self.itemUnderEdit.associatedPlaceID);

                // // Next update the form data to be able to save as the revision
                args.item.id = parseInt(self.itemUnderEdit.id);
                args.item.presentationOrder = self.itemUnderEdit.presentationOrder;
                args.item.setIsDraft(false);
                args.item.associatedPlaceID = null;

                // // Update model
                self.model.replacePlaceById(parseInt(self.itemUnderEdit.id), args.item);

                var window = open("", "_blank");

                args.item.update(function() {
                    self.view.rebuildList();
                    window.location = location.origin + '/place/' + args.item.id;
                });

            } else if (self.formView.itemUnderEdit.associatedPlaceID == null && self.formView.itemUnderEdit.getIsDraft() == true) {
                // We want to take the draft's id

                // Get the current data from the form
                //var currentData = args.item;

                // Ensure we're not saving a draft
                args.item.setIsDraft(false);

                // Ensure we're saving to the correct place
                args.item.id = parseInt(self.itemUnderEdit.id);
                
                args.item.associatedPlaceID = null;

                // Ensure it appears in the same place as the original
                args.item.presentationOrder = self.itemUnderEdit.presentationOrder;

                self.model.replacePlaceById(parseInt(self.itemUnderEdit.id), args.item);
                var window = open("", "_blank");
                args.item.update(function() {
                    self.view.rebuildList();
                    window.location = location.origin + '/place/' + args.item.id;
                });
            }
            // Here we want to delete the original.
            // We want to remove the associated place id from the 
        }

        
    
    });



    this.formView.formShown.attach(function(sender, args) {
       // console.log(self.formView.itemUnderEdit)
        if (self.formView.itemUnderEdit == null) {
            // Set up the data as we want it
            args.draft.setIsDraft(true);

            // This should be zero. You should also increment the value of all of the other items.
            // Put this first step into a function.
            

            self.model.incrementAllPresentationLocations();
            args.draft.setPresentationOrder(0);
            
            args.draft.setAssociatedPlaceID(null);
            self.formView.appendFormDataToObject(args.draft);
            args.draft.thumbnailPath = null;

            args.draft.save(function(id) {
                // Stash away the id in the form.
                self.formView.draftId = parseInt(id);
                args.draft.id = parseInt(id);

                //console.log('saving', args.draft);
                // Store in model so available immediately
                self.model.places.push(args.draft);
                
                self.formView.startClock(function() {
                    self.formView.appendFormDataToObject(args.draft);
                    args.draft.update();
                });
            });
        } else if (self.formView.itemUnderEdit !== null) {

            // Edit of original place
            if (self.formView.itemUnderEdit.associatedPlaceID == null && self.formView.itemUnderEdit.getIsDraft() == false) {
                
                // Set data as we want it for a draft
                args.draft.setPresentationOrder(self.formView.itemUnderEdit.presentationOrder);
                args.draft.setIsDraft(true);
                args.draft.setAssociatedPlaceID(self.formView.itemUnderEdit.id);

                // Grab the form contents and add this to the object
                self.formView.appendFormDataToObject(args.draft);

                args.draft.save(function(id) {

                    // This id is used later on so we know which draft to set image paths on
                    self.formView.draftId = id;

                    // Store the current object in the model
                    self.model.places.push(args.draft);

                    self.formView.startClock(function() {
                        self.formView.appendFormDataToObject(args.draft);
                        args.draft.update();
                    });
                });


                // If we have a draft that has an associated place id, we are dealing with a revision
            } else if (self.formView.itemUnderEdit.associatedPlaceID !== null && self.formView.itemUnderEdit.getIsDraft() == true) {
                // Set the presentation order to be that of the item we're editing, since it already has one
                // args.draft already has the form data
                

                args.draft.presentationOrder = self.formView.itemUnderEdit.presentationOrder; 
                args.draft.isDraft = 1;
                // Ensure we're updating the revision that we had selected.
                args.draft.id = parseInt(self.itemUnderEdit.id);

                // Assign the already existing associatedPlaceID
                args.draft.associatedPlaceID = self.formView.itemUnderEdit.associatedPlaceID;

                // Update the revision in the model
                self.model.replacePlaceById(parseInt(self.formView.itemUnderEdit.id), args.draft);

                self.formView.appendFormDataToObject(args.draft);

                self.formView.startClock(function() {
                    self.formView.appendFormDataToObject(args.draft);
                    args.draft.update();
                });
            } else if (self.formView.itemUnderEdit.associatedPlaceID == null && self.formView.itemUnderEdit.getIsDraft() == true) { 
                    args.draft.presentationOrder = self.formView.itemUnderEdit.presentationOrder;
                    args.draft.isDraft = 1;
                    args.draft.id = parseInt(self.itemUnderEdit.id);
                    args.draft.associatedPlaceID = null;

                    // Also grab the stuff on the form and put it into the object

                    self.formView.appendFormDataToObject(args.draft);

                    // We are updating the original
                    self.model.replacePlaceById(parseInt(self.itemUnderEdit.id), args.draft);


                
                
                
                self.formView.startClock(function() {
                    self.formView.appendFormDataToObject(args.draft);
                    self.model.replacePlaceById(parseInt(self.itemUnderEdit.id), args.draft);
                    args.draft.update();
                });
            }
        }
    });


};

