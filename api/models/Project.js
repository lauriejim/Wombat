/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    pitch: {
      type: "STRING"
    },
    needs: {
      collection: 'need',
      via: 'project'
    },
    manager: {
      model: "user"
    },
    coachs: {
      collection: 'user',
      via: 'demande'
    }
  }
};