import express from 'express';

import './src/login';
import './src/register';
import './src/controllers/validations';
import './src/cadastroProduto';
import './src/controllers/firebase-init';
import './src/home';
import './src/loading';
import './src/controllers/auth-guard';

const server = express()
server.use(express.json())

const port = 3000

server.listen(port, ()=> {
    console.log('O servidor esta rodando');
});




