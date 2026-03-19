const mongoose = require('mongoose');

const FinanceiroSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  tipo: { type: String, enum: ['receita', 'despesa'], required: true },
  categoria: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true },
  unidade: { type: String, default: '' },
  status: { type: String, enum: ['pago', 'pendente', 'atrasado'], default: 'pendente' },
}, { timestamps: true });

module.exports = mongoose.model('Financeiro', FinanceiroSchema);