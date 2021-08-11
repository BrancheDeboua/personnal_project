const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use((req, res) => {
    res.send("My personnal project");
});

server.listen(3000, () => {
    console.log('Server is up');
});