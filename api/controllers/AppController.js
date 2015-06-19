/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  dashboard: function(req, res) {
    res.view('homepage');
  },

  auth: function(req, res) {
    if (req.session.authenticated) {
      if (req.session.user.rank === 'manager') {
        res.redirect('/dashboard');
      } else {
        res.redirect('/projects');
      }
    } else {
      res.view('auth', {
        layout: false
      });
    }
  },

  /**
   * Set new flash message
   * @param  {Object} flash type
   *                        message
   */
  displayFlashMessage: function(req, flash) {
    if (!req.session.message[flash.type]) {
      req.session.message[flash.type] = [];
    }

    req.session.message[flash.type].push(flash.message);
  }
};