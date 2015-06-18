/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  show: function(req, res) {
    Project.find({
      manager: req.session.user.id
    })
      .populate('needs')
      .exec(function(err, project) {
        console.log(project);
        res.view('project', {
          project: project[0]
        });
      });
  },

  projectEspace: function(req, res) {
    Doc.find({
      project: req.param('id')
    })
      .populate('owner')
      .exec(function(err, docs) {
        console.log(docs);
        res.view('projectEspace', {
          docs: docs,
          projectID: req.param('id')
        });
      });
  },

  projects: function(req, res) {
    Project.find()
      .populate('needs')
      .populate('manager')
      .populate('demandes')
      .exec(function(err, projects) {
        console.log(projects);
        res.view('projects', {
          projects: projects
        });
      });
  },

  coachs: function(req, res) {
    Project.find({
      manager: req.session.user.id
    })
      .exec(function(err, project) {
        Demande.find({
          project: project[0].id
        })
          .populate('project')
          .populate('coach')
          .exec(function(err, demandes) {
            console.log(demandes);

            res.view('coachs', {
              demandes: demandes
            });
          });
      });
  },

  start: function(req, res) {
    Project.update(req.param('project'), {
      open: true
    })
      .exec(function(err, project) {
        res.json({});
      });
  },

  audits: function(req, res) {
    Project.find({
      where: {
        audit: 'open'
      }
    })
      .populate('manager')
      .populate('needs')
      .populate('demandes')
      .exec(function(err, projects) {
        console.log(projects);
        res.view('audits', {
          projects: projects
        });
      });
  },

  audit: function(req, res) {
    Project.update({
      manager: req.session.user.id
    }, {
      audit: 'open'
    })
      .exec(function(err, project) {
        res.json({});
      });
  },

  update: function(req, res) {
    scope = req.params.all();
    sails.log(scope);

    Project.update(req.param('id'), scope)
      .exec(function(err, updated) {
        sails.log(err, updated);
        res.redirect('/project');
      });
  }
};