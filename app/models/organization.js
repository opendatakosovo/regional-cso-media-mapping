var Organization = Backbone.Model.extend({
    defaults: {
		name: "",
		type: "",
		website: "",
		twitter: "",
		facebook: "",
		description: "",
		latitude: "",
		longitude: "",
		logoURL: ""
    },
    initialize: function(){}
});

var Organizations = Backbone.Collection.extend({
    model: Organization
});
