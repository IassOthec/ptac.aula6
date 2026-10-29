// server.js
import express from 'express';
// Aqui nós importamos tudo o que criamos no arquivo de services:
import { findAll, findById, create, update, remove, validateUserPayload } from './services/users.js';

const app = express();
app.use(express.json());

let bancoUsuarios = [
  { id: 1, nome: "João Silva", email: "joao@email.com" }
];

app.get('/users', (req, res) => {
  const todosUsuarios = findAll(bancoUsuarios);
  res.status(200).json(todosUsuarios);
});

app.get('/users/:id', (req, res) => {
  const usuarioEncontrado = findById(bancoUsuarios, req.params.id);
  if (!usuarioEncontrado) {
    return res.status(404).json({ erro: "Usuário não encontrado." });
  }
  res.status(200).json(usuarioEncontrado);
});

app.post('/users', (req, res) => {
  const resultadoValidacao = validateUserPayload(req.body);
  if (!resultadoValidacao.valido) {
    return res.status(400).json({ erro: resultadoValidacao.mensagem });
  }
  bancoUsuarios = create(bancoUsuarios, req.body);
  const ultimoUsuario = bancoUsuarios[bancoUsuarios.length - 1];
  res.status(201).json(ultimoUsuario);
});

app.put('/users/:id', (req, res) => {
  const usuarioExiste = findById(bancoUsuarios, req.params.id);
  if (!usuarioExiste) {
    return res.status(404).json({ erro: "Usuário não encontrado para atualizar." });
  }
  const resultadoValidacao = validateUserPayload(req.body);
  if (!resultadoValidacao.valido) {
    return res.status(400).json({ erro: resultadoValidacao.mensagem });
  }
  bancoUsuarios = update(bancoUsuarios, req.params.id, req.body);
  res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
});

app.delete('/users/:id', (req, res) => {
  const usuarioExiste = findById(bancoUsuarios, req.params.id);
  if (!usuarioExiste) {
    return res.status(404).json({ erro: "Usuário não encontrado para remover." });
  }
  bancoUsuarios = remove(bancoUsuarios, req.params.id);
  res.status(200).json({ mensagem: "Usuário removido com sucesso." });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});

