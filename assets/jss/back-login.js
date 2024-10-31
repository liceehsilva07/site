const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'pizzaria_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Rotas de API para registro e login
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const checkQuery = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao verificar o usuário' });

        if (results.length > 0) {
            return res.status(409).json({ message: 'Nome de usuário ou email já estão em uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao registrar o usuário' });
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(query, [username], async (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao procurar o usuário' });

        if (result.length > 0) {
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return res.status(200).json({ message: 'Login bem-sucedido', isAdmin: user.isAdmin });
            } else {
                return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
            }
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    });
});

// Inicializar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
