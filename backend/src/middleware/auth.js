const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

router.post('/login', async (req, res) => {
  try {
    const { email, senha, perfil } = req.body;

    const usuario = await Usuario.findOne({ email, perfil });
    if (!usuario) {
      return res.status(400).json({ mensagem: 'Credenciais invalidas.' });
    }

    const senhaValida = await usuario.verificarSenha(senha);
    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'Credenciais invalidas.' });
    }

    const token = jwt.sign(
      { id: usuario._id, perfil: usuario.perfil, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        unidade: usuario.unidade,
      },
    });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor.' });
  }
});

router.post('/cadastrar', async (req, res) => {
  try {
    const { nome, email, senha, perfil, unidade } = req.body;

    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.status(400).json({ mensagem: 'E-mail ja cadastrado.' });
    }

    const usuario = new Usuario({ nome, email, senha, perfil, unidade });
    await usuario.save();

    res.status(201).json({ mensagem: 'Usuario cadastrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor.' });
  }
});

module.exports = router;