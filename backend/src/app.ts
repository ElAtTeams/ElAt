import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import authRouter from './routes/auth';

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
