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

  logout: function(req, res) {
    delete req.session.user;
    delete req.session.authenticated;

    res.redirect('/');
  },

  register: function(req, res) {
    var user = {
      firstname: req.param('firstname'),
      lastname: req.param('lastname'),
      email: req.param('email'),
      password: req.param('password'),
      rank: 'manager',

      entreprise: 'HETIC',
      expertise: ['UI', 'Juridique']
    }

    User.create(user)
      .exec(function(err, user) {
        req.session.user = user;
        req.session.authenticated = true;

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
            res.json({});
          });
      })
  },

  demande: function(req, res) {
    Demande.create({
      coach: req.session.user.id,
      project: req.param('project'),
      type: req.param('type'),
      valide: false
    }).exec(function(err, demande) {
      res.json({});
    });
  },

  demandeDelete: function(req, res) {
    Demande.find({
      coach: req.session.user.id,
      project: req.param('project')
    }).exec(function(err, demande) {
      Demande.destroy(demande.id)
        .exec(function(err, demande) {
          res.json({});
        });
    });
  },

  coach: function(req, res) {
    Demande.find({
      coach: req.param('coach'),
      project: req.param('project')
    })
      .exec(function(err, demande) {
        Demande.update(demande[0].id, {
          valide: true
        })
          .exec(function(err, demande) {
            res.json({});
          });
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