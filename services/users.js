// services/users.js

export const findAll = (listaUsuarios) => listaUsuarios;

export const findById = (listaUsuarios, id) => {
  return listaUsuarios.find(usuario => usuario.id === parseInt(id));
};

export const create = (listaUsuarios, dadosNovoUsuario) => {
  const novoUsuario = { id: Date.now(), ...dadosNovoUsuario };
  return [...listaUsuarios, novoUsuario];
};

export const update = (listaUsuarios, id, dadosAtualizados) => {
  return listaUsuarios.map(usuario => usuario.id === parseInt(id) ? { ...usuario, ...dadosAtualizados } : usuario);
};

export const remove = (listaUsuarios, id) => {
  return listaUsuarios.filter(usuario => usuario.id !== parseInt(id));
};

export const validateUserPayload = (dados) => {
  if (!dados.nome || !dados.email) {
    return { valido: false, mensagem: "Nome e email são obrigatórios." };
  }
  return { valido: true };
};


