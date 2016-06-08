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

var listeners = {
    featureclick: function(evt) {
        console.log(this.name + " clicked: " + evt.feature.id);
    },
    nofeatureclick: function() {
        console.log("no " + this.name + "s clicked")
    },
    featureover: function(evt) {
        console.log(this.name + " over: " + evt.feature.id);
    },
    featureout: function(evt) {
        console.log(this.name + " out: " + evt.feature.id);
    }
};


// OpenLayers.Control.Click = OpenLayers.Class(
//     OpenLayers.Control, {                
//         defaultHandlerOptions: {
//             'single': true,
//             'double': false,
//             'pixelTolerance': 0,
//             'stopSingle': false,
//             'stopDouble': false
//         },
//         initialize: function(options) {
//             this.handlerOptions = OpenLayers.Util.extend(
//                 {}, this.defaultHandlerOptions
//             );
//             OpenLayers.Control.prototype.initialize.apply(
//                 this, arguments
//             ); 
//             this.handler = new OpenLayers.Handler.Click(
//                 this, {
//                     'click': this.trigger
//                 }, this.handlerOptions
//             );
//         }, 
//         trigger: function(e) {
//             var lonlat = map.getLonLatFromPixel(e.xy);
//             // .transform(
//             //     new OpenLayers.Projection("EPSG:900913"),
//             //     new OpenLayers.Projection("EPSG:4326")
//             //     );
//             console.log("You clicked near " + lonlat.lon + ", " + lonlat.lat);
//         }
//     }
// );

function init() {
    map = new OpenLayers.Map('map',
    {
        maxExtent: new OpenLayers.Bounds(14130404.0339, 3333783.0339, 16380710.0339, 5823225.0339),
        maxResolution: 156543.0339,
        units: 'm',
        projection: new OpenLayers.Projection('EPSG:900913'),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        // featureEvents: true,
    });

    map.addControls([
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.MousePosition({}),
        new OpenLayers.Control.ScaleLine(),
        new OpenLayers.Control.KeyboardDefaults(),
        // new OpenLayers.Control.Graticule(),
        new OpenLayers.Control.Permalink(),
        new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.OverviewMap(),
    ]);

    var gmap = new OpenLayers.Layer.Google( "Google Streets", {numZoomLevels: 20} );

    var wms_layer_labels = new OpenLayers.Layer.WMS(
        'WMS Labels',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'basic,clabel,ctylabel,statelabel', transparent: true},
        {visibility: false, opacity: 0.5, isBaseLayer: false}
    );

    // vector_layer = new OpenLayers.Layer.Vector('Editable Vectors');

    //Load vector from url json
    // vector_layer = new OpenLayers.Layer.Vector('More Advanced Vector Layer',{
    //     protocol: new OpenLayers.Protocol.HTTP({
    //         url: '/open_layer/cgi/data.json',
    //         format: new OpenLayers.Format.GeoJSON({})
    //     }),
    //     strategies: [new OpenLayers.Strategy.Fixed()]
    // });

    // Load vector from file JSON or hash
    vector_layer = new OpenLayers.Layer.Vector('More Advanced Vector Layer',{
        strategies: [new OpenLayers.Strategy.Cluster()],
        eventListeners:{
            'featureselected':function(evt){
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
            'featureunselected':function(evt){
                var feature = evt.feature;
                map.removePopup(feature.popup);
                feature.popup.destroy();
                feature.popup = null;
            }
        }
    });
    var format_geojson = new OpenLayers.Format.GeoJSON({});
    vector_layer.addFeatures(format_geojson.read(data));

    //Style vector
    // var vector_style = new OpenLayers.Style({
    //     'fillColor': '#669933',
    //     'fillOpacity': 0.8,
    //     'strokeColor': '#aaee77',
    //     'strokeWidth': 3,
    //     'pointRadius': '${pointRadius}',
    //     'label': '${label}'
    // });
    // var vector_style_select = new OpenLayers.Style({
    //     'fillColor': '#ffffff',
    //     'fillOpacity': 0.8,
    //     'strokeColor': '#aaee77',
    //     'strokeWidth': 3,
    //     'pointRadius': '${pointRadius}',
    //     'label': '${label}'
    // });

    var vector_style_map = new OpenLayers.StyleMap({});
    vector_style_map.addUniqueValueRules('default', 'settlement_type', symbolizers_lookup);
    vector_style_map.addUniqueValueRules('select', 'settlement_type', symbolizers_select);
    vector_layer.styleMap = vector_style_map;

    // vector_layer.styleMap = new OpenLayers.StyleMap({
    //     'default': vector_style,
    //     'select': vector_style_select
    // });

    //Add layer and control to map
    map.addControl(new OpenLayers.Control.EditingToolbar(vector_layer));
    map.addLayers([gmap, wms_layer_labels, vector_layer]);
    map.setCenter(lonlat_func(139.46, 35.42), 5);

    // Listener
    // var click = new OpenLayers.Control.Click();
    // map.addControl(click);
    // click.activate();

    // var select_feature_control = new OpenLayers.Control.SelectFeature(vector_layer,
    //     {
    //         multiple: false,
    //         toggle: true,
    //         multipleKey: 'shiftKey',
    //         // hover: true,
    //         // highlightOnly: true,
    //         // autoActive: true
    //     }
    // );
    // map.addControl(select_feature_control);
    // select_feature_control.activate();

    // Vector layer render
    // point1 = point_func(133.02021, 32.72411);
    // point2 = point_func(134.17429, 33.24622);
    // point3 = point_func(133.40670, 33.39780);
    // point4 = point_func(133.3648194885353, 33.13341146422119);
    // point5 = point_func(133.72565170287936, 32.91384836781686);

    // linear_ring1 = new OpenLayers.Geometry.LinearRing([point1, point2, point3, point1]);
    // linear_ring2 = new OpenLayers.Geometry.LinearRing([point1, point4, point5, point1]);

    // vector_layer.addFeatures([render_linear_ring([point1, point2, point3, point1]), render_linear_ring([point1, point4, point5, point1])]);
    // vector_layer.addFeatures([render_polygon([linear_ring1, linear_ring2])]);

    // vector_layer.addFeatures([render_point(139.46, 35.42), render_line(133.02021, 32.72411, 134.17429, 33.24622)]);

    vector_layer.onFeatureInsert = function(feature){
        console.log('onFeatureInsert - Geometry:' + feature.geometry);
    };

    vector_layer.preFeatureInsert = function(feature){
        console.log('preFeatureInsert - ID:' + feature.id);
    };

    //Add popup
    // var popup = new OpenLayers.Popup.FramedCloud("tokyo",
    //                lonlat_func(139.46, 35.42),
    //                new OpenLayers.Size(200,200),
    //                '<div style="color:#FF0000, width: 200px;">Tokyo Japan</br><a href="http://test.url">test.url</a>' + '</div>',
    //                null,
    //                true);
    // map.addPopup(popup);

    create_button_control();
    create_toggle_control();
}

function create_button_control(){
    // var navigation_control = new OpenLayers.Control.Navigation();
    // var control_panel = new OpenLayers.Control.Panel({
    //     div: document.getElementById('panel_div'),
    //     defaultControl: navigation_control
    // });
    // control_panel.addControls([
    //     navigation_control,
    //     new OpenLayers.Control.ZoomBox(),
    //     new OpenLayers.Control.ZoomToMaxExtent()
    // ]);
    // map.addControl(control_panel);

    var custom_button_func = function(){
        //Get a random coordinate from -90 to 90
        var random_lon = Math.floor(Math.random() * 360) - 180;
        var random_lat = Math.floor(Math.random() * 180) - 90;
        if(map.layers[0].opacity === 1){
            //If the layer opacity is 1 (fully opaque), then change it and zoom
            map.layers[0].setOpacity(.5);
            map.setCenter(new OpenLayers.LonLat(random_lon, random_lat).transform(
                new OpenLayers.Projection("EPSG:4326"),
                map.getProjectionObject()
            ), 3);
        }
        else{
            //If the layer opacity is anything but 1, change it and zoom
            map.layers[0].setOpacity(1);
            map.setCenter(new OpenLayers.LonLat(random_lon, random_lat).transform(
                new OpenLayers.Projection("EPSG:4326"),
                map.getProjectionObject()
            ), 3);
        }
    };

    var custom_button = new OpenLayers.Control.Button({
        displayClass: 'olControlCustomButton',
        trigger: custom_button_func
    });

    var control_panel = new OpenLayers.Control.Panel({});
    control_panel.addControls([custom_button]);
    map.addControl(control_panel);
    control_panel.moveTo(new OpenLayers.Pixel(8,60));
}

function create_toggle_control(){
    var map_event_function = function(){
        map.layers[0].setOpacity(Math.random());
    }

    var toggle_button_activate_func = function(){
        //Attach the map_event_function to the map
        map.events.register('click', map, map_event_function);
    }
    var toggle_button_deactivate_func = function(){
        //Remove the map_event_function from the map
        map.events.unregister('click', map, map_event_function);
        //Restore the layer's opacity
        map.layers[0].setOpacity(1);
    }

    var custom_toggle_button = new OpenLayers.Control.Button({
        displayClass: 'olControlCustomButtonToggle',
        eventListeners: {
        'activate': toggle_button_activate_func,
        'deactivate': toggle_button_deactivate_func
        },type: OpenLayers.Control.TYPE_TOGGLE
    });

    var control_panel = new OpenLayers.Control.Panel({});
    control_panel.addControls([custom_toggle_button]);
    map.addControl(control_panel);
    control_panel.moveTo(new OpenLayers.Pixel(8,90));
}

function lonlat_func(lon, lat){
    return new OpenLayers.LonLat(lon, lat).transform(
        new OpenLayers.Projection("EPSG:4326"),
        new OpenLayers.Projection("EPSG:900913")
    );
}

function point_func(lon, lat){
    var lonlat = lonlat_func(lon, lat);
    var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
    return point;
}

function render_point(lon, lat){
    var feature_point = new OpenLayers.Feature.Vector(point_func(lon, lat));
    return feature_point;
}

function render_line(lon1, lat1, lon2, lat2){
    var line_geom = new OpenLayers.Geometry.LineString([point_func(lon1, lat1), point_func(lon2, lat2)]);
    var feature_line = new OpenLayers.Feature.Vector(line_geom);
    return feature_line;
}

function render_linear_ring(points = []){
    var linear_ring = new OpenLayers.Geometry.LinearRing(points);
    var feature_linear = new OpenLayers.Feature.Vector(linear_ring);
    return feature_linear;
}

function render_polygon(points = []){
    var geom_polygon = new OpenLayers.Geometry.Polygon(points);
    var feature_polygon= new OpenLayers.Feature.Vector(geom_polygon);
    return feature_polygon;
}