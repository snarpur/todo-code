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
    this.tasksView = new RootApp.TaskCollectionView({collection: eventArgs.collection});
    RootApp.App.root.showChildView("list", this.tasksView);

    this.listenTo(this.tasksView, "childview:item:delete", this.deleteTask);
    this.listenTo(this.tasksView, "childview:item:edit", this.editTask);
    this.listenTo(this.tasksView, "childview:item:complete", this.completeTask);
  
  },
  
  newTask: function(){
    var emptyTask = new RootApp.TaskModel();
    var emptyTaskView = new RootApp.NewTaskView({model: emptyTask});
    
    RootApp.App.root.showChildView("form", emptyTaskView);
    this.listenTo(emptyTaskView, "click:save", this.saveTask);
  
  },

  saveTask: function(eventArgs){
    var model = eventArgs.model;

    this.listenToOnce(model, 'sync', function(){
      this.newTask();
      this.tasks.add(model)
    });

    RootApp.API.Model.saveTask(model);

  },

  editTask: function(view){
    this.tasks.trigger("edit:mode:on",{view: view});
    this.listenToOnce(view,"update:item", function(eventArgs){
      
      RootApp.API.Model.saveTask(eventArgs.view.model);
    });

  },

  deleteTask: function(eventArgs){
    var model = eventArgs.model;
    model.destroy({wait: true});
  
  },

  completeTask: function(eventArgs){
    var model = eventArgs.model;
    RootApp.API.Model.saveTask(model);
  
  }



});