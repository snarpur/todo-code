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

  RootApp.HeaderLayout = Backbone.Marionette.ItemView.extend({

    template: '#template-header'

  });


  RootApp.FooterLayout = Backbone.Marionette.ItemView.extend({
    
    template: '#template-footer',

    initialize: function () {
      console.log("footer on Initialize")
    },

    onRender: function () {
      console.log("footer onRender")
    }

  });

})();