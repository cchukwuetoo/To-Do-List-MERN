import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import connectDB from './connection/db';
import cors from 'cors';
import dotenv from 'dotenv';
import toDoRoutes from './routes/ToDoRoute';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use(cors());


app.use('/api/todo', toDoRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('To-Do list API is running')
})

const startServer = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer()