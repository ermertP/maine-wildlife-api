const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const sequelize = require('./db'); // Import your db.js file
const species = require('./controllers/species'); // Import the controller


app.use(express.json());
app.use(cors());


// Test database connection and log to console
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();  // Test the database connection
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testDatabaseConnection();


// Defined route for Endangered Species data
app.use("/species", species)

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
