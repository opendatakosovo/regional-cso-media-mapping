var MapView = Backbone.View.extend({
	template: JST["app/templates/map.hbs"],
  	initialize: function(){
      this.render();
    },
    render: function(){
      // TODO: Connect to Google Spreadsheets and retrieve list of organizations.
	    var variables = {};
	    this.$el.append(this.template(variables)); 
    }
});