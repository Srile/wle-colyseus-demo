const http = require('http');
const express = require('express');
const cors = require('cors');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;
// const socialRoutes = require("@colyseus/social/express").default;

const MyRoom = require('./rooms/MyRoom').MyRoom;

const port = process.env.PORT || 2567;
const app = express()

app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://localhost:8080',
        'https://localhost:3000',
    ],
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.set('trust proxy', 'loopback, 0.0.0.0');
const server = http.createServer(app);
const gameServer = new colyseus.Server({
  server: server,
});

// register your room handlers
gameServer.define('my_room', MyRoom);

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the require statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port, '0.0.0.0');
console.log(`Listening on ws://0.0.0.0:${ port }`)
