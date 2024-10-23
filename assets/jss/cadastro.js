// index.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Coloque a senha do seu banco de dados
    database: 'pizzaria_nave'
});

// Conectar ao banco
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Rota para exibir a página de registro
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/registro.html');
});

// Rota para processar o formulário de registro
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Verificar se o e-mail já está registrado
    let query = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erro ao registrar. Tente novamente.');
        }
        console.log('Usuário registrado com sucesso!');
        res.redirect('login.html'); // Redireciona para a página de login após o registro
    });
});

// Rota para exibir a página de login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + 'login.html');
});

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

/* HASH DE SENHA */

const bcrypt = require('bcrypt');

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    let query = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erro ao registrar. Tente novamente.');
        }
        console.log('Usuário registrado com sucesso!');
        res.redirect('login.html');
    });
});
