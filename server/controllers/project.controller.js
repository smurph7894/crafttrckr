const Project = require('../models/project.model');

module.exports = {

    createNewProject: (req, res)=> {
        console.log(req.body.tags);
        const createObject = {
            ...req.body, 
            creatorId: req.userId,
            tags: req.body.tags ? req.body.tags.split(',') : []
        };
        console.log(createObject);
        Project.create(createObject)
            .then((newProject)=>{
                res.json(newProject);
            })
            .catch((err)=>{
                console.log("something went wrong with CREATE project");
                res.status(400).json(err);
                console.log(err);
            });
    },

    uploadOneFile: (req, res) => {
        console.log("upload req files", req.files);
        req.files.file.mv(__dirname+'/../uploadFiles/'+req.files.file.name, (err)=> {
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            else {
                Project.findByIdAndUpdate({_id: req.params.id}, {projectImage: req.files.file.name})
                    .then((newImage)=>{
                        console.log(newImage);
                        res.status(200).send('File Uploaded');
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(500).send(err);
                    });
            }
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

    findAllProjects: (req, res) => {
        Project.find({})
            .then((allProjects)=>{
                console.log(allProjects);
                res.json(allProjects);
            })
            .catch((err) =>{
                console.log("findAllProjects failed");
                res.json({message:"Something went wrong with findAllProjects", error:err});
            });
    },

    updateProject: (req, res) => {
        // console.log("!!!! cover image",req.files.projectImage);
        // console.log("**** req.body.projectImage", req.body.projectImage);
        console.log("req.body", req.body);
        const updateObject = {
            ...req.body, 
            creatorId: req.userId,
            tags: req.body.tags.split(',')
        };
        Project.findOneAndUpdate({_id: updateObject._id}, updateObject, {new:true, runValidators: true} )
        .then((updateProject)=>{
            console.log("server update project", updateProject);
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