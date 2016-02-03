var RootApp = RootApp|| {};

(function () {
  'use strict';

    RootApp.RootLayout = Backbone.Marionette.LayoutView.extend({

      el: '#task-app',

      regions: {
        header: '#header',
        form: '#form',
        list: '#list',
        footer: '#footer'
      }

  });

})();