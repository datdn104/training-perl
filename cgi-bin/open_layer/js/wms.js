var map;
var vector_layer;
var data = { "type": "FeatureCollection",
    "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [15402316.93863, 4375202.0128368]
          },
          "properties": {
            "label": "Japan",
            'pointRadius': 30,
            'settlement_type': 'facebook',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [15554867.033555, 4260699.3444818]
          },
          "properties": {
            "label": "Tokyo",
            'pointRadius': 40,
            'settlement_type': 'metropolis',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [15848097.687526, 5430243.2048529]
          },
          "properties": {
            "label": "Asakikawa",
            'pointRadius': 40,
            'settlement_type': 'city',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [15681464.965888, 4617354.5184105]
          },
          "properties": {
            "label": "Sendai",
            'pointRadius': 40,
            'settlement_type': 'city',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [14516258.906871, 3974671.9846783]
          },
          "properties": {
            "label": "Fukuoka",
            'pointRadius': 30,
            'settlement_type': 'city',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [14582529.810386, 3598143.1833978]
          },
          "properties": {
            "label": "Nisinoomote",
            'pointRadius': 30,
            'settlement_type': 'hut',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [14754895.309144, 3962747.8082674]
          },
          "properties": {
            "label": "Ozu",
            'pointRadius': 30,
            'settlement_type': 'hut',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [14548907.072572, 3869895.928171]
          },
          "properties": {
            "label": "Kumamoto",
            'pointRadius': 30,
            'settlement_type': 'city',
            'population': Math.floor(Math.random() * 2000),
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [14906546.373241, 3962289.1860978]
          },
          "properties": {
            "label": "Aki",
            'pointRadius': 30,
            'settlement_type': 'village',
            'population': Math.floor(Math.random() * 2000),
          }
        }
    ]
};
var symbolizers_lookup = {
    'hut': {
        'fillColor': '#ababab', 'fillOpacity':.8, 'pointRadius':4, 'strokeColor': '#454545', 'strokeWidth':2, label: '${population}'
    },
    'village': {
        'fillColor': '#FFFA93', 'fillOpacity':.8, 'pointRadius':8, 'strokeColor': '#AFAB57', 'strokeWidth':4, label: '${population}'
    },
    'city': {
        'fillColor': '#aaee77', 'fillOpacity':.8, 'pointRadius':12, 'strokeColor': '#669933', 'strokeWidth':5, label: '${population}'
    },
    'metropolis': {
        'fillColor': '#BD1922','fillOpacity':.8, 'pointRadius':16, 'strokeColor': '#812B30', 'strokeWidth':6, label: '${population}'
    },
    'facebook': {
        'fillColor': '#336699','fillOpacity':.8, 'pointRadius':26, 'strokeColor': '#003366', 'strokeWidth':2, label: '${population}'
    }
};

var symbolizers_select = {
    'hut': {
        'fillColor': '#ffffff', 'fillOpacity':.8, 'pointRadius':4, 'strokeColor': '#454545', 'strokeWidth':2, label: '${label}'
    },
    'village': {
        'fillColor': '#ffffff', 'fillOpacity':.8, 'pointRadius':8, 'strokeColor': '#AFAB57', 'strokeWidth':4, label: '${label}'
    },
    'city': {
        'fillColor': '#ffffff', 'fillOpacity':.8, 'pointRadius':12, 'strokeColor': '#669933', 'strokeWidth':5, label: '${label}'
    },
    'metropolis': {
        'fillColor': '#ffffff','fillOpacity':.8, 'pointRadius':16, 'strokeColor': '#812B30', 'strokeWidth':6, label: '${label}'
    },
    'facebook': {
        'fillColor': '#ffffff','fillOpacity':.8, 'pointRadius':26, 'strokeColor': '#003366', 'strokeWidth':2, label: '${label}'
    }
};

function init() {
    map = new OpenLayers.Map('map', {
        maxExtent: new OpenLayers.Bounds(14130404.0339, 3333783.0339, 16380710.0339, 5823225.0339),
        maxResolution: 156543.0339,
        units: 'm',
        projection: new OpenLayers.Projection('EPSG:900913'),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        fractionalZoom: false,
        transitionEffect: 'resize',
        eventListeners: {
            featureover: function(evt){
                var feature = evt.feature;
                var popup = new OpenLayers.Popup("popup",
                    OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
                    null,
                    "<div style='font-size:.8em'>Name: " + feature.attributes.label +"<br>Population: " + feature.attributes.population+"</div>",
                    true
                );
                popup.autoSize = true;
                feature.popup = popup;
                map.addPopup(popup);
            },
            featureout: function(evt){
                var feature = evt.feature;
                map.removePopup(feature.popup);
                feature.popup.destroy();
                feature.popup = null;
            },
            click: function(e) {
                var lonlat = map.getLonLatFromPixel(e.xy);
                map.panTo(lonlat);
                log("Map says: " + lonlat.lon + ", " + lonlat.lat);
            },
            featureclick: function(evt) {
                var feature = evt.feature;
                var popup = new OpenLayers.Popup.FramedCloud("popup",
                    OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
                    null,
                    "<div style='font-size:.8em'>Name: " + feature.attributes.label +"<br>Population: " + feature.attributes.population+"</div>",
                    null,
                    true
                );
                feature.popup = popup;
                map.addPopup(popup);
            },
        }
    });
    map.addControls([
        new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.Permalink({anchor: true}),
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.Attribution(),
        new OpenLayers.Control.PanZoomBar()
        ]);

    var wms_layer_map = new OpenLayers.Layer.WMS(
        'Base layer',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'basic'}
    );

    var wms_layer_labels = new OpenLayers.Layer.WMS(
        'Location Labels',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'clabel,ctylabel,statelabel', transparent: true},
        {visibility: false, opacity:0.5}
    );

    var gmap = new OpenLayers.Layer.Google( "Google Streets", {numZoomLevels: 20} );

    var vector_style_map = new OpenLayers.StyleMap({});
    vector_style_map.addUniqueValueRules('default', 'settlement_type', symbolizers_lookup);
    vector_style_map.addUniqueValueRules('select', 'settlement_type', symbolizers_select);
    vector_layer = new OpenLayers.Layer.Vector("Vector Layer",{
        renderers: ["Canvas", "SVG", "VML"],
        styleMap: vector_style_map
    });

    var format_geojson = new OpenLayers.Format.GeoJSON({});
    vector_layer.addFeatures(format_geojson.read(data));

    map.addLayers([gmap, wms_layer_map, wms_layer_labels, vector_layer]);
    // map.zoomToMaxExtent();
    map.setCenter(lonlat_func(139.46, 35.42), 5);
}

function log(msg){
    console.log(msg);
}

function lonlat_func(lon, lat){
    return new OpenLayers.LonLat(lon, lat).transform(
        new OpenLayers.Projection("EPSG:4326"),
        new OpenLayers.Projection("EPSG:900913")
    );
}