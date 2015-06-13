/**
 * Module dependencies
 */

// Public node modules
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

/**
 *
 *  @action :: Format and check some informations
 *
 *  @param
 *    user  :: {Object} User object
 *
 *  @return :: {Promise} User object
 *
 */

exports.hashPassword = function(user) {
  var deferred = Promise.defer();

  if (user.password) {
    bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) {
        deferred.reject(err);
      } else {
        user.password = hash;
        deferred.resolve(user);
      }
    });
  } else {
    deferred.resolve(user);
  }
  return deferred.promise;
};

/**
 *
 *  @action             :: Verify if one password match with an encrypted password
 *
 *  @param
 *    password          :: {String} Password
 *    encryptedPassword :: {String} Encrypted password
 *
 *  @return             :: {Boolean}
 *
 */

exports.verifyPassword = function(password, encryptedPassword) {
  var deferred = Promise.defer();
  bcrypt.compare(password, encryptedPassword, function(err, passwordMatch) {
    if (err) return deferred.reject(err);
    if (passwordMatch) deferred.resolve(true);
    else deferred.resolve(false);
  });
  return deferred.promise;
};