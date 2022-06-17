const express = require('express');

const PORT = 4000;

const app = express();

const start = async () => {
    try {
        app.listen(() => console.log(`Server has been started on PORT = ${PORT}`));
    } catch (e) {
        console.log(`Error started ${e}`);
    }
}

start();
