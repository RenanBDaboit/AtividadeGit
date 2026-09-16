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

server.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = 'SELECT * FROM Produto WHERE id_produto = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).send({erro: erro.message});
        }
        res.json(resultados);
    });
});

server.get('/produtos/busca/:nome', (req, res) => {
    const termoBusca = '%' + req.params.nome + '%';
    
    const sql = 'SELECT * FROM Produto WHERE nome LIKE ?';

    connection.query(sql, [termoBusca], (erro, resultados) => {
        if (erro) {
            return res.status(500).send({erro: erro.message});
        }
        res.json(resultados);
    });
});

server.post('/produtos', (req, res) => {
    const { nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario, id_categoria } = req.body;
    const sql = 'INSERT INTO Produto (nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    if(nome == null || cor == null || textura == null || peso == null || unidade_medida == null || aplicacao == null || data_validade == null || estoque_minimo == null || estoque_atual == null || preco_unitario == null || id_categoria == null) {
        return res.status(400).send({erro: 'Todos os campos são obrigatórios.'});
    }


    connection.query(sql, [nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, 
        estoque_minimo, estoque_atual, preco_unitario, id_categoria], (erro, resultado) => {
        if (erro) {
            return res.status(500).send({erro: erro.message});
        }
        res.status(201).json(resultado);
        
        res.json({
            mensagem: 'Produto cadastrado com sucesso!',
            id: resultado.insertId
        })
    });
});

const PORT = 3056;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});