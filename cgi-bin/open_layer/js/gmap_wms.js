var map;

function init() {
    map = new OpenLayers.Map('map'
    //     , {
    //     maxExtent: new OpenLayers.Bounds(-128 * 156543.0339, -128 * 156543.0339, 128 * 156543.0339, 128 * 156543.0339),
    //     maxResolution: 156543.0339,
    //     units: 'm',
    //     projection: new OpenLayers.Projection('EPSG:900913'),
    //     displayProjection: new OpenLayers.Projection("EPSG:4326")
    // }
    );

    map.addControls([
        new OpenLayers.Control.MousePosition({}),
        new OpenLayers.Control.ScaleLine(),
        new OpenLayers.Control.KeyboardDefaults(),
        // new OpenLayers.Control.Graticule(),
        new OpenLayers.Control.Permalink(),
        new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.OverviewMap(),
    ]);

    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {numZoomLevels: 20}
    );

    var wms_layer_labels = new OpenLayers.Layer.WMS(
        'Location Labels',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'basic,clabel,ctylabel,statelabel', transparent: true},
        {visibility: false, opacity: 0.5, isBaseLayer: false}
    );

    var vitual_earth_layer = new OpenLayers.Layer.VirtualEarth("Virtual Earth",
        {
            sphericalMercator: true,
            maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34)
        }
     );

    var vector_layer = new OpenLayers.Layer.Vector('Editable Vectors');

    map.addControl(new OpenLayers.Control.EditingToolbar(vector_layer));
    map.addLayers([gmap, wms_layer_labels, vitual_earth_layer, vector_layer]);

    map.setCenter(new OpenLayers.LonLat(139.46, 35.42).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    ), 5);

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