const mongoose = require("mongoose");

const dbName = "craftTrckrDB";

mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`You are connected to the database called ${dbName}`);
    })
    .catch((err)=>{
        console.log(`You had a problem connecting to the database ${dbName}. Here is your error:`, err);
    });