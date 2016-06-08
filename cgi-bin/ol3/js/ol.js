var map;
var vectorLayer;
function init(){
  var style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.1)'
    }),
    stroke: new ol.style.Stroke({
      color: '#319FD3',
      width: 1
    }),
    text: new ol.style.Text({
      font: '12px Calibri,sans-serif',
      fill: new ol.style.Fill({
        color: '#000'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 3
      })
    })
  });

  vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: '/ol3/data/geojson/countries.geojson',
      format: new ol.format.GeoJSON(),
    }),
    style: function(feature, resolution) {
      style.getText().setText(resolution < 5000 ? feature.get('name') : '');
      return style;
    }
  });

  map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    target: 'map',
    view: new ol.View({
      center: [15275175.732509622, 4339177.221692885],
      zoom: 5,
    }),
    controls: ol.control.defaults({
        attributionOptions: ({
            collapsible: true
        })
    }).extend([
        new ol.control.ZoomSlider(),
        new ol.control.ZoomToExtent({
            extent: [
                12354669.755789608, 2866694.3088072496,
                18401144.44126019, 5870363.772301536
            ]
        }),
        new ol.control.Rotate(),
        new ol.control.OverviewMap(),
        new ol.control.ScaleLine(),
        new ol.control.FullScreen(),
        new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326'
        })
    ])
  });

  var highlightStyleCache = {};

  var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: function(feature, resolution) {
      var text = resolution < 5000 ? feature.get('name') : '';
      if (!highlightStyleCache[text]) {
        highlightStyleCache[text] = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
          }),
          text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            text: text,
            fill: new ol.style.Fill({
              color: '#000'
            }),
            stroke: new ol.style.Stroke({
              color: '#f00',
              width: 3
            })
          })
        });
      }
      return highlightStyleCache[text];
    }
  });

  var highlight;
  var displayFeatureInfo = function(pixel) {

    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
      return feature;
    });

    var info = document.getElementById('info');
    if (feature) {
      info.innerHTML = 'Name: ' + feature.get('name');
    } else {
      info.innerHTML = '&nbsp;';
    }

    if (feature !== highlight) {
      if (highlight) {
        featureOverlay.getSource().removeFeature(highlight);
      }
      if (feature) {
        featureOverlay.getSource().addFeature(feature);
      }
      highlight = feature;
    }

  };

  map.on('pointermove', function(evt) {
    if (evt.dragging) {
      return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
  });

  map.on('click', function(evt) {
    console.log("EPSG:3857: " + evt.coordinate);
    console.log("EPSG:4326: " + ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    displayFeatureInfo(evt.pixel);
  });
}