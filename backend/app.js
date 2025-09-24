const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('ElAt Backend Çalışıyor!');
});

sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('Sunucu 4000 portunda çalışıyor');
  });
});