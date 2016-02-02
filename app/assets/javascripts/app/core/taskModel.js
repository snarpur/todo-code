var RootApp = RootApp|| {};

RootApp.TaskModel = Backbone.Model.extend({ 
  url: "/tasks"
});

RootApp.TaskCollection = Backbone.Collection.extend({
  model : RootApp.TaskModel,
  url : "/tasks"
});

RootApp.API.Model = {

  getTasks: function(){
    var options = {
      success: function(collection, response, xhr){
        collection.trigger("fetched",{collection: collection, response: response});
      },
      error: function(){console.log("fetch is a error");},
      reset: true
    };

    var tasks = new RootApp.TaskCollection([]);
    tasks.fetch(options);
    return tasks;
  },

  
  saveTask: function(model, collection){
    var options = {
      success: function(model, response, xhr){
        collection.add(model);
      },
      error: function(){console.log("error saving task") }

    };
    model.save(model.attributes ,options);
  }


};
