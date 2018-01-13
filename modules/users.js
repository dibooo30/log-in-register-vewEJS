var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

// start Schema 
var userSchema = mongoose.Schema({

    name:{
        type:String
    },
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    password2:{
        type:String
    },
    porfileimg:{
        type:String
    },
    email:{
        type:String
    }

});
var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}


module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    
    // Load hash from your password DB. 
bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null, isMatch);
    
});

}

module.exports.createUser = function(newUser, callback) {

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
       newUser.password = hash;
        newUser.save(callback); 
    });
});
    
    
}
