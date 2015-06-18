/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  req.session.flashMessage = {};

  if (!req.session.message) {
    req.session.flashMessage = {};
    req.session.message = {};
    return next();
  }

  req.session.flashMessage = _.clone(req.session.message);
  req.session.message = {};
  return next();

};