 const express = require('express');
const router = express.Router();
const Chamado = require('../models/Chamado');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const chamados = await Chamado.find().sort({ createdAt: -1 });
    res.json(chamados);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar chamados.' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const chamado = new Chamado({ ...req.body, usuarioId: req.usuario.id });
    await chamado.save();
    res.status(201).json(chamado);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar chamado.' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const chamado = await Chamado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(chamado);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar chamado.' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Chamado.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Chamado removido.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao remover chamado.' });
  }
});

module.exports = router;
