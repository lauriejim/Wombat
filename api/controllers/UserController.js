/**
 * Module dependencies
 */

// Services
var UserService = require('../services/UserService');

module.exports = {
  login: function(req, res) {
    var password = req.param('password');
    var user = {
      email: req.param('email')
    };

    sails.controllers.user.get(user)
      .then(function(data) {
        user = data[0];

        return UserService.verifyPassword(password, user.password)
      })
      .then(function() {
        req.session.user = user;
        req.session.authenticated = true;

        res.redirect('/dashboard');
      })
      .catch(function(err) {
        if (err === 'badRequest') return res.badRequest();

        res.serverError(err)
      });
  },

  register: function(req, res) {
    var user = {
      firstname: req.param('firstname'),
      lastname: req.param('lastname'),
      email: req.param('email'),
      password: req.param('password'),
      rank: 'manager'
    }

    User.create(user)
      .exec(function(err, user) {
        var project = {
          pitch: req.param('pitch'),
          manager: user.id
        };

        Project.create(project)
          .exec(function(err, project) {
            needs = req.param('needs');

            needs.forEach(function(need) {

              Need.create({
                type: need.need,
                content: need.content,
                project: project.id
              }).exec(function() {

              });
            });
            res.send(200);
          });
      })
  },

  demande: function(req, res) {
    sails.controllers.user.get({
      id: req.session.user.id
    })
      .then(function(data) {
        data.demande.add(req.param('project'));
        data.save();
        res.send(200);
      });
  },

  demandeDelete: function(req, res) {
    sails.controllers.user.get({
      id: req.session.user.id
    })
      .then(function(data) {
        data.demande.remove(req.param('project'));
        data.save();
        res.send(200);
      });
  },

  coach: function(req, res) {
    sails.controllers.user.get({
      id: req.param('coach')
    })
      .then(function(data) {
        data.demande.remove(req.param('project'));
        data.projects.add(req.param('project'));
        data.save();
        res.json({});
      });
  },
  get: function(scope) {
    var deferred = Promise.defer();
    if (!scope) {
      scope = null;
    }
    User.find(scope)
      .exec(function(err, readed) {
        if (err) {
          return deferred.reject(err);
        }
        deferred.resolve((scope && scope.id) ? readed[0] : readed);
      });
    return deferred.promise;
  }
};