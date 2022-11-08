const User = require('../models/user.model');
const Project = require('../models/project.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = {

    createNewUser: (req, res)=> {
        User.create(req.body)
            .then((newUser)=>{
                const payload = {
                    id: newUser._id
                };
                const userToken = jwt.sign(payload, process.env.FIRST_SECRET_KEY);
                res.cookie("jwt-token", userToken, { httpOnly: true }).json(
                    newUser
                );
            })
            .catch((err)=>{
                console.log("something went wrong with CREATE user");
                res.status(400).json(err);
            });
    },

    loggedInUser: (req, res)=> {
        User.findOne({_id: req.userId},{password: 0})
            .then((loggedUser)=>{
                console.log(loggedUser);
                res.json(loggedUser);
            })
            .catch ((err)=>{
                console.log("find LOGGED IN users failed");
            });
    },

    login: async(req, res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send("something went wrong with login.");
        }
        const user = await User.findOne({ email: req.body.email });
        if( user === null ) {
            return res.status(400).send("incorrect email");
            // res.sendStatus(400);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if ( !correctPassword) {
            return res.status(400).send("incorrect password");
            // res.sendStatus(400);
        }
        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY );
        res
            .cookie("jwt-token", userToken, {
                httpOnly: true
            })
            .json({msg: "success!", user: user});
    },
    
    findAllUsers: (req, res) => {
        User.find({},{password: 0})
            .then((allUsers)=>{
                res.json(allUsers);
            })
            .catch((err)=>{
                console.log("find ALL users failed");
                res.json({message: "something went wrong in findALL users", error: err});
            });
    },

    findOneUserWithProjects: async (req, res) => {
        const userAndProjects = {};
        try {
            userAndProjects.user = await User.findOne({_id: req.params.id},{password: 0});
        }
        catch (err) {
            res.json({message: "something went wrong with find USER for find user with projects", error: err});
            return;
        }

        try {
            userAndProjects.projects = await Project.find({creatorId: req.params.id});
        }
        catch (err) {
            res.json({message: "something went wrong with find user's PROJECTS for find user with projects", error: err});
            return;
        }
        res.json(userAndProjects);
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id},
            req.body,
            {
                new:true, 
                runValidators: true,
                projection: {password: 0}
            }
        )
        .then((updateUser)=>{
            res.json(updateUser);
        })
        .catch((err)=>{
            res.status(400).json(err);
            console.log("Something went wrong in update user");
        });
    },

    logOut: (req, res) => {
        res.clearCookie('jwt-token');
        res.sendStatus(200);
    },

    deleteUser: (req, res)=>{
        User.deleteOne({_id: req.params.id})
            .then((deleteUser)=>{
                res.json(deleteUser);
            })
            .catch((err)=>{
                res.json({message: "Something went wrong in delete user", error: err});
                console.log("delete user failed");
            });
    }
};