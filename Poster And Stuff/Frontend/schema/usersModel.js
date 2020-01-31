const mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username : {
        type : String
    },
    password : {
        type : String
    },
    typeUser : {
        type : String
    }
});

var User = module.exports = mongoose.model('User',userSchema);

module.exports.createUser = function(newUser,callback) {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.getUserByUsername = function(username,callback){
    var query = {username : username};
    User.findOne(query,callback);

};

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.comparedPassword = function(candidateKey,hash,callback){
    bcrypt.compare(candidateKey,hash,function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    })};