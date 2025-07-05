const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/todo', require('./routes/ToDoRoute'));

app.get('/', (req, res) => {
    res.send('To-Do list API is running')
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB')
    
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})