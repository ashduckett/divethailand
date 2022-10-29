var UserCollection = function() {
    this.users = [];
};

UserCollection.prototype.initFromDatabase = function(onReady) {
    
    var self = this;
    // Make sure we're starting fresh
    this.users = [];
    this.itemRemoved = new Event(this);

    $.ajax({
        type: 'POST',
        url: '../../utils/dbTransactions.php?method=getAllUsers',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var user = User.createFromObject(data[i]);
                self.users.push(user);
            }

            if (typeof onReady === 'function') {
                onReady();
            }
        },
        dataType: 'json',
        error: function(data) {
            console.log('There was an error initialising users. Please check your network connection');
        }
    });
};

UserCollection.prototype.removeUserWithId = function(id) {
    // Find the place to remove's index
    var userIndex;

    for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id == id) {
            userIndex = i;
            break;
        }
    }

    this.users.splice(i, 1);
};

UserCollection.prototype.addUser = function(user) {
    this.users.push(user);
};