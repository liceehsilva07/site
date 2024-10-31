const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importe o CORS

const app = express();

app.use(cors());  // Habilite o CORS
app.use(bodyParser.json());  // Permite o parsing de JSON no corpo da requisição

// Conexão ao banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',  // Substitua pela senha do MySQL
    database: 'pizzaria'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Endpoint para listar produtos
app.get('/produtos', (req, res) => {
    let sql = 'SELECT * FROM produtos';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar produtos');
            return;
        }
        res.json(results);  // Retorna os produtos como JSON
    });
});

// Endpoint para inserir produtos
app.post('/produtos', (req, res) => {
    const { nome, descricao, precoPequena, precoMedia, precoGrande, precoGigante, imagem } = req.body;

    const sql = `
        INSERT INTO produtos (nome, descricao, preco_pequena, preco_media, preco_grande, preco_gigante, imagem) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [nome, descricao, precoPequena, precoMedia, precoGrande, precoGigante, imagem], (err, result) => {
        if (err) {
            console.error('Erro ao inserir produto no banco de dados:', err);
            return res.status(500).send('Erro ao inserir produto');
        }
        res.send('Produto inserido com sucesso');
    });
});


// Servir a aplicação
const PORT = 3001;  
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
