import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'API&ServicesDevelopment';

// Apenas para exemplo de auth sem registro de usuários
const usuarioFake = {
  username: 'root',
  password: '1234'
};

export function autenticarUsuario(username, password) {
  if (username === usuarioFake.username && password === usuarioFake.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
  throw new Error('Usuário ou senha inválidos');
}