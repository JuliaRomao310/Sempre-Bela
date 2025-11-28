import express from 'express';
import connection from './src/connection.js';
import cors from 'cors';
 
const app = express();
app.use(cors());
app.use(express.json());


//SALVAR AGENDAMENTO





app.listen(3000, () => {console.log("\nServidor Rodando!");
 
});