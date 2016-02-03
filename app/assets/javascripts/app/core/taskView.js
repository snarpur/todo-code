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
    
    attributes:{
      "data-edit-mode": "off"
    },
        
 
    ui: {
      itemDelete: ".item-delete",
      itemEdit: ".item-edit", 
      itemComplete: ".item-complete" ,
      editTitle: "input[name='title']"
    },

    triggers:{
      "click @ui.itemDelete": "item:delete",
      "click @ui.itemEdit": "item:edit",
      "click @ui.itemComplete": "item:complete"
    },

    events:{
      "keydown @ui.editTitle": "onEditKeyPress"
    },

    modelEvents:{
      "sync": "modelSynced"
    },

    initialize: function(){
      this.listenTo(this.model.collection,"edit:mode:on", function(eventArgs){
        var view = eventArgs.view;
        if(view.cid != this.cid && this.getEditMode() == "on")
          this.setEditMode(false);
      })
    },
    
    modelSynced: function(){
      this.trigger("model:synced");
    },
    
    pad: function (number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    },

    onItemEdit: function(e){
      this.setEditMode(true);
    },

    onEditKeyPress: function(e){
      var ENTER_KEY = 13;
      var ESC_KEY = 27;

      if (e.which === ENTER_KEY) {
        this.model.set("title", this.ui.editTitle.val());
        this.trigger("update:item",{view: this});
        return;
      }

      if (e.which === ESC_KEY) {
        this.ui.editTitle.val(this.model.get('title'));
        this.setEditMode(false);
      }
    },

    setEditMode: function(state){
      var mode = state ? "on" : "off";
      this.$el.attr("data-edit-mode", mode);
    },

    getEditMode: function(){
        return this.$el.attr("data-edit-mode");
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
      "model:synced": "onChildViewModelSynced"
    },
    
    onChildViewModelSynced: function(eventArgs){
      this.render();
    }

  });

})();