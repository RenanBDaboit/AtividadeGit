const express = require('express');
const cors = require('cors');
const connection = require('./db');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM Produto';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send({erro: erro.message});
        }
        res.json(resultados);
    });
});

server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM Produto ORDER BY nome ASC';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send({erro: erro.message});
        }
        res.json(resultados);
    });
});

const PORT = 3056;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});