import { autenticarUsuario } from '../services/auth.service.js';

export function login(req, res) {
  const { username, password } = req.body;
  try {
    const token = autenticarUsuario(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}