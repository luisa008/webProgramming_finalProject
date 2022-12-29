import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import mongo from './mongo';
import wsConnect from './wsConnect';
import dataInit from './initdb';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connected!");
    dataInit();
    wss.on('connection', (ws) => {
        ws.user = {};
        ws.state = "init";
        ws.onmessage = wsConnect.onMessage(ws, wss); 
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {console.log(`Listening on port ${PORT}!`)});