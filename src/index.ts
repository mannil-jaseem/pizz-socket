import dotenv from "dotenv"
dotenv.config()
import "reflect-metadata";
import express, { Request } from "express"
import cluster, { Worker } from "cluster"
import { cpus } from "os"
import { useExpressServer } from "routing-controllers"
import "./controller/UserController";
import morgan from "morgan"
import Connection from "./database/connection";
import http from 'http';
import { Socket } from "./SOCKET";
// import { Server } from 'socket.io';


if (false) {
    let numCpus = cpus().length
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker: Worker, code) => {
        console.log(`Worker ${worker.process.pid} exited with code ${code}`);
        console.log('Fork new worker!');
        cluster.fork();
    });
} else {
    const app = express()
    const server = http.createServer(app);
    const socket = new Socket(server).init()
    app.use((req:Request,res,next)=>{
        req.sockIO=socket
    })
    const port = process.env.PORT
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    useExpressServer(app)
    app.use(morgan("dev"))
    Connection.init()

    server.listen(port, () => {
        console.log(`listening to port ${port}`)
    })

    app.on("error", (error: any) => {
        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
        if (error.syscall !== 'listen') throw error;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                console.error(error);
        }
    })
}