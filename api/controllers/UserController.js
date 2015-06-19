/**
 * Module dependencies
 */

// Services
var UserService = require('../services/UserService');
var Promise = require('bluebird');

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
      .then(function(match) {
        if (!match) {
          var message = {
            type: 'warning',
            message: 'Email or password is bad'
          };
          sails.controllers.app.displayFlashMessage(req, message);
          res.redirect('/');
        }

        req.session.user = user;
        req.session.authenticated = true;

        res.redirect('/');
      })
      .catch(function(err) {
        var message = {
          type: 'warning',
          message: 'Email or password is bad'
        };
        sails.controllers.app.displayFlashMessage(req, message);

        res.redirect('/');
      });
  },

  logout: function(req, res) {
    delete req.session.user;
    delete req.session.authenticated;

    res.redirect('/');
  },

  registerCoach: function(req, res) {
    var user = {
      firstname: req.param('firstname'),
      lastname: req.param('lastname'),
      email: req.param('email'),
      password: req.param('password'),
      rank: 'coach',

      entreprise: req.param('entreprise'),
      expertise: [],

      country: '',
      compte: '',
      agence: '',
      iban: '',
      bic: ''
    };

    User.create(user)
      .exec(function(err, user) {
        if (err) {
          var message = {
            type: 'warning',
            message: 'Email already exist'
          };
          sails.controllers.app.displayFlashMessage(req, message);
          return res.json({
            err: err
          });
        }

        req.session.user = user;
        req.session.authenticated = true;

        var message = {
          type: 'success',
          message: 'Félicitation, votre compte à été créé.'
        };
        sails.controllers.app.displayFlashMessage(req, message);

        res.json({});
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
        if (err) {
          var message = {
            type: 'warning',
            message: 'Email already exist'
          };
          sails.controllers.app.displayFlashMessage(req, message);
          return res.json({
            err: err
          });
        }

        req.session.user = user;
        req.session.authenticated = true;

        var project = {
          pitch: req.param('pitch'),
          open: false,
          audit: 'none',
          manager: user.id
        };

        Project.create(project)
          .exec(function(err, project) {
            needs = req.param('needs') || [];

            needs.forEach(function(need) {

              Need.create({
                type: need.need,
                content: need.content,
                project: project.id
              }).exec(function() {

              });
            });
            var message = {
              type: 'success',
              message: 'Félicitation, votre compte à été créé.'
            };
            sails.controllers.app.displayFlashMessage(req, message);

            res.json({});
          });
      })
  },

  demande: function(req, res) {
    Demande.create({
      coach: req.session.user.id,
      project: req.param('project'),
      type: req.param('type'),
      comment: req.param('comment'),
      hours: req.param('hours'),
      price: req.param('price'),
      weeks: req.param('weeks'),
      validated: false,
      open: true
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
    function close(id) {
      var deferred = Promise.defer();
      Demande.update(id, {
        open: false
      })
        .exec(function(err, demande) {
          deferred.resolve();
        });
      return deferred.promise;
    }

    Project.find(req.param('project'))
      .populate('demandes')
      .exec(function(err, project) {
        var liste = [];
        project[0].demandes.forEach(function(demande) {
          liste.push(close(demande.id));
        });

        Promise.all(liste)
          .then(function() {
            Demande.find({
              coach: req.param('coach'),
              project: req.param('project'),
              type: req.param('type')
            })
              .exec(function(err, demande) {
                Demande.update(demande[0].id, {
                  validated: true,
                  open: false
                })
                  .exec(function(err, demande) {
                    res.json({});
                  });
              });
          });
      });
  },

  meCoach: function(req, res) {
    res.view('coach');
  },

  updateCoach: function(req, res) {
    var coach = req.params.all();
    User.update(req.session.user.id, coach)
      .exec(function(err, user) {
        req.session.user = user[0];
        var message = {
          type: 'success',
          message: 'Profil updated'
        };
        sails.controllers.app.displayFlashMessage(req, message);
        res.redirect('/coach');
      });
  },

  manager: function(req, res) {
    res.view('manager');
  },

  updateManager: function(req, res) {
    var manager = req.params.all();
    User.update(req.session.user.id, manager)
      .exec(function(err, user) {
        req.session.user = user[0];
        var message = {
          type: 'success',
          message: 'Profil updated'
        };
        sails.controllers.app.displayFlashMessage(req, message);
        res.redirect('/manager');
      });
  },

  credit: function(req, res) {
    res.view('credit');
  },

  updateCredit: function(req, res) {
    var card = req.params.all();
    User.update(req.session.user.id, card)
      .exec(function(err, user) {
        req.session.user = user[0];
        var message = {
          type: 'success',
          message: 'Compte updated'
        };
        sails.controllers.app.displayFlashMessage(req, message);
        res.redirect('/credit');
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