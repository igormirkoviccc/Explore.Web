const express = require('express')
const app = express()
const cors = require('cors')
const ExplorationRoute = require('./routes/ExplorationRoute');
const UserRoute = require('./routes/UserRoute');
const {connection} = require('./db/connection');

app.use(cors());
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Hello')
})
connection().then(() =>{
    console.log('connected')
})
app.use(ExplorationRoute);
app.use(UserRoute);

app.listen(8000, () => console.log(`Example app listening at http://161.35.19.105:${8000}`));
