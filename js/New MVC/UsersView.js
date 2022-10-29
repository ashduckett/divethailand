var UsersView = function(model) {
    // Get hold of the main content area that everyone else uses
    this.element = $('.mainContent');
    this.model = model;
    this.delButtonClicked = new Event(this);
};

UsersView.prototype.render = function() {
    var self = this;
    $('#usersMenuItem').addClass('active');
    $('#placesMenuItem').removeClass('active');
    $('a#newButton').html('New User');

    this.element.html('');
    var dummyHeaderForNow = document.createElement('h1');
    dummyHeaderForNow.innerText = 'Users'
    dummyHeaderForNow.style.textAlign = 'center';
//    this.element.append(dummyHeaderForNow);


    var tableContainer = document.createElement('div');

    var table = document.createElement('table');
    table.classList.add('usersTable');
    table.classList.add('table');
    

    var userEmailHeaderRow = document.createElement('tr');
    
    var emailHeader = document.createElement('th');
    emailHeader.innerHTML = 'Email';
    userEmailHeaderRow.appendChild(emailHeader);
    
    var emailDeleteHeader = document.createElement('th');
    
    emailDeleteHeader.innerHTML = 'Delete';

    userEmailHeaderRow.appendChild(emailDeleteHeader);
    
    
    
    
    table.appendChild(userEmailHeaderRow);


    for (var i = 0; i < this.model.users.length; i++) {
        var userEmailRow = document.createElement('tr');
    
        var tableData = document.createElement('td');
        tableData.innerHTML = this.model.users[i].email;
        userEmailRow.appendChild(tableData);

        var deleteBtnData = document.createElement('td');
        
        
        var deleteLink = document.createElement('a');
        deleteLink.classList.add('btn');
        deleteLink.classList.add('btn-primary');
        deleteLink.innerHTML = 'Delete';
        deleteLink.style.color = 'white';
        
        $(deleteLink).click(function(i) {
            return function() {
                self.delButtonClicked.notify({id: self.model.users[i].id});
            }
        }(i));
        
        deleteBtnData.appendChild(deleteLink);
        userEmailRow.appendChild(deleteBtnData);
        table.appendChild(userEmailRow);


        // Need to ensure each click knows about its own id


    
    }

    dummyHeaderForNow.style.margin = '0';
    tableContainer.classList.add('tableContainer');
    tableContainer.append(dummyHeaderForNow);
    tableContainer.append(table);
    this.element.append(tableContainer);
    // this.element.append(table);


};