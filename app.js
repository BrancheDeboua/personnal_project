const express = require('express');

const app = express();

app.use((req, res) => {
    res.send("My personnal project");
});

app.listen(3000, () => {
    console.log('Server is up');
});