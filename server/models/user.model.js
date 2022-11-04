const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "A first name is required."]
    },
    lastName: {
        type: String,
        required: [true, "A last name is required."]
    },
    username:{
        type: String,
        unique: true,
        required: [true, "A unique username is required."]
    },
    profileImage: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        validate:{
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email."
        }
    },
    birthdate: {
        type: Date,
        required: [true, "You must be at least 13 years old to create an account." ],
        max: '2009-01-01'
    },
    followingUserId: {
        type: [mongoose.Types.ObjectId]
    },
    password: {
        type: String,
        required: [true, "Password must be 8 characters or longer."],
        minlength:[8, "Password must be 8 characters or longer."]
    }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('confirmedPassword')
    .get( ()=>this._confirmedPassword)
    .set(value => this._confirmedPassword = value);

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash=>{
            this.password = hash;
            next();
        });
});

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmedPassword) {
        this.invalidate('confirmPassword', 'Your password and confirm password must match.');
    }
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;