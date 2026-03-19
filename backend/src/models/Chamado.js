const mongoose = require('mongoose');

const ChamadoSchema = new mongoose.Schema({
  unidade: { type: String, required: true },
  morador: { type: String, required: true },
  assunto: { type: String, required: true },
  descricao: { type: String, required: true },
  categoria: { type: String, required: true },
  prioridade: { type: String, enum: ['Alta', 'Media', 'Baixa'], default: 'Media' },
  status: { type: String, enum: ['Aberto', 'Em andamento', 'Concluido'], default: 'Aberto' },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: true });

module.exports = mongoose.model('Chamado', ChamadoSchema);