var User = function(email, password) {
    this.id = null;
    this.email = email;
    this.password = password;
};

User.createFromObject = function(obj) {
    var user = new User(obj.email, obj.password);
    user.id = obj.id;
    return user;
}

User.prototype.insert = function(onFinish) {
    $.post( "../utils/registerUser.php", { email: this.email, password: this.password }, function(data) {
        if (typeof onFinish === 'function') {
            onFinish(data);
        }
    });
};

User.prototype.delete = function(onFinish) {
    var self = this;
    
    // Code to delete a single place
    $.ajax({
        type: 'POST',
        url: '../../utils/dbTransactions.php?method=deleteUser',
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