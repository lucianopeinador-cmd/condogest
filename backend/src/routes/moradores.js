 const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const moradores = await Usuario.find({ perfil: 'morador' }).select('-senha');
    res.json(moradores);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar moradores.' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { nome, email, senha, unidade } = req.body;

    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.status(400).json({ mensagem: 'E-mail ja cadastrado.' });
    }

    const morador = new Usuario({ nome, email, senha, perfil: 'morador', unidade });
    await morador.save();

    res.status(201).json({ mensagem: 'Morador cadastrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar morador.' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const morador = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-senha');
    res.json(morador);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar morador.' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Morador removido.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao remover morador.' });
  }
});

module.exports = router;
