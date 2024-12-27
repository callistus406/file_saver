import express from 'express';
import cors from 'cors';
import fileRoutes from './routes';
import path from 'path';
import connectMongo from './config/mongo.connect';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
connectMongo()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileRoutes);

app.get('/', (req, res) => {
    res.send('File Upload & Download API is running');
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
