var Organization = Backbone.Model.extend({
    defaults: {
	name: "",
	type: "",
	website: "",
	description: "",
	lat: 0.0,
	lon: 0.0
    },
    initialize: function(){}
});

var Organizations = Backbone.Collection.extend({
    model: Organization
});
