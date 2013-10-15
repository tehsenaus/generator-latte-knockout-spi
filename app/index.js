'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var LatteKnockoutSpiGenerator = module.exports = function LatteKnockoutSpiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LatteKnockoutSpiGenerator, yeoman.generators.Base);

LatteKnockoutSpiGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'packageName',
    message: 'Package name?'
  }];

  this.prompt(prompts, function (props) {
    this.packageName = props.packageName;

    cb();
  }.bind(this));
};

LatteKnockoutSpiGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/common');
  
  this.mkdir('lib');
  this.mkdir('lib/common');
  this.mkdir('lib/server');
  this.mkdir('lib/client');

  this.mkdir('static');
  this.mkdir('static/lib');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');

  this.directory('src', 'src');
};

LatteKnockoutSpiGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('npmignore', '.npmignore');
};
