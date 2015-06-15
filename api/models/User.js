/**
 * Module dependencies
 */

// Services
var UserService = require('../services/UserService');

module.exports = {

  attributes: {
    email: {
      type: 'STRING'
    },
    firstname: {
      type: 'STRING'
    },
    lastname: {
      type: 'STRING'
    },
    password: {
      type: 'STRING'
    },
    entreprise: {
      type: 'STRING'
    },
    expertise: {
      type: 'ARRAY'
    },
    rank: {
      type: 'STRING'
    },
    demande: {
      collection: 'demande',
      via: 'coach'
    }
  },

  beforeCreate: function(user, cb) {
    UserService.hashPassword(user)
      .then(function(user) {

        cb();
      })
      .catch(function(err) {
        cb(err);
      });
  }
};