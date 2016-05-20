var map;

function init() {
    map = new OpenLayers.Map('map',{
        maxExtent: new OpenLayers.Bounds(
        -128 * 156543.0339,
        -128 * 156543.0339,
        128 * 156543.0339,
        128 * 156543.0339),
        maxResolution: 156543.0339,
        units: 'm',
        projection: new OpenLayers.Projection('EPSG:900913'),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
    });
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    
    // the SATELLITE layer has all 22 zoom level, so we add it first to
    // become the internal base layer that determines the zoom levels of the
    // map.
    var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );
    var gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN, visibility: false}
    );
    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {numZoomLevels: 20, visibility: false}
    );
    var ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22, visibility: false}
    );

    // var wms_layer = new OpenLayers.Layer.WMS('OpenLayers WMS',
    //     'http://vmap0.tiles.osgeo.org/wms/vmap0',
    //     {layers: 'basic,clabel,ctylabel,statelabel', transparent: true},
    //     {isBaseLayer: false, opacity: .7}
    // );

    map.addLayers([gsat, gphy, gmap, ghyb]);

    // Google.v3 uses EPSG:900913 as projection, so we have to
    // transform our coordinates
    map.setCenter(new OpenLayers.LonLat(139.46, 35.42).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    ), 5);


    // map = new OpenLayers.Map('map',{
    //     maxExtent: new OpenLayers.Bounds( -128 * 156543.0339, -128 * 156543.0339, 128 * 156543.0339, 128 * 156543.0339),
    //     maxResolution: 156543.0339,
    //     units: 'm',
    //     projection: new OpenLayers.Projection('EPSG:900913'),
    //     displayProjection: new OpenLayers.Projection("EPSG:4326"),
    // });

    // var ve_road = new OpenLayers.Layer.VirtualEarth( "Road", {sphericalMercator:true} );
    // map.addLayer(ve_road);
}