import express from 'express';

const sessionRoutes = require('./routes/sessionRoutes');
const roomRoutes = require('./routes/roomRoutes');

export const app = express();
const cors = require('cors');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

const PORT = 3001;

app.use('/session', sessionRoutes);
app.use('/room', roomRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});