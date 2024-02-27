import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { User } from "./models/userModel.js";
import usersRoute from './routes/usersRoute.js';
import cors from 'cors';

const app = express();

//Middleware para a requisição do corpo da request
app.use(express.json());

//Middleware para o manuseio de CORS
app.use(cors({ origin: '*' }));

app.use('/users', usersRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Conectado ao banco de dados');
        app.listen(PORT, () => {
            console.log(`Ouvindo a porta: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
