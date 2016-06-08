$(function(){
	var gmap = new google.maps.Map(document.getElementById('gmap'), {
      disableDefaultUI: true,
      keyboardShortcuts: false,
      draggable: false,
      disableDoubleClickZoom: true,
      scrollwheel: false,
      streetViewControl: false
    });

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

    var view = new ol.View({
      // make sure the view doesn't go beyond the 22 zoom levels of Google Maps
      maxZoom: 21,
      center: [-221.8909, 37.8054],
      zoom: 5
    });
    view.on('change:center', function() {
      var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
      gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
    });
    view.on('change:resolution', function() {
      gmap.setZoom(view.getZoom());
    });

    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: '/ol3/data/geojson/countries.json',
        format: new ol.format.GeoJSON(),
      }),
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 1
        })
      })
    });


    var olMapDiv = document.getElementById('olmap');
    var map = new ol.Map({
      layers: [vector],
      // interactions: ol.interaction.defaults({
      //   altShiftDragRotate: false,
      //   dragPan: false,
      //   rotate: false
      // }).extend([new ol.interaction.DragPan({kinetic: null})]),
      target: olMapDiv,
      view: view,
      controls: ol.control.defaults({
        attributionOptions: ({
            collapsible: true
        })
      }).extend([
        // new ol.control.ZoomSlider(),
        new ol.control.ZoomToExtent({
            extent: [
                14130404.0339, 3333783.0339, 16380710.0339, 5823225.0339
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


    view.setCenter([0, 0]);
    view.setZoom(1);
    olMapDiv.parentNode.removeChild(olMapDiv);
    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);
});