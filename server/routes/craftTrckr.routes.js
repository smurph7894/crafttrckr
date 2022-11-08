const UserController = require("../controllers/user.controller");
const ProjectController = require("../controllers/project.controller");
const { authenticate } = require('../config/jwt.config');
const userController = require("../controllers/user.controller");

module.exports = (app) => {

    app.post("/api/crafttrckr/user/register", UserController.createNewUser);
    app.post("/api/crafttrckr/user/login", UserController.login);
    app.get("/api/crafttrckr/logginguser", authenticate, UserController.loggedInUser);
    app.get("/api/user/crafttrckr/user", authenticate, UserController.findAllUsers);
    app.get("/api/crafttrckr/user/:id", authenticate, UserController.findOneUserWithProjects);
    app.put("/api/crafttrckr/user/:id", authenticate, UserController.updateUser);
    app.post("/api/crafttrckr/user/logout", userController.logOut);
    app.delete("/api/crafttrckr/user/:id", authenticate, UserController.deleteUser);

    app.post("/api/crafttrckr/project", authenticate, ProjectController.createNewProject);
    app.get("/api/crafttrckr/project/search/tags", authenticate, ProjectController.findAllProjectsByTag);
    app.get("/api/crafttrckr/project/:id", authenticate, ProjectController.findOneProject);
    app.put("/api/crafttrckr/project/:id", authenticate, ProjectController.updateProject);
    app.delete("/api/crafttrckr/project/:id", authenticate, ProjectController.deleteProject);

    app.post("/api/crafttrckr/project/:id/addFile", authenticate, ProjectController.uploadOneFile);

};