import { Server } from "./server";
import './data/mysql'

const server = new Server();
server.start();