import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import db from './db.js';
import api from './api';
import config from '../../config.json';
import fs from 'fs';
import multer from 'multer';
let upload = multer();

let app = express();
app.server = http.createServer(app);
let hskey = fs.readFile('hr.key', 'utf8');
let hscert = fs.readFile('hr.crt', 'utf8');

let options = {
    key: hskey,
    cert: hscert
};
app.servers = https.createServer(options, app);
app.use(morgan('dev'));

app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(bodyParser.raw({ type: 'application/vnd.costom-type' }));

app.use(upload.array());
app.use(express.static('public'));

app.use(bodyParser.text({
    type: "text/plain"
}));

app.use('/', api());

app.use(errorHandler);

function errorHandler(err, req, res, next) {
    if (err) {
        res.status(400).json({ "error": 1, "message": err, "data": "" });
    }
}

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
console.log("112")
https.createServer({
    key: fs.readFileSync('hr.key'),
    cert: fs.readFileSync('hr.crt')
}, app).listen(3019);
console.log("113")