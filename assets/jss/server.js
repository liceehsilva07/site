const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Inicializando o Express
const app = express();

// Configurações do servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // seu usuário MySQL
    port: 3306, // Verifique se a porta é a correta
    password: '1234',  // sua senha MySQL
    database: 'login_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Registro de novo usuário
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);  // Para verificar se o corpo da requisição está sendo recebido corretamente
    if (!email || !password) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, result) => {
        if (err) {
            console.error("Erro na consulta ao banco de dados: ", err);
            return res.status(500).json({ message: "Erro no servidor" });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: "Usuário já registrado" });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            db.query(insertUserQuery, [email, hashedPassword], (err, result) => {
                if (err) {
                    console.error("Erro ao inserir usuário: ", err);
                    return res.status(500).json({ message: "Erro no servidor" });
                }
                res.status(201).json({ message: "Usuário registrado com sucesso" });
            });
        } catch (error) {
            console.error("Erro durante o processo de criptografia: ", error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    });
});

// Inicializando o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Verificar se o email foi fornecido
    if (!email || !password) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    // Verificar se o usuário existe
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, result) => {
        if (err) {
            console.error("Erro na consulta ao banco de dados: ", err);
            return res.status(500).json({ message: "Erro no servidor" });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        // Verificar a senha
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Senha incorreta" });
        }

        // Se a senha estiver correta, retornar sucesso
        return res.status(200).json({ message: "Login efetuado com sucesso" });
    });
});
