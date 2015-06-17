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
    audit: {
      type: "STRING"
    },
    open: {
      type: 'BOOLEAN'
    },
    needs: {
      collection: 'need',
      via: 'project'
    },
    manager: {
      model: "user"
    },
    demandes: {
      collection: 'demande',
      via: 'project'
    },
    docs: {
      collection: 'doc',
      via: 'project'
    }
  }
};