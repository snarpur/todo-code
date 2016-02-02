var RootApp = RootApp|| {};

RootApp.Router = Backbone.Marionette.AppRouter.extend({
  
  appRoutes: {
    "/": "taskIndex",
    "tasks": "taskIndex"
  }

});