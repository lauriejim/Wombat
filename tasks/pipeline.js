/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'plugins/pace/pace-theme-flash.css',
  'plugins/jquery-slider/css/jquery.sidr.light.css',

  'plugins/boostrapv3/css/bootstrap.min.css',
  'plugins/boostrapv3/css/bootstrap-theme.min.css',
  'plugins/font-awesome/css/font-awesome.css',
  'styles/animate.min.css',
  'plugins/bootstrap-select2/select2.css',

  'styles/style.css',
  'styles/responsive.css',
  'styles/custom-icon-set.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  'js/lodash.js',
  'plugins/jquery-1.8.3.min.js',
  'plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js',
  'plugins/bootstrap/js/bootstrap.min.js',
  'plugins/breakpoints.js',
  'plugins/jquery-unveil/jquery.unveil.min.js',

  'plugins/jquery-slider/jquery.sidr.min.js',
  'plugins/jquery-slimscroll/jquery.slimscroll.min.js',
  'plugins/pace/pace.min.js',
  'plugins/jquery-numberAnimate/jquery.animateNumbers.js',
  'plugins/jquery.cookie.js',
  'plugins/bootstrap-select2/select2.min.js',

  'js/core.js',
  'js/demo.js'

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  // 'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});