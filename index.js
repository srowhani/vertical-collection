/* eslint-env node */
'use strict';

var chalk = require('chalk');
var stripClassCallCheck = require('babel5-plugin-strip-class-callcheck');
var filterImports = require('babel-plugin-filter-imports');
var removeImports = require('./lib/babel-plugin-remove-imports');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'vertical-collection',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    this.options = this.options || {};
  },

  _hasSetupBabelOptions: false,
  _setupBabelOptions: function(env) {
    if (this._hasSetupBabelOptions) {
      return;
    }

    var babelOptions = this.options.babel = this.options.babel || {};

    babelOptions.plugins = babelOptions.plugins || [];
    babelOptions.plugins.push({ transformer: stripClassCallCheck, position: 'after' });

    var strippedModules;
    var importNames;

    if (/production/.test(env) || /test/.test(env)) {
      strippedModules = {
        'vertical-collection/-debug/helpers': [
          'assert',
          'warn',
          'debug',
          'debugOnError',
          'instrument',
          'deprecate',
          'stripInProduction'
        ]
      };
      importNames = ['vertical-collection/-debug/helpers'];

      babelOptions.plugins.push(
        filterImports(strippedModules),
        removeImports(importNames)
      );
    }

    this._hasSetupBabelOptions = true;
  },

  included: function(app) {
    // this._super.included.apply(this, arguments);

    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    if (typeof app.import !== 'function') {
      throw new Error('vertical-collection is being used within another addon or engine ' +
        'and is having trouble registering itself to the parent application.');
    }

    this._env = app.env;
    this._setupBabelOptions(app.env);

    if (!/production/.test(app.env) && !/test/.test(app.env)) {
      this.ui.write(
        chalk.grey("\n===================================================================\n") +
        chalk.cyan("\tVertical Collection\n") +
        chalk.grey("\t:: Including CSS for Visual Debugger\n") +
        chalk.grey("\t:: (included in non production builds only)\n") +
        chalk.grey("\t:: To use, set ") + chalk.yellow("{{#vertical-collection debug=true}}\n") +
        chalk.grey("\t:: To debug your applied CSS rules, set ") + chalk.yellow("{{#vertical-collection debugCSS=true}}") +
        chalk.grey("\n===================================================================\n")
      );
      console.log('we here')
      app.import('./vendor/debug.css');
    }
  },

  treeForAddon: function() {
    var tree = this._super.treeForAddon.apply(this, arguments);

    if (/production/.test(this._env) || /test/.test(this._env)) {
      tree = new Funnel(tree, { exclude: [ /-debug/ ] });
    }

    return tree;
  },

  treeForApp: function() {
    var tree = this._super.treeForApp.apply(this, arguments);

    if (/production/.test(this._env) || /test/.test(this._env)) {
      tree = new Funnel(tree, { exclude: [ /initializers/ ] });
    }

    return tree;
  },

  isDevelopingAddon: function() {
    return true;
  }
};
