const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router/index');
const {connect} = require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try {
        await connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT,() => console.log(`Server has been started on PORT = ${PORT}`));
    } catch (e) {
        console.log(`Error started ${e}`);
    }
}

start();
