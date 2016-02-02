var RootApp = RootApp || {};

(function () {
  'use strict';

  var TaskApp = Backbone.Marionette.Application.extend({
    
    setRootLayout: function () {
      this.root = new RootApp.RootLayout();
    }
  
  });
    
  RootApp.App = new TaskApp();
  RootApp.API = {};
  
  RootApp.App.on('before:start', function () { 
    
    RootApp.App.setRootLayout();
  
  });

})();