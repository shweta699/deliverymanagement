const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const componentRoutes = require('./routes/componentRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const issueRoutes = require('./routes/issueRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/vehicleService', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/components', componentRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/issues', issueRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
