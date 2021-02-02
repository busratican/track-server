const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required:true
    }
});

//when create user salting the password
userSchema.pre('save', function(next) {
    //function kullanmamızın sebebi (arrow yerine), this keyword'ü kullanabilmek.
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt, (err,hash) => {
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});

//control user password and hashed is same during login
//promise for not use async/await
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
         bcrypt.compare(candidatePassword,user.password, (err, isMatch) => {
            if(err){
                return reject(err);
            }
            if(!isMatch){
                return reject(false);
            }
            resolve(true);
         }); 
    });
}


mongoose.model('User', userSchema);