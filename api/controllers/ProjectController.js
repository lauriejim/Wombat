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
    Demande.find({
      coach: req.session.user.id
    })
      .populate('project')
      .populate('coach')
      .exec(function(err, demandes) {
        console.log(demandes);

        res.view('coachs', {
          demandes: demandes
        });
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