const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://condogest-snowy.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/chamados', require('./routes/chamados'));
app.use('/api/moradores', require('./routes/moradores'));
app.use('/api/financeiro', require('./routes/financeiro'));

app.get('/', (req, res) => {
  res.json({ mensagem: 'CondoGest API funcionando.' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar MongoDB:', err.message);
  });
```

Salve com **Ctrl + S**.

Agora no **terceiro terminal** (cmd):
```
cd C:\Users\MICRO\Desktop\newgen
```
```
git add .
```
```
git commit -m "fix cors"
```
```
git push