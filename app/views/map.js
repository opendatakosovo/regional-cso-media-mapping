
var MapView = Backbone.View.extend({
	template: JST["app/templates/map.hbs"],
  	initialize: function(){
      this.render();
    },
    render: function(){
    
      // Rander the template
      var variables = {};
	    this.$el.append(this.template(variables));
      $('#alert-map-error').hide();

      //  Initialize map.
      MapView.map = L.map(this.$('#map')[0]).setView([42.5269444444, 21.0072222222], 6);
      
      // Disable map scrolling.
      MapView.map.scrollWheelZoom.disable();

      // Load map layer and add it to the map.
      // Previw a bunch of tile theme options here: https://leaflet-extras.github.io/leaflet-providers/preview/
      L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
        attribution: 'Data Source: <a href="http://opendatakosovo.org">Open Data Kosovo</a>',
        maxZoom: 25
      }).addTo(MapView.map);

      sheetrock({
        url: "https://docs.google.com/spreadsheets/d/1WwYdkS4AmeY9UAzuWssUzwGvUW9tcW7jx7JdV6BNwsA/pubhtml#gid=0",
        callback: this.sheetCallback
      });
    },
    sheetCallback: function(error, options, response){
      // Retrieved data from the google sheets.
      // Let's run throw the rows and create markers for each organization.

      if (!error || error == null) {
        // First, we create a marker cluster group layer where all our markers will be contained.
        var markerClusterGroup = L.markerClusterGroup();

        // Then, for each organization, we create a marker and add it to the marker cluster group layer.
        // start with i=1 to skip header row.
        for(var i=1; i < response.rows.length; i++){

          // Instanciate an organization object representation of the row.
          var org = new Organization();
          org.set({
            name: response.rows[i].cells['Name'],
            type: response.rows[i].cells['Type'],
            description: response.rows[i].cells['Description'],
            website: response.rows[i].cells['Website'],
            twitter: response.rows[i].cells['Twitter'],
            facebook: response.rows[i].cells['Facebook'],
            latitude: response.rows[i].cells['Latitude'],
            longitude: response.rows[i].cells['Longitude'],
            logoURL: response.rows[i].cells['LogoURL']
          });

          // Create marker
          if(org.get("latitude") != "" && org.get("longitude") != ""){
            var marker = L.marker([org.get("latitude"), org.get("longitude")]);

            // Set marker icon based on organization type.
            var awesomeMarkerIcon = '';
            var awesomeMarkerColor = '';

            if(org.get("type") === "CSO"){
              awesomeMarkerIcon = 'ion-ios-people';
              awesomeMarkerColor = 'green';

            }else if (org.get("type") === "Media"){
              awesomeMarkerIcon = 'ion-ios-paper';
              awesomeMarkerColor = 'blue';

            }else if (org.get("type") === "CSO/Media"){
              awesomeMarkerIcon = 'ion-ios-people';
              awesomeMarkerColor = 'purple';

            }else if (org.get("type") === "Initiative"){
              awesomeMarkerIcon = 'ion-android-walk';
              awesomeMarkerColor = 'yellow';

            }else if (org.get("type") === "Network"){
              awesomeMarkerIcon = 'ion-android-share-alt';
              awesomeMarkerColor = 'orange';
              
            }else{
              awesomeMarkerIcon = 'ion-ios-help';
              awesomeMarkerColor = 'red';
            }

            var awesomeMarker = L.AwesomeMarkers.icon({
              icon: 'ion ' + awesomeMarkerIcon,
              markerColor: awesomeMarkerColor
            });

            var marker = L.marker(
                [org.get("latitude"), org.get("longitude")],
                {icon: awesomeMarker})

            // Create popup HTML and bind it to the marker.
            var markerPopupHtml = 
              '<strong>' + 
                '<a href=' + org.get("website") + ' target="_blank">' + org.get("name") + '</a>' + 
              '</strong>' +
              '<br>' +
              '<a href="' + org.get("twitter") + '" target="_blank" class="btn btn-social-icon btn-twitter"><span class="fa fa-twitter"></span></a>' + 
              '<a href="' + org.get("facebook") + '" target="_blank" class="btn btn-social-icon btn-facebook"><span class="fa fa-facebook"></span></a>' +
              '<br><br>' +
              '<div>' + org.get("description") + '<div>';

            // If we have a logo, include it.
            //if(org.get("logoURL") != ""){
            //  markerPopupHtml = '<img src="' + org.get("logoURL") + '"><br>' + markerPopupHtml;
            //}
            

            marker.bindPopup(markerPopupHtml);

            // Add the marker to the marker group layer.
            markerClusterGroup.addLayer(marker);
          }
        }

        // Finally, we take the created marker cluster group layer and add it as a layer to the map.
        MapView.map.addLayer(markerClusterGroup);
      }else{
         $('#alert-map-error').show();
      }
    }
});