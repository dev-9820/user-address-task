const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors');
const app = express();


app.use(cors());
// Middleware
app.use(bodyParser.json());

// Serve the form from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3000', // React app's URL
}));


// Routes
app.use('/api/users', userRoutes);
// Connect to MongoDB
mongoose
  .connect('mongodb+srv://username:username@cluster22.y1gvx.mongodb.net/datatest?retryWrites=true&w=majority&appName=Cluster22', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
