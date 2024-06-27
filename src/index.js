// index.js
require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./src/router/userRouter');
const AppDataSource = require('./src/lib/datasource');
const authMiddleware = require('./src/middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.use('/users', authMiddleware, userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
