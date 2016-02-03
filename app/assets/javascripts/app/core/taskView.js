var RootApp = RootApp|| {};

(function () {
  'use strict';


  RootApp.NewTaskView = Backbone.Marionette.ItemView.extend({

    template: '#new-task-template',
    
    ui: {
      saveButton: '.save-button',
      title: "input[name='title']",
      form: 'form'
    },

    triggers: {
      'click @ui.saveButton': 'click:save'
    },

    templateHelpers: function () {
      return {
        placeHolder: "get you hands dirty..."
      };
    },
  
    onClickSave: function(){
      this.model.set("title", this.ui.title.val());      
    }

  });

  RootApp.TaskItemView = Backbone.Marionette.ItemView.extend({
    template: "#task-item-view",
    className: function(){
        if(_.isNull(this.model.get("date_completed"))){
          return "row"; 
        }
        else{
          return "row status-completed";
        }
        
    },
    ui: {
      itemDelete: ".item-delete",
      itemEdit: ".item-edit", 
      itemComplete: ".item-complete" 
    },

    triggers:{
      "click @ui.itemDelete": "item:delete",
      "click @ui.itemEdit": "item:edit",
      "click @ui.itemComplete": "item:complete"
    },

    modelEvents:{
      "sync": "modelSynced"
    },

    modelSynced: function(){
      console.log("syncing model")
      this.trigger("model:synced");
    },
    
    pad: function (number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    },

    onItemComplete: function(){
      var date = new Date();
      var dateStr = date.getFullYear()+ "" + this.pad(date.getMonth() + 1) + "" + this.pad(date.getDate());
      this.model.set("date_completed", dateStr);
    },

    serializeData: function(){
      return this.model.attributes;
    }
    
  });

  RootApp.TaskCollectionView = Backbone.Marionette.CollectionView.extend({
    collection: RootApp.TaskCollection,
    childView: RootApp.TaskItemView,
    childEvents: {
    'model:synced': 'onChildViewModelSynced'
    },
    
    onChildViewModelSynced: function(){
      this.render();
    },




  });

})();