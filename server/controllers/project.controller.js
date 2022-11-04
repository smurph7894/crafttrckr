const Project = require('../models/project.model');

module.exports = {

    createNewProject: (req, res)=> {
        Project.create({...req.body, creatorId: req.userId})
            .then((newProject)=>{
                res.json(newProject);
            })
            .catch((err)=>{
                console.log("something went wrong with CREATE project");
                res.status(400).json(err);
            });
    },
    
    findAllProjectsByTag: (req, res) => {
        console.log(req.body.tagSearchTerms);
        //tagSearchTerms is === tags in model
        const tagArray = req.body.tagSearchTerms.split(" ");
        const regexSearch = tagArray.join("|");
        Project.find({tags: {$regex: regexSearch}})
            .then((allUsers)=>{
                res.json(allUsers);
            })
            .catch((err)=>{
                console.log("find ALL users failed");
                res.json({message: "something went wrong in findALL projects", error: err});
            });
    },

    findOneProject: (req, res) => {
        Project.findOne({_id: req.params.id})
            .then((oneProject)=>{
                res.json(oneProject);
            })
            .catch((err)=>{
                res.json({message: "something went wrong with find ONE project", error: err});
            });
    },

    updateProject: (req, res) => {
        Project.findOneAndUpdate({_id: req.params.id, creatorId: req.userId },
            req.body,
            {new:true, runValidators: true}
        )
        .then((updateProject)=>{
            res.json(updateProject);
        })
        .catch((err)=>{
            res.status(400).json(err);
            console.log("Something went wrong in update project");
        });
    },

    deleteProject: (req, res)=>{
        Project.deleteOne({_id: req.params.id, creatorId: req.userId })
            .then((deleteProject)=>{
                res.json(deleteProject);
            })
            .catch((err)=>{
                res.json({message: "Something went wrong in delete project", error: err});
                console.log("delete project failed");
            });
    }
};