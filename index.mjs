import dotenv from "dotenv";
import  express  from "express";
import { Server } from 'socket.io'
import http from 'http';
import userRoutes from "./routes/userRoutes.mjs";

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi  from 'swagger-ui-express';

import Functions from "./functions/index.mjs";
import { options } from "./docs/documentation.mjs";
import perfilRoutes from "./routes/perfilRoutes.mjs";
import especialidadesRoutes from "./routes/especialidadeRoutes.mjs";
import medicosRoute from "./routes/medicosRoute.mjs";
import AgendamentoControllerRoutes from "./routes/agendamentoRoutes.mjs";

dotenv.config();

const api = express();
api.use(express.json());

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const server = http.createServer(api);

const io = new Server(server,{pingInterval:60000,cors:{origin:'http://localhost:3000'}})
  
const swaggerSpec = swaggerJsdoc(options);

const startedDatetime = new Date();

server.listen(port,()=>{
    console.log(`API is starting...`)
    console.log(`started at:${startedDatetime}`)

})
api.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

api.get('/',(req,res,next)=>{
    const info={
        Status:'Online',
        Uptime:Functions.formatUptime(process.uptime()),
        startedAt:startedDatetime
        
    }
    return res.status(200).json(info);
})

api.use('/users',userRoutes);
api.use('/perfil',perfilRoutes)
api.use('/especialidade',especialidadesRoutes)
api.use('/medicos',medicosRoute)
api.use('/agendamento',AgendamentoControllerRoutes)

io.on('connection',socket =>{
    console.log(`Usuário Connect!`,socket.id)
    
    socket.on('disconnect',reason =>{
        console.log('Usuário desconectado!',socket.id)
        console.log(reason)
    })
    socket.on('set_username',username=>{

        const {roomId} = username
        
        socket.data.username=username
        socket.join(roomId)

    })

    socket.on('message',text=>{
        io.emit('receive_message',{
            text,
            authorId:socket.id,
            author:socket.data.username
        })
    })
})
