 const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('./models/Usuario');

dotenv.config();

const usuarios = [
  { nome: 'Sindico', email: 'sindico@condogest.com', senha: 'Sindico@2025', perfil: 'sindico', unidade: '' },
  { nome: 'Morador', email: 'morador@condogest.com', senha: 'Morador@2025', perfil: 'morador', unidade: 'Apto 204' },
  { nome: 'Zelador', email: 'zelador@condogest.com', senha: 'Zelador@2025', perfil: 'zelador', unidade: '' },
  { nome: 'Funcionario', email: 'funcionario@condogest.com', senha: 'Funcionario@2025', perfil: 'funcionario', unidade: '' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB conectado.');

  for (const u of usuarios) {
    const existente = await Usuario.findOne({ email: u.email });
    if (!existente) {
      const novo = new Usuario(u);
      await novo.save();
      console.log(`Usuario criado: ${u.email}`);
    } else {
      console.log(`Usuario ja existe: ${u.email}`);
    }
  }

  mongoose.connection.close();
  console.log('Seed concluido.');
}

seed();
