var map;

function init() {
    map = new OpenLayers.Map('map');
    map.addControl(new OpenLayers.Control.LayerSwitcher());

    var wms_layer_map = new OpenLayers.Layer.WMS(
        'Base layer',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'basic'},
        {isBaseLayer: true}
    );

    var wms_layer_labels = new OpenLayers.Layer.WMS(
        'Location Labels',
        'http://vmap0.tiles.osgeo.org/wms/vmap0',
        {layers: 'clabel,ctylabel,statelabel', transparent: true},
        {visibility: false, opacity:0.5}
    );

    var wms_state_lines = new OpenLayers.Layer.WMS(
        'State Line Layer',
        'http://labs.metacarta.com/wms/vmap0',
        {layers: 'stateboundary', transparent: true},
        {displayInLayerSwitcher: false,
        minScale: 13841995.078125}
    );

    var wms_water_depth = new OpenLayers.Layer.WMS(
        'Water Depth',
        'http://labs.metacarta.com/wms/vmap0',
        {layers: 'depthcontour', transparent: true},
        {visibility: false, opacity:0.8}
    );

    var wms_roads = new OpenLayers.Layer.WMS(
        'Roads',
        'http://labs.metacarta.com/wms/vmap0',
        {layers: 'priroad,secroad,rail', transparent: true},
        {visibility: false, transistionEffect:'resize'}
    );

    map.addLayers([wms_layer_map, wms_layer_labels, wms_state_lines, wms_water_depth, wms_roads]);


    // var image_layer = new OpenLayers.Layer.Image(
    //     'Wallpaper',
    //     'http://us.starcraft2.com/images/wallpapers/wall3/wall3-1920x1200.jpg',
    //     new OpenLayers.Bounds(-180,-112.5,180,112.5),
    //     new OpenLayers.Size(1920,1200),
    //     {numZoomLevels:7, maxResolution:.625}
    // );
    // map.addLayer(image_layer);
    
    map.zoomToMaxExtent();
}