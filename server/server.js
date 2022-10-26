const express =  require('express');
const app = express();
const port = 8000;

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());
app.use(express.urlencoded({extend: true}));

app.listen(port, () => console.log(`listening on port: $(port)`) );

