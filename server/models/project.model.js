const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({

    projectName: {
        type: String,
        unique: true,
        required: true
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "UserSchema", 
        required: true
    },
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length >= 1;
            }, 
            message: 'You must have at least one tag.'
        }
    },
    projectImage:{
        type: String
    },
    content: {
        type: String
    }
}, {timestamps: true});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;