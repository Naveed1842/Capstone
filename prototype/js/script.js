  var basemapUrl = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
  var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';


  //map2 simply shows a geojson layer with polygons using NYC NTA data

  //initialize map2
  var map2 = L.map('map2', {
    scrollWheelZoom: false
  }).setView( [40.767802,-73.953266], 12);

  //CartoDB Basemap
  L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map2);


  $.getJSON('data/neighborhoods.geojson', function(nabe_data) {
    L.geoJson(nabe_data).addTo(map2);
  })


  //map 3 is a rebuild of this leaflet choropleth demo: http://leafletjs.com/examples/choropleth.html

  //initialize map3
  var map3 = L.map('map3', {
    scrollWheelZoom: false
  }).setView( [40.767802,-73.953266], 12);

  //CartoDB Basemap
  L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map3);

  var geojson;

  //this function takes a value and returns a color based on which bucket the value falls between
  function getColor(d) {
      return d > 4000  ? '#FC4E2A' :
             d > 3000   ? '#FD8D3C' :
             d > 2000   ? '#FEB24C' :
             d > 1000   ? '#FED976' :
                        '#FFEDA0';
  }

  //this function returns a style object, but dynamically sets fillColor based on the data
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.NoiseComplains),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  //this function is set to run when a user mouses over any polygon
  function mouseoverFunction(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    //update the text in the infowindow with whatever was in the data
    console.log(layer.feature.properties.NTACode+ '\n\n'+ layer.feature.properties.NoiseComplains);
    $('#infoWindow').text(layer.feature.properties.NTACode+'\n\n'+ layer.feature.properties.NoiseComplains);
  }

  //this runs on mouseout
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  //this is executed once for each feature in the data, and adds listeners
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }


  //all of the helper functions are defined and ready to go, so let's get some data and render it!

  //be sure to specify style and onEachFeature options when calling L.geoJson().
  $.getJSON('data/neighborhoods.geojson', function(state_data) {
    geojson = L.geoJson(state_data,{
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map3);
  });
