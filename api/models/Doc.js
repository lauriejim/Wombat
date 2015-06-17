/**
 * Doc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    project: {
      model: 'project'
    },
    owner: {
      model: 'user'
    },
    name: {
      type: 'STRING'
    },
    picto: {
      type: 'STRING'
    },
    link: {
      type: 'STRING'
    },
    f_id: {
      type: 'STRING'
    },
    type: {
      type: 'STRING'
    }
  }
};