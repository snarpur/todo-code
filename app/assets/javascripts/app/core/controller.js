var RootApp = RootApp|| {};

RootApp.Controller = Backbone.Marionette.Object.extend({
  taskIndex: function() {
    console.log("taskINdex");
  },

  init: function(){
    this.newTask();
    this.tasks = this.getTasks();
  
  },

  getTasks: function(){
    var tasks = RootApp.API.Model.getTasks();
    this.listenTo(tasks, "fetched", this.showTasks);
    return tasks
  
  },

  showTasks: function(eventArgs){
    var tasksView = new RootApp.TaskCollectionView({collection: eventArgs.collection});
    RootApp.App.root.showChildView("list", tasksView);

    this.listenTo(tasksView, "childview:item:delete", this.deleteTask);
    this.listenTo(tasksView, "childview:item:edit", this.editTask);
  
  },
  
  newTask: function(){
    var emptyTask = new RootApp.TaskModel();
    var emptyTaskView = new RootApp.NewTaskView({model: emptyTask});
    
    RootApp.App.root.showChildView("form", emptyTaskView);;
    this.listenTo(emptyTaskView, "click:save", this.saveTask)
  
  },

  saveTask: function(eventArgs){
    var model = eventArgs.model;

    this.listenToOnce(model, 'sync', function(){
      this.newTask();
    });

    RootApp.API.Model.saveTask(model, this.tasks);

  },

  editTask: function(eventArgs){
    console.log("Edit", eventArgs);

  },

  deleteTask: function(eventArgs){
    var model = eventArgs.model;
    model.destroy({wait: true});
    console.log("DELETE", eventArgs.model);

  }

});