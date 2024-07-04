import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user');

app.get('/', (req, res) => {
  res.json({ message: 'AOA Zunnoorain!' });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
