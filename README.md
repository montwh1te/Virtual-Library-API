# 📚 Sistema de Biblioteca - API RESTful

API desenvolvida em **Node.js** com **Express** para gerenciar uma biblioteca, permitindo o cadastro e gerenciamento de **autores**, **livros**, **clientes** e **empréstimos**. Os dados são persistidos em um banco de dados **MySQL**, e a aplicação segue uma arquitetura MVC desacoplada.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Jest (testes unitários)
- Supertest (testes de integração)
- Dotenv (variáveis de ambiente)
- Railway (deploy do banco)

---

## 📦 Collection Postman

1. **Copie o link e importe no Postman:**

```bash
"https://senac2-6554.postman.co/workspace/senac-Workspace~7d0bec13-d5ec-4050-8f30-8ee819e59336/collection/42529771-a10286c5-bfe7-48c9-9a8c-4d83027ddb9a?action=share&creator=42529771&active-environment=42529771-e403f428-354e-4728-ae90-4d0470592b48"
```

---

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/sua-api-biblioteca.git
cd sua-api-biblioteca
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o banco de dados:**

Crie um arquivo `.env` na raiz com os dados da Railway ou seu banco local:

```
DB_HOST=ballast.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=sua-senha
DB_NAME=railway
DB_PORT=3306
```

> Você também pode renomear o arquivo `.env.example` (se houver).

4. **Crie as tabelas (caso necessário):**

```sql
CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  pais VARCHAR(100) NOT NULL
);

CREATE TABLE clientes (
  matricula VARCHAR(20) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL
);

CREATE TABLE livros (
  isbn VARCHAR(20) PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  autorId INT NOT NULL,
  disponivel BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (autorId) REFERENCES autores(id)
);

CREATE TABLE emprestimos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matriculaCliente VARCHAR(20),
  isbnLivro VARCHAR(20),
  dataRetirada DATE,
  dataPrevistaDevolucao DATE,
  dataDevolucao DATE,
  diasAtraso INT,
  FOREIGN KEY (matriculaCliente) REFERENCES clientes(matricula),
  FOREIGN KEY (isbnLivro) REFERENCES livros(isbn)
);
```

---

## 🛠️ Scripts disponíveis

```bash
npm run dev       # Inicia o servidor em modo de desenvolvimento (nodemon)
npm run start         # Inicia o servidor em produção
npm run test          # Roda todos os testes com Jest
```

---

## 📚 Estrutura de Pastas

```
src/
│
├── controllers/
│   ├── autor.controller.js
│   ├── cliente.controller.js
│   ├── livro.controller.js
│   └── emprestimo.controller.js
│
├── repositories/
│   ├── autor.repository.js
│   ├── cliente.repository.js
│   ├── livro.repository.js
│   └── emprestimo.repository.js
│
├── services/
│   ├── autor.service.js
│   ├── cliente.service.js
│   ├── livro.service.js
│   └── emprestimo.service.js
│
├── routes/
│   ├── autor.routes.js
│   ├── cliente.routes.js
│   ├── livro.routes.js
│   └── emprestimo.routes.js
│
├── db.js
└── app.js
```

---

## 🧪 Testes

- Os testes **unitários** verificam os repositórios (acesso ao banco de dados).
- Os testes **de integração** usam `supertest` para testar as rotas.

Estrutura dos testes:

```
tests/
├── repositories/
│   ├── autor.repository.test.js
│   ├── cliente.repository.test.js
│   ├── livro.repository.test.js
│   └── emprestimo.repository.test.js
│
└── routes/
    ├── autor.routes.test.js
    ├── cliente.routes.test.js
    ├── livro.routes.test.js
    └── emprestimo.routes.test.js
```

Para rodar todos os testes:

```bash
npm run test
```

> Em ambientes com MySQL remoto (como Railway), use:
```bash
npx jest --runInBand
```

---

## 📌 Endpoints

### Autores

| Método | Rota             | Descrição              |
|--------|------------------|------------------------|
| GET    | /autores         | Listar autores         |
| GET    | /autores/:id     | Buscar por ID          |
| POST   | /autores         | Criar autor            |
| PUT    | /autores/:id     | Atualizar autor        |
| DELETE | /autores/:id     | Deletar autor          |

### Clientes

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| GET    | /clientes         | Listar clientes        |
| GET    | /clientes/:matricula | Buscar por matrícula |
| POST   | /clientes         | Criar cliente          |
| PUT    | /clientes/:matricula | Atualizar cliente   |
| DELETE | /clientes/:matricula | Deletar cliente     |

### Livros

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| GET    | /livros           | Listar livros          |
| GET    | /livros/:isbn     | Buscar por ISBN        |
| POST   | /livros           | Criar livro            |
| PUT    | /livros/:isbn     | Atualizar livro        |
| DELETE | /livros/:isbn     | Deletar livro          |

### Empréstimos

| Método | Rota                       | Descrição                         |
|--------|----------------------------|-----------------------------------|
| GET    | /emprestimos               | Listar empréstimos                |
| GET    | /emprestimos/:id           | Buscar por ID                     |
| GET    | /emprestimos/cliente/:matricula | Buscar por cliente           |
| POST   | /emprestimos               | Criar empréstimo                  |
| POST   | /emprestimos/devolucao/:id | Registrar devolução do empréstimo|

---

## 👨‍💼 Autor

Desenvolvido por Eduardo Matuella – [@eduardomatuella](https://github.com/eduardomatuella)

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, estudar e contribuir.

