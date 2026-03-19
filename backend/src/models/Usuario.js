const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  perfil: { type: String, enum: ['sindico', 'morador', 'zelador', 'funcionario'], required: true },
  unidade: { type: String, default: '' },
  ativo: { type: Boolean, default: true },
}, { timestamps: true });

UsuarioSchema.pre('save', async function () {
  if (!this.isModified('senha')) return;
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

UsuarioSchema.methods.verificarSenha = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
