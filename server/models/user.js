const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank'],
        maxlength: [250, "Max characters reached. please stay below 250 characters"],
        validate: {
            validator: function (name) {
                return /^[a-zA-Z]+$/.test(name);
            },
            message: "First name cannot contain numbers or symbols."
        }
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        minlength: [5, "Email did not meat the requirments"],
        maxlength: [200, "Email cannot be greater then 200 characters"],
        trim: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Please enter your email in the correct format."
        }
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [32, "Password cannot be greater then 32 characters"],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
            },
            message: "Password must have at least 1 number, and 1 uppercase"
        }
    }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
    }
    next();
});

UserSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', UserSchema);