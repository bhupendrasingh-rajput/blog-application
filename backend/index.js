const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');

app.use(cors());
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.json({
        'Name': 'Blog App Server',
        'Status': 'Active',
        'Date & Time': new Date().toLocaleString()
    })
})

app.use('/auth', userRoutes);
app.use('/blog', blogRoutes);

// database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
