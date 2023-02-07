require('dotenv').config();
const cookieParser = require('cookie-parser');
const express =  require('express');
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
const port = 8000;
const log = require("./helpers/logging");

app.use(express.json());
app.use(fileUpload())
app.use(cookieParser());
app.use(express.urlencoded({extend: true}));

app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));

app.use('/files', express.static('uploadFiles'));

require("./config/mongoose.config");
require("./routes/craftTrckr.routes")(app);

app.listen(port, () => log(`listening on port: ${port}`));

