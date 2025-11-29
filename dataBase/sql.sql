CREATE DATABASE IF NOT EXISTS sempreBela;
USE sempreBela;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_agendada DATE NOT NULL,
    horario TIME NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);

CREATE TABLE proprietaria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

INSERT INTO servicos (nome, preco) VALUES ('Corte de Cabelo', 45.00);
INSERT INTO servicos (nome, preco) VALUES ('Tintura de Cabelo', 45.00);
INSERT INTO servicos (nome, preco) VALUES ('Hidratação', 40.00);
INSERT INTO servicos (nome, preco) VALUES ('Escova', 40.00);
INSERT INTO servicos (nome, preco) VALUES ('Sombrancelha', 25.00);
INSERT INTO servicos (nome, preco) VALUES ('Manicure', 25.00);
INSERT INTO servicos (nome, preco) VALUES ('Pedicure', 25.00);
INSERT INTO servicos (nome, preco) VALUES ('Combo Pé e Mão', 50.00);
INSERT INTO servicos (nome, preco) VALUES ('Combo Tintura + Escova', 80.00);
