Backbone._sync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  if (!options.noCSRF) {
    var beforeSend = options.beforeSend;

    // Set X-CSRF-Token HTTP header
    options.beforeSend = function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) { xhr.setRequestHeader('X-CSRF-Token', token); }
      if (beforeSend) { return beforeSend.apply(this, arguments); }
    };
  }
  if(method == "delete" || method == "update"){
    var modelUrl = model.url;
    if(modelUrl.split("/").length < 3) 
      model.url = modelUrl + "/" + model.get("id");
  }
  return Backbone._sync(method, model, options);
};