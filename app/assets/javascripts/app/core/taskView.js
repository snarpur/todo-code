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
    className: 'row',
    ui: {
      itemDelete: ".item-delete",
      itemEdit: ".item-edit" 
    },

    triggers:{
      "click @ui.itemDelete": "item:delete",
      "click @ui.itemEdit": "item:Edit",
    },
    
    onItemDelete: function(){
      console.log("in item viow");
    },
    serializeData: function(){
      return this.model.attributes;
    }
    
  });

  RootApp.TaskCollectionView = Backbone.Marionette.CollectionView.extend({
    collection: RootApp.TaskCollection,
    childView: RootApp.TaskItemView,
    childEvents:{
      "item:delete": "onItemDelete",
      "item:edit": "onItemEdit"
    },
    
    onItemDelete: function(){
      console.log("thi is the collection");
    }


  });

})();