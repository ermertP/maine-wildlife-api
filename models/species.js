
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 

//defined species model
const Species = sequelize.define('Species', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scientific_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },


  locations: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],    
    validate: {
      isValidLocationArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('locations must be an array');
        }
        for (const loc of value) {
          if (
            typeof loc !== 'object' ||
            typeof loc.coordinates !== 'object' ||
            typeof loc.coordinates.lat  !== 'number' ||
            typeof loc.coordinates.lng  !== 'number' ||
            typeof loc.county           !== 'string' ||
            typeof loc.place_name      !== 'string'
          ) {
            throw new Error(
              'each location must be { coordinates: { lat:number, lng:number }, county:string, place_name:string }'
            );
          }
        }
      }
    }
  },
current_status: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    isIn: [['Endangered', 'Threatened']] //enums
  }
},
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sub_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Error syncing database:', err));

module.exports = Species;
