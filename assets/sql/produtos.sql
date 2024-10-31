CREATE DATABASE pizzaria;

USE pizzaria;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    tamanho VARCHAR(50),
    imagem VARCHAR(255)
);
