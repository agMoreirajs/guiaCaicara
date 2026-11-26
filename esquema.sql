CREATE DATABASE IF NOT EXISTS roteiro_caicara
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE roteiro_caicara;

DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  usuario VARCHAR(60) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favoritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  atracao_id VARCHAR(80) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_fav (usuario_id, atracao_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

USE roteiro_caicara;

ALTER TABLE usuarios
ADD COLUMN foto_perfil VARCHAR(80) DEFAULT 'avatar1' AFTER usuario;

SELECT * FROM usuarios

SELECT * FROM favoritos

SELECT * FROM recuperacao_senha

ALTER TABLE usuarios
ADD COLUMN email VARCHAR(150) NOT NULL UNIQUE AFTER usuario;

CREATE TABLE IF NOT EXISTS recuperacao_senha (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  email VARCHAR(150) NOT NULL,
  codigo VARCHAR(6) NOT NULL,
  expira_em DATETIME NOT NULL,
  usado TINYINT(1) DEFAULT 0,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

ALTER TABLE usuarios ADD COLUMN email VARCHAR(150) NOT NULL UNIQUE AFTER usuario;
